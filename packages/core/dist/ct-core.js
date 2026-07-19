import { css as I, LitElement as W, html as y, unsafeCSS as Z, nothing as z } from "lit";
import { BreakpointM as $t, BreakpointL as _t, BreakpointXl as At } from "@ct-infra/tokens";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Y = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const St = (i) => new wt(typeof i == "string" ? i : i + "", void 0, gt), xt = (i, t) => {
  if (Y) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), o = j.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = e.cssText, i.appendChild(r);
  }
}, it = Y ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return St(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: kt, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: Ct, getOwnPropertySymbols: Ot, getPrototypeOf: Ut } = Object, $ = globalThis, st = $.trustedTypes, Mt = st ? st.emptyScript : "", G = $.reactiveElementPolyfillSupport, C = (i, t) => i, R = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Mt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (i, t) => !Et(i, t), nt = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), o = this.getPropertyDescriptor(t, r, e);
      o !== void 0 && kt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: o, set: s } = Pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const c = o == null ? void 0 : o.call(this);
      s == null || s.call(this, n), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, r = [...Ct(e), ...Ot(e)];
      for (const o of r) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, o] of e) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const o = this._$Eu(e, r);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const o of r) e.unshift(it(o));
    } else t !== void 0 && e.push(it(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var s;
    const r = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const n = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : R).toAttribute(e, r.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var s, n;
    const r = this.constructor, o = r._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = r.getPropertyOptions(o), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((s = c.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? c.converter : R;
      this._$Em = o;
      const h = a.fromAttribute(e, c.type);
      this[o] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, o = !1, s) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (s = this[t]), r ?? (r = c.getPropertyOptions(t)), !((r.hasChanged ?? tt)(s, e) || r.useDefault && r.reflect && s === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: o, wrapped: s }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), s !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [s, n] of o) {
        const { wrapped: c } = n, a = this[s];
        c !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((o) => {
        var s;
        return (s = o.hostUpdate) == null ? void 0 : s.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var o;
      return (o = r.hostUpdated) == null ? void 0 : o.call(r);
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[C("elementProperties")] = /* @__PURE__ */ new Map(), k[C("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: k }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: tt }, Ht = (i = Tt, t, e) => {
  const { kind: r, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), r === "setter" && ((i = Object.create(i)).wrapped = !0), s.set(e.name, i), r === "accessor") {
    const { name: n } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (r === "setter") {
    const { name: n } = e;
    return function(c) {
      const a = this[n];
      t.call(this, c), this.requestUpdate(n, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function d(i) {
  return (t, e) => typeof e == "object" ? Ht(i, t, e) : ((r, o, s) => {
    const n = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, r), n ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
var Nt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, et = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? zt(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && Nt(t, e, o), o;
};
let U = class extends W {
  constructor() {
    super(...arguments), this.complexity = "standard", this.fluid = !1;
  }
  render() {
    return y`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }
};
U.styles = I`
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
  d({ type: String })
], U.prototype, "complexity", 2);
et([
  d({ type: Boolean })
], U.prototype, "fluid", 2);
U = et([
  q("ct-region")
], U);
var jt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, bt = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Rt(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && jt(t, e, o), o;
};
let D = class extends W {
  constructor() {
    super(...arguments), this.gap = "200";
  }
  render() {
    return y`<slot></slot>`;
  }
};
D.styles = I`
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
bt([
  d({ type: String })
], D.prototype, "gap", 2);
D = bt([
  q("ct-grid")
], D);
var Dt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, H = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Lt(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && Dt(t, e, o), o;
};
let w = class extends W {
  constructor() {
    super(...arguments), this.span = 12, this.spanM = 6, this.spanL = 6, this.spanXl = 4;
  }
  updated(i) {
    ["span", "spanM", "spanL", "spanXl"].forEach((e) => {
      if (i.has(e)) {
        const r = e.replace(/[A-Z]/g, (o) => "-" + o.toLowerCase());
        this.style.setProperty(
          `--grid-item-${r}`,
          this[e].toString()
        );
      }
    });
  }
  render() {
    return y`<slot></slot>`;
  }
};
w.styles = I`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${Z($t)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${Z(_t)}) {
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
H([
  d({ type: Number })
], w.prototype, "span", 2);
H([
  d({ type: Number })
], w.prototype, "spanM", 2);
H([
  d({ type: Number })
], w.prototype, "spanL", 2);
H([
  d({ type: Number })
], w.prototype, "spanXl", 2);
w = H([
  q("ct-grid-item")
], w);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, at = (i) => i, L = O.trustedTypes, ct = L ? L.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, mt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, yt = "?" + f, Bt = `<${yt}>`, S = document, B = () => S.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", rt = Array.isArray, It = (i) => rt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ht = />/g, _ = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, pt = /"/g, vt = /^(?:script|style|textarea|title)$/i, x = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function ft(i, t) {
  if (!rt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(t) : t;
}
const Wt = (i, t) => {
  const e = i.length - 1, r = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let h, u, l = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, u = n.exec(a), u !== null); ) m = n.lastIndex, n === P ? u[1] === "!--" ? n = lt : u[1] !== void 0 ? n = ht : u[2] !== void 0 ? (vt.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = _) : u[3] !== void 0 && (n = _) : n === _ ? u[0] === ">" ? (n = o ?? P, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? _ : u[3] === '"' ? pt : dt) : n === pt || n === dt ? n = _ : n === lt || n === ht ? n = P : (n = _, o = void 0);
    const v = n === _ && i[c + 1].startsWith("/>") ? " " : "";
    s += n === P ? a + Bt : l >= 0 ? (r.push(h), a.slice(0, l) + mt + a.slice(l) + f + v) : a + f + (l === -2 ? c : v);
  }
  return [ft(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class T {
  constructor({ strings: t, _$litType$: e }, r) {
    let o;
    this.parts = [];
    let s = 0, n = 0;
    const c = t.length - 1, a = this.parts, [h, u] = Wt(t, e);
    if (this.el = T.createElement(h, r), A.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = A.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(mt)) {
          const m = u[n++], v = o.getAttribute(l).split(f), N = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: s, name: N[2], strings: v, ctor: N[1] === "." ? Vt : N[1] === "?" ? Xt : N[1] === "@" ? Zt : X }), o.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: s }), o.removeAttribute(l));
        if (vt.test(o.tagName)) {
          const l = o.textContent.split(f), m = l.length - 1;
          if (m > 0) {
            o.textContent = L ? L.emptyScript : "";
            for (let v = 0; v < m; v++) o.append(l[v], B()), A.nextNode(), a.push({ type: 2, index: ++s });
            o.append(l[m], B());
          }
        }
      } else if (o.nodeType === 8) if (o.data === yt) a.push({ type: 2, index: s });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: s }), l += f.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const r = S.createElement("template");
    return r.innerHTML = t, r;
  }
}
function E(i, t, e = i, r) {
  var n, c;
  if (t === x) return t;
  let o = r !== void 0 ? (n = e._$Co) == null ? void 0 : n[r] : e._$Cl;
  const s = M(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = o : e._$Cl = o), o !== void 0 && (t = E(i, o._$AS(i, t.values), o, r)), t;
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
    const { el: { content: e }, parts: r } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    A.currentNode = o;
    let s = A.nextNode(), n = 0, c = 0, a = r[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new V(s, s.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (h = new Gt(s, this, t)), this._$AV.push(h), a = r[++c];
      }
      n !== (a == null ? void 0 : a.index) && (s = A.nextNode(), n++);
    }
    return A.currentNode = S, o;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = E(this, t, e), M(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : It(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: e, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = T.createElement(ft(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(e);
    else {
      const n = new qt(o, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, o = 0;
    for (const s of t) o === e.length ? e.push(r = new V(this.O(B()), this.O(B()), this, this.options)) : r = e[o], r._$AI(s), o++;
    o < e.length && (this._$AR(r && r._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = at(t).nextSibling;
      at(t).remove(), t = o;
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
  constructor(t, e, r, o, s) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  _$AI(t, e = this, r, o) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = E(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = s[0], a = 0; a < s.length - 1; a++) h = E(this, c[r + a], e, a), h === x && (h = this._$AH[a]), n || (n = !M(h) || h !== this._$AH[a]), h === p ? t = p : t !== p && (t += (h ?? "") + s[a + 1]), this._$AH[a] = h;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Xt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Zt extends X {
  constructor(t, e, r, o, s) {
    super(t, e, r, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? p) === x) return;
    const r = this._$AH, o = t === p && r !== p || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, s = t !== p && (r === p || o);
    o && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const K = O.litHtmlPolyfillSupport;
K == null || K(T, V), (O.litHtmlVersions ?? (O.litHtmlVersions = [])).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = { ATTRIBUTE: 1 }, Kt = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Ft {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, r) {
    this._$Ct = t, this._$AM = e, this._$Ci = r;
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
const F = Kt(class extends Ft {
  constructor(i) {
    var t;
    if (super(i), i.type !== Jt.ATTRIBUTE || i.name !== "class" || ((t = i.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((t) => i[t]).join(" ") + " ";
  }
  update(i, [t]) {
    var r, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((s) => s !== "")));
      for (const s in t) t[s] && !((r = this.nt) != null && r.has(s)) && this.st.add(s);
      return this.render(t);
    }
    const e = i.element.classList;
    for (const s of this.st) s in t || (e.remove(s), this.st.delete(s));
    for (const s in t) {
      const n = !!t[s];
      n === this.st.has(s) || (o = this.nt) != null && o.has(s) || (n ? (e.add(s), this.st.add(s)) : (e.remove(s), this.st.delete(s)));
    }
    return x;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = (i) => i ?? p;
var Qt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, b = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Yt(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && Qt(t, e, o), o;
};
let g = class extends W {
  constructor() {
    super(...arguments), this.theme = "light", this.kind = "button", this.variant = "primary", this.size = "regular", this.label = "", this.iconPlacement = "after", this.disabled = !1, this.newWindow = !1, this.external = !1, this.dismissable = !1, this.modifierClass = "";
  }
  render() {
    const i = {
      "ct-button": !0,
      [`ct-theme-${this.theme}`]: !0,
      [`ct-button--${this.variant}`]: !0,
      [`ct-button--${this.size}`]: !0,
      "ct-button--external": this.external,
      "ct-button--dismiss": this.dismissable,
      [this.modifierClass]: !!this.modifierClass
    }, t = this.icon ? y`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>` : z, e = this.label ? y`<span class="ct-button__text">${this.label}</span>` : z, r = y`
      ${this.iconPlacement === "before" ? t : z}
      ${e}
      <slot></slot>
      ${this.iconPlacement === "after" ? t : z}
    `;
    return this.kind === "link" ? y`
        <a 
          href=${Q(this.url)} 
          role="button" 
          class=${F(i)} 
          data-component-name="button"
          target=${Q(this.newWindow ? "_blank" : void 0)}
          rel=${Q(this.newWindow ? "noopener noreferrer" : void 0)}
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
        >
          ${r}
        </a>
      ` : this.kind === "submit" || this.kind === "reset" ? y`
        <input 
          type=${this.kind} 
          class=${F(i)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      ` : y`
      <button 
        type="button" 
        class=${F(i)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${r}
      </button>
    `;
  }
};
g.styles = I`
    :host {
      display: inline-block;
    }

    .ct-button {
      display: inline-block;
      cursor: pointer;
      box-sizing: border-box;
      appearance: button;
      text-decoration: none;
      border-style: solid;
      border-width: var(--ct-button-border-width, 0.125rem);
      border-radius: var(--ct-button-border-radius, 0.25rem);
      outline-offset: var(--ct-button-outline-offset, 0.125rem);
      outline-width: var(--ct-button-outline-width, 0.1875rem);
      transition: all var(--ct-button-animation-duration, 0.25s) ease;
      font-family: var(--ct-typography-family-heading, sans-serif);
      text-align: center;
    }

    .ct-button:focus-visible,
    .ct-button:hover,
    .ct-button:active {
      text-decoration: none;
    }

    .ct-button[disabled] {
      text-decoration: none;
      pointer-events: none;
      user-select: none;
      opacity: 50%;
    }

    /* Sizes */
    .ct-button--large {
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
      padding: 1rem 3rem;
    }

    .ct-button--regular {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      padding: 0.875rem 2.5rem;
    }

    .ct-button--small {
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
      padding: 0.5rem 2rem;
    }

    .ct-button--tertiary.ct-button--large,
    .ct-button--tertiary.ct-button--regular,
    .ct-button--tertiary.ct-button--small {
      padding: 0;
      border-color: transparent;
    }

    /* Primary */
    .ct-button--primary.ct-theme-light {
      background-color: var(--ct-color-interaction-light-background);
      border-color: var(--ct-color-interaction-light-background);
      color: var(--ct-color-interaction-light-text);
    }
    .ct-button--primary.ct-theme-light:hover {
      background-color: var(--ct-color-interaction-light-hover-background);
      border-color: var(--ct-color-interaction-light-hover-background);
      color: var(--ct-color-interaction-light-hover-text);
    }
    .ct-button--primary.ct-theme-light:active {
      background-color: var(--ct-color-interaction-light-hover-background);
      border-color: var(--ct-color-interaction-light-hover-background);
      color: var(--ct-color-interaction-light-hover-text);
    }
    .ct-button--primary.ct-theme-light:focus-visible {
      outline-color: var(--ct-color-interaction-light-focus);
      outline-style: solid;
    }

    .ct-button--primary.ct-theme-dark {
      background-color: var(--ct-color-interaction-dark-background);
      border-color: var(--ct-color-interaction-dark-background);
      color: var(--ct-color-interaction-dark-text);
    }
    .ct-button--primary.ct-theme-dark:hover {
      background-color: var(--ct-color-interaction-dark-hover-background);
      border-color: var(--ct-color-interaction-dark-hover-background);
      color: var(--ct-color-interaction-dark-hover-text);
    }
    .ct-button--primary.ct-theme-dark:active {
      background-color: var(--ct-color-interaction-dark-hover-background);
      border-color: var(--ct-color-interaction-dark-hover-background);
      color: var(--ct-color-interaction-dark-hover-text);
    }
    .ct-button--primary.ct-theme-dark:focus-visible {
      outline-color: var(--ct-color-interaction-dark-focus);
      outline-style: solid;
    }

    /* Secondary */
    .ct-button--secondary.ct-theme-light {
      background-color: transparent;
      border-color: var(--ct-color-interaction-light-background);
      color: var(--ct-color-interaction-light-background);
    }
    .ct-button--secondary.ct-theme-light:hover,
    .ct-button--secondary.ct-theme-light:active {
      background-color: transparent;
      border-color: var(--ct-color-interaction-light-hover-background);
      color: var(--ct-color-interaction-light-hover-background);
    }
    .ct-button--secondary.ct-theme-light:focus-visible {
      outline-color: var(--ct-color-interaction-light-focus);
      outline-style: solid;
    }

    .ct-button--secondary.ct-theme-dark {
      background-color: transparent;
      border-color: var(--ct-color-interaction-dark-background);
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-button--secondary.ct-theme-dark:hover,
    .ct-button--secondary.ct-theme-dark:active {
      background-color: transparent;
      border-color: var(--ct-color-interaction-dark-hover-background);
      color: var(--ct-color-interaction-dark-hover-background);
    }
    .ct-button--secondary.ct-theme-dark:focus-visible {
      outline-color: var(--ct-color-interaction-dark-focus);
      outline-style: solid;
    }

    /* Tertiary */
    .ct-button--tertiary.ct-theme-light {
      background-color: transparent;
      color: var(--ct-color-interaction-light-background);
    }
    .ct-button--tertiary.ct-theme-light:hover,
    .ct-button--tertiary.ct-theme-light:active {
      background-color: transparent;
      color: var(--ct-color-interaction-light-hover-background);
    }
    .ct-button--tertiary.ct-theme-light:focus-visible {
      outline-color: var(--ct-color-interaction-light-focus);
      outline-style: solid;
    }

    .ct-button--tertiary.ct-theme-dark {
      background-color: transparent;
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-button--tertiary.ct-theme-dark:hover,
    .ct-button--tertiary.ct-theme-dark:active {
      background-color: transparent;
      color: var(--ct-color-interaction-dark-hover-background);
    }
    .ct-button--tertiary.ct-theme-dark:focus-visible {
      outline-color: var(--ct-color-interaction-dark-focus);
      outline-style: solid;
    }

    .ct-button--tertiary:focus-visible,
    .ct-button--tertiary:hover,
    .ct-button--tertiary:active {
      text-decoration: none;
    }

    .ct-button__icon {
      display: inline-block;
      vertical-align: middle;
    }

    .ct-button__text {
      vertical-align: middle;
    }
  `;
b([
  d({ type: String })
], g.prototype, "theme", 2);
b([
  d({ type: String })
], g.prototype, "kind", 2);
b([
  d({ type: String })
], g.prototype, "variant", 2);
b([
  d({ type: String })
], g.prototype, "size", 2);
b([
  d({ type: String })
], g.prototype, "label", 2);
b([
  d({ type: String })
], g.prototype, "url", 2);
b([
  d({ type: String })
], g.prototype, "icon", 2);
b([
  d({ type: String, attribute: "icon-placement" })
], g.prototype, "iconPlacement", 2);
b([
  d({ type: Boolean, reflect: !0 })
], g.prototype, "disabled", 2);
b([
  d({ type: Boolean, attribute: "new-window" })
], g.prototype, "newWindow", 2);
b([
  d({ type: Boolean })
], g.prototype, "external", 2);
b([
  d({ type: Boolean })
], g.prototype, "dismissable", 2);
b([
  d({ type: String, attribute: "modifier-class" })
], g.prototype, "modifierClass", 2);
g = b([
  q("ct-button")
], g);
export {
  g as CtButton,
  D as ctGrid,
  w as ctGridItem,
  U as ctRegion
};
