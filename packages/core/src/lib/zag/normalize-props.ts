import { createNormalizer } from '@zag-js/types';

/**
 * Zag's `connect()` functions build prop bags shaped like React DOM props (camelCase event
 * handlers, `aria-*`/`data-*` attributes passed through as-is) and run them through a
 * `normalize` step before returning. React's own binding uses an identity normalizer because
 * JSX props already match that shape; we do the same here and translate the resulting prop
 * bag into lit-html bindings by hand in each component's render(), since there's no framework
 * runtime expecting a specific transform.
 */
export const domNormalizer = createNormalizer((props) => props);
