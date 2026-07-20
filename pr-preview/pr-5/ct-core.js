import { css as Z, LitElement as B, html as v, unsafeCSS as Rt, nothing as S } from "lit";
import { BreakpointM as Ue, BreakpointL as ze, BreakpointXl as Me } from "@ct-infra/tokens";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Ht = $t.ShadowRoot && ($t.ShadyCSS === void 0 || $t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), te = /* @__PURE__ */ new WeakMap();
let je = class {
  constructor(t, r, o) {
    if (this._$cssResult$ = !0, o !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Ht && t === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (t = te.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && te.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const De = (e) => new je(typeof e == "string" ? e : e + "", void 0, ve), He = (e, t) => {
  if (Ht) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const o = document.createElement("style"), i = $t.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = r.cssText, e.appendChild(o);
  }
}, ee = Ht ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const o of t.cssRules) r += o.cssText;
  return De(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Be, defineProperty: Le, getOwnPropertyDescriptor: Ve, getOwnPropertyNames: We, getOwnPropertySymbols: Ge, getPrototypeOf: Fe } = Object, H = globalThis, re = H.trustedTypes, qe = re ? re.emptyScript : "", Nt = H.reactiveElementPolyfillSupport, dt = (e, t) => e, wt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qe : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, Bt = (e, t) => !Be(e, t), oe = { attribute: !0, type: String, converter: wt, reflect: !1, useDefault: !1, hasChanged: Bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ot = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = oe) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, r);
      i !== void 0 && Le(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, o) {
    const { get: i, set: n } = Ve(this.prototype, t) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: i, set(a) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(dt("elementProperties"))) return;
    const t = Fe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(dt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(dt("properties"))) {
      const r = this.properties, o = [...We(r), ...Ge(r)];
      for (const i of o) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [o, i] of r) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, o] of this.elementProperties) {
      const i = this._$Eu(r, o);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) r.unshift(ee(i));
    } else t !== void 0 && r.push(ee(t));
    return r;
  }
  static _$Eu(t, r) {
    const o = r.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const o of r.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return He(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var o;
      return (o = r.hostConnected) == null ? void 0 : o.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var o;
      return (o = r.hostDisconnected) == null ? void 0 : o.call(r);
    });
  }
  attributeChangedCallback(t, r, o) {
    this._$AK(t, o);
  }
  _$ET(t, r) {
    var n;
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const a = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : wt).toAttribute(r, o.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var n, a;
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = o.getPropertyOptions(i), s = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : wt;
      this._$Em = i;
      const p = s.fromAttribute(r, c.type);
      this[i] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, r, o, i = !1, n) {
    var a;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), o ?? (o = c.getPropertyOptions(t)), !((o.hasChanged ?? Bt)(n, r) || o.useDefault && o.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(c._$Eu(t, o)))) return;
      this.C(t, r, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: o, reflect: i, wrapped: n }, a) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? r ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: c } = a, s = this[n];
        c !== !0 || this._$AL.has(n) || s === void 0 || this.C(n, void 0, a, s);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (o = this._$EO) == null || o.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((o) => {
      var i;
      return (i = o.hostUpdated) == null ? void 0 : i.call(o);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ot.elementStyles = [], ot.shadowRootOptions = { mode: "open" }, ot[dt("elementProperties")] = /* @__PURE__ */ new Map(), ot[dt("finalized")] = /* @__PURE__ */ new Map(), Nt == null || Nt({ ReactiveElement: ot }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = { attribute: !0, type: String, converter: wt, reflect: !1, hasChanged: Bt }, Xe = (e = Ke, t, r) => {
  const { kind: o, metadata: i } = r;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(r.name, e), o === "accessor") {
    const { name: a } = r;
    return { set(c) {
      const s = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, s, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (o === "setter") {
    const { name: a } = r;
    return function(c) {
      const s = this[a];
      t.call(this, c), this.requestUpdate(a, s, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function d(e) {
  return (t, r) => typeof r == "object" ? Xe(e, t, r) : ((o, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(e, t, r);
}
var Ze = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, Lt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Je(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && Ze(t, r, i), i;
};
let ut = class extends B {
  constructor() {
    super(...arguments), this.complexity = "standard", this.fluid = !1;
  }
  render() {
    return v`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }
};
ut.styles = Z`
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
Lt([
  d({ type: String })
], ut.prototype, "complexity", 2);
Lt([
  d({ type: Boolean })
], ut.prototype, "fluid", 2);
ut = Lt([
  L("ct-region")
], ut);
var Qe = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, me = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ye(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && Qe(t, r, i), i;
};
let kt = class extends B {
  constructor() {
    super(...arguments), this.gap = "200";
  }
  render() {
    return v`<slot></slot>`;
  }
};
kt.styles = Z`
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
me([
  d({ type: String })
], kt.prototype, "gap", 2);
kt = me([
  L("ct-grid")
], kt);
var tr = Object.defineProperty, er = Object.getOwnPropertyDescriptor, bt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? er(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && tr(t, r, i), i;
};
let K = class extends B {
  constructor() {
    super(...arguments), this.span = 12, this.spanM = 6, this.spanL = 6, this.spanXl = 4;
  }
  updated(e) {
    ["span", "spanM", "spanL", "spanXl"].forEach((r) => {
      if (e.has(r)) {
        const o = r.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
        this.style.setProperty(
          `--grid-item-${o}`,
          this[r].toString()
        );
      }
    });
  }
  render() {
    return v`<slot></slot>`;
  }
};
K.styles = Z`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${Rt(Ue)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${Rt(ze)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${Rt(Me)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `;
bt([
  d({ type: Number })
], K.prototype, "span", 2);
bt([
  d({ type: Number })
], K.prototype, "spanM", 2);
bt([
  d({ type: Number })
], K.prototype, "spanL", 2);
bt([
  d({ type: Number })
], K.prototype, "spanXl", 2);
K = bt([
  L("ct-grid-item")
], K);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis, ie = (e) => e, xt = ht.trustedTypes, ne = xt ? xt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, _e = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, ye = "?" + D, rr = `<${ye}>`, X = document, At = () => X.createComment(""), pt = (e) => e === null || typeof e != "object" && typeof e != "function", Vt = Array.isArray, or = (e) => Vt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ut = `[ 	
\f\r]`, it = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ae = /-->/g, se = />/g, W = RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, le = /"/g, $e = /^(?:script|style|textarea|title)$/i, tt = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), de = /* @__PURE__ */ new WeakMap(), F = X.createTreeWalker(X, 129);
function we(e, t) {
  if (!Vt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ne !== void 0 ? ne.createHTML(t) : t;
}
const ir = (e, t) => {
  const r = e.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = it;
  for (let c = 0; c < r; c++) {
    const s = e[c];
    let p, b, g = -1, f = 0;
    for (; f < s.length && (a.lastIndex = f, b = a.exec(s), b !== null); ) f = a.lastIndex, a === it ? b[1] === "!--" ? a = ae : b[1] !== void 0 ? a = se : b[2] !== void 0 ? ($e.test(b[2]) && (i = RegExp("</" + b[2], "g")), a = W) : b[3] !== void 0 && (a = W) : a === W ? b[0] === ">" ? (a = i ?? it, g = -1) : b[1] === void 0 ? g = -2 : (g = a.lastIndex - b[2].length, p = b[1], a = b[3] === void 0 ? W : b[3] === '"' ? le : ce) : a === le || a === ce ? a = W : a === ae || a === se ? a = it : (a = W, i = void 0);
    const u = a === W && e[c + 1].startsWith("/>") ? " " : "";
    n += a === it ? s + rr : g >= 0 ? (o.push(p), s.slice(0, g) + _e + s.slice(g) + D + u) : s + D + (g === -2 ? c : u);
  }
  return [we(e, n + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class gt {
  constructor({ strings: t, _$litType$: r }, o) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, s = this.parts, [p, b] = ir(t, r);
    if (this.el = gt.createElement(p, o), F.currentNode = this.el.content, r === 2 || r === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (i = F.nextNode()) !== null && s.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const g of i.getAttributeNames()) if (g.endsWith(_e)) {
          const f = b[a++], u = i.getAttribute(g).split(D), k = /([.?@])?(.*)/.exec(f);
          s.push({ type: 1, index: n, name: k[2], strings: u, ctor: k[1] === "." ? ar : k[1] === "?" ? sr : k[1] === "@" ? cr : Ot }), i.removeAttribute(g);
        } else g.startsWith(D) && (s.push({ type: 6, index: n }), i.removeAttribute(g));
        if ($e.test(i.tagName)) {
          const g = i.textContent.split(D), f = g.length - 1;
          if (f > 0) {
            i.textContent = xt ? xt.emptyScript : "";
            for (let u = 0; u < f; u++) i.append(g[u], At()), F.nextNode(), s.push({ type: 2, index: ++n });
            i.append(g[f], At());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ye) s.push({ type: 2, index: n });
      else {
        let g = -1;
        for (; (g = i.data.indexOf(D, g + 1)) !== -1; ) s.push({ type: 7, index: n }), g += D.length - 1;
      }
      n++;
    }
  }
  static createElement(t, r) {
    const o = X.createElement("template");
    return o.innerHTML = t, o;
  }
}
function et(e, t, r = e, o) {
  var a, c;
  if (t === tt) return t;
  let i = o !== void 0 ? (a = r._$Co) == null ? void 0 : a[o] : r._$Cl;
  const n = pt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(e), i._$AT(e, r, o)), o !== void 0 ? (r._$Co ?? (r._$Co = []))[o] = i : r._$Cl = i), i !== void 0 && (t = et(e, i._$AS(e, t.values), i, o)), t;
}
class nr {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: o } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? X).importNode(r, !0);
    F.currentNode = i;
    let n = F.nextNode(), a = 0, c = 0, s = o[0];
    for (; s !== void 0; ) {
      if (a === s.index) {
        let p;
        s.type === 2 ? p = new Ct(n, n.nextSibling, this, t) : s.type === 1 ? p = new s.ctor(n, s.name, s.strings, this, t) : s.type === 6 && (p = new lr(n, this, t)), this._$AV.push(p), s = o[++c];
      }
      a !== (s == null ? void 0 : s.index) && (n = F.nextNode(), a++);
    }
    return F.currentNode = X, i;
  }
  p(t) {
    let r = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, r), r += o.strings.length - 2) : o._$AI(t[r])), r++;
  }
}
class Ct {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, o, i) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = o, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = et(this, t, r), pt(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== tt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : or(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(X.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: r, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = gt.createElement(we(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(r);
    else {
      const a = new nr(i, this), c = a.u(this.options);
      a.p(r), this.T(c), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = de.get(t.strings);
    return r === void 0 && de.set(t.strings, r = new gt(t)), r;
  }
  k(t) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, i = 0;
    for (const n of t) i === r.length ? r.push(o = new Ct(this.O(At()), this.O(At()), this, this.options)) : o = r[i], o._$AI(n), i++;
    i < r.length && (this._$AR(o && o._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = ie(t).nextSibling;
      ie(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, o, i, n) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = w;
  }
  _$AI(t, r = this, o, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = et(this, t, r, 0), a = !pt(t) || t !== this._$AH && t !== tt, a && (this._$AH = t);
    else {
      const c = t;
      let s, p;
      for (t = n[0], s = 0; s < n.length - 1; s++) p = et(this, c[o + s], r, s), p === tt && (p = this._$AH[s]), a || (a = !pt(p) || p !== this._$AH[s]), p === w ? t = w : t !== w && (t += (p ?? "") + n[s + 1]), this._$AH[s] = p;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ar extends Ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class sr extends Ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class cr extends Ot {
  constructor(t, r, o, i, n) {
    super(t, r, o, i, n), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = et(this, t, r, 0) ?? w) === tt) return;
    const o = this._$AH, i = t === w && o !== w || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== w && (o === w || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class lr {
  constructor(t, r, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    et(this, t);
  }
}
const zt = ht.litHtmlPolyfillSupport;
zt == null || zt(gt, Ct), (ht.litHtmlVersions ?? (ht.litHtmlVersions = [])).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dr = { ATTRIBUTE: 1 }, hr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class ur {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, o) {
    this._$Ct = t, this._$AM = r, this._$Ci = o;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = hr(class extends ur {
  constructor(e) {
    var t;
    if (super(e), e.type !== dr.ATTRIBUTE || e.name !== "class" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    var o, i;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t) t[n] && !((o = this.nt) != null && o.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const r = e.element.classList;
    for (const n of this.st) n in t || (r.remove(n), this.st.delete(n));
    for (const n in t) {
      const a = !!t[n];
      a === this.st.has(n) || (i = this.nt) != null && i.has(n) || (a ? (r.add(n), this.st.add(n)) : (r.remove(n), this.st.delete(n)));
    }
    return tt;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = (e) => e ?? w;
var pr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, C = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? gr(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && pr(t, r, i), i;
};
let E = class extends B {
  constructor() {
    super(...arguments), this.theme = "light", this.kind = "button", this.variant = "primary", this.size = "regular", this.label = "", this.iconPlacement = "after", this.disabled = !1, this.newWindow = !1, this.external = !1, this.dismissable = !1, this.modifierClass = "";
  }
  render() {
    const e = {
      "ct-button": !0,
      [`ct-theme-${this.theme}`]: !0,
      [`ct-button--${this.variant}`]: !0,
      [`ct-button--${this.size}`]: !0,
      "ct-button--external": this.external,
      "ct-button--dismiss": this.dismissable,
      [this.modifierClass]: !!this.modifierClass
    }, t = this.icon ? v`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>` : S, r = this.label ? v`<span class="ct-button__text">${this.label}</span>` : S, o = v`
      ${this.iconPlacement === "before" ? t : S}
      ${r}
      <slot></slot>
      ${this.iconPlacement === "after" ? t : S}
    `;
    return this.kind === "link" ? v`
        <a 
          href=${z(this.url)} 
          role="button" 
          class=${q(e)} 
          data-component-name="button"
          target=${z(this.newWindow ? "_blank" : void 0)}
          rel=${z(this.newWindow ? "noopener noreferrer" : void 0)}
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
        >
          ${o}
        </a>
      ` : this.kind === "submit" || this.kind === "reset" ? v`
        <input 
          type=${this.kind} 
          class=${q(e)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      ` : v`
      <button 
        type="button" 
        class=${q(e)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${o}
      </button>
    `;
  }
};
E.styles = Z`
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
C([
  d({ type: String })
], E.prototype, "theme", 2);
C([
  d({ type: String })
], E.prototype, "kind", 2);
C([
  d({ type: String })
], E.prototype, "variant", 2);
C([
  d({ type: String })
], E.prototype, "size", 2);
C([
  d({ type: String })
], E.prototype, "label", 2);
C([
  d({ type: String })
], E.prototype, "url", 2);
C([
  d({ type: String })
], E.prototype, "icon", 2);
C([
  d({ type: String, attribute: "icon-placement" })
], E.prototype, "iconPlacement", 2);
C([
  d({ type: Boolean, reflect: !0 })
], E.prototype, "disabled", 2);
C([
  d({ type: Boolean, attribute: "new-window" })
], E.prototype, "newWindow", 2);
C([
  d({ type: Boolean })
], E.prototype, "external", 2);
C([
  d({ type: Boolean })
], E.prototype, "dismissable", 2);
C([
  d({ type: String, attribute: "modifier-class" })
], E.prototype, "modifierClass", 2);
E = C([
  L("ct-button")
], E);
var fr = Object.defineProperty, br = Object.getOwnPropertyDescriptor, O = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? br(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && fr(t, r, i), i;
};
let P = class extends B {
  constructor() {
    super(...arguments), this.theme = "light", this.label = "", this.newWindow = !1, this.external = !1, this.active = !1, this.disabled = !1, this.iconPlacement = "after", this.iconGroupDisabled = !1, this.iconSingleOnly = !1, this.modifierClass = "";
  }
  /**
   * Mirrors CivicTheme's text-icon sub-component: renders the label with an
   * optional leading/trailing icon, an external-link indicator, and groups
   * the last word with any trailing icon(s) so they never wrap onto their own line.
   */
  renderContent() {
    const e = this.external && this.iconSingleOnly ? "upper-right-arrow" : this.icon, t = !!e || this.external, r = this.newWindow ? v`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>` : S;
    if (!t)
      return v`<span class="ct-link__text">${this.label}</span>${r}`;
    const o = e ? v`<span class="ct-link__icon ct-icon ct-icon--${e}" aria-hidden="true"></span>` : S;
    if (!this.label)
      return v`${o}${r}`;
    const i = this.label.trim().split(/\s+/), n = i[i.length - 1] ?? "", a = i.slice(0, -1).join(" "), c = this.iconGroupDisabled || this.iconPlacement === "before" && !this.external, s = this.iconPlacement === "before" ? o : S, p = v`
      ${this.iconPlacement === "after" ? o : S}
      ${this.external && !this.iconSingleOnly ? v`<span class="ct-link__icon ct-link__icon--external ct-icon ct-icon--upper-right-arrow" aria-hidden="true"></span>` : S}
    `;
    return c ? v`${s}<span class="ct-link__text">${this.label}</span>${p}${r}` : v`
      ${s}<span class="ct-link__text">${a} </span
      ><span class="ct-link__group"><span class="ct-link__text">${n}</span> ${p}</span
      >${r}
    `;
  }
  render() {
    const e = !!this.icon && !this.label, t = {
      "ct-link": !0,
      [`ct-theme-${this.theme}`]: !0,
      "ct-link--external": this.external,
      "ct-link--active": this.active,
      "ct-link--disabled": this.disabled,
      "ct-link--only-icon": e,
      [this.modifierClass]: !!this.modifierClass
    };
    return !this.label && !this.icon ? S : v`
      <a
        class=${q(t)}
        data-component-name="link"
        href=${z(this.url)}
        title=${z(this.linkTitle)}
        target=${z(this.newWindow ? "_blank" : void 0)}
        rel=${z(this.newWindow ? "noopener noreferrer" : void 0)}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        ${this.renderContent()}
      </a>
    `;
  }
};
P.styles = Z`
    :host {
      display: inline-block;
    }

    .ct-link {
      display: inline-block;
      cursor: pointer;
      box-sizing: border-box;
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name);
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
      text-decoration: none;
      /* No matching token found in civictheme.variables.css for this padding —
         it is hardcoded in the upstream compiled CSS too, so ported literally. */
      padding: 0.1875rem 0 0.125rem;
      word-break: break-word;
    }

    .ct-link:is(:hover, :focus-visible) .ct-link__text {
      text-decoration: underline;
    }

    .ct-link:focus-visible {
      outline-offset: var(--ct-outline-offset);
      outline-width: var(--ct-outline-width);
      outline-style: solid;
      outline-color: var(--ct-outline-light);
      border-radius: var(--ct-outline-border-radius);
    }

    .ct-link[disabled] {
      pointer-events: none;
      user-select: none;
      opacity: 50%;
    }

    .ct-link.ct-link--only-icon {
      display: inline-block;
      line-height: 0;
      /* No matching token found — hardcoded in upstream compiled CSS. */
      padding: 0.5rem;
      margin: -0.5rem;
    }

    /* Theme: light */
    .ct-link.ct-theme-light {
      color: var(--ct-color-interaction-light-background);
    }
    .ct-link.ct-theme-light:is(:hover, :focus-visible, :visited:hover, :visited:focus-visible) {
      color: var(--ct-color-interaction-light-hover-background);
    }
    .ct-link.ct-theme-light:visited {
      color: var(--ct-color-interaction-light-background);
    }
    .ct-link.ct-theme-light.ct-link--active,
    .ct-link.ct-theme-light:active {
      color: var(--ct-color-light-body);
    }

    /* Theme: dark */
    .ct-link.ct-theme-dark {
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-link.ct-theme-dark:is(:hover, :focus-visible, :visited:hover, :visited:focus-visible) {
      color: var(--ct-color-interaction-dark-hover-background);
    }
    .ct-link.ct-theme-dark:visited {
      color: var(--ct-color-interaction-dark-background);
    }
    .ct-link.ct-theme-dark.ct-link--active,
    .ct-link.ct-theme-dark:active {
      color: var(--ct-color-dark-body);
    }

    .ct-link__icon {
      display: inline-block;
      vertical-align: middle;
    }

    .ct-link__text {
      vertical-align: middle;
    }

    /* Keeps a trailing icon grouped with the last word so it never wraps alone. */
    .ct-link__group {
      white-space: nowrap;
    }

    .ct-visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
O([
  d({ type: String })
], P.prototype, "theme", 2);
O([
  d({ type: String })
], P.prototype, "label", 2);
O([
  d({ type: String })
], P.prototype, "url", 2);
O([
  d({ type: String, attribute: "title" })
], P.prototype, "linkTitle", 2);
O([
  d({ type: Boolean, attribute: "new-window" })
], P.prototype, "newWindow", 2);
O([
  d({ type: Boolean })
], P.prototype, "external", 2);
O([
  d({ type: Boolean, reflect: !0 })
], P.prototype, "active", 2);
O([
  d({ type: Boolean, reflect: !0 })
], P.prototype, "disabled", 2);
O([
  d({ type: String })
], P.prototype, "icon", 2);
O([
  d({ type: String, attribute: "icon-placement" })
], P.prototype, "iconPlacement", 2);
O([
  d({ type: Boolean, attribute: "icon-group-disabled" })
], P.prototype, "iconGroupDisabled", 2);
O([
  d({ type: Boolean, attribute: "icon-single-only" })
], P.prototype, "iconSingleOnly", 2);
O([
  d({ type: String, attribute: "modifier-class" })
], P.prototype, "modifierClass", 2);
P = O([
  L("ct-link")
], P);
var vr = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, Tt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? mr(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && vr(t, r, i), i;
};
let ft = class extends B {
  constructor() {
    super(...arguments), this.heading = "", this.expanded = !1, this.disabled = !1;
  }
  render() {
    return v`<slot></slot>`;
  }
};
Tt([
  d({ type: String })
], ft.prototype, "heading", 2);
Tt([
  d({ type: Boolean })
], ft.prototype, "expanded", 2);
Tt([
  d({ type: Boolean })
], ft.prototype, "disabled", 2);
ft = Tt([
  L("ct-accordion-item")
], ft);
var ct = (e, t = []) => ({
  parts: (...r) => {
    if (_r(t))
      return ct(e, r);
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...r) => ct(e, [...t, ...r]),
  omit: (...r) => ct(e, t.filter((o) => !r.includes(o))),
  rename: (r) => ct(r, t),
  keys: () => t,
  build: () => [...new Set(t)].reduce(
    (r, o) => Object.assign(r, {
      [o]: {
        selector: [
          `&[data-scope="${Y(e)}"][data-part="${Y(o)}"]`,
          `& [data-scope="${Y(e)}"][data-part="${Y(o)}"]`
        ].join(", "),
        attrs: { "data-scope": Y(e), "data-part": Y(o) }
      }
    }),
    {}
  )
}), Y = (e) => e.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase(), _r = (e) => e.length === 0, yr = ct("accordion").parts("root", "item", "itemTrigger", "itemContent", "itemIndicator"), nt = yr.build(), ke = (e) => typeof e == "object" && e !== null, G = (e) => e ? "" : void 0, $r = 9, wr = (e) => ke(e) && e.nodeType === $r, kr = (e) => ke(e) && e === e.window;
function xr(e) {
  if (!e) return !1;
  const t = e.getRootNode();
  return xe(t) === e;
}
function Ar(e) {
  return wr(e) ? e : kr(e) ? e.document : (e == null ? void 0 : e.ownerDocument) ?? document;
}
function xe(e) {
  let t = e.activeElement;
  for (; t != null && t.shadowRoot; ) {
    const r = t.shadowRoot.activeElement;
    if (!r || r === t) break;
    t = r;
  }
  return t;
}
var Ae = () => typeof document < "u";
function Sr() {
  const e = navigator.userAgentData;
  return (e == null ? void 0 : e.platform) ?? navigator.platform;
}
var Wt = (e) => Ae() && e.test(Sr()), Er = (e) => Ae() && e.test(navigator.vendor), Pr = () => Wt(/^iPhone/i), Cr = () => Wt(/^iPad/i) || Se() && navigator.maxTouchPoints > 1, Or = () => Pr() || Cr(), Tr = () => Se() || Or(), Se = () => Wt(/^Mac/i), Ir = () => Tr() && Er(/apple/i), Rr = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
}, he = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function Nr(e, t = {}) {
  const { dir: r = "ltr", orientation: o = "horizontal" } = t;
  let i = e.key;
  return i = Rr[i] ?? i, r === "rtl" && o === "horizontal" && i in he && (i = he[i]), i;
}
function Ur(e, t) {
  return Array.from((e == null ? void 0 : e.querySelectorAll(t)) ?? []);
}
var Ee = (e) => e.id;
function zr(e, t, r = Ee) {
  return e.find((o) => r(o) === t);
}
function Pe(e, t, r = Ee) {
  const o = zr(e, t, r);
  return o ? e.indexOf(o) : -1;
}
function Mr(e, t, r = !0) {
  let o = Pe(e, t);
  return o = r ? (o + 1) % e.length : Math.min(o + 1, e.length - 1), e[o];
}
function jr(e, t, r = !0) {
  let o = Pe(e, t);
  return o === -1 ? r ? e[e.length - 1] : null : (o = r ? (o - 1 + e.length) % e.length : Math.max(0, o - 1), e[o]);
}
function Dr(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
var Hr = (e) => e[0], Br = (e) => e[e.length - 1], Lr = (e, ...t) => e.concat(t), Vr = (e, ...t) => e.filter((r) => !t.includes(r)), Wr = (e) => typeof e == "string", at = (e) => typeof e == "function", Gr = Function.prototype.toString;
Gr.call(Object);
var ue = (...e) => (...t) => {
  e.forEach(function(r) {
    r == null || r(...t);
  });
};
function Fr(...e) {
  const t = e.length === 1 ? e[0] : e[1];
  (e.length === 2 ? e[0] : !0) && process.env.NODE_ENV !== "production" && console.warn(t);
}
function pe(...e) {
  const t = e.length === 1 ? e[0] : e[1];
  if ((e.length === 2 ? e[0] : !0) && process.env.NODE_ENV !== "production")
    throw new Error(t);
}
function Ce(e, t) {
  if (e == null) throw new Error(t());
}
var St = (e) => {
  var t;
  return ((t = e.ids) == null ? void 0 : t.root) ?? `accordion:${e.id}`;
}, qr = (e, t) => {
  var r, o;
  return ((o = (r = e.ids) == null ? void 0 : r.item) == null ? void 0 : o.call(r, t)) ?? `accordion:${e.id}:item:${t}`;
}, Mt = (e, t) => {
  var r, o;
  return ((o = (r = e.ids) == null ? void 0 : r.itemContent) == null ? void 0 : o.call(r, t)) ?? `accordion:${e.id}:content:${t}`;
}, Et = (e, t) => {
  var r, o;
  return ((o = (r = e.ids) == null ? void 0 : r.itemTrigger) == null ? void 0 : o.call(r, t)) ?? `accordion:${e.id}:trigger:${t}`;
}, Kr = (e) => e.getById(St(e)), It = (e) => {
  const r = `[data-controls][data-ownedby='${CSS.escape(St(e))}']:not([disabled])`;
  return Ur(Kr(e), r);
}, Xr = (e) => Hr(It(e)), Zr = (e) => Br(It(e)), Jr = (e, t) => Mr(It(e), Et(e, t)), Qr = (e, t) => jr(It(e), Et(e, t));
function Yr(e, t) {
  const { send: r, context: o, prop: i, scope: n, computed: a } = e, c = o.get("focusedValue"), s = o.get("value"), p = i("multiple");
  function b(f) {
    let u = f;
    !p && u.length > 1 && (u = [u[0]]), r({ type: "VALUE.SET", value: u });
  }
  function g(f) {
    return {
      expanded: s.includes(f.value),
      focused: c === f.value,
      disabled: !!(f.disabled ?? i("disabled"))
    };
  }
  return {
    focusedValue: c,
    value: s,
    setValue: b,
    getItemState: g,
    getRootProps() {
      return t.element({
        ...nt.root.attrs,
        dir: i("dir"),
        id: St(n),
        "data-orientation": i("orientation")
      });
    },
    getItemProps(f) {
      const u = g(f);
      return t.element({
        ...nt.item.attrs,
        dir: i("dir"),
        id: qr(n, f.value),
        "data-state": u.expanded ? "open" : "closed",
        "data-focus": G(u.focused),
        "data-disabled": G(u.disabled),
        "data-orientation": i("orientation")
      });
    },
    getItemContentProps(f) {
      const u = g(f);
      return t.element({
        ...nt.itemContent.attrs,
        dir: i("dir"),
        role: "region",
        id: Mt(n, f.value),
        "aria-labelledby": Et(n, f.value),
        hidden: !u.expanded,
        "data-state": u.expanded ? "open" : "closed",
        "data-disabled": G(u.disabled),
        "data-focus": G(u.focused),
        "data-orientation": i("orientation")
      });
    },
    getItemIndicatorProps(f) {
      const u = g(f);
      return t.element({
        ...nt.itemIndicator.attrs,
        dir: i("dir"),
        "aria-hidden": !0,
        "data-state": u.expanded ? "open" : "closed",
        "data-disabled": G(u.disabled),
        "data-focus": G(u.focused),
        "data-orientation": i("orientation")
      });
    },
    getItemTriggerProps(f) {
      const { value: u } = f, k = g(f);
      return t.button({
        ...nt.itemTrigger.attrs,
        type: "button",
        dir: i("dir"),
        id: Et(n, u),
        "aria-controls": Mt(n, u),
        "data-controls": Mt(n, u),
        "aria-expanded": k.expanded,
        disabled: k.disabled,
        "data-orientation": i("orientation"),
        "data-state": k.expanded ? "open" : "closed",
        "data-focus": G(k.focused),
        "data-ownedby": St(n),
        onFocus() {
          k.disabled || r({ type: "TRIGGER.FOCUS", value: u });
        },
        onBlur() {
          k.disabled || r({ type: "TRIGGER.BLUR" });
        },
        onClick(U) {
          k.disabled || (Ir() && U.currentTarget.focus(), r({ type: "TRIGGER.CLICK", value: u }));
        },
        onKeyDown(U) {
          if (U.defaultPrevented || k.disabled) return;
          const Q = {
            ArrowDown() {
              a("isHorizontal") || r({ type: "GOTO.NEXT", value: u });
            },
            ArrowUp() {
              a("isHorizontal") || r({ type: "GOTO.PREV", value: u });
            },
            ArrowRight() {
              a("isHorizontal") && r({ type: "GOTO.NEXT", value: u });
            },
            ArrowLeft() {
              a("isHorizontal") && r({ type: "GOTO.PREV", value: u });
            },
            Home() {
              r({ type: "GOTO.FIRST", value: u });
            },
            End() {
              r({ type: "GOTO.LAST", value: u });
            }
          }, I = Nr(U, {
            dir: i("dir"),
            orientation: i("orientation")
          }), R = Q[I];
          R && (R(U), U.preventDefault());
        }
      });
    }
  };
}
var V = ".", Oe = "#", ge = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap();
function jt(e) {
  return e.join(V);
}
function to(e) {
  return e.includes(V);
}
function Ie(e) {
  return e.startsWith(Oe);
}
function eo(e) {
  return e.startsWith(V);
}
function ro(e) {
  return Ie(e) ? e.slice(Oe.length) : e;
}
function Dt(e, t) {
  return e ? `${e}${V}${t}` : t;
}
function oo(e) {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), o = (i, n) => {
    t.set(i, n);
    const a = n.id;
    a && (r.has(a) && pe(`[zag-js] Duplicate state id: "${a}"`), r.set(a, i));
    const c = n.states;
    if (c) {
      Ce(n.initial, () => `[zag-js] Compound state "${i}" has child states but no "initial" property`), n.initial in c || pe(
        `[zag-js] Compound state "${i}" has initial "${String(n.initial)}" which is not a child state`
      );
      for (const [s, p] of Object.entries(c)) {
        if (!p) continue;
        const b = Dt(i, s);
        o(b, p);
      }
    }
  };
  for (const [i, n] of Object.entries(e.states))
    n && o(i, n);
  return { index: t, idIndex: r };
}
function vt(e) {
  const t = ge.get(e);
  if (t) return t;
  const { index: r, idIndex: o } = oo(e);
  return ge.set(e, r), Te.set(e, o), r;
}
function io(e, t) {
  var r;
  return vt(e), (r = Te.get(e)) == null ? void 0 : r.get(t);
}
function Gt(e) {
  return e ? String(e).split(V).filter(Boolean) : [];
}
function Pt(e, t) {
  if (!t) return [];
  const r = vt(e), o = Gt(t), i = [], n = [];
  for (const a of o) {
    n.push(a);
    const c = jt(n), s = r.get(c);
    if (!s) break;
    i.push({ path: c, state: s });
  }
  return i;
}
function st(e, t) {
  const r = vt(e), o = Gt(t);
  if (!o.length) return t;
  const i = [];
  for (const c of o) {
    i.push(c);
    const s = jt(i);
    if (!r.has(s)) return t;
  }
  let n = jt(i), a = r.get(n);
  for (; a != null && a.initial; ) {
    const c = `${n}${V}${a.initial}`, s = r.get(c);
    if (!s) break;
    n = c, a = s;
  }
  return n;
}
function fe(e, t) {
  return vt(e).has(t);
}
function be(e, t, r) {
  const o = String(t);
  if (Ie(o)) {
    const i = ro(o), n = io(e, i);
    return Ce(n, () => `[zag-js] Unknown state id: "${i}"`), st(e, n);
  }
  if (eo(o) && r) {
    const i = Dt(r, o.slice(1));
    return st(e, i);
  }
  if (!to(o) && r) {
    const i = Gt(r);
    for (let n = i.length - 1; n >= 1; n--) {
      const a = i.slice(0, n).join(V), c = Dt(a, o);
      if (fe(e, c)) return st(e, c);
    }
    if (fe(e, o)) return st(e, o);
  }
  return st(e, o);
}
function no(e, t, r) {
  var n, a;
  const o = Pt(e, t);
  for (let c = o.length - 1; c >= 0; c--) {
    const s = (n = o[c]) == null ? void 0 : n.state.on, p = s == null ? void 0 : s[r];
    if (p) return { transitions: p, source: (a = o[c]) == null ? void 0 : a.path };
  }
  const i = e.on;
  return { transitions: i == null ? void 0 : i[r], source: void 0 };
}
function ao(e, t, r, o) {
  var b, g, f, u;
  const i = t ? Pt(e, t) : [], n = Pt(e, r);
  let a = 0;
  for (; a < i.length && a < n.length && ((b = i[a]) == null ? void 0 : b.path) === ((g = n[a]) == null ? void 0 : g.path); )
    a += 1;
  let c = i.slice(a).reverse(), s = n.slice(a);
  const p = ((f = i.at(-1)) == null ? void 0 : f.path) === ((u = n.at(-1)) == null ? void 0 : u.path);
  return o && p && (c = i.slice().reverse(), s = n), { exiting: c, entering: s };
}
function so(e, t) {
  return e ? e === t || e.startsWith(`${t}${V}`) : !1;
}
function co(e, t, r) {
  return Pt(e, t).some((o) => {
    var i;
    return (i = o.state.tags) == null ? void 0 : i.includes(r);
  });
}
function lo() {
  return {
    and: (...e) => function(r) {
      return e.every((o) => r.guard(o));
    },
    or: (...e) => function(r) {
      return e.some((o) => r.guard(o));
    },
    not: (e) => function(r) {
      return !r.guard(e);
    }
  };
}
function ho(e) {
  return vt(e), e;
}
var lt = /* @__PURE__ */ ((e) => (e.NotStarted = "Not Started", e.Started = "Started", e.Stopped = "Stopped", e))(lt || {}), yt = "__init__";
function uo(e) {
  const t = () => {
    var a;
    return ((a = e.getRootNode) == null ? void 0 : a.call(e)) ?? document;
  }, r = () => Ar(t());
  return {
    ...e,
    getRootNode: t,
    getDoc: r,
    getWin: () => r().defaultView ?? window,
    getActiveElement: () => xe(t()),
    isActiveElement: xr,
    getById: (a) => t().getElementById(a)
  };
}
var { and: po, not: go } = lo(), fo = ho({
  props({ props: e }) {
    return {
      collapsible: !1,
      multiple: !1,
      orientation: "vertical",
      defaultValue: [],
      ...e
    };
  },
  initialState() {
    return "idle";
  },
  context({ prop: e, bindable: t }) {
    return {
      focusedValue: t(() => ({
        defaultValue: null,
        sync: !0,
        onChange(r) {
          var o;
          (o = e("onFocusChange")) == null || o({ value: r });
        }
      })),
      value: t(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        onChange(r) {
          var o;
          (o = e("onValueChange")) == null || o({ value: r });
        }
      }))
    };
  },
  computed: {
    isHorizontal: ({ prop: e }) => e("orientation") === "horizontal"
  },
  on: {
    "VALUE.SET": {
      actions: ["setValue"]
    }
  },
  states: {
    idle: {
      on: {
        "TRIGGER.FOCUS": {
          target: "focused",
          actions: ["setFocusedValue"]
        }
      }
    },
    focused: {
      on: {
        "GOTO.NEXT": {
          actions: ["focusNextTrigger"]
        },
        "GOTO.PREV": {
          actions: ["focusPrevTrigger"]
        },
        "TRIGGER.CLICK": [
          {
            guard: po("isExpanded", "canToggle"),
            actions: ["collapse"]
          },
          {
            guard: go("isExpanded"),
            actions: ["expand"]
          }
        ],
        "GOTO.FIRST": {
          actions: ["focusFirstTrigger"]
        },
        "GOTO.LAST": {
          actions: ["focusLastTrigger"]
        },
        "TRIGGER.BLUR": {
          target: "idle",
          actions: ["clearFocusedValue"]
        }
      }
    }
  },
  implementations: {
    guards: {
      canToggle: ({ prop: e }) => !!e("collapsible") || !!e("multiple"),
      isExpanded: ({ context: e, event: t }) => e.get("value").includes(t.value)
    },
    actions: {
      collapse({ context: e, prop: t, event: r }) {
        const o = t("multiple") ? Vr(e.get("value"), r.value) : [];
        e.set("value", o);
      },
      expand({ context: e, prop: t, event: r }) {
        const o = t("multiple") ? Lr(e.get("value"), r.value) : [r.value];
        e.set("value", o);
      },
      focusFirstTrigger({ scope: e }) {
        var t;
        (t = Xr(e)) == null || t.focus();
      },
      focusLastTrigger({ scope: e }) {
        var t;
        (t = Zr(e)) == null || t.focus();
      },
      focusNextTrigger({ context: e, scope: t }) {
        const r = e.get("focusedValue");
        if (!r) return;
        const o = Jr(t, r);
        o == null || o.focus();
      },
      focusPrevTrigger({ context: e, scope: t }) {
        const r = e.get("focusedValue");
        if (!r) return;
        const o = Qr(t, r);
        o == null || o.focus();
      },
      setFocusedValue({ context: e, event: t }) {
        e.set("focusedValue", t.value);
      },
      clearFocusedValue({ context: e }) {
        e.set("focusedValue", null);
      },
      setValue({ context: e, event: t }) {
        e.set("value", t.value);
      },
      coarseValue({ context: e, prop: t }) {
        !t("multiple") && e.get("value").length > 1 && (Fr("The value of accordion should be a single value when multiple is false."), e.set("value", [e.get("value")[0]]));
      }
    }
  }
});
function bo(e) {
  return new Proxy({}, {
    get(t, r) {
      return r === "style" ? (o) => e({ style: o }).style : e;
    }
  });
}
function vo(e, t, r) {
  var Zt, Jt, Qt;
  const o = e, i = t(), n = uo({
    id: i.id,
    ids: i.ids,
    getRootNode: i.getRootNode ?? (() => document)
  }), a = (h) => {
    var x;
    const l = t();
    return (((x = o.props) == null ? void 0 : x.call(o, { props: l, scope: n })) ?? l)[h];
  };
  function c(h) {
    const l = h(), $ = l.isEqual ?? ((_, m) => _ === m), x = l.hash ?? ((_) => String(_)), A = { current: l.value !== void 0 ? l.value : l.defaultValue };
    return {
      initial: l.defaultValue,
      ref: A,
      get: () => A.current,
      set(_) {
        var rt;
        const m = A.current, y = at(_) ? _(m) : _;
        $(y, m) || (A.current = y, (rt = l.onChange) == null || rt.call(l, y, m), r());
      },
      invoke(_, m) {
        var y;
        (y = l.onChange) == null || y.call(l, _, m);
      },
      hash: x
    };
  }
  c.cleanup = (h) => {
  }, c.ref = (h) => {
    const l = { current: h };
    return { get: () => l.current, set: ($) => l.current = $ };
  };
  const s = (Zt = o.context) == null ? void 0 : Zt.call(o, {
    prop: a,
    bindable: c,
    scope: n,
    flush: (h) => h(),
    getContext: () => p,
    getComputed: () => mt,
    getRefs: () => Q,
    getEvent: () => k()
  }), p = {
    get: (h) => s == null ? void 0 : s[h].get(),
    set: (h, l) => s == null ? void 0 : s[h].set(l),
    initial: (h) => s == null ? void 0 : s[h].initial,
    hash: (h) => {
      const l = s == null ? void 0 : s[h].get();
      return s == null ? void 0 : s[h].hash(l);
    }
  };
  let b = /* @__PURE__ */ new Map();
  const g = { current: null }, f = { current: null }, u = { current: { type: "" } }, k = () => ({
    ...u.current,
    current: () => u.current,
    previous: () => f.current
  }), U = () => ({
    get: () => j.get(),
    matches: (...h) => h.some((l) => so(j.get(), l)),
    hasTag: (h) => co(o, j.get(), h)
  }), Q = ((Jt = o.refs) == null ? void 0 : Jt.call(o, { prop: a, context: p })) ?? {}, I = () => ({
    state: U(),
    context: p,
    event: k(),
    prop: a,
    send: Xt,
    action: R,
    guard: Ft,
    track: () => {
    },
    refs: Q,
    computed: mt,
    flush: (h) => h(),
    scope: n,
    choose: Kt
  }), R = (h) => {
    var $, x;
    const l = at(h) ? h(I()) : h;
    if (l)
      for (const A of l) {
        const _ = (x = ($ = o.implementations) == null ? void 0 : $.actions) == null ? void 0 : x[A];
        _ == null || _(I());
      }
  }, Ft = (h) => {
    var l, $, x;
    return at(h) ? h(I()) : (x = ($ = (l = o.implementations) == null ? void 0 : l.guards) == null ? void 0 : $[h]) == null ? void 0 : x.call($, I());
  }, qt = (h) => {
    var x, A;
    const l = at(h) ? h(I()) : h;
    if (!l) return;
    const $ = [];
    for (const _ of l) {
      const m = (A = (x = o.implementations) == null ? void 0 : x.effects) == null ? void 0 : A[_], y = m == null ? void 0 : m(I());
      y && $.push(y);
    }
    return () => $.forEach((_) => _ == null ? void 0 : _());
  }, Kt = (h) => Dr(h).find((l) => l != null && l.guard ? Wr(l.guard) ? !!Ft(l.guard) : at(l.guard) ? l.guard(I()) : !1 : !0), mt = (h) => {
    var $;
    const l = ($ = o.computed) == null ? void 0 : $[h];
    return l == null ? void 0 : l({ context: p, event: k(), prop: a, refs: Q, scope: n, computed: mt });
  }, j = c(() => ({
    defaultValue: be(o, o.initialState({ prop: a })),
    onChange(h, l) {
      var A, _;
      const { exiting: $, entering: x } = ao(o, l, h, (A = g.current) == null ? void 0 : A.reenter);
      if ($.forEach((m) => {
        var y;
        (y = b.get(m.path)) == null || y(), b.delete(m.path);
      }), $.forEach((m) => {
        var y;
        return R((y = m.state) == null ? void 0 : y.exit);
      }), R((_ = g.current) == null ? void 0 : _.actions), x.forEach((m) => {
        var rt;
        const y = qt((rt = m.state) == null ? void 0 : rt.effects);
        if (y) {
          const Yt = b.get(m.path);
          b.set(m.path, Yt ? ue(Yt, y) : y);
        }
      }), l === yt) {
        R(o.entry);
        const m = qt(o.effects);
        if (m) {
          const y = b.get(yt);
          b.set(yt, y ? ue(y, m) : m);
        }
      }
      x.forEach((m) => {
        var y;
        return R((y = m.state) == null ? void 0 : y.entry);
      });
    }
  }));
  let _t = lt.NotStarted;
  function Re() {
    _t = lt.Started, j.invoke(j.initial, yt);
  }
  function Ne() {
    _t = lt.Stopped, b.forEach((h) => h == null ? void 0 : h()), b = /* @__PURE__ */ new Map(), g.current = null, R(o.exit);
  }
  const Xt = (h) => {
    if (_t !== lt.Started) return;
    f.current = u.current, u.current = h;
    const l = j.get(), { transitions: $, source: x } = no(o, l, h.type), A = Kt($);
    if (!A) return;
    g.current = A;
    const _ = be(o, A.target ?? l, x);
    _ !== l ? j.set(_) : A.reenter ? j.invoke(l, l) : R(A.actions);
  };
  return (Qt = o.watch) == null || Qt.call(o, I()), {
    state: U(),
    send: Xt,
    get event() {
      return k();
    },
    context: { get: p.get, set: p.set },
    prop: a,
    scope: n,
    refs: Q,
    computed: mt,
    start: Re,
    stop: Ne,
    getStatus: () => _t
  };
}
const mo = bo((e) => e);
var _o = Object.defineProperty, yo = Object.getOwnPropertyDescriptor, J = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? yo(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && _o(t, r, i), i;
};
let $o = 0;
const wo = v`
  <svg class="ct-accordion__panels__panel__header__button__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.5 5.5L8 10l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;
let M = class extends B {
  constructor() {
    super(...arguments), this.theme = "light", this.expandAll = !1, this.singleOpen = !1, this.withBackground = !1, this.verticalSpacing = "none", this.modifierClass = "";
  }
  _items() {
    return Array.from(this.querySelectorAll(":scope > ct-accordion-item"));
  }
  connectedCallback() {
    super.connectedCallback(), this.id || (this.id = `ct-accordion-${++$o}`);
    const t = this._items().map((o, i) => ({ item: o, value: `panel-${i}` })).filter(({ item: o }) => this.expandAll || o.expanded).map(({ value: o }) => o), r = {
      id: this.id,
      getRootNode: () => this.shadowRoot ?? document,
      multiple: !this.singleOpen,
      collapsible: !0,
      defaultValue: t
    };
    this._accordionService = vo(fo, () => r, () => this.requestUpdate()), this._accordionService.start();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._accordionService) == null || e.stop();
  }
  render() {
    const e = this._items();
    if (e.forEach((i, n) => {
      i.slot = `panel-${n}`;
    }), !this._accordionService)
      return S;
    const t = Yr(this._accordionService, mo), r = t.getRootProps(), o = {
      "ct-accordion": !0,
      [`ct-theme-${this.theme}`]: !0,
      "ct-accordion--with-background": this.withBackground,
      [`ct-vertical-spacing-inset--${this.verticalSpacing}`]: this.verticalSpacing !== "none",
      [this.modifierClass]: !!this.modifierClass
    };
    return v`
      <div class=${q(o)} id=${r.id} data-orientation=${r["data-orientation"]}>
        <div class="ct-accordion__content">
          <ul class="ct-accordion__panels">
            ${e.map((i, n) => this.renderPanel(t, i, `panel-${n}`))}
          </ul>
        </div>
      </div>
    `;
  }
  renderPanel(e, t, r) {
    const o = e.getItemProps({ value: r, disabled: t.disabled }), i = e.getItemTriggerProps({ value: r, disabled: t.disabled }), n = e.getItemContentProps({ value: r, disabled: t.disabled });
    return v`
      <li
        class="ct-accordion__panels__panel"
        id=${o.id}
        data-state=${o["data-state"]}
      >
        <div class="ct-accordion__panels__panel__header">
          <button
            type="button"
            class="ct-accordion__panels__panel__header__button"
            id=${i.id}
            aria-controls=${i["aria-controls"]}
            aria-expanded=${i["aria-expanded"]}
            data-controls=${i["data-controls"]}
            data-ownedby=${i["data-ownedby"]}
            ?disabled=${i.disabled}
            @click=${i.onClick}
            @focus=${i.onFocus}
            @blur=${i.onBlur}
            @keydown=${i.onKeyDown}
          >
            <span>${t.heading}</span>
            ${wo}
          </button>
        </div>
        <div
          class="ct-accordion__panels__panel__content"
          id=${n.id}
          role="region"
          aria-labelledby=${n["aria-labelledby"]}
          ?hidden=${n.hidden}
        >
          <div class="ct-accordion__panels__panel__content__inner">
            <slot name=${r}></slot>
          </div>
        </div>
      </li>
    `;
  }
};
M.styles = Z`
    :host {
      display: block;
    }

    .ct-accordion.ct-accordion--with-background {
      padding-left: var(--ct-accordion-space-horizontal);
      padding-right: var(--ct-accordion-space-horizontal);
    }
    @media (min-width: 992px) {
      .ct-accordion.ct-accordion--with-background {
        padding-left: var(--ct-accordion-space-horizontal-desktop);
        padding-right: var(--ct-accordion-space-horizontal-desktop);
      }
    }

    .ct-accordion.ct-vertical-spacing-inset--top {
      padding-top: var(--ct-accordion-space-horizontal);
    }
    .ct-accordion.ct-vertical-spacing-inset--bottom {
      padding-bottom: var(--ct-accordion-space-horizontal);
    }
    .ct-accordion.ct-vertical-spacing-inset--both {
      padding-top: var(--ct-accordion-space-horizontal);
      padding-bottom: var(--ct-accordion-space-horizontal);
    }

    .ct-accordion__panels {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .ct-accordion__panels__panel {
      position: relative;
      border: 0.0625rem solid;
      border-radius: var(--ct-accordion-item-border-radius);
      margin-bottom: 1rem;
    }
    .ct-accordion__panels__panel:last-child {
      margin-bottom: 0;
    }

    .ct-accordion__panels__panel::before {
      content: '';
      position: absolute;
      top: -0.0625rem;
      bottom: -0.0625rem;
      left: -0.0625rem;
      width: calc(var(--ct-stripe-size) + 0.0625rem);
      border-top-left-radius: var(--ct-accordion-item-border-radius);
      border-bottom-left-radius: var(--ct-accordion-item-border-radius);
      transition: width 0.25s;
      z-index: 1;
    }

    .ct-accordion__panels__panel__header {
      display: block;
      margin: 0;
      border-top-left-radius: var(--ct-accordion-header-border-radius);
      border-top-right-radius: var(--ct-accordion-header-border-radius);
    }

    .ct-accordion__panels__panel__header__button {
      font-size: var(--ct-typography-heading-6-font-size);
      line-height: var(--ct-typography-heading-6-line-height);
      font-family: var(--ct-typography-family-heading, sans-serif);
      font-weight: var(--ct-typography-heading-6-font-weight);
      letter-spacing: var(--ct-typography-heading-6-letter-spacing);
      appearance: button;
      border-radius: var(--ct-accordion-button-border-radius);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      text-align: left;
      margin: 0;
      padding: 1.5rem;
      width: 100%;
    }
    .ct-accordion__panels__panel__header__button[disabled] {
      cursor: not-allowed;
      opacity: 50%;
    }
    .ct-accordion__panels__panel[data-state='closed'] .ct-accordion__panels__panel__header__button {
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .ct-accordion__panels__panel__header__button__icon {
      flex: none;
      width: 1rem;
      height: 1rem;
      transition: transform 0.25s ease;
    }
    .ct-accordion__panels__panel[data-state='open'] .ct-accordion__panels__panel__header__button__icon {
      transform: rotate(180deg);
    }

    .ct-accordion__panels__panel__content {
      overflow: hidden;
    }
    .ct-accordion__panels__panel__content[hidden] {
      display: none;
    }

    .ct-accordion__panels__panel__content__inner {
      padding: 0 1.5rem 1.5rem;
    }

    /* Light theme */
    .ct-accordion.ct-theme-light {
      color: var(--ct-color-light-body);
    }
    .ct-accordion.ct-theme-light.ct-accordion--with-background {
      background-color: var(--ct-color-light-background);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel__header__button {
      background-color: var(--ct-color-light-background-light);
      color: var(--ct-color-light-heading);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel__header__button:focus-visible {
      outline-offset: var(--ct-accordion-outline-offset);
      outline-width: var(--ct-accordion-outline-width);
      outline-style: solid;
      outline-color: var(--ct-color-interaction-light-focus);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel__header__button__icon {
      color: var(--ct-color-light-interaction-background);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel {
      background-color: var(--ct-color-light-background-light);
      border-color: var(--ct-color-light-border-light);
    }
    .ct-accordion.ct-theme-light .ct-accordion__panels__panel::before {
      background-color: var(--ct-color-light-highlight);
    }

    /* Dark theme */
    .ct-accordion.ct-theme-dark {
      color: var(--ct-color-dark-body);
    }
    .ct-accordion.ct-theme-dark.ct-accordion--with-background {
      background-color: var(--ct-color-dark-background-dark);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel__header__button {
      background-color: var(--ct-color-dark-background-light);
      color: var(--ct-color-dark-heading);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel__header__button:focus-visible {
      outline-offset: var(--ct-accordion-outline-offset);
      outline-width: var(--ct-accordion-outline-width);
      outline-style: solid;
      outline-color: var(--ct-color-interaction-dark-focus);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel__header__button__icon {
      color: var(--ct-color-dark-interaction-background);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel {
      background-color: var(--ct-color-dark-background-light);
      border-color: var(--ct-color-dark-border);
    }
    .ct-accordion.ct-theme-dark .ct-accordion__panels__panel::before {
      background-color: var(--ct-color-dark-highlight);
    }
  `;
J([
  d({ type: String })
], M.prototype, "theme", 2);
J([
  d({ type: Boolean, attribute: "expand-all" })
], M.prototype, "expandAll", 2);
J([
  d({ type: Boolean, attribute: "single-open" })
], M.prototype, "singleOpen", 2);
J([
  d({ type: Boolean, attribute: "with-background" })
], M.prototype, "withBackground", 2);
J([
  d({ type: String, attribute: "vertical-spacing" })
], M.prototype, "verticalSpacing", 2);
J([
  d({ type: String, attribute: "modifier-class" })
], M.prototype, "modifierClass", 2);
M = J([
  L("ct-accordion")
], M);
var ko = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, N = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? xo(t, r) : t, n = e.length - 1, a; n >= 0; n--)
    (a = e[n]) && (i = (o ? a(t, r, i) : a(i)) || i);
  return o && i && ko(t, r, i), i;
};
let T = class extends B {
  constructor() {
    super(...arguments), this.theme = "light", this.variant = "primary", this.label = "", this.iconPlacement = "after", this.newWindow = !1, this.external = !1, this.modifierClass = "";
  }
  render() {
    if (!this.label)
      return S;
    const e = {
      "ct-tag": !0,
      [`ct-theme-${this.theme}`]: !0,
      [`ct-tag--${this.variant}`]: !0,
      [`ct-tag--icon-${this.iconPlacement}`]: !!this.icon,
      "ct-tag--external": this.external,
      [this.modifierClass]: !!this.modifierClass
    }, t = this.icon ? v`<span class="ct-tag__icon ct-icon ct-icon--${this.icon}"></span>` : S, r = v`<span class="ct-tag__text">${this.label}</span>`, o = this.url && this.newWindow ? v`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>` : S, i = this.external ? v`<span class="ct-tag__icon ct-icon ct-icon--upper-right-arrow"></span>` : S, n = v`
      ${this.iconPlacement === "before" ? t : S}
      ${r}
      ${this.iconPlacement === "after" ? t : S}
      ${o}
      ${i}
      <slot></slot>
    `;
    return this.url ? v`
        <a
          class=${q(e)}
          href=${this.url}
          title=${this.label}
          target=${z(this.newWindow ? "_blank" : void 0)}
          aria-label=${z(this.newWindow ? "Opens in a new tab" : void 0)}
          data-component-name="tag"
        >
          ${n}
        </a>
      ` : v`
      <span class=${q(e)} data-component-name="tag">
        ${n}
      </span>
    `;
  }
};
T.styles = Z`
    :host {
      display: inline-block;
    }

    .ct-tag {
      display: inline-block;
      box-sizing: border-box;
      border-style: solid;
      border-width: var(--ct-tag-border-width, 0.0625rem);
      border-radius: var(--ct-tag-border-radius, 0.25rem);
      font-family: var(--ct-typography-family-heading, sans-serif);
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
      text-decoration: none;
      padding: 0;
    }

    a.ct-tag {
      cursor: pointer;
    }

    .ct-tag:hover,
    .ct-tag:active,
    .ct-tag:focus-visible {
      text-decoration: none;
    }

    /* Primary and secondary carry padding; tertiary stays flush like a text label. */
    .ct-tag--primary,
    .ct-tag--secondary {
      padding: 0.25rem 0.5rem;
    }

    /* Primary */
    .ct-tag--primary.ct-theme-light {
      background-color: var(--ct-tag-light-primary-background-color);
      border-color: var(--ct-tag-light-primary-border-color);
      color: var(--ct-tag-light-primary-color);
    }
    .ct-tag--primary.ct-theme-dark {
      background-color: var(--ct-tag-dark-primary-background-color);
      border-color: var(--ct-tag-dark-primary-border-color);
      color: var(--ct-tag-dark-primary-color);
    }

    /* Secondary */
    .ct-tag--secondary.ct-theme-light {
      background-color: var(--ct-tag-light-secondary-background-color);
      border-color: var(--ct-tag-light-secondary-border-color);
      color: var(--ct-tag-light-secondary-color);
    }
    .ct-tag--secondary.ct-theme-dark {
      background-color: var(--ct-tag-dark-secondary-background-color);
      border-color: var(--ct-tag-dark-secondary-border-color);
      color: var(--ct-tag-dark-secondary-color);
    }

    /* Tertiary */
    .ct-tag--tertiary.ct-theme-light {
      background-color: var(--ct-tag-light-tertiary-background-color);
      border-color: var(--ct-tag-light-tertiary-border-color);
      color: var(--ct-tag-light-tertiary-color);
    }
    .ct-tag--tertiary.ct-theme-dark {
      background-color: var(--ct-tag-dark-tertiary-background-color);
      border-color: var(--ct-tag-dark-tertiary-border-color);
      color: var(--ct-tag-dark-tertiary-color);
    }

    /* Icon */
    .ct-tag__icon {
      display: inline-block;
      font-size: 1rem;
      vertical-align: middle;
    }

    .ct-tag--icon-before .ct-tag__icon {
      margin-right: 0.125rem;
    }

    .ct-tag--icon-after .ct-tag__icon {
      margin-left: 0.125rem;
    }

    .ct-tag__text {
      text-decoration: none;
      vertical-align: middle;
    }

    /* Screen-reader-only text (e.g. "opens in a new tab" announcements). */
    .ct-visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
N([
  d({ type: String })
], T.prototype, "theme", 2);
N([
  d({ type: String })
], T.prototype, "variant", 2);
N([
  d({ type: String })
], T.prototype, "label", 2);
N([
  d({ type: String })
], T.prototype, "icon", 2);
N([
  d({ type: String, attribute: "icon-placement" })
], T.prototype, "iconPlacement", 2);
N([
  d({ type: String })
], T.prototype, "url", 2);
N([
  d({ type: Boolean, attribute: "new-window" })
], T.prototype, "newWindow", 2);
N([
  d({ type: Boolean })
], T.prototype, "external", 2);
N([
  d({ type: String, attribute: "modifier-class" })
], T.prototype, "modifierClass", 2);
T = N([
  L("ct-tag")
], T);
export {
  M as CtAccordion,
  ft as CtAccordionItem,
  E as CtButton,
  P as CtLink,
  T as CtTag,
  kt as ctGrid,
  K as ctGridItem,
  ut as ctRegion
};
