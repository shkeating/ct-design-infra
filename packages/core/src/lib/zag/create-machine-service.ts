import {
  createScope,
  findTransition,
  getExitEnterStates,
  hasTag,
  matchesState,
  resolveStateValue,
  INIT_STATE,
  MachineStatus,
} from '@zag-js/core';
import type { Machine, MachineSchema, Scope } from '@zag-js/core';
import { callAll, isFunction, isString, toArray } from '@zag-js/utils';

/**
 * A framework adapter that turns a Zag.js Machine schema into a running Service,
 * for use outside the frameworks Zag ships official bindings for (React/Vue/Svelte/Solid).
 *
 * Ported from the shape of Zag's own React/Svelte adapters (`useMachine`), which are not
 * exported as reusable packages — every framework binding hand-rolls this ~150-line runtime
 * around @zag-js/core's framework-agnostic primitives. This version drives Lit's update cycle
 * synchronously via `notify()` instead of a framework's own reactivity system.
 *
 * Internals lean on `any` at the seams where Zag's machine-schema generics get assembled —
 * the same seams the published @zag-js/react and @zag-js/svelte adapters cross in plain,
 * untyped JS (their .ts sources aren't published). The public surface (`MachineService<T>`)
 * stays typed against the caller's schema.
 */
export interface MachineService<T extends MachineSchema> {
  state: {
    get: () => T['state'];
    matches: (...values: T['state'][]) => boolean;
    hasTag: (tag: T['tag']) => boolean;
  };
  send: (event: T['event']) => void;
  event: T['event'] & { current: () => T['event']; previous: () => T['event'] | null };
  context: {
    get: <K extends keyof T['context']>(key: K) => T['context'][K];
    set: <K extends keyof T['context']>(key: K, value: T['context'][K]) => void;
  };
  refs: Record<string, unknown>;
  computed: <K extends keyof T['computed']>(key: K) => T['computed'][K];
  prop: <K extends keyof T['props']>(key: K) => T['props'][K];
  scope: Scope;
  start: () => void;
  stop: () => void;
  getStatus: () => MachineStatus;
}

export function createMachineService<T extends MachineSchema>(
  machine: Machine<T>,
  getProps: () => Partial<T['props']> & { id: string; getRootNode?: () => ShadowRoot | Document | Element },
  notify: () => void,
): MachineService<T> {
  const m = machine as any;
  const initialProps = getProps();
  const scope: Scope = createScope({
    id: initialProps.id,
    ids: (initialProps as { ids?: Record<string, unknown> }).ids,
    getRootNode: initialProps.getRootNode ?? (() => document),
  });

  const prop = (key: any) => {
    const rawProps = getProps();
    const merged = m.props?.({ props: rawProps, scope }) ?? rawProps;
    return merged[key];
  };

  function bindable(paramsFn: () => any) {
    const params = paramsFn();
    const isEqual = params.isEqual ?? ((a: any, b: any) => a === b);
    const hash = params.hash ?? ((v: any) => String(v));
    const ref = { current: params.value !== undefined ? params.value : params.defaultValue };
    return {
      initial: params.defaultValue,
      ref,
      get: () => ref.current,
      set(next: any) {
        const prev = ref.current;
        const resolved = isFunction(next) ? next(prev) : next;
        if (isEqual(resolved, prev)) return;
        ref.current = resolved;
        params.onChange?.(resolved, prev);
        notify();
      },
      invoke(nextValue: any, prevValue: any) {
        params.onChange?.(nextValue, prevValue);
      },
      hash,
    };
  }
  bindable.cleanup = (_fn: VoidFunction) => {};
  bindable.ref = (defaultValue: any) => {
    const ref = { current: defaultValue };
    return { get: () => ref.current, set: (next: any) => (ref.current = next) };
  };

  const context = m.context?.({
    prop,
    bindable,
    scope,
    flush: (fn: VoidFunction) => fn(),
    getContext: () => ctx,
    getComputed: () => computed,
    getRefs: () => refs,
    getEvent: () => getEvent(),
  });

  const ctx = {
    get: (key: any) => context?.[key].get(),
    set: (key: any, value: any) => context?.[key].set(value),
    initial: (key: any) => context?.[key].initial,
    hash: (key: any) => {
      const current = context?.[key].get();
      return context?.[key].hash(current);
    },
  };

  let effects = new Map<string, VoidFunction>();
  const transitionRef: { current: any } = { current: null };
  const previousEventRef: { current: any } = { current: null };
  const eventRef: { current: any } = { current: { type: '' } };

  const getEvent = () => ({
    ...eventRef.current,
    current: () => eventRef.current,
    previous: () => previousEventRef.current,
  });

  const getStateApi = () => ({
    get: () => state.get(),
    matches: (...values: any[]) => values.some((value) => matchesState(state.get(), value)),
    hasTag: (tag: any) => hasTag(m, state.get(), tag),
  });

  const refs: Record<string, unknown> = m.refs?.({ prop, context: ctx }) ?? {};

  const getParams = (): any => ({
    state: getStateApi(),
    context: ctx,
    event: getEvent(),
    prop,
    send,
    action,
    guard,
    track: () => {},
    refs,
    computed,
    flush: (fn: VoidFunction) => fn(),
    scope,
    choose,
  });

  const action = (keys: any) => {
    const strs = isFunction(keys) ? keys(getParams()) : keys;
    if (!strs) return;
    for (const s of strs) {
      const fn = m.implementations?.actions?.[s];
      fn?.(getParams());
    }
  };

  const guard = (str: any): boolean | undefined => {
    if (isFunction(str)) return str(getParams());
    return m.implementations?.guards?.[str]?.(getParams());
  };

  const effect = (keys: any) => {
    const strs = isFunction(keys) ? keys(getParams()) : keys;
    if (!strs) return;
    const cleanups: VoidFunction[] = [];
    for (const s of strs) {
      const fn = m.implementations?.effects?.[s];
      const cleanup = fn?.(getParams());
      if (cleanup) cleanups.push(cleanup);
    }
    return () => cleanups.forEach((fn) => fn?.());
  };

  const choose = (transitions: any) => {
    return toArray(transitions).find((t: any) => {
      if (!t?.guard) return true;
      if (isString(t.guard)) return !!guard(t.guard);
      if (isFunction(t.guard)) return t.guard(getParams());
      return false;
    });
  };

  const computed = (key: any) => {
    const fn = m.computed?.[key];
    return fn?.({ context: ctx, event: getEvent(), prop, refs, scope, computed });
  };

  const state = bindable(() => ({
    defaultValue: resolveStateValue(m, m.initialState({ prop })),
    onChange(nextState: any, prevState: any) {
      const { exiting, entering } = getExitEnterStates(m, prevState, nextState, transitionRef.current?.reenter);
      exiting.forEach((item: any) => {
        effects.get(item.path)?.();
        effects.delete(item.path);
      });
      exiting.forEach((item: any) => action(item.state?.exit));
      action(transitionRef.current?.actions);
      entering.forEach((item: any) => {
        const cleanup = effect(item.state?.effects);
        if (cleanup) {
          const existing = effects.get(item.path);
          effects.set(item.path, existing ? callAll(existing, cleanup) : cleanup);
        }
      });
      if (prevState === INIT_STATE) {
        action(m.entry);
        const cleanup = effect(m.effects);
        if (cleanup) {
          const existing = effects.get(INIT_STATE);
          effects.set(INIT_STATE, existing ? callAll(existing, cleanup) : cleanup);
        }
      }
      entering.forEach((item: any) => action(item.state?.entry));
    },
  }));

  let status: MachineStatus = MachineStatus.NotStarted;

  function start() {
    status = MachineStatus.Started;
    state.invoke(state.initial, INIT_STATE);
  }

  function stop() {
    status = MachineStatus.Stopped;
    effects.forEach((fn) => fn?.());
    effects = new Map();
    transitionRef.current = null;
    action(m.exit);
  }

  const send = (event: any) => {
    if (status !== MachineStatus.Started) return;
    previousEventRef.current = eventRef.current;
    eventRef.current = event;
    const currentState = state.get();
    const { transitions, source } = findTransition(m, currentState, event.type);
    const transition = choose(transitions);
    if (!transition) return;
    transitionRef.current = transition;
    const target = resolveStateValue(m, transition.target ?? currentState, source);
    const changed = target !== currentState;
    if (changed) {
      state.set(target);
    } else if (transition.reenter) {
      state.invoke(currentState, currentState);
    } else {
      action(transition.actions);
    }
  };

  m.watch?.(getParams());

  return {
    state: getStateApi(),
    send,
    get event() {
      return getEvent();
    },
    context: { get: ctx.get, set: ctx.set },
    prop,
    scope,
    refs,
    computed,
    start,
    stop,
    getStatus: () => status,
  } as MachineService<T>;
}
