import { css as k, LitElement as W, html as _, unsafeCSS as Z, nothing as R } from "lit";
import { BreakpointM as vt, BreakpointL as bt, BreakpointXl as At } from "@ct-infra/tokens";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, Y = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), it = /* @__PURE__ */ new WeakMap();
let St = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = it.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && it.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const wt = (r) => new St(typeof r == "string" ? r : r + "", void 0, $t), Et = (r, t) => {
  if (Y) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = z.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, rt = Y ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return wt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xt, defineProperty: Pt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Ot, getOwnPropertySymbols: Ut, getPrototypeOf: Mt } = Object, v = globalThis, nt = v.trustedTypes, Tt = nt ? nt.emptyScript : "", F = v.reactiveElementPolyfillSupport, O = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Tt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (r, t) => !xt(r, t), ot = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Pt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const h = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = Mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, s = [...Ot(e), ...Ut(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(rt(i));
    } else t !== void 0 && e.push(rt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Et(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : D;
      this._$Em = i;
      const c = a.fromAttribute(e, h.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = h.getPropertyOptions(t)), !((s.hasChanged ?? tt)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: h } = o, a = this[n];
        h !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[O("elementProperties")] = /* @__PURE__ */ new Map(), P[O("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: P }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: tt }, Nt = (r = Ht, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, r, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, r, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function p(r) {
  return (t, e) => typeof e == "object" ? Nt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
var jt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, et = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Rt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && jt(t, e, i), i;
};
let M = class extends W {
  constructor() {
    super(...arguments), this.complexity = "standard", this.fluid = !1;
  }
  render() {
    return _`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }
};
M.styles = k`
    :host {
      display: block;
      box-sizing: border-box;
      /* Consuming the tokens mapped from ctTheme variables */
      padding: var(--ct-spacing-layout-margin, 32px) 0;
      width: 100%;
    }

    .container {
      margin: 0 auto;
      padding: 0 var(--ct-spacing-layout-gutter, 16px);
      /* Complexity-based width constraints */
      max-width: var(--ct-container-max-width, 1280px);
    }

    :host([complexity="simple"]) .container {
      max-width: 800px; /* Optimized for reading/policy pages */
    }

    :host([complexity="complex"]) .container {
      max-width: 100%; /* Optimized for data-heavy dashboards */
    }
  `;
et([
  p({ type: String })
], M.prototype, "complexity", 2);
et([
  p({ type: Boolean })
], M.prototype, "fluid", 2);
M = et([
  q("ct-region")
], M);
var zt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, ft = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Dt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && zt(t, e, i), i;
};
let L = class extends W {
  constructor() {
    super(...arguments), this.gap = "200";
  }
  render() {
    return _`<slot></slot>`;
  }
};
L.styles = k`
    :host {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      width: 100%;
      box-sizing: border-box;
    }

    /* Mapping gaps to your particle tokens */
    :host([gap="100"]) {
      gap: var(--ct-spacing-particle-100, 8px);
    }
    :host([gap="200"]) {
      gap: var(--ct-spacing-particle-200, 16px);
    }
    :host([gap="300"]) {
      gap: var(--ct-spacing-particle-300, 24px);
    }
    :host([gap="400"]) {
      gap: var(--ct-spacing-particle-400, 32px);
    }
  `;
ft([
  p({ type: String })
], L.prototype, "gap", 2);
L = ft([
  q("ct-grid")
], L);
var Lt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, N = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Bt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Lt(t, e, i), i;
};
let S = class extends W {
  constructor() {
    super(...arguments), this.span = 12, this.spanM = 6, this.spanL = 6, this.spanXl = 4;
  }
  updated(r) {
    ["span", "spanM", "spanL", "spanXl"].forEach((e) => {
      if (r.has(e)) {
        const s = e.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
        this.style.setProperty(
          `--grid-item-${s}`,
          this[e].toString()
        );
      }
    });
  }
  render() {
    return _`<slot></slot>`;
  }
};
S.styles = k`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${Z(vt)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${Z(bt)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${Z(At)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `;
N([
  p({ type: Number })
], S.prototype, "span", 2);
N([
  p({ type: Number })
], S.prototype, "spanM", 2);
N([
  p({ type: Number })
], S.prototype, "spanL", 2);
N([
  p({ type: Number })
], S.prototype, "spanXl", 2);
S = N([
  q("ct-grid-item")
], S);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, at = (r) => r, B = U.trustedTypes, ht = B ? B.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, mt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, _t = "?" + y, It = `<${_t}>`, w = document, I = () => w.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", st = Array.isArray, kt = (r) => st(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ct = />/g, b = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, dt = /"/g, gt = /^(?:script|style|textarea|title)$/i, E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), A = w.createTreeWalker(w, 129);
function yt(r, t) {
  if (!st(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Wt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, u, l = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, u = o.exec(a), u !== null); ) m = o.lastIndex, o === C ? u[1] === "!--" ? o = lt : u[1] !== void 0 ? o = ct : u[2] !== void 0 ? (gt.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = b) : u[3] !== void 0 && (o = b) : o === b ? u[0] === ">" ? (o = i ?? C, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? b : u[3] === '"' ? dt : pt) : o === dt || o === pt ? o = b : o === lt || o === ct ? o = C : (o = b, i = void 0);
    const g = o === b && r[h + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + It : l >= 0 ? (s.push(c), a.slice(0, l) + mt + a.slice(l) + y + g) : a + y + (l === -2 ? h : g);
  }
  return [yt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class H {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = Wt(t, e);
    if (this.el = H.createElement(c, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = A.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(mt)) {
          const m = u[o++], g = i.getAttribute(l).split(y), j = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: j[2], strings: g, ctor: j[1] === "." ? Vt : j[1] === "?" ? Xt : j[1] === "@" ? Zt : X }), i.removeAttribute(l);
        } else l.startsWith(y) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (gt.test(i.tagName)) {
          const l = i.textContent.split(y), m = l.length - 1;
          if (m > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let g = 0; g < m; g++) i.append(l[g], I()), A.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[m], I());
          }
        }
      } else if (i.nodeType === 8) if (i.data === _t) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(y, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(r, t, e = r, s) {
  var o, h;
  if (t === E) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = x(r, i._$AS(r, t.values), i, s)), t;
}
class qt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    A.currentNode = i;
    let n = A.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new V(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Ft(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = A.nextNode(), o++);
    }
    return A.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new qt(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new V(this.O(I()), this.O(I()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = at(t).nextSibling;
      at(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = x(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = x(this, h[s + a], e, a), c === E && (c = this._$AH[a]), o || (o = !T(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Xt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Zt extends X {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? d) === E) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ft {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const J = U.litHtmlPolyfillSupport;
J == null || J(H, V), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = { ATTRIBUTE: 1 }, Jt = (r) => (...t) => ({ _$litDirective$: r, values: t });
class Kt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = Jt(class extends Kt {
  constructor(r) {
    var t;
    if (super(r), r.type !== Gt.ATTRIBUTE || r.name !== "class" || ((t = r.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return " " + Object.keys(r).filter((t) => r[t]).join(" ") + " ";
  }
  update(r, [t]) {
    var s, i;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), r.strings !== void 0 && (this.nt = new Set(r.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t) t[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const e = r.element.classList;
    for (const n of this.st) n in t || (e.remove(n), this.st.delete(n));
    for (const n in t) {
      const o = !!t[n];
      o === this.st.has(n) || (i = this.nt) != null && i.has(n) || (o ? (e.add(n), this.st.add(n)) : (e.remove(n), this.st.delete(n)));
    }
    return E;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = (r) => r ?? d;
var Qt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, f = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Yt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Qt(t, e, i), i;
};
let $ = class extends W {
  constructor() {
    super(...arguments), this.theme = "light", this.kind = "button", this.variant = "primary", this.size = "regular", this.label = "", this.iconPlacement = "after", this.disabled = !1, this.newWindow = !1, this.external = !1, this.dismissable = !1, this.modifierClass = "";
  }
  render() {
    const r = {
      "ct-button": !0,
      [`ct-theme-${this.theme}`]: !0,
      [`ct-button--${this.variant}`]: !0,
      [`ct-button--${this.size}`]: !0,
      "ct-button--external": this.external,
      "ct-button--dismiss": this.dismissable,
      [this.modifierClass]: !!this.modifierClass
    }, t = this.icon ? _`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>` : R, e = this.label ? _`<span class="ct-button__text">${this.label}</span>` : R, s = _`
      ${this.iconPlacement === "before" ? t : R}
      ${e}
      <slot></slot>
      ${this.iconPlacement === "after" ? t : R}
    `;
    return this.kind === "link" ? _`
        <a 
          href=${Q(this.url)} 
          role="button" 
          class=${K(r)} 
          data-component-name="button"
          target=${Q(this.newWindow ? "_blank" : void 0)}
          rel=${Q(this.newWindow ? "noopener noreferrer" : void 0)}
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
        >
          ${s}
        </a>
      ` : this.kind === "submit" || this.kind === "reset" ? _`
        <input 
          type=${this.kind} 
          class=${K(r)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      ` : _`
      <button 
        type="button" 
        class=${K(r)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${s}
      </button>
    `;
  }
};
$.styles = k`
    :host {
      display: inline-block;
    }
    /* Base styles and variables for the button should be provided via global CSS/tokens, 
       but we can include minimal encapsulation styles if needed.
       For now, we rely on the global CivicTheme CSS being present or imported. */
    .ct-button {
      /* Placeholder for component-specific encapsulation if not using global CSS */
    }
  `;
f([
  p({ type: String })
], $.prototype, "theme", 2);
f([
  p({ type: String })
], $.prototype, "kind", 2);
f([
  p({ type: String })
], $.prototype, "variant", 2);
f([
  p({ type: String })
], $.prototype, "size", 2);
f([
  p({ type: String })
], $.prototype, "label", 2);
f([
  p({ type: String })
], $.prototype, "url", 2);
f([
  p({ type: String })
], $.prototype, "icon", 2);
f([
  p({ type: String, attribute: "icon-placement" })
], $.prototype, "iconPlacement", 2);
f([
  p({ type: Boolean, reflect: !0 })
], $.prototype, "disabled", 2);
f([
  p({ type: Boolean, attribute: "new-window" })
], $.prototype, "newWindow", 2);
f([
  p({ type: Boolean })
], $.prototype, "external", 2);
f([
  p({ type: Boolean })
], $.prototype, "dismissable", 2);
f([
  p({ type: String, attribute: "modifier-class" })
], $.prototype, "modifierClass", 2);
$ = f([
  q("ct-button")
], $);
export {
  $ as CtButton,
  L as ctGrid,
  S as ctGridItem,
  M as ctRegion
};
