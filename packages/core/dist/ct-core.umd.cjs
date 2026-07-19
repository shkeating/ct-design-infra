(function(c,h){typeof exports=="object"&&typeof module<"u"?h(exports,require("lit"),require("@ct-infra/tokens")):typeof define=="function"&&define.amd?define(["exports","lit","@ct-infra/tokens"],h):(c=typeof globalThis<"u"?globalThis:c||self,h(c.CtCore={},c.lit,c.tokens))})(this,function(c,h,L){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,D=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),Q=new WeakMap;let gt=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(D&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Q.set(e,t))}return t}toString(){return this.cssText}};const mt=o=>new gt(typeof o=="string"?o:o+"",void 0,F),bt=(o,t)=>{if(D)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),i=H.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,o.appendChild(r)}},Y=D?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return mt(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ft,defineProperty:yt,getOwnPropertyDescriptor:vt,getOwnPropertyNames:$t,getOwnPropertySymbols:_t,getPrototypeOf:At}=Object,y=globalThis,tt=y.trustedTypes,wt=tt?tt.emptyScript:"",G=y.reactiveElementPolyfillSupport,k=(o,t)=>o,N={toAttribute(o,t){switch(t){case Boolean:o=o?wt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},W=(o,t)=>!ft(o,t),et={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&yt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=vt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);s==null||s.call(this,n),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const t=At(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const e=this.properties,r=[...$t(e),..._t(e)];for(const i of r)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const i of r)e.unshift(Y(i))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return bt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){var s;const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){const n=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:N).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var s,n;const r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=r.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)==null?void 0:s.fromAttribute)!==void 0?l.converter:N;this._$Em=i;const u=a.fromAttribute(e,l.type);this[i]=u??((n=this._$Ej)==null?void 0:n.get(i))??u,this._$Em=null}}requestUpdate(t,e,r,i=!1,s){var n;if(t!==void 0){const l=this.constructor;if(i===!1&&(s=this[t]),r??(r=l.getPropertyOptions(t)),!((r.hasChanged??W)(s,e)||r.useDefault&&r.reflect&&s===((n=this._$Ej)==null?void 0:n.get(t))&&!this.hasAttribute(l._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,n]of i){const{wrapped:l}=n,a=this[s];l!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(i=>{var s;return(s=i.hostUpdate)==null?void 0:s.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[k("elementProperties")]=new Map,C[k("finalized")]=new Map,G==null||G({ReactiveElement:C}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:W},Et=(o=St,t,e)=>{const{kind:r,metadata:i}=e;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),r==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(r==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,o,!0,l)}}throw Error("Unsupported decorator location: "+r)};function p(o){return(t,e)=>typeof e=="object"?Et(o,t,e):((r,i,s)=>{const n=i.hasOwnProperty(s);return i.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(i,s):void 0})(o,t,e)}var kt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,q=(o,t,e,r)=>{for(var i=r>1?void 0:r?Ct(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&kt(t,e,i),i};c.ctRegion=class extends h.LitElement{constructor(){super(...arguments),this.complexity="standard",this.fluid=!1}render(){return h.html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `}},c.ctRegion.styles=h.css`
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
  `,q([p({type:String})],c.ctRegion.prototype,"complexity",2),q([p({type:Boolean})],c.ctRegion.prototype,"fluid",2),c.ctRegion=q([T("ct-region")],c.ctRegion);var Pt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,rt=(o,t,e,r)=>{for(var i=r>1?void 0:r?xt(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Pt(t,e,i),i};c.ctGrid=class extends h.LitElement{constructor(){super(...arguments),this.gap="200"}render(){return h.html`<slot></slot>`}},c.ctGrid.styles=h.css`
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
  `,rt([p({type:String})],c.ctGrid.prototype,"gap",2),c.ctGrid=rt([T("ct-grid")],c.ctGrid);var Ot=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,P=(o,t,e,r)=>{for(var i=r>1?void 0:r?Ut(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Ot(t,e,i),i};c.ctGridItem=class extends h.LitElement{constructor(){super(...arguments),this.span=12,this.spanM=6,this.spanL=6,this.spanXl=4}updated(t){["span","spanM","spanL","spanXl"].forEach(r=>{if(t.has(r)){const i=r.replace(/[A-Z]/g,s=>"-"+s.toLowerCase());this.style.setProperty(`--grid-item-${i}`,this[r].toString())}})}render(){return h.html`<slot></slot>`}},c.ctGridItem.styles=h.css`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${h.unsafeCSS(L.BreakpointM)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${h.unsafeCSS(L.BreakpointL)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${h.unsafeCSS(L.BreakpointXl)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `,P([p({type:Number})],c.ctGridItem.prototype,"span",2),P([p({type:Number})],c.ctGridItem.prototype,"spanM",2),P([p({type:Number})],c.ctGridItem.prototype,"spanL",2),P([p({type:Number})],c.ctGridItem.prototype,"spanXl",2),c.ctGridItem=P([T("ct-grid-item")],c.ctGridItem);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,it=o=>o,B=x.trustedTypes,ot=B?B.createPolicy("lit-html",{createHTML:o=>o}):void 0,st="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+v,Mt=`<${nt}>`,_=document,R=()=>_.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",V=Array.isArray,Tt=o=>V(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",X=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,ct=/>/g,A=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,ht=/"/g,dt=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ut=new WeakMap,w=_.createTreeWalker(_,129);function pt(o,t){if(!V(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(t):t}const Ht=(o,t)=>{const e=o.length-1,r=[];let i,s=t===2?"<svg>":t===3?"<math>":"",n=U;for(let l=0;l<e;l++){const a=o[l];let u,m,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,m=n.exec(a),m!==null);)f=n.lastIndex,n===U?m[1]==="!--"?n=at:m[1]!==void 0?n=ct:m[2]!==void 0?(dt.test(m[2])&&(i=RegExp("</"+m[2],"g")),n=A):m[3]!==void 0&&(n=A):n===A?m[0]===">"?(n=i??U,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,u=m[1],n=m[3]===void 0?A:m[3]==='"'?ht:lt):n===ht||n===lt?n=A:n===at||n===ct?n=U:(n=A,i=void 0);const $=n===A&&o[l+1].startsWith("/>")?" ":"";s+=n===U?a+Mt:d>=0?(r.push(u),a.slice(0,d)+st+a.slice(d)+v+$):a+v+(d===-2?l:$)}return[pt(o,s+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class M{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,n=0;const l=t.length-1,a=this.parts,[u,m]=Ht(t,e);if(this.el=M.createElement(u,r),w.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=w.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(st)){const f=m[n++],$=i.getAttribute(d).split(v),I=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:I[2],strings:$,ctor:I[1]==="."?Bt:I[1]==="?"?Rt:I[1]==="@"?jt:z}),i.removeAttribute(d)}else d.startsWith(v)&&(a.push({type:6,index:s}),i.removeAttribute(d));if(dt.test(i.tagName)){const d=i.textContent.split(v),f=d.length-1;if(f>0){i.textContent=B?B.emptyScript:"";for(let $=0;$<f;$++)i.append(d[$],R()),w.nextNode(),a.push({type:2,index:++s});i.append(d[f],R())}}}else if(i.nodeType===8)if(i.data===nt)a.push({type:2,index:s});else{let d=-1;for(;(d=i.data.indexOf(v,d+1))!==-1;)a.push({type:7,index:s}),d+=v.length-1}s++}}static createElement(t,e){const r=_.createElement("template");return r.innerHTML=t,r}}function E(o,t,e=o,r){var n,l;if(t===S)return t;let i=r!==void 0?(n=e._$Co)==null?void 0:n[r]:e._$Cl;const s=O(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=i:e._$Cl=i),i!==void 0&&(t=E(o,i._$AS(o,t.values),i,r)),t}class Nt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=((t==null?void 0:t.creationScope)??_).importNode(e,!0);w.currentNode=i;let s=w.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let u;a.type===2?u=new j(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new zt(s,this,t)),this._$AV.push(u),a=r[++l]}n!==(a==null?void 0:a.index)&&(s=w.nextNode(),n++)}return w.currentNode=_,i}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class j{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=M.createElement(pt(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(e);else{const n=new Nt(i,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new M(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new j(this.O(R()),this.O(R()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t!==this._$AB;){const i=it(t).nextSibling;it(t).remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=g}_$AI(t,e=this,r,i){const s=this.strings;let n=!1;if(s===void 0)t=E(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const l=t;let a,u;for(t=s[0],a=0;a<s.length-1;a++)u=E(this,l[r+a],e,a),u===S&&(u=this._$AH[a]),n||(n=!O(u)||u!==this._$AH[a]),u===g?t=g:t!==g&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}n&&!i&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bt extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class Rt extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class jt extends z{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??g)===S)return;const r=this._$AH,i=t===g&&r!==g||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==g&&(r===g||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class zt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const Z=x.litHtmlPolyfillSupport;Z==null||Z(M,j),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It={ATTRIBUTE:1},Lt=o=>(...t)=>({_$litDirective$:o,values:t});class Dt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=Lt(class extends Dt{constructor(o){var t;if(super(o),o.type!==It.ATTRIBUTE||o.name!=="class"||((t=o.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(t=>o[t]).join(" ")+" "}update(o,[t]){var r,i;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in t)t[s]&&!((r=this.nt)!=null&&r.has(s))&&this.st.add(s);return this.render(t)}const e=o.element.classList;for(const s of this.st)s in t||(e.remove(s),this.st.delete(s));for(const s in t){const n=!!t[s];n===this.st.has(s)||(i=this.nt)!=null&&i.has(s)||(n?(e.add(s),this.st.add(s)):(e.remove(s),this.st.delete(s)))}return S}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=o=>o??g;var Gt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,b=(o,t,e,r)=>{for(var i=r>1?void 0:r?Wt(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Gt(t,e,i),i};c.CtButton=class extends h.LitElement{constructor(){super(...arguments),this.theme="light",this.kind="button",this.variant="primary",this.size="regular",this.label="",this.iconPlacement="after",this.disabled=!1,this.newWindow=!1,this.external=!1,this.dismissable=!1,this.modifierClass=""}render(){const t={"ct-button":!0,[`ct-theme-${this.theme}`]:!0,[`ct-button--${this.variant}`]:!0,[`ct-button--${this.size}`]:!0,"ct-button--external":this.external,"ct-button--dismiss":this.dismissable,[this.modifierClass]:!!this.modifierClass},e=this.icon?h.html`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>`:h.nothing,r=this.label?h.html`<span class="ct-button__text">${this.label}</span>`:h.nothing,i=h.html`
      ${this.iconPlacement==="before"?e:h.nothing}
      ${r}
      <slot></slot>
      ${this.iconPlacement==="after"?e:h.nothing}
    `;return this.kind==="link"?h.html`
        <a 
          href=${K(this.url)} 
          role="button" 
          class=${J(t)} 
          data-component-name="button"
          target=${K(this.newWindow?"_blank":void 0)}
          rel=${K(this.newWindow?"noopener noreferrer":void 0)}
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
        >
          ${i}
        </a>
      `:this.kind==="submit"||this.kind==="reset"?h.html`
        <input 
          type=${this.kind} 
          class=${J(t)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      `:h.html`
      <button 
        type="button" 
        class=${J(t)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${i}
      </button>
    `}},c.CtButton.styles=h.css`
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
  `,b([p({type:String})],c.CtButton.prototype,"theme",2),b([p({type:String})],c.CtButton.prototype,"kind",2),b([p({type:String})],c.CtButton.prototype,"variant",2),b([p({type:String})],c.CtButton.prototype,"size",2),b([p({type:String})],c.CtButton.prototype,"label",2),b([p({type:String})],c.CtButton.prototype,"url",2),b([p({type:String})],c.CtButton.prototype,"icon",2),b([p({type:String,attribute:"icon-placement"})],c.CtButton.prototype,"iconPlacement",2),b([p({type:Boolean,reflect:!0})],c.CtButton.prototype,"disabled",2),b([p({type:Boolean,attribute:"new-window"})],c.CtButton.prototype,"newWindow",2),b([p({type:Boolean})],c.CtButton.prototype,"external",2),b([p({type:Boolean})],c.CtButton.prototype,"dismissable",2),b([p({type:String,attribute:"modifier-class"})],c.CtButton.prototype,"modifierClass",2),c.CtButton=b([T("ct-button")],c.CtButton),Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
