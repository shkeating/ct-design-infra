(function(C,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("lit"),require("@ct-infra/tokens")):typeof define=="function"&&define.amd?define(["exports","lit","@ct-infra/tokens"],c):(C=typeof globalThis<"u"?globalThis:C||self,c(C.CtCore={},C.lit,C.tokens))})(this,function(C,c,L1){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l1=globalThis,M1=l1.ShadowRoot&&(l1.ShadyCSS===void 0||l1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R1=Symbol(),N1=new WeakMap;let E2=class{constructor(t,r,i){if(this._$cssResult$=!0,i!==R1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(M1&&t===void 0){const i=r!==void 0&&r.length===1;i&&(t=N1.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&N1.set(r,t))}return t}toString(){return this.cssText}};const P2=e=>new E2(typeof e=="string"?e:e+"",void 0,R1),T2=(e,t)=>{if(M1)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of t){const i=document.createElement("style"),n=l1.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=r.cssText,e.appendChild(i)}},U1=M1?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const i of t.cssRules)r+=i.cssText;return P2(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:B2,defineProperty:O2,getOwnPropertyDescriptor:I2,getOwnPropertyNames:z2,getOwnPropertySymbols:R2,getPrototypeOf:N2}=Object,B=globalThis,j1=B.trustedTypes,U2=j1?j1.emptyScript:"",V1=B.reactiveElementPolyfillSupport,X=(e,t)=>e,d1={toAttribute(e,t){switch(t){case Boolean:e=e?U2:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},k1=(e,t)=>!B2(e,t),D1={attribute:!0,type:String,converter:d1,reflect:!1,useDefault:!1,hasChanged:k1};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),B.litPropertyMetadata??(B.litPropertyMetadata=new WeakMap);let J=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=D1){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,r);n!==void 0&&O2(this.prototype,t,n)}}static getPropertyDescriptor(t,r,i){const{get:n,set:o}=I2(this.prototype,t)??{get(){return this[r]},set(a){this[r]=a}};return{get:n,set(a){const l=n==null?void 0:n.call(this);o==null||o.call(this,a),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??D1}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;const t=N2(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){const r=this.properties,i=[...z2(r),...R2(r)];for(const n of i)this.createProperty(n,r[n])}const t=this[Symbol.metadata];if(t!==null){const r=litPropertyMetadata.get(t);if(r!==void 0)for(const[i,n]of r)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const n=this._$Eu(r,i);n!==void 0&&this._$Eh.set(n,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const n of i)r.unshift(U1(n))}else t!==void 0&&r.push(U1(t));return r}static _$Eu(t,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(r=>r(this))}addController(t){var r;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((r=t.hostConnected)==null||r.call(t))}removeController(t){var r;(r=this._$EO)==null||r.delete(t)}_$E_(){const t=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return T2(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostConnected)==null?void 0:i.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostDisconnected)==null?void 0:i.call(r)})}attributeChangedCallback(t,r,i){this._$AK(t,i)}_$ET(t,r){var o;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const a=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:d1).toAttribute(r,i.type);this._$Em=t,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(t,r){var o,a;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const l=i.getPropertyOptions(n),s=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:d1;this._$Em=n;const g=s.fromAttribute(r,l.type);this[n]=g??((a=this._$Ej)==null?void 0:a.get(n))??g,this._$Em=null}}requestUpdate(t,r,i,n=!1,o){var a;if(t!==void 0){const l=this.constructor;if(n===!1&&(o=this[t]),i??(i=l.getPropertyOptions(t)),!((i.hasChanged??k1)(o,r)||i.useDefault&&i.reflect&&o===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(l._$Eu(t,i))))return;this.C(t,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:i,reflect:n,wrapped:o},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??r??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(r=void 0),this._$AL.set(t,r)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[o,a]of n){const{wrapped:l}=a,s=this[o];l!==!0||this._$AL.has(o)||s===void 0||this.C(o,void 0,a,s)}}let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(i=this._$EO)==null||i.forEach(n=>{var o;return(o=n.hostUpdate)==null?void 0:o.call(n)}),this.update(r)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(r)}willUpdate(t){}_$AE(t){var r;(r=this._$EO)==null||r.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[X("elementProperties")]=new Map,J[X("finalized")]=new Map,V1==null||V1({ReactiveElement:J}),(B.reactiveElementVersions??(B.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j2={attribute:!0,type:String,converter:d1,reflect:!1,hasChanged:k1},D2=(e=j2,t,r)=>{const{kind:i,metadata:n}=r;let o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(r.name,e),i==="accessor"){const{name:a}=r;return{set(l){const s=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,s,e,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,e,l),l}}}if(i==="setter"){const{name:a}=r;return function(l){const s=this[a];t.call(this,l),this.requestUpdate(a,s,e,!0,l)}}throw Error("Unsupported decorator location: "+i)};function d(e){return(t,r)=>typeof r=="object"?D2(e,t,r):((i,n,o)=>{const a=n.hasOwnProperty(o);return n.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(n,o):void 0})(e,t,r)}var G2=Object.defineProperty,W2=Object.getOwnPropertyDescriptor,Z1=(e,t,r,i)=>{for(var n=i>1?void 0:i?W2(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&G2(t,r,n),n};C.ctRegion=class extends c.LitElement{constructor(){super(...arguments),this.complexity="standard",this.fluid=!1}render(){return c.html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `}},C.ctRegion.styles=c.css`
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
  `,Z1([d({type:String})],C.ctRegion.prototype,"complexity",2),Z1([d({type:Boolean})],C.ctRegion.prototype,"fluid",2),C.ctRegion=Z1([Z("ct-region")],C.ctRegion);var q2=Object.defineProperty,F2=Object.getOwnPropertyDescriptor,G1=(e,t,r,i)=>{for(var n=i>1?void 0:i?F2(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&q2(t,r,n),n};C.ctGrid=class extends c.LitElement{constructor(){super(...arguments),this.gap="200"}render(){return c.html`<slot></slot>`}},C.ctGrid.styles=c.css`
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
  `,G1([d({type:String})],C.ctGrid.prototype,"gap",2),C.ctGrid=G1([Z("ct-grid")],C.ctGrid);var K2=Object.defineProperty,X2=Object.getOwnPropertyDescriptor,Q=(e,t,r,i)=>{for(var n=i>1?void 0:i?X2(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&K2(t,r,n),n};C.ctGridItem=class extends c.LitElement{constructor(){super(...arguments),this.span=12,this.spanM=6,this.spanL=6,this.spanXl=4}updated(t){["span","spanM","spanL","spanXl"].forEach(i=>{if(t.has(i)){const n=i.replace(/[A-Z]/g,o=>"-"+o.toLowerCase());this.style.setProperty(`--grid-item-${n}`,this[i].toString())}})}render(){return c.html`<slot></slot>`}},C.ctGridItem.styles=c.css`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${c.unsafeCSS(L1.BreakpointM)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${c.unsafeCSS(L1.BreakpointL)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${c.unsafeCSS(L1.BreakpointXl)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `,Q([d({type:Number})],C.ctGridItem.prototype,"span",2),Q([d({type:Number})],C.ctGridItem.prototype,"spanM",2),Q([d({type:Number})],C.ctGridItem.prototype,"spanL",2),Q([d({type:Number})],C.ctGridItem.prototype,"spanXl",2),C.ctGridItem=Q([Z("ct-grid-item")],C.ctGridItem);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W1={ATTRIBUTE:1,CHILD:2},q1=e=>(...t)=>({_$litDirective$:e,values:t});let F1=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,i){this._$Ct=t,this._$AM=r,this._$Ci=i}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,K1=e=>e,h1=Y.trustedTypes,X1=h1?h1.createPolicy("lit-html",{createHTML:e=>e}):void 0,J1="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Q1="?"+O,J2=`<${Q1}>`,N=document,g1=()=>N.createComment(""),t1=e=>e===null||typeof e!="object"&&typeof e!="function",x1=Array.isArray,Q2=e=>x1(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",S1=`[ 	
\f\r]`,e1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y1=/-->/g,t2=/>/g,U=RegExp(`>|${S1}(?:([^\\s"'>=/]+)(${S1}*=${S1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),e2=/'/g,r2=/"/g,i2=/^(?:script|style|textarea|title)$/i,Y2=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),t9=Y2(1),j=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),n2=new WeakMap,D=N.createTreeWalker(N,129);function o2(e,t){if(!x1(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return X1!==void 0?X1.createHTML(t):t}const e9=(e,t)=>{const r=e.length-1,i=[];let n,o=t===2?"<svg>":t===3?"<math>":"",a=e1;for(let l=0;l<r;l++){const s=e[l];let g,f,v=-1,m=0;for(;m<s.length&&(a.lastIndex=m,f=a.exec(s),f!==null);)m=a.lastIndex,a===e1?f[1]==="!--"?a=Y1:f[1]!==void 0?a=t2:f[2]!==void 0?(i2.test(f[2])&&(n=RegExp("</"+f[2],"g")),a=U):f[3]!==void 0&&(a=U):a===U?f[0]===">"?(a=n??e1,v=-1):f[1]===void 0?v=-2:(v=a.lastIndex-f[2].length,g=f[1],a=f[3]===void 0?U:f[3]==='"'?r2:e2):a===r2||a===e2?a=U:a===Y1||a===t2?a=e1:(a=U,n=void 0);const u=a===U&&e[l+1].startsWith("/>")?" ":"";o+=a===e1?s+J2:v>=0?(i.push(g),s.slice(0,v)+J1+s.slice(v)+O+u):s+O+(v===-2?l:u)}return[o2(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class r1{constructor({strings:t,_$litType$:r},i){let n;this.parts=[];let o=0,a=0;const l=t.length-1,s=this.parts,[g,f]=e9(t,r);if(this.el=r1.createElement(g,i),D.currentNode=this.el.content,r===2||r===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(n=D.nextNode())!==null&&s.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const v of n.getAttributeNames())if(v.endsWith(J1)){const m=f[a++],u=n.getAttribute(v).split(O),H=/([.?@])?(.*)/.exec(m);s.push({type:1,index:o,name:H[2],strings:u,ctor:H[1]==="."?i9:H[1]==="?"?n9:H[1]==="@"?o9:u1}),n.removeAttribute(v)}else v.startsWith(O)&&(s.push({type:6,index:o}),n.removeAttribute(v));if(i2.test(n.tagName)){const v=n.textContent.split(O),m=v.length-1;if(m>0){n.textContent=h1?h1.emptyScript:"";for(let u=0;u<m;u++)n.append(v[u],g1()),D.nextNode(),s.push({type:2,index:++o});n.append(v[m],g1())}}}else if(n.nodeType===8)if(n.data===Q1)s.push({type:2,index:o});else{let v=-1;for(;(v=n.data.indexOf(O,v+1))!==-1;)s.push({type:7,index:o}),v+=O.length-1}o++}}static createElement(t,r){const i=N.createElement("template");return i.innerHTML=t,i}}function q(e,t,r=e,i){var a,l;if(t===j)return t;let n=i!==void 0?(a=r._$Co)==null?void 0:a[i]:r._$Cl;const o=t1(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==o&&((l=n==null?void 0:n._$AO)==null||l.call(n,!1),o===void 0?n=void 0:(n=new o(e),n._$AT(e,r,i)),i!==void 0?(r._$Co??(r._$Co=[]))[i]=n:r._$Cl=n),n!==void 0&&(t=q(e,n._$AS(e,t.values),n,i)),t}class r9{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:i}=this._$AD,n=((t==null?void 0:t.creationScope)??N).importNode(r,!0);D.currentNode=n;let o=D.nextNode(),a=0,l=0,s=i[0];for(;s!==void 0;){if(a===s.index){let g;s.type===2?g=new p1(o,o.nextSibling,this,t):s.type===1?g=new s.ctor(o,s.name,s.strings,this,t):s.type===6&&(g=new a9(o,this,t)),this._$AV.push(g),s=i[++l]}a!==(s==null?void 0:s.index)&&(o=D.nextNode(),a++)}return D.currentNode=N,n}p(t){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,r),r+=i.strings.length-2):i._$AI(t[r])),r++}}class p1{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,r,i,n){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=i,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=q(this,t,r),t1(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Q2(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&t1(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){var o;const{values:r,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=r1.createElement(o2(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===n)this._$AH.p(r);else{const a=new r9(n,this),l=a.u(this.options);a.p(r),this.T(l),this._$AH=a}}_$AC(t){let r=n2.get(t.strings);return r===void 0&&n2.set(t.strings,r=new r1(t)),r}k(t){x1(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,n=0;for(const o of t)n===r.length?r.push(i=new p1(this.O(g1()),this.O(g1()),this,this.options)):i=r[n],i._$AI(o),n++;n<r.length&&(this._$AR(i&&i._$AB.nextSibling,n),r.length=n)}_$AR(t=this._$AA.nextSibling,r){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,r);t!==this._$AB;){const n=K1(t).nextSibling;K1(t).remove(),t=n}}setConnected(t){var r;this._$AM===void 0&&(this._$Cv=t,(r=this._$AP)==null||r.call(this,t))}}class u1{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,i,n,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=r,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,r=this,i,n){const o=this.strings;let a=!1;if(o===void 0)t=q(this,t,r,0),a=!t1(t)||t!==this._$AH&&t!==j,a&&(this._$AH=t);else{const l=t;let s,g;for(t=o[0],s=0;s<o.length-1;s++)g=q(this,l[i+s],r,s),g===j&&(g=this._$AH[s]),a||(a=!t1(g)||g!==this._$AH[s]),g===$?t=$:t!==$&&(t+=(g??"")+o[s+1]),this._$AH[s]=g}a&&!n&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class i9 extends u1{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class n9 extends u1{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class o9 extends u1{constructor(t,r,i,n,o){super(t,r,i,n,o),this.type=5}_$AI(t,r=this){if((t=q(this,t,r,0)??$)===j)return;const i=this._$AH,n=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,t):this._$AH.handleEvent(t)}}class a9{constructor(t,r,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const A1=Y.litHtmlPolyfillSupport;A1==null||A1(r1,p1),(Y.litHtmlVersions??(Y.litHtmlVersions=[])).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let E1=class extends F1{constructor(t){if(super(t),this.it=$,t.type!==W1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this._t=void 0,this.it=t;if(t===j)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};E1.directiveName="unsafeHTML",E1.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class P1 extends E1{}P1.directiveName="unsafeSVG",P1.resultType=2;const C9=q1(P1),s9={account:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7105 12.71C16.6909 11.9387 17.4065 10.8809 17.7577 9.68394C18.109 8.48697 18.0784 7.21027 17.6703 6.03147C17.2621 4.85267 16.4967 3.83039 15.4806 3.10686C14.4644 2.38332 13.2479 1.99451 12.0005 1.99451C10.753 1.99451 9.5366 2.38332 8.52041 3.10686C7.50423 3.83039 6.73883 4.85267 6.3307 6.03147C5.92257 7.21027 5.892 8.48697 6.24325 9.68394C6.59449 10.8809 7.31009 11.9387 8.29048 12.71C6.61056 13.383 5.14477 14.4994 4.04938 15.9399C2.95398 17.3805 2.27005 19.0913 2.07048 20.89C2.05604 21.0213 2.0676 21.1542 2.10451 21.2811C2.14142 21.4079 2.20295 21.5263 2.2856 21.6293C2.4525 21.8375 2.69527 21.9708 2.96049 22C3.2257 22.0292 3.49164 21.9518 3.69981 21.7849C3.90798 21.618 4.04131 21.3752 4.07049 21.11C4.29007 19.1552 5.22217 17.3498 6.6887 16.0388C8.15524 14.7278 10.0534 14.003 12.0205 14.003C13.9876 14.003 15.8857 14.7278 17.3523 16.0388C18.8188 17.3498 19.7509 19.1552 19.9705 21.11C19.9977 21.3557 20.1149 21.5827 20.2996 21.747C20.4843 21.9114 20.7233 22.0015 20.9705 22H21.0805C21.3426 21.9698 21.5822 21.8373 21.747 21.6313C21.9119 21.4252 21.9886 21.1624 21.9605 20.9C21.76 19.0962 21.0724 17.381 19.9713 15.9382C18.8703 14.4954 17.3974 13.3795 15.7105 12.71ZM12.0005 12C11.2094 12 10.436 11.7654 9.7782 11.3259C9.12041 10.8864 8.60772 10.2616 8.30497 9.53074C8.00222 8.79983 7.923 7.99557 8.07734 7.21964C8.23168 6.44372 8.61265 5.73099 9.17206 5.17158C9.73147 4.61217 10.4442 4.2312 11.2201 4.07686C11.996 3.92252 12.8003 4.00173 13.5312 4.30448C14.2621 4.60724 14.8868 5.11993 15.3264 5.77772C15.7659 6.43552 16.0005 7.20888 16.0005 8C16.0005 9.06087 15.5791 10.0783 14.8289 10.8284C14.0788 11.5786 13.0614 12 12.0005 12Z" />
</svg>`,approve:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M14.72 8.79L10.43 13.09L8.78 11.44C8.69036 11.3353 8.58004 11.2503 8.45597 11.1903C8.33191 11.1303 8.19678 11.0965 8.05906 11.0912C7.92134 11.0859 7.78401 11.1091 7.65568 11.1594C7.52736 11.2096 7.41081 11.2859 7.31335 11.3833C7.2159 11.4808 7.13964 11.5974 7.08937 11.7257C7.03909 11.854 7.01589 11.9913 7.02121 12.1291C7.02653 12.2668 7.06026 12.4019 7.12028 12.526C7.1803 12.65 7.26532 12.7604 7.37 12.85L9.72 15.21C9.81344 15.3027 9.92426 15.376 10.0461 15.4258C10.1679 15.4755 10.2984 15.5008 10.43 15.5C10.6923 15.4989 10.9437 15.3947 11.13 15.21L16.13 10.21C16.2237 10.117 16.2981 10.0064 16.3489 9.88458C16.3997 9.76272 16.4258 9.63201 16.4258 9.5C16.4258 9.36799 16.3997 9.23728 16.3489 9.11542C16.2981 8.99356 16.2237 8.88296 16.13 8.79C15.9426 8.60375 15.6892 8.49921 15.425 8.49921C15.1608 8.49921 14.9074 8.60375 14.72 8.79ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" />
</svg>`,bars:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z" />
</svg>`,bullet:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
</svg>`,"calendar-1":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19C12.1978 19 12.3911 18.9414 12.5556 18.8315C12.72 18.7216 12.8482 18.5654 12.9239 18.3827C12.9996 18.2 13.0194 17.9989 12.9808 17.8049C12.9422 17.6109 12.847 17.4327 12.7071 17.2929C12.5673 17.153 12.3891 17.0578 12.1951 17.0192C12.0011 16.9806 11.8 17.0004 11.6173 17.0761C11.4346 17.1518 11.2784 17.28 11.1685 17.4444C11.0586 17.6089 11 17.8022 11 18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19ZM17 19C17.1978 19 17.3911 18.9414 17.5556 18.8315C17.72 18.7216 17.8482 18.5654 17.9239 18.3827C17.9996 18.2 18.0194 17.9989 17.9808 17.8049C17.9422 17.6109 17.847 17.4327 17.7071 17.2929C17.5673 17.153 17.3891 17.0578 17.1951 17.0192C17.0011 16.9806 16.8 17.0004 16.6173 17.0761C16.4346 17.1518 16.2784 17.28 16.1685 17.4444C16.0586 17.6089 16 17.8022 16 18C16 18.2652 16.1054 18.5196 16.2929 18.7071C16.4804 18.8946 16.7348 19 17 19ZM17 15C17.1978 15 17.3911 14.9414 17.5556 14.8315C17.72 14.7216 17.8482 14.5654 17.9239 14.3827C17.9996 14.2 18.0194 13.9989 17.9808 13.8049C17.9422 13.6109 17.847 13.4327 17.7071 13.2929C17.5673 13.153 17.3891 13.0578 17.1951 13.0192C17.0011 12.9806 16.8 13.0004 16.6173 13.0761C16.4346 13.1518 16.2784 13.28 16.1685 13.4444C16.0586 13.6089 16 13.8022 16 14C16 14.2652 16.1054 14.5196 16.2929 14.7071C16.4804 14.8946 16.7348 15 17 15ZM12 15C12.1978 15 12.3911 14.9414 12.5556 14.8315C12.72 14.7216 12.8482 14.5654 12.9239 14.3827C12.9996 14.2 13.0194 13.9989 12.9808 13.8049C12.9422 13.6109 12.847 13.4327 12.7071 13.2929C12.5673 13.153 12.3891 13.0578 12.1951 13.0192C12.0011 12.9806 11.8 13.0004 11.6173 13.0761C11.4346 13.1518 11.2784 13.28 11.1685 13.4444C11.0586 13.6089 11 13.8022 11 14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15ZM19 3H18V2C18 1.73478 17.8946 1.48043 17.7071 1.29289C17.5196 1.10536 17.2652 1 17 1C16.7348 1 16.4804 1.10536 16.2929 1.29289C16.1054 1.48043 16 1.73478 16 2V3H8V2C8 1.73478 7.89464 1.48043 7.70711 1.29289C7.51957 1.10536 7.26522 1 7 1C6.73478 1 6.48043 1.10536 6.29289 1.29289C6.10536 1.48043 6 1.73478 6 2V3H5C4.20435 3 3.44129 3.31607 2.87868 3.87868C2.31607 4.44129 2 5.20435 2 6V20C2 20.7956 2.31607 21.5587 2.87868 22.1213C3.44129 22.6839 4.20435 23 5 23H19C19.7956 23 20.5587 22.6839 21.1213 22.1213C21.6839 21.5587 22 20.7956 22 20V6C22 5.20435 21.6839 4.44129 21.1213 3.87868C20.5587 3.31607 19.7956 3 19 3ZM20 20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V11H20V20ZM20 9H4V6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5H6V6C6 6.26522 6.10536 6.51957 6.29289 6.70711C6.48043 6.89464 6.73478 7 7 7C7.26522 7 7.51957 6.89464 7.70711 6.70711C7.89464 6.51957 8 6.26522 8 6V5H16V6C16 6.26522 16.1054 6.51957 16.2929 6.70711C16.4804 6.89464 16.7348 7 17 7C17.2652 7 17.5196 6.89464 17.7071 6.70711C17.8946 6.51957 18 6.26522 18 6V5H19C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6V9ZM7 15C7.19778 15 7.39112 14.9414 7.55557 14.8315C7.72002 14.7216 7.84819 14.5654 7.92388 14.3827C7.99957 14.2 8.01937 13.9989 7.98079 13.8049C7.9422 13.6109 7.84696 13.4327 7.70711 13.2929C7.56725 13.153 7.38907 13.0578 7.19509 13.0192C7.00111 12.9806 6.80004 13.0004 6.61732 13.0761C6.43459 13.1518 6.27841 13.28 6.16853 13.4444C6.05865 13.6089 6 13.8022 6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15ZM7 19C7.19778 19 7.39112 18.9414 7.55557 18.8315C7.72002 18.7216 7.84819 18.5654 7.92388 18.3827C7.99957 18.2 8.01937 17.9989 7.98079 17.8049C7.9422 17.6109 7.84696 17.4327 7.70711 17.2929C7.56725 17.153 7.38907 17.0578 7.19509 17.0192C7.00111 16.9806 6.80004 17.0004 6.61732 17.0761C6.43459 17.1518 6.27841 17.28 6.16853 17.4444C6.05865 17.6089 6 17.8022 6 18C6 18.2652 6.10536 18.5196 6.29289 18.7071C6.48043 18.8946 6.73478 19 7 19Z" />
</svg>`,"calendar-2":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14C12.1978 14 12.3911 13.9414 12.5556 13.8315C12.72 13.7216 12.8482 13.5654 12.9239 13.3827C12.9996 13.2 13.0194 12.9989 12.9808 12.8049C12.9422 12.6109 12.847 12.4327 12.7071 12.2929C12.5673 12.153 12.3891 12.0578 12.1951 12.0192C12.0011 11.9806 11.8 12.0004 11.6173 12.0761C11.4346 12.1518 11.2784 12.28 11.1685 12.4444C11.0586 12.6089 11 12.8022 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM17 14C17.1978 14 17.3911 13.9414 17.5556 13.8315C17.72 13.7216 17.8482 13.5654 17.9239 13.3827C17.9996 13.2 18.0194 12.9989 17.9808 12.8049C17.9422 12.6109 17.847 12.4327 17.7071 12.2929C17.5673 12.153 17.3891 12.0578 17.1951 12.0192C17.0011 11.9806 16.8 12.0004 16.6173 12.0761C16.4346 12.1518 16.2784 12.28 16.1685 12.4444C16.0586 12.6089 16 12.8022 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM12 18C12.1978 18 12.3911 17.9414 12.5556 17.8315C12.72 17.7216 12.8482 17.5654 12.9239 17.3827C12.9996 17.2 13.0194 16.9989 12.9808 16.8049C12.9422 16.6109 12.847 16.4327 12.7071 16.2929C12.5673 16.153 12.3891 16.0578 12.1951 16.0192C12.0011 15.9806 11.8 16.0004 11.6173 16.0761C11.4346 16.1518 11.2784 16.28 11.1685 16.4444C11.0586 16.6089 11 16.8022 11 17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18ZM17 18C17.1978 18 17.3911 17.9414 17.5556 17.8315C17.72 17.7216 17.8482 17.5654 17.9239 17.3827C17.9996 17.2 18.0194 16.9989 17.9808 16.8049C17.9422 16.6109 17.847 16.4327 17.7071 16.2929C17.5673 16.153 17.3891 16.0578 17.1951 16.0192C17.0011 15.9806 16.8 16.0004 16.6173 16.0761C16.4346 16.1518 16.2784 16.28 16.1685 16.4444C16.0586 16.6089 16 16.8022 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM7 14C7.19778 14 7.39112 13.9414 7.55557 13.8315C7.72002 13.7216 7.84819 13.5654 7.92388 13.3827C7.99957 13.2 8.01937 12.9989 7.98079 12.8049C7.9422 12.6109 7.84696 12.4327 7.70711 12.2929C7.56725 12.153 7.38907 12.0578 7.19509 12.0192C7.00111 11.9806 6.80004 12.0004 6.61732 12.0761C6.43459 12.1518 6.27841 12.28 6.16853 12.4444C6.05865 12.6089 6 12.8022 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V10H20V19ZM20 8H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V8ZM7 18C7.19778 18 7.39112 17.9414 7.55557 17.8315C7.72002 17.7216 7.84819 17.5654 7.92388 17.3827C7.99957 17.2 8.01937 16.9989 7.98079 16.8049C7.9422 16.6109 7.84696 16.4327 7.70711 16.2929C7.56725 16.153 7.38907 16.0578 7.19509 16.0192C7.00111 15.9806 6.80004 16.0004 6.61732 16.0761C6.43459 16.1518 6.27841 16.28 6.16853 16.4444C6.05865 16.6089 6 16.8022 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z" />
</svg>`,call:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4097 13C19.1897 13 18.9597 12.93 18.7397 12.88C18.2945 12.7805 17.8568 12.6501 17.4297 12.49C16.9658 12.3212 16.4558 12.33 15.998 12.5146C15.5402 12.6992 15.1668 13.0466 14.9497 13.49L14.7297 13.95C13.7585 13.3992 12.8613 12.7271 12.0597 11.95C11.2825 11.1484 10.6105 10.2512 10.0597 9.28L10.5197 9.07C10.963 8.85292 11.3105 8.47953 11.4951 8.02169C11.6797 7.56385 11.6885 7.05391 11.5197 6.59C11.3609 6.15903 11.2306 5.71808 11.1297 5.27C11.0797 5.05 11.0397 4.82 11.0097 4.6C10.8882 3.89562 10.5193 3.25774 9.96931 2.80124C9.4193 2.34474 8.72438 2.09961 8.00968 2.11H4.99968C4.57693 2.10945 4.15883 2.19825 3.7728 2.37058C3.38677 2.54292 3.04152 2.7949 2.75968 3.11C2.472 3.43365 2.2578 3.81575 2.13179 4.23004C2.00577 4.64432 1.97094 5.08098 2.02968 5.51C2.57327 9.67214 4.47489 13.5387 7.43968 16.51C10.411 19.4748 14.2775 21.3764 18.4397 21.92C18.5695 21.9299 18.6999 21.9299 18.8297 21.92C19.5671 21.9211 20.2791 21.6505 20.8297 21.16C21.1448 20.8782 21.3968 20.5329 21.5691 20.1469C21.7414 19.7609 21.8302 19.3428 21.8297 18.92V15.92C21.8243 15.229 21.5805 14.5611 21.1396 14.0291C20.6987 13.4971 20.0876 13.1336 19.4097 13ZM19.8997 19C19.8994 19.1395 19.8698 19.2775 19.813 19.4049C19.7562 19.5324 19.6733 19.6465 19.5697 19.74C19.4601 19.8399 19.3297 19.9141 19.1878 19.9573C19.046 20.0006 18.8963 20.0117 18.7497 19.99C15.018 19.5026 11.5499 17.802 8.87968 15.15C6.20716 12.4775 4.49171 8.99737 3.99968 5.25C3.97796 5.10333 3.98912 4.95367 4.03236 4.81185C4.0756 4.67003 4.14983 4.5396 4.24968 4.43C4.3443 4.32515 4.46006 4.24154 4.58933 4.18466C4.7186 4.12778 4.85846 4.09892 4.99968 4.1H7.99968C8.23085 4.09435 8.45682 4.16898 8.63915 4.3112C8.82147 4.45341 8.94888 4.65442 8.99968 4.88C8.99968 5.15 9.08968 5.43 9.14968 5.7C9.26526 6.22386 9.419 6.73857 9.60968 7.24L8.20968 7.9C7.96905 8.01046 7.78204 8.21185 7.68968 8.46C7.58967 8.70346 7.58967 8.97654 7.68968 9.22C9.12888 12.3028 11.6069 14.7808 14.6897 16.22C14.9331 16.32 15.2062 16.32 15.4497 16.22C15.6978 16.1276 15.8992 15.9406 16.0097 15.7L16.6397 14.3C17.1556 14.4881 17.6834 14.6418 18.2197 14.76C18.4797 14.82 18.7597 14.87 19.0297 14.91C19.2553 14.9608 19.4563 15.0882 19.5985 15.2705C19.7407 15.4529 19.8153 15.6788 19.8097 15.91L19.8997 19ZM13.9997 2C13.7697 2 13.5297 2 13.2997 2C13.0345 2.02254 12.7891 2.14952 12.6175 2.353C12.4459 2.55647 12.3621 2.81978 12.3847 3.085C12.4072 3.35022 12.5342 3.59562 12.7377 3.76721C12.9412 3.93881 13.2045 4.02254 13.4697 4H13.9997C15.591 4 17.1171 4.63214 18.2423 5.75736C19.3675 6.88258 19.9997 8.4087 19.9997 10C19.9997 10.18 19.9997 10.35 19.9997 10.53C19.9775 10.7938 20.0609 11.0556 20.2314 11.2581C20.402 11.4606 20.6459 11.5871 20.9097 11.61H20.9897C21.24 11.611 21.4816 11.5181 21.6668 11.3496C21.8519 11.1811 21.9672 10.9493 21.9897 10.7C21.9897 10.47 21.9897 10.23 21.9897 10C21.9897 7.88 21.1482 5.84668 19.6501 4.34668C18.1519 2.84667 16.1197 2.00265 13.9997 2ZM15.9997 10C15.9997 10.2652 16.105 10.5196 16.2926 10.7071C16.4801 10.8946 16.7345 11 16.9997 11C17.2649 11 17.5193 10.8946 17.7068 10.7071C17.8943 10.5196 17.9997 10.2652 17.9997 10C17.9997 8.93913 17.5783 7.92172 16.8281 7.17157C16.078 6.42143 15.0605 6 13.9997 6C13.7345 6 13.4801 6.10536 13.2926 6.29289C13.105 6.48043 12.9997 6.73478 12.9997 7C12.9997 7.26522 13.105 7.51957 13.2926 7.70711C13.4801 7.89464 13.7345 8 13.9997 8C14.5301 8 15.0388 8.21071 15.4139 8.58579C15.789 8.96086 15.9997 9.46957 15.9997 10Z" />
</svg>`,cancel:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4099 11.9999L17.7099 7.70994C17.8982 7.52164 18.004 7.26624 18.004 6.99994C18.004 6.73364 17.8982 6.47825 17.7099 6.28994C17.5216 6.10164 17.2662 5.99585 16.9999 5.99585C16.7336 5.99585 16.4782 6.10164 16.2899 6.28994L11.9999 10.5899L7.70994 6.28994C7.52164 6.10164 7.26624 5.99585 6.99994 5.99585C6.73364 5.99585 6.47824 6.10164 6.28994 6.28994C6.10164 6.47825 5.99585 6.73364 5.99585 6.99994C5.99585 7.26624 6.10164 7.52164 6.28994 7.70994L10.5899 11.9999L6.28994 16.2899C6.19621 16.3829 6.12182 16.4935 6.07105 16.6154C6.02028 16.7372 5.99414 16.8679 5.99414 16.9999C5.99414 17.132 6.02028 17.2627 6.07105 17.3845C6.12182 17.5064 6.19621 17.617 6.28994 17.7099C6.3829 17.8037 6.4935 17.8781 6.61536 17.9288C6.73722 17.9796 6.86793 18.0057 6.99994 18.0057C7.13195 18.0057 7.26266 17.9796 7.38452 17.9288C7.50638 17.8781 7.61698 17.8037 7.70994 17.7099L11.9999 13.4099L16.2899 17.7099C16.3829 17.8037 16.4935 17.8781 16.6154 17.9288C16.7372 17.9796 16.8679 18.0057 16.9999 18.0057C17.132 18.0057 17.2627 17.9796 17.3845 17.9288C17.5064 17.8781 17.617 17.8037 17.7099 17.7099C17.8037 17.617 17.8781 17.5064 17.9288 17.3845C17.9796 17.2627 18.0057 17.132 18.0057 16.9999C18.0057 16.8679 17.9796 16.7372 17.9288 16.6154C17.8781 16.4935 17.8037 16.3829 17.7099 16.2899L13.4099 11.9999Z" />
</svg>`,checked:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.9 3H20.1C20.3387 3 20.5676 3.09482 20.7364 3.2636C20.9052 3.43239 21 3.66131 21 3.9V20.1C21 20.3387 20.9052 20.5676 20.7364 20.7364C20.5676 20.9052 20.3387 21 20.1 21H3.9C3.66131 21 3.43239 20.9052 3.2636 20.7364C3.09482 20.5676 3 20.3387 3 20.1V3.9C3 3.66131 3.09482 3.43239 3.2636 3.2636C3.43239 3.09482 3.66131 3 3.9 3ZM9.48885 17.1746C9.57252 17.259 9.67206 17.326 9.78173 17.3716C9.8914 17.4173 10.009 17.4409 10.1278 17.4409C10.2467 17.4409 10.3643 17.4173 10.474 17.3716C10.5836 17.326 10.6832 17.259 10.7668 17.1746L18.9388 9.00264C19.1083 8.83317 19.2035 8.60331 19.2035 8.36364C19.2035 8.12397 19.1083 7.89412 18.9388 7.72464C18.7694 7.55517 18.5395 7.45996 18.2998 7.45996C18.0602 7.45996 17.8303 7.55517 17.6608 7.72464L10.1278 15.2666L7.23885 12.3686C7.06938 12.1992 6.83952 12.104 6.59985 12.104C6.36018 12.104 6.13032 12.1992 5.96085 12.3686C5.79138 12.5381 5.69617 12.768 5.69617 13.0076C5.69617 13.2473 5.79138 13.4772 5.96085 13.6466L9.48885 17.1746Z" fill="#00698F" fill-opacity="0.5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.9 3H20.1C20.3387 3 20.5676 3.09482 20.7364 3.2636C20.9052 3.43239 21 3.66131 21 3.9V20.1C21 20.3387 20.9052 20.5676 20.7364 20.7364C20.5676 20.9052 20.3387 21 20.1 21H3.9C3.66131 21 3.43239 20.9052 3.2636 20.7364C3.09482 20.5676 3 20.3387 3 20.1V3.9C3 3.66131 3.09482 3.43239 3.2636 3.2636C3.43239 3.09482 3.66131 3 3.9 3ZM9.48885 17.1746C9.57252 17.259 9.67206 17.326 9.78173 17.3716C9.8914 17.4173 10.009 17.4409 10.1278 17.4409C10.2467 17.4409 10.3643 17.4173 10.474 17.3716C10.5836 17.326 10.6832 17.259 10.7668 17.1746L18.9388 9.00264C19.1083 8.83317 19.2035 8.60331 19.2035 8.36364C19.2035 8.12397 19.1083 7.89412 18.9388 7.72464C18.7694 7.55517 18.5395 7.45996 18.2998 7.45996C18.0602 7.45996 17.8303 7.55517 17.6608 7.72464L10.1278 15.2666L7.23885 12.3686C7.06938 12.1992 6.83952 12.104 6.59985 12.104C6.36018 12.104 6.13032 12.1992 5.96085 12.3686C5.79138 12.5381 5.69617 12.768 5.69617 13.0076C5.69617 13.2473 5.79138 13.4772 5.96085 13.6466L9.48885 17.1746Z" fill="black" fill-opacity="0.6"/>
</svg>`,"close-outline":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7098 8.28996C15.6169 8.19623 15.5063 8.12183 15.3844 8.07107C15.2626 8.0203 15.1318 7.99416 14.9998 7.99416C14.8678 7.99416 14.7371 8.0203 14.6153 8.07107C14.4934 8.12183 14.3828 8.19623 14.2898 8.28996L11.9998 10.59L9.70984 8.28996C9.52153 8.10165 9.26614 7.99587 8.99984 7.99587C8.73353 7.99587 8.47814 8.10165 8.28983 8.28996C8.10153 8.47826 7.99574 8.73366 7.99574 8.99996C7.99574 9.26626 8.10153 9.52165 8.28983 9.70996L10.5898 12L8.28983 14.29C8.19611 14.3829 8.12171 14.4935 8.07094 14.6154C8.02017 14.7372 7.99404 14.8679 7.99404 15C7.99404 15.132 8.02017 15.2627 8.07094 15.3845C8.12171 15.5064 8.19611 15.617 8.28983 15.71C8.3828 15.8037 8.4934 15.8781 8.61526 15.9288C8.73712 15.9796 8.86782 16.0058 8.99984 16.0058C9.13185 16.0058 9.26255 15.9796 9.38441 15.9288C9.50627 15.8781 9.61687 15.8037 9.70984 15.71L11.9998 13.41L14.2898 15.71C14.3828 15.8037 14.4934 15.8781 14.6153 15.9288C14.7371 15.9796 14.8678 16.0058 14.9998 16.0058C15.1318 16.0058 15.2626 15.9796 15.3844 15.9288C15.5063 15.8781 15.6169 15.8037 15.7098 15.71C15.8036 15.617 15.878 15.5064 15.9287 15.3845C15.9795 15.2627 16.0056 15.132 16.0056 15C16.0056 14.8679 15.9795 14.7372 15.9287 14.6154C15.878 14.4935 15.8036 14.3829 15.7098 14.29L13.4098 12L15.7098 9.70996C15.8036 9.61699 15.878 9.50639 15.9287 9.38453C15.9795 9.26267 16.0056 9.13197 16.0056 8.99996C16.0056 8.86795 15.9795 8.73724 15.9287 8.61538C15.878 8.49352 15.8036 8.38292 15.7098 8.28996ZM19.0698 4.92996C18.1474 3.97486 17.0439 3.21303 15.8239 2.68894C14.6038 2.16485 13.2916 1.88899 11.9638 1.87745C10.6361 1.86591 9.31926 2.11893 8.09029 2.62174C6.86133 3.12455 5.74481 3.86708 4.80589 4.80601C3.86696 5.74493 3.12443 6.86145 2.62162 8.09042C2.11881 9.31938 1.86579 10.6362 1.87733 11.964C1.88887 13.2918 2.16473 14.604 2.68882 15.824C3.21291 17.044 3.97473 18.1475 4.92984 19.07C5.8523 20.0251 6.95575 20.7869 8.17579 21.311C9.39583 21.8351 10.708 22.1109 12.0358 22.1225C13.3636 22.134 14.6804 21.881 15.9094 21.3782C17.1383 20.8754 18.2549 20.1328 19.1938 19.1939C20.1327 18.255 20.8752 17.1385 21.3781 15.9095C21.8809 14.6805 22.1339 13.3637 22.1223 12.0359C22.1108 10.7082 21.8349 9.39595 21.3109 8.17591C20.7868 6.95587 20.0249 5.85243 19.0698 4.92996ZM17.6598 17.66C16.3519 18.9694 14.6304 19.7848 12.7886 19.9673C10.9469 20.1497 9.09884 19.688 7.55936 18.6607C6.01987 17.6334 4.88419 16.1042 4.34581 14.3334C3.80742 12.5627 3.89964 10.6601 4.60675 8.94974C5.31386 7.23938 6.59211 5.82711 8.22373 4.95352C9.85534 4.07993 11.7394 3.79909 13.5548 4.15883C15.3703 4.51857 17.0049 5.49665 18.1801 6.92642C19.3553 8.35619 19.9984 10.1492 19.9998 12C20.0034 13.0512 19.7984 14.0928 19.3968 15.0643C18.9951 16.0359 18.4047 16.9181 17.6598 17.66Z" />
</svg>`,close:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4099 11.9999L19.7099 5.70994C19.8982 5.52164 20.004 5.26624 20.004 4.99994C20.004 4.73364 19.8982 4.47825 19.7099 4.28994C19.5216 4.10164 19.2662 3.99585 18.9999 3.99585C18.7336 3.99585 18.4782 4.10164 18.2899 4.28994L11.9999 10.5899L5.70994 4.28994C5.52164 4.10164 5.26624 3.99585 4.99994 3.99585C4.73364 3.99585 4.47824 4.10164 4.28994 4.28994C4.10164 4.47825 3.99585 4.73364 3.99585 4.99994C3.99585 5.26624 4.10164 5.52164 4.28994 5.70994L10.5899 11.9999L4.28994 18.2899C4.19621 18.3829 4.12182 18.4935 4.07105 18.6154C4.02028 18.7372 3.99414 18.8679 3.99414 18.9999C3.99414 19.132 4.02028 19.2627 4.07105 19.3845C4.12182 19.5064 4.19621 19.617 4.28994 19.7099C4.3829 19.8037 4.4935 19.8781 4.61536 19.9288C4.73722 19.9796 4.86793 20.0057 4.99994 20.0057C5.13195 20.0057 5.26266 19.9796 5.38452 19.9288C5.50638 19.8781 5.61698 19.8037 5.70994 19.7099L11.9999 13.4099L18.2899 19.7099C18.3829 19.8037 18.4935 19.8781 18.6154 19.9288C18.7372 19.9796 18.8679 20.0057 18.9999 20.0057C19.132 20.0057 19.2627 19.9796 19.3845 19.9288C19.5064 19.8781 19.617 19.8037 19.7099 19.7099C19.8037 19.617 19.8781 19.5064 19.9288 19.3845C19.9796 19.2627 20.0057 19.132 20.0057 18.9999C20.0057 18.8679 19.9796 18.7372 19.9288 18.6154C19.8781 18.4935 19.8037 18.3829 19.7099 18.2899L13.4099 11.9999Z" />
</svg>`,document:`<svg width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 16.4509H12C12.5304 16.4509 13.0391 16.2402 13.4142 15.8651C13.7893 15.4901 14 14.9814 14 14.4509C14 13.9205 13.7893 13.4118 13.4142 13.0367C13.0391 12.6616 12.5304 12.4509 12 12.4509H10C9.46957 12.4509 8.96086 12.6616 8.58579 13.0367C8.21071 13.4118 8 13.9205 8 14.4509C8 14.9814 8.21071 15.4901 8.58579 15.8651C8.96086 16.2402 9.46957 16.4509 10 16.4509ZM10 20.4509C9.46957 20.4509 8.96086 20.6616 8.58579 21.0367C8.21071 21.4118 8 21.9205 8 22.4509C8 22.9814 8.21071 23.4901 8.58579 23.8651C8.96086 24.2402 9.46957 24.4509 10 24.4509H22C22.5304 24.4509 23.0391 24.2402 23.4142 23.8651C23.7893 23.4901 24 22.9814 24 22.4509C24 21.9205 23.7893 21.4118 23.4142 21.0367C23.0391 20.6616 22.5304 20.4509 22 20.4509H10ZM32 14.3309C31.9792 14.1472 31.9389 13.9662 31.88 13.7909V13.6109C31.7838 13.4053 31.6556 13.2163 31.5 13.0509L19.5 1.05093C19.3347 0.89536 19.1456 0.76709 18.94 0.670928C18.8803 0.662448 18.8197 0.662448 18.76 0.670928C18.5568 0.55441 18.3324 0.479616 18.1 0.450928H6C4.4087 0.450928 2.88258 1.08307 1.75736 2.20829C0.632141 3.33351 0 4.85963 0 6.45093V34.4509C0 36.0422 0.632141 37.5684 1.75736 38.6936C2.88258 39.8188 4.4087 40.4509 6 40.4509H26C27.5913 40.4509 29.1174 39.8188 30.2426 38.6936C31.3679 37.5684 32 36.0422 32 34.4509V14.4509C32 14.4509 32 14.4509 32 14.3309ZM20 7.27093L25.18 12.4509H22C21.4696 12.4509 20.9609 12.2402 20.5858 11.8651C20.2107 11.4901 20 10.9814 20 10.4509V7.27093ZM28 34.4509C28 34.9814 27.7893 35.4901 27.4142 35.8651C27.0391 36.2402 26.5304 36.4509 26 36.4509H6C5.46957 36.4509 4.96086 36.2402 4.58579 35.8651C4.21071 35.4901 4 34.9814 4 34.4509V6.45093C4 5.92049 4.21071 5.41179 4.58579 5.03671C4.96086 4.66164 5.46957 4.45093 6 4.45093H16V10.4509C16 12.0422 16.6321 13.5684 17.7574 14.6936C18.8826 15.8188 20.4087 16.4509 22 16.4509H28V34.4509ZM22 28.4509H10C9.46957 28.4509 8.96086 28.6616 8.58579 29.0367C8.21071 29.4118 8 29.9205 8 30.4509C8 30.9814 8.21071 31.4901 8.58579 31.8651C8.96086 32.2402 9.46957 32.4509 10 32.4509H22C22.5304 32.4509 23.0391 32.2402 23.4142 31.8651C23.7893 31.4901 24 30.9814 24 30.4509C24 29.9205 23.7893 29.4118 23.4142 29.0367C23.0391 28.6616 22.5304 28.4509 22 28.4509Z" fill="white"/>
<path d="M10 16.4509H12C12.5304 16.4509 13.0391 16.2402 13.4142 15.8651C13.7893 15.4901 14 14.9814 14 14.4509C14 13.9205 13.7893 13.4118 13.4142 13.0367C13.0391 12.6616 12.5304 12.4509 12 12.4509H10C9.46957 12.4509 8.96086 12.6616 8.58579 13.0367C8.21071 13.4118 8 13.9205 8 14.4509C8 14.9814 8.21071 15.4901 8.58579 15.8651C8.96086 16.2402 9.46957 16.4509 10 16.4509ZM10 20.4509C9.46957 20.4509 8.96086 20.6616 8.58579 21.0367C8.21071 21.4118 8 21.9205 8 22.4509C8 22.9814 8.21071 23.4901 8.58579 23.8651C8.96086 24.2402 9.46957 24.4509 10 24.4509H22C22.5304 24.4509 23.0391 24.2402 23.4142 23.8651C23.7893 23.4901 24 22.9814 24 22.4509C24 21.9205 23.7893 21.4118 23.4142 21.0367C23.0391 20.6616 22.5304 20.4509 22 20.4509H10ZM32 14.3309C31.9792 14.1472 31.9389 13.9662 31.88 13.7909V13.6109C31.7838 13.4053 31.6556 13.2163 31.5 13.0509L19.5 1.05093C19.3347 0.89536 19.1456 0.76709 18.94 0.670928C18.8803 0.662448 18.8197 0.662448 18.76 0.670928C18.5568 0.55441 18.3324 0.479616 18.1 0.450928H6C4.4087 0.450928 2.88258 1.08307 1.75736 2.20829C0.632141 3.33351 0 4.85963 0 6.45093V34.4509C0 36.0422 0.632141 37.5684 1.75736 38.6936C2.88258 39.8188 4.4087 40.4509 6 40.4509H26C27.5913 40.4509 29.1174 39.8188 30.2426 38.6936C31.3679 37.5684 32 36.0422 32 34.4509V14.4509C32 14.4509 32 14.4509 32 14.3309ZM20 7.27093L25.18 12.4509H22C21.4696 12.4509 20.9609 12.2402 20.5858 11.8651C20.2107 11.4901 20 10.9814 20 10.4509V7.27093ZM28 34.4509C28 34.9814 27.7893 35.4901 27.4142 35.8651C27.0391 36.2402 26.5304 36.4509 26 36.4509H6C5.46957 36.4509 4.96086 36.2402 4.58579 35.8651C4.21071 35.4901 4 34.9814 4 34.4509V6.45093C4 5.92049 4.21071 5.41179 4.58579 5.03671C4.96086 4.66164 5.46957 4.45093 6 4.45093H16V10.4509C16 12.0422 16.6321 13.5684 17.7574 14.6936C18.8826 15.8188 20.4087 16.4509 22 16.4509H28V34.4509ZM22 28.4509H10C9.46957 28.4509 8.96086 28.6616 8.58579 29.0367C8.21071 29.4118 8 29.9205 8 30.4509C8 30.9814 8.21071 31.4901 8.58579 31.8651C8.96086 32.2402 9.46957 32.4509 10 32.4509H22C22.5304 32.4509 23.0391 32.2402 23.4142 31.8651C23.7893 31.4901 24 30.9814 24 30.4509C24 29.9205 23.7893 29.4118 23.4142 29.0367C23.0391 28.6616 22.5304 28.4509 22 28.4509Z" fill="black" fill-opacity="0.1"/>
</svg>`,"down-arrow-1":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9997 9.17C16.8123 8.98375 16.5589 8.87921 16.2947 8.87921C16.0305 8.87921 15.7771 8.98375 15.5897 9.17L11.9997 12.71L8.4597 9.17C8.27234 8.98375 8.01889 8.87921 7.7547 8.87921C7.49052 8.87921 7.23707 8.98375 7.0497 9.17C6.95598 9.26297 6.88158 9.37357 6.83081 9.49543C6.78004 9.61729 6.75391 9.74799 6.75391 9.88C6.75391 10.012 6.78004 10.1427 6.83081 10.2646C6.88158 10.3864 6.95598 10.497 7.0497 10.59L11.2897 14.83C11.3827 14.9237 11.4933 14.9981 11.6151 15.0489C11.737 15.0997 11.8677 15.1258 11.9997 15.1258C12.1317 15.1258 12.2624 15.0997 12.3843 15.0489C12.5061 14.9981 12.6167 14.9237 12.7097 14.83L16.9997 10.59C17.0934 10.497 17.1678 10.3864 17.2186 10.2646C17.2694 10.1427 17.2955 10.012 17.2955 9.88C17.2955 9.74799 17.2694 9.61729 17.2186 9.49543C17.1678 9.37357 17.0934 9.26297 16.9997 9.17Z" />
</svg>`,"down-arrow-2":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7102 11.29C17.6172 11.1963 17.5066 11.1219 17.3848 11.0711C17.2629 11.0203 17.1322 10.9942 17.0002 10.9942C16.8682 10.9942 16.7375 11.0203 16.6156 11.0711C16.4937 11.1219 16.3831 11.1963 16.2902 11.29L13.0002 14.59V7C13.0002 6.73478 12.8948 6.48043 12.7073 6.29289C12.5198 6.10536 12.2654 6 12.0002 6C11.735 6 11.4806 6.10536 11.2931 6.29289C11.1055 6.48043 11.0002 6.73478 11.0002 7V14.59L7.71019 11.29C7.52188 11.1017 7.26649 10.9959 7.00019 10.9959C6.73388 10.9959 6.47849 11.1017 6.29019 11.29C6.10188 11.4783 5.99609 11.7337 5.99609 12C5.99609 12.2663 6.10188 12.5217 6.29019 12.71L11.2902 17.71C11.3853 17.801 11.4974 17.8724 11.6202 17.92C11.7399 17.9729 11.8693 18.0002 12.0002 18.0002C12.1311 18.0002 12.2605 17.9729 12.3802 17.92C12.5029 17.8724 12.6151 17.801 12.7102 17.71L17.7102 12.71C17.8039 12.617 17.8783 12.5064 17.9291 12.3846C17.9798 12.2627 18.006 12.132 18.006 12C18.006 11.868 17.9798 11.7373 17.9291 11.6154C17.8783 11.4936 17.8039 11.383 17.7102 11.29Z" />
</svg>`,"download-file":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H8ZM13 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V12C17 12.2652 17.1054 12.5196 17.2929 12.7071C17.4804 12.8946 17.7348 13 18 13C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12V9C19 9 19 9 19 8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67V8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11C12.4369 2.10421 12.4031 2.10421 12.37 2.11C12.2728 2.058 12.1683 2.02092 12.06 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H13C13.2652 22 13.5196 21.8946 13.7071 21.7071C13.8946 21.5196 14 21.2652 14 21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM20.71 18.29C20.617 18.1963 20.5064 18.1219 20.3846 18.0711C20.2627 18.0203 20.132 17.9942 20 17.9942C19.868 17.9942 19.7373 18.0203 19.6154 18.0711C19.4936 18.1219 19.383 18.1963 19.29 18.29L19 18.59V16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16V18.59L16.71 18.29C16.5217 18.1017 16.2663 17.9959 16 17.9959C15.7337 17.9959 15.4783 18.1017 15.29 18.29C15.1017 18.4783 14.9959 18.7337 14.9959 19C14.9959 19.2663 15.1017 19.5217 15.29 19.71L17.29 21.71C17.3851 21.801 17.4972 21.8724 17.62 21.92C17.7397 21.9729 17.8691 22.0002 18 22.0002C18.1309 22.0002 18.2603 21.9729 18.38 21.92C18.5028 21.8724 18.6149 21.801 18.71 21.71L20.71 19.71C20.8037 19.617 20.8781 19.5064 20.9289 19.3846C20.9797 19.2627 21.0058 19.132 21.0058 19C21.0058 18.868 20.9797 18.7373 20.9289 18.6154C20.8781 18.4936 20.8037 18.383 20.71 18.29ZM12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17C13 16.7348 12.8946 16.4804 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16H8C7.73478 16 7.48043 16.1054 7.29289 16.2929C7.10536 16.4804 7 16.7348 7 17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H12Z" />
</svg>`,download:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 14C20.7348 14 20.4804 14.1054 20.2929 14.2929C20.1054 14.4804 20 14.7348 20 15V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15C4 14.7348 3.89464 14.4804 3.70711 14.2929C3.51957 14.1054 3.26522 14 3 14C2.73478 14 2.48043 14.1054 2.29289 14.2929C2.10536 14.4804 2 14.7348 2 15V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V15C22 14.7348 21.8946 14.4804 21.7071 14.2929C21.5196 14.1054 21.2652 14 21 14ZM11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.7397 15.9729 11.8691 16.0002 12 16.0002C12.1309 16.0002 12.2603 15.9729 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L16.71 11.71C16.8983 11.5217 17.0041 11.2663 17.0041 11C17.0041 10.7337 16.8983 10.4783 16.71 10.29C16.5217 10.1017 16.2663 9.99591 16 9.99591C15.7337 9.99591 15.4783 10.1017 15.29 10.29L13 12.59V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V12.59L8.71 10.29C8.61676 10.1968 8.50607 10.1228 8.38425 10.0723C8.26243 10.0219 8.13186 9.99591 8 9.99591C7.86814 9.99591 7.73757 10.0219 7.61575 10.0723C7.49393 10.1228 7.38324 10.1968 7.29 10.29C7.19676 10.3832 7.1228 10.4939 7.07234 10.6158C7.02188 10.7376 6.99591 10.8681 6.99591 11C6.99591 11.1319 7.02188 11.2624 7.07234 11.3842C7.1228 11.5061 7.19676 11.6168 7.29 11.71L11.29 15.71Z" />
</svg>`,"exclamation-mark-1":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7ZM12 15C11.8022 15 11.6089 15.0586 11.4444 15.1685C11.28 15.2784 11.1518 15.4346 11.0761 15.6173C11.0004 15.8 10.9806 16.0011 11.0192 16.1951C11.0578 16.3891 11.153 16.5673 11.2929 16.7071C11.4327 16.847 11.6109 16.9422 11.8049 16.9808C11.9989 17.0194 12.2 16.9996 12.3827 16.9239C12.5654 16.8482 12.7216 16.72 12.8315 16.5556C12.9414 16.3911 13 16.1978 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15ZM21.71 7.56L16.44 2.29C16.2484 2.10727 15.9948 2.00368 15.73 2H8.27C8.00523 2.00368 7.75163 2.10727 7.56 2.29L2.29 7.56C2.10727 7.75163 2.00368 8.00523 2 8.27V15.73C2.00368 15.9948 2.10727 16.2484 2.29 16.44L7.56 21.71C7.75163 21.8927 8.00523 21.9963 8.27 22H15.73C15.9948 21.9963 16.2484 21.8927 16.44 21.71L21.71 16.44C21.8927 16.2484 21.9963 15.9948 22 15.73V8.27C21.9963 8.00523 21.8927 7.75163 21.71 7.56ZM20 15.31L15.31 20H8.69L4 15.31V8.69L8.69 4H15.31L20 8.69V15.31Z" />
</svg>`,"exclamation-mark-2":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0005 16C11.8027 16 11.6093 16.0587 11.4449 16.1686C11.2804 16.2784 11.1523 16.4346 11.0766 16.6173C11.0009 16.8001 10.9811 17.0011 11.0197 17.1951C11.0583 17.3891 11.1535 17.5673 11.2933 17.7071C11.4332 17.847 11.6114 17.9422 11.8054 17.9808C11.9993 18.0194 12.2004 17.9996 12.3831 17.9239C12.5659 17.8482 12.722 17.72 12.8319 17.5556C12.9418 17.3911 13.0005 17.1978 13.0005 17C13.0005 16.7348 12.8951 16.4805 12.7076 16.2929C12.52 16.1054 12.2657 16 12.0005 16ZM22.6705 17.47L14.6205 3.47003C14.3603 3.00354 13.9802 2.61498 13.5196 2.3445C13.0591 2.07401 12.5346 1.9314 12.0005 1.9314C11.4663 1.9314 10.9419 2.07401 10.4813 2.3445C10.0207 2.61498 9.64065 3.00354 9.38046 3.47003L1.38046 17.47C1.11125 17.924 0.966598 18.441 0.9611 18.9688C0.955602 19.4966 1.08945 20.0166 1.34914 20.4761C1.60883 20.9356 1.98516 21.3185 2.44014 21.5861C2.89512 21.8536 3.41264 21.9964 3.94046 22H20.0605C20.5925 22.0053 21.1164 21.8689 21.5784 21.6049C22.0403 21.341 22.4238 20.9589 22.6894 20.4978C22.9551 20.0368 23.0933 19.5134 23.09 18.9814C23.0866 18.4493 22.9418 17.9277 22.6705 17.47ZM20.9405 19.47C20.8528 19.626 20.7249 19.7556 20.5701 19.8453C20.4154 19.935 20.2393 19.9815 20.0605 19.98H3.94046C3.76157 19.9815 3.58556 19.935 3.43077 19.8453C3.27599 19.7556 3.14811 19.626 3.06046 19.47C2.97269 19.318 2.92648 19.1456 2.92648 18.97C2.92648 18.7945 2.97269 18.622 3.06046 18.47L11.0605 4.47003C11.1444 4.30623 11.2719 4.16876 11.4289 4.07277C11.5859 3.97678 11.7664 3.92599 11.9505 3.92599C12.1345 3.92599 12.315 3.97678 12.472 4.07277C12.629 4.16876 12.7565 4.30623 12.8405 4.47003L20.8905 18.47C20.9897 18.6199 21.0467 18.7937 21.0555 18.9732C21.0643 19.1527 21.0245 19.3312 20.9405 19.49V19.47ZM12.0005 8.00003C11.7352 8.00003 11.4809 8.10538 11.2933 8.29292C11.1058 8.48046 11.0005 8.73481 11.0005 9.00003V13C11.0005 13.2652 11.1058 13.5196 11.2933 13.7071C11.4809 13.8947 11.7352 14 12.0005 14C12.2657 14 12.52 13.8947 12.7076 13.7071C12.8951 13.5196 13.0005 13.2652 13.0005 13V9.00003C13.0005 8.73481 12.8951 8.48046 12.7076 8.29292C12.52 8.10538 12.2657 8.00003 12.0005 8.00003Z" />
</svg>`,"exclamation-mark-3":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7ZM12.92 15.62C12.8981 15.5563 12.8679 15.4957 12.83 15.44L12.71 15.29C12.5694 15.1512 12.3908 15.0572 12.1968 15.0199C12.0028 14.9825 11.8021 15.0034 11.62 15.08C11.4988 15.1306 11.3872 15.2017 11.29 15.29C11.1973 15.3834 11.124 15.4943 11.0742 15.6161C11.0245 15.7379 10.9992 15.8684 11 16C11.0016 16.1307 11.0288 16.2598 11.08 16.38C11.1249 16.5041 11.1966 16.6168 11.2899 16.7101C11.3832 16.8034 11.4959 16.8751 11.62 16.92C11.7397 16.9729 11.8691 17.0002 12 17.0002C12.1309 17.0002 12.2603 16.9729 12.38 16.92C12.5041 16.8751 12.6168 16.8034 12.7101 16.7101C12.8034 16.6168 12.8751 16.5041 12.92 16.38C12.9712 16.2598 12.9984 16.1307 13 16C13.0049 15.9334 13.0049 15.8666 13 15.8C12.9828 15.7362 12.9558 15.6755 12.92 15.62ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" />
</svg>`,eye:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9196 11.6C19.8996 6.91 16.0996 4 11.9996 4C7.89958 4 4.09958 6.91 2.07958 11.6C2.02452 11.7262 1.99609 11.8623 1.99609 12C1.99609 12.1377 2.02452 12.2738 2.07958 12.4C4.09958 17.09 7.89958 20 11.9996 20C16.0996 20 19.8996 17.09 21.9196 12.4C21.9746 12.2738 22.0031 12.1377 22.0031 12C22.0031 11.8623 21.9746 11.7262 21.9196 11.6ZM11.9996 18C8.82958 18 5.82958 15.71 4.09958 12C5.82958 8.29 8.82958 6 11.9996 6C15.1696 6 18.1696 8.29 19.8996 12C18.1696 15.71 15.1696 18 11.9996 18ZM11.9996 8C11.2085 8 10.4351 8.2346 9.7773 8.67412C9.1195 9.11365 8.60681 9.73836 8.30406 10.4693C8.00131 11.2002 7.9221 12.0044 8.07644 12.7804C8.23078 13.5563 8.61174 14.269 9.17115 14.8284C9.73056 15.3878 10.4433 15.7688 11.2192 15.9231C11.9951 16.0775 12.7994 15.9983 13.5303 15.6955C14.2612 15.3928 14.8859 14.8801 15.3255 14.2223C15.765 13.5645 15.9996 12.7911 15.9996 12C15.9996 10.9391 15.5782 9.92172 14.828 9.17157C14.0779 8.42143 13.0604 8 11.9996 8ZM11.9996 14C11.604 14 11.2173 13.8827 10.8884 13.6629C10.5595 13.4432 10.3032 13.1308 10.1518 12.7654C10.0004 12.3999 9.96084 11.9978 10.038 11.6098C10.1152 11.2219 10.3057 10.8655 10.5854 10.5858C10.8651 10.3061 11.2214 10.1156 11.6094 10.0384C11.9974 9.96126 12.3995 10.0009 12.7649 10.1522C13.1304 10.3036 13.4428 10.56 13.6625 10.8889C13.8823 11.2178 13.9996 11.6044 13.9996 12C13.9996 12.5304 13.7889 13.0391 13.4138 13.4142C13.0387 13.7893 12.53 14 11.9996 14Z" />
</svg>`,facebook:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1204 5.32H17.0004V2.14C16.0901 2.04535 15.1755 1.99862 14.2604 2C11.5404 2 9.68035 3.66 9.68035 6.7V9.32H6.61035V12.88H9.68035V22H13.3604V12.88H16.4204L16.8804 9.32H13.3604V7.05C13.3604 6 13.6404 5.32 15.1204 5.32Z" />
</svg>`,help:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M11.29 15.29C11.247 15.3375 11.2069 15.3876 11.17 15.44C11.1322 15.4957 11.1019 15.5563 11.08 15.62C11.0512 15.6767 11.031 15.7374 11.02 15.8C11.0151 15.8666 11.0151 15.9334 11.02 16C11.0166 16.1312 11.044 16.2613 11.1 16.38C11.1449 16.5041 11.2166 16.6168 11.3099 16.7101C11.4032 16.8034 11.5159 16.8751 11.64 16.92C11.7597 16.9729 11.8891 17.0002 12.02 17.0002C12.1509 17.0002 12.2803 16.9729 12.4 16.92C12.5241 16.8751 12.6368 16.8034 12.7301 16.7101C12.8234 16.6168 12.8951 16.5041 12.94 16.38C12.9844 16.2584 13.0048 16.1294 13 16C13.0008 15.8684 12.9755 15.7379 12.9258 15.6161C12.876 15.4943 12.8027 15.3834 12.71 15.29C12.617 15.1963 12.5064 15.1219 12.3846 15.0711C12.2627 15.0203 12.132 14.9942 12 14.9942C11.868 14.9942 11.7373 15.0203 11.6154 15.0711C11.4936 15.1219 11.383 15.1963 11.29 15.29ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM12 7C11.4731 6.99966 10.9553 7.13812 10.4989 7.40144C10.0425 7.66476 9.66347 8.04366 9.4 8.5C9.32765 8.61382 9.27907 8.7411 9.25718 8.87418C9.23529 9.00726 9.24055 9.14339 9.27263 9.27439C9.30472 9.40538 9.36297 9.52854 9.44389 9.63643C9.52481 9.74433 9.62671 9.83475 9.74348 9.90224C9.86024 9.96974 9.98945 10.0129 10.1233 10.0292C10.2572 10.0454 10.393 10.0345 10.5225 9.99688C10.6521 9.9593 10.7727 9.89591 10.8771 9.81052C10.9814 9.72513 11.0675 9.6195 11.13 9.5C11.2181 9.3474 11.345 9.22078 11.4978 9.13298C11.6505 9.04518 11.8238 8.9993 12 9C12.2652 9 12.5196 9.10536 12.7071 9.29289C12.8946 9.48043 13 9.73478 13 10C13 10.2652 12.8946 10.5196 12.7071 10.7071C12.5196 10.8946 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13V12.82C13.6614 12.58 14.2174 12.1152 14.5708 11.5069C14.9242 10.8985 15.0525 10.1853 14.9334 9.49189C14.8143 8.79849 14.4552 8.16902 13.919 7.71352C13.3828 7.25801 12.7035 7.00546 12 7Z" />
</svg>`,image:`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.8333 3.3335H4.16667C3.50363 3.3335 2.86775 3.59689 2.3989 4.06573C1.93006 4.53457 1.66667 5.17045 1.66667 5.8335V14.1668C1.66667 14.8299 1.93006 15.4658 2.3989 15.9346C2.86775 16.4034 3.50363 16.6668 4.16667 16.6668H15.8333C16.4964 16.6668 17.1323 16.4034 17.6011 15.9346C18.0699 15.4658 18.3333 14.8299 18.3333 14.1668V5.8335C18.3333 5.17045 18.0699 4.53457 17.6011 4.06573C17.1323 3.59689 16.4964 3.3335 15.8333 3.3335ZM4.16667 15.0002C3.94566 15.0002 3.7337 14.9124 3.57742 14.7561C3.42114 14.5998 3.33334 14.3878 3.33334 14.1668V12.1502L6.08334 9.4085C6.23911 9.25581 6.44854 9.17028 6.66667 9.17028C6.8848 9.17028 7.09423 9.25581 7.25001 9.4085L12.8417 15.0002H4.16667ZM16.6667 14.1668C16.6667 14.3878 16.5789 14.5998 16.4226 14.7561C16.2663 14.9124 16.0544 15.0002 15.8333 15.0002H15.1917L12.0167 11.8085L12.75 11.0752C12.9058 10.9225 13.1152 10.8369 13.3333 10.8369C13.5515 10.8369 13.7609 10.9225 13.9167 11.0752L16.6667 13.8168V14.1668ZM16.6667 11.4668L15.1 9.9085C14.6251 9.45219 13.992 9.19735 13.3333 9.19735C12.6747 9.19735 12.0416 9.45219 11.5667 9.9085L10.8333 10.6418L8.43334 8.24183C7.95839 7.78552 7.3253 7.53068 6.66667 7.53068C6.00804 7.53068 5.37496 7.78552 4.90001 8.24183L3.33334 9.80016V5.8335C3.33334 5.61248 3.42114 5.40052 3.57742 5.24424C3.7337 5.08796 3.94566 5.00016 4.16667 5.00016H15.8333C16.0544 5.00016 16.2663 5.08796 16.4226 5.24424C16.5789 5.40052 16.6667 5.61248 16.6667 5.8335V11.4668Z "/>
  <path d="M15.8333 3.3335H4.16667C3.50363 3.3335 2.86775 3.59689 2.3989 4.06573C1.93006 4.53457 1.66667 5.17045 1.66667 5.8335V14.1668C1.66667 14.8299 1.93006 15.4658 2.3989 15.9346C2.86775 16.4034 3.50363 16.6668 4.16667 16.6668H15.8333C16.4964 16.6668 17.1323 16.4034 17.6011 15.9346C18.0699 15.4658 18.3333 14.8299 18.3333 14.1668V5.8335C18.3333 5.17045 18.0699 4.53457 17.6011 4.06573C17.1323 3.59689 16.4964 3.3335 15.8333 3.3335ZM4.16667 15.0002C3.94566 15.0002 3.7337 14.9124 3.57742 14.7561C3.42114 14.5998 3.33334 14.3878 3.33334 14.1668V12.1502L6.08334 9.4085C6.23911 9.25581 6.44854 9.17028 6.66667 9.17028C6.8848 9.17028 7.09423 9.25581 7.25001 9.4085L12.8417 15.0002H4.16667ZM16.6667 14.1668C16.6667 14.3878 16.5789 14.5998 16.4226 14.7561C16.2663 14.9124 16.0544 15.0002 15.8333 15.0002H15.1917L12.0167 11.8085L12.75 11.0752C12.9058 10.9225 13.1152 10.8369 13.3333 10.8369C13.5515 10.8369 13.7609 10.9225 13.9167 11.0752L16.6667 13.8168V14.1668ZM16.6667 11.4668L15.1 9.9085C14.6251 9.45219 13.992 9.19735 13.3333 9.19735C12.6747 9.19735 12.0416 9.45219 11.5667 9.9085L10.8333 10.6418L8.43334 8.24183C7.95839 7.78552 7.3253 7.53068 6.66667 7.53068C6.00804 7.53068 5.37496 7.78552 4.90001 8.24183L3.33334 9.80016V5.8335C3.33334 5.61248 3.42114 5.40052 3.57742 5.24424C3.7337 5.08796 3.94566 5.00016 4.16667 5.00016H15.8333C16.0544 5.00016 16.2663 5.08796 16.4226 5.24424C16.5789 5.40052 16.6667 5.61248 16.6667 5.8335V11.4668Z" />
  <path d="M15.8333 3.3335H4.16667C3.50363 3.3335 2.86775 3.59689 2.3989 4.06573C1.93006 4.53457 1.66667 5.17045 1.66667 5.8335V14.1668C1.66667 14.8299 1.93006 15.4658 2.3989 15.9346C2.86775 16.4034 3.50363 16.6668 4.16667 16.6668H15.8333C16.4964 16.6668 17.1323 16.4034 17.6011 15.9346C18.0699 15.4658 18.3333 14.8299 18.3333 14.1668V5.8335C18.3333 5.17045 18.0699 4.53457 17.6011 4.06573C17.1323 3.59689 16.4964 3.3335 15.8333 3.3335ZM4.16667 15.0002C3.94566 15.0002 3.7337 14.9124 3.57742 14.7561C3.42114 14.5998 3.33334 14.3878 3.33334 14.1668V12.1502L6.08334 9.4085C6.23911 9.25581 6.44854 9.17028 6.66667 9.17028C6.8848 9.17028 7.09423 9.25581 7.25001 9.4085L12.8417 15.0002H4.16667ZM16.6667 14.1668C16.6667 14.3878 16.5789 14.5998 16.4226 14.7561C16.2663 14.9124 16.0544 15.0002 15.8333 15.0002H15.1917L12.0167 11.8085L12.75 11.0752C12.9058 10.9225 13.1152 10.8369 13.3333 10.8369C13.5515 10.8369 13.7609 10.9225 13.9167 11.0752L16.6667 13.8168V14.1668ZM16.6667 11.4668L15.1 9.9085C14.6251 9.45219 13.992 9.19735 13.3333 9.19735C12.6747 9.19735 12.0416 9.45219 11.5667 9.9085L10.8333 10.6418L8.43334 8.24183C7.95839 7.78552 7.3253 7.53068 6.66667 7.53068C6.00804 7.53068 5.37496 7.78552 4.90001 8.24183L3.33334 9.80016V5.8335C3.33334 5.61248 3.42114 5.40052 3.57742 5.24424C3.7337 5.08796 3.94566 5.00016 4.16667 5.00016H15.8333C16.0544 5.00016 16.2663 5.08796 16.4226 5.24424C16.5789 5.40052 16.6667 5.61248 16.6667 5.8335V11.4668Z" />
</svg>`,"information-mark":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12.38 7.08C12.1365 6.97998 11.8635 6.97998 11.62 7.08C11.4973 7.12759 11.3851 7.19896 11.29 7.29C11.2017 7.3872 11.1306 7.49882 11.08 7.62C11.024 7.73868 10.9966 7.86882 11 8C10.9992 8.13161 11.0245 8.26207 11.0742 8.38391C11.124 8.50574 11.1973 8.61656 11.29 8.71C11.3872 8.79833 11.4988 8.86936 11.62 8.92C11.7715 8.98224 11.936 9.00632 12.099 8.99011C12.2619 8.97391 12.4184 8.91792 12.5547 8.82707C12.691 8.73622 12.8029 8.61328 12.8805 8.46907C12.9582 8.32486 12.9992 8.16378 13 8C12.9963 7.73523 12.8927 7.48163 12.71 7.29C12.6149 7.19896 12.5028 7.12759 12.38 7.08ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" />
</svg>`,instagram:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17.34 5.46a1.202 1.202 0 0 0-1.177 1.434A1.199 1.199 0 1 0 17.34 5.46Zm4.6 2.42a7.578 7.578 0 0 0-.46-2.43 4.933 4.933 0 0 0-1.16-1.77 4.688 4.688 0 0 0-1.77-1.15 7.288 7.288 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.288 7.288 0 0 0-2.43.47 4.793 4.793 0 0 0-1.77 1.15 4.688 4.688 0 0 0-1.15 1.77 7.288 7.288 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12c.017.831.176 1.653.47 2.43.244.67.637 1.275 1.15 1.77.497.51 1.102.903 1.77 1.15a7.288 7.288 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.288 7.288 0 0 0 2.43-.47 4.688 4.688 0 0 0 1.77-1.15 4.855 4.855 0 0 0 1.16-1.77c.285-.779.441-1.6.46-2.43 0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.594 5.594 0 0 1-.34 1.86c-.16.435-.416.828-.75 1.15a3.188 3.188 0 0 1-1.15.75 5.594 5.594 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.737 5.737 0 0 1-1.94-.3 3.267 3.267 0 0 1-1.1-.75 3 3 0 0 1-.74-1.15 5.533 5.533 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.53 5.53 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.136 3.136 0 0 1 1.1-.8A5.729 5.729 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.594 5.594 0 0 1 1.86.34 3.07 3.07 0 0 1 1.19.8c.328.307.584.683.75 1.1.222.609.337 1.252.34 1.9.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87a5.12 5.12 0 0 0-4.732 3.174 5.128 5.128 0 0 0 6.707 6.694A5.126 5.126 0 0 0 17.14 12a5.126 5.126 0 0 0-3.172-4.745A5.109 5.109 0 0 0 12 6.87Zm0 8.46a3.329 3.329 0 0 1-.65-6.596 3.326 3.326 0 0 1 3.419 1.416A3.329 3.329 0 0 1 12 15.33Z"/>
</svg>`,layer:`<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.00079 14.1702L19.0008 24.5702C19.3048 24.7457 19.6497 24.8382 20.0008 24.8382C20.3519 24.8382 20.6968 24.7457 21.0008 24.5702L39.0008 14.1702C39.3031 13.9957 39.5544 13.7451 39.7298 13.4434C39.9053 13.1416 39.9987 12.7992 40.0008 12.4502C40.0022 12.0978 39.9104 11.7513 39.7348 11.4457C39.5592 11.1401 39.306 10.8864 39.0008 10.7102L21.0008 0.330205C20.6968 0.154669 20.3519 0.0622559 20.0008 0.0622559C19.6497 0.0622559 19.3048 0.154669 19.0008 0.330205L1.00079 10.7102C0.695585 10.8864 0.442356 11.1401 0.26675 11.4457C0.0911432 11.7513 -0.000605713 12.0978 0.000793422 12.4502C0.00290016 12.7992 0.0963113 13.1416 0.271743 13.4434C0.447174 13.7451 0.698518 13.9957 1.00079 14.1702ZM20.0008 4.4502L34.0008 12.4502L20.0008 20.4502L6.00079 12.4502L20.0008 4.4502ZM37.0008 18.7902L20.0008 28.4502L3.00079 18.7102C2.77253 18.578 2.52035 18.4922 2.25879 18.4578C1.99724 18.4235 1.73147 18.4412 1.47679 18.51C1.22211 18.5787 0.983549 18.6972 0.774855 18.8586C0.566161 19.02 0.391454 19.221 0.260794 19.4502C4.86672e-05 19.9094 -0.0684839 20.4532 0.0701499 20.9627C0.208784 21.4723 0.54333 21.9064 1.00079 22.1702L19.0008 32.5702C19.3048 32.7457 19.6497 32.8382 20.0008 32.8382C20.3519 32.8382 20.6968 32.7457 21.0008 32.5702L39.0008 22.1702C39.4583 21.9064 39.7928 21.4723 39.9314 20.9627C40.0701 20.4532 40.0015 19.9094 39.7408 19.4502C39.6101 19.221 39.4354 19.02 39.2267 18.8586C39.018 18.6972 38.7795 18.5787 38.5248 18.51C38.2701 18.4412 38.0043 18.4235 37.7428 18.4578C37.4812 18.4922 37.2291 18.578 37.0008 18.7102V18.7902ZM37.0008 26.7902L20.0008 36.4502L3.00079 26.7102C2.77253 26.578 2.52035 26.4922 2.25879 26.4578C1.99724 26.4235 1.73147 26.4412 1.47679 26.51C1.22211 26.5787 0.983549 26.6972 0.774855 26.8586C0.566161 27.02 0.391454 27.221 0.260794 27.4502C4.86672e-05 27.9094 -0.0684839 28.4532 0.0701499 28.9627C0.208784 29.4723 0.54333 29.9064 1.00079 30.1702L19.0008 40.5702C19.3048 40.7457 19.6497 40.8382 20.0008 40.8382C20.3519 40.8382 20.6968 40.7457 21.0008 40.5702L39.0008 30.1702C39.4583 29.9064 39.7928 29.4723 39.9314 28.9627C40.0701 28.4532 40.0015 27.9094 39.7408 27.4502C39.6101 27.221 39.4354 27.02 39.2267 26.8586C39.018 26.6972 38.7795 26.5787 38.5248 26.51C38.2701 26.4412 38.0043 26.4235 37.7428 26.4578C37.4812 26.4922 37.2291 26.578 37.0008 26.7102V26.7902Z" fill="white"/>
<path d="M1.00079 14.1702L19.0008 24.5702C19.3048 24.7457 19.6497 24.8382 20.0008 24.8382C20.3519 24.8382 20.6968 24.7457 21.0008 24.5702L39.0008 14.1702C39.3031 13.9957 39.5544 13.7451 39.7298 13.4434C39.9053 13.1416 39.9987 12.7992 40.0008 12.4502C40.0022 12.0978 39.9104 11.7513 39.7348 11.4457C39.5592 11.1401 39.306 10.8864 39.0008 10.7102L21.0008 0.330205C20.6968 0.154669 20.3519 0.0622559 20.0008 0.0622559C19.6497 0.0622559 19.3048 0.154669 19.0008 0.330205L1.00079 10.7102C0.695585 10.8864 0.442356 11.1401 0.26675 11.4457C0.0911432 11.7513 -0.000605713 12.0978 0.000793422 12.4502C0.00290016 12.7992 0.0963113 13.1416 0.271743 13.4434C0.447174 13.7451 0.698518 13.9957 1.00079 14.1702ZM20.0008 4.4502L34.0008 12.4502L20.0008 20.4502L6.00079 12.4502L20.0008 4.4502ZM37.0008 18.7902L20.0008 28.4502L3.00079 18.7102C2.77253 18.578 2.52035 18.4922 2.25879 18.4578C1.99724 18.4235 1.73147 18.4412 1.47679 18.51C1.22211 18.5787 0.983549 18.6972 0.774855 18.8586C0.566161 19.02 0.391454 19.221 0.260794 19.4502C4.86672e-05 19.9094 -0.0684839 20.4532 0.0701499 20.9627C0.208784 21.4723 0.54333 21.9064 1.00079 22.1702L19.0008 32.5702C19.3048 32.7457 19.6497 32.8382 20.0008 32.8382C20.3519 32.8382 20.6968 32.7457 21.0008 32.5702L39.0008 22.1702C39.4583 21.9064 39.7928 21.4723 39.9314 20.9627C40.0701 20.4532 40.0015 19.9094 39.7408 19.4502C39.6101 19.221 39.4354 19.02 39.2267 18.8586C39.018 18.6972 38.7795 18.5787 38.5248 18.51C38.2701 18.4412 38.0043 18.4235 37.7428 18.4578C37.4812 18.4922 37.2291 18.578 37.0008 18.7102V18.7902ZM37.0008 26.7902L20.0008 36.4502L3.00079 26.7102C2.77253 26.578 2.52035 26.4922 2.25879 26.4578C1.99724 26.4235 1.73147 26.4412 1.47679 26.51C1.22211 26.5787 0.983549 26.6972 0.774855 26.8586C0.566161 27.02 0.391454 27.221 0.260794 27.4502C4.86672e-05 27.9094 -0.0684839 28.4532 0.0701499 28.9627C0.208784 29.4723 0.54333 29.9064 1.00079 30.1702L19.0008 40.5702C19.3048 40.7457 19.6497 40.8382 20.0008 40.8382C20.3519 40.8382 20.6968 40.7457 21.0008 40.5702L39.0008 30.1702C39.4583 29.9064 39.7928 29.4723 39.9314 28.9627C40.0701 28.4532 40.0015 27.9094 39.7408 27.4502C39.6101 27.221 39.4354 27.02 39.2267 26.8586C39.018 26.6972 38.7795 26.5787 38.5248 26.51C38.2701 26.4412 38.0043 26.4235 37.7428 26.4578C37.4812 26.4922 37.2291 26.578 37.0008 26.7102V26.7902Z" fill="black" fill-opacity="0.1"/>
</svg>`,layers:`<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.5 0.450928H14.5C13.9696 0.450928 13.4609 0.661641 13.0858 1.03671C12.7107 1.41179 12.5 1.92049 12.5 2.45093V10.4509H8.5C7.96957 10.4509 7.46086 10.6616 7.08579 11.0367C6.71071 11.4118 6.5 11.9205 6.5 12.4509V20.4509H2.5C1.96957 20.4509 1.46086 20.6616 1.08579 21.0367C0.710714 21.4118 0.5 21.9205 0.5 22.4509V38.4509C0.5 38.9814 0.710714 39.4901 1.08579 39.8651C1.46086 40.2402 1.96957 40.4509 2.5 40.4509H18.5C19.0304 40.4509 19.5391 40.2402 19.9142 39.8651C20.2893 39.4901 20.5 38.9814 20.5 38.4509V34.4509H28.5C29.0304 34.4509 29.5391 34.2402 29.9142 33.8651C30.2893 33.4901 30.5 32.9814 30.5 32.4509V28.4509H38.5C39.0304 28.4509 39.5391 28.2402 39.9142 27.8651C40.2893 27.4901 40.5 26.9814 40.5 26.4509V2.45093C40.5 1.92049 40.2893 1.41179 39.9142 1.03671C39.5391 0.661641 39.0304 0.450928 38.5 0.450928ZM16.5 36.4509H4.5V24.4509H16.5V36.4509ZM26.5 30.4509H20.5V22.4509C20.5 21.9205 20.2893 21.4118 19.9142 21.0367C19.5391 20.6616 19.0304 20.4509 18.5 20.4509H10.5V14.4509H26.5V30.4509ZM36.5 24.4509H30.5V12.4509C30.5 11.9205 30.2893 11.4118 29.9142 11.0367C29.5391 10.6616 29.0304 10.4509 28.5 10.4509H16.5V4.45093H36.5V24.4509Z" fill="white"/>
<path d="M38.5 0.450928H14.5C13.9696 0.450928 13.4609 0.661641 13.0858 1.03671C12.7107 1.41179 12.5 1.92049 12.5 2.45093V10.4509H8.5C7.96957 10.4509 7.46086 10.6616 7.08579 11.0367C6.71071 11.4118 6.5 11.9205 6.5 12.4509V20.4509H2.5C1.96957 20.4509 1.46086 20.6616 1.08579 21.0367C0.710714 21.4118 0.5 21.9205 0.5 22.4509V38.4509C0.5 38.9814 0.710714 39.4901 1.08579 39.8651C1.46086 40.2402 1.96957 40.4509 2.5 40.4509H18.5C19.0304 40.4509 19.5391 40.2402 19.9142 39.8651C20.2893 39.4901 20.5 38.9814 20.5 38.4509V34.4509H28.5C29.0304 34.4509 29.5391 34.2402 29.9142 33.8651C30.2893 33.4901 30.5 32.9814 30.5 32.4509V28.4509H38.5C39.0304 28.4509 39.5391 28.2402 39.9142 27.8651C40.2893 27.4901 40.5 26.9814 40.5 26.4509V2.45093C40.5 1.92049 40.2893 1.41179 39.9142 1.03671C39.5391 0.661641 39.0304 0.450928 38.5 0.450928ZM16.5 36.4509H4.5V24.4509H16.5V36.4509ZM26.5 30.4509H20.5V22.4509C20.5 21.9205 20.2893 21.4118 19.9142 21.0367C19.5391 20.6616 19.0304 20.4509 18.5 20.4509H10.5V14.4509H26.5V30.4509ZM36.5 24.4509H30.5V12.4509C30.5 11.9205 30.2893 11.4118 29.9142 11.0367C29.5391 10.6616 29.0304 10.4509 28.5 10.4509H16.5V4.45093H36.5V24.4509Z" fill="black" fill-opacity="0.1"/>
</svg>`,"left-arrow-outline":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M8.29 11.29C8.19896 11.3851 8.12759 11.4972 8.08 11.62C7.97998 11.8635 7.97998 12.1365 8.08 12.38C8.12759 12.5028 8.19896 12.6149 8.29 12.71L11.29 15.71C11.4783 15.8983 11.7337 16.0041 12 16.0041C12.2663 16.0041 12.5217 15.8983 12.71 15.71C12.8983 15.5217 13.0041 15.2663 13.0041 15C13.0041 14.7337 12.8983 14.4783 12.71 14.29L11.41 13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11H11.41L12.71 9.71C12.8037 9.61704 12.8781 9.50644 12.9289 9.38458C12.9797 9.26272 13.0058 9.13201 13.0058 9C13.0058 8.86799 12.9797 8.73728 12.9289 8.61542C12.8781 8.49356 12.8037 8.38296 12.71 8.29C12.617 8.19627 12.5064 8.12188 12.3846 8.07111C12.2627 8.02034 12.132 7.9942 12 7.9942C11.868 7.9942 11.7373 8.02034 11.6154 8.07111C11.4936 8.12188 11.383 8.19627 11.29 8.29L8.29 11.29ZM2 12C2 13.9778 2.58649 15.9112 3.6853 17.5557C4.78412 19.2002 6.3459 20.4819 8.17317 21.2388C10.0004 21.9957 12.0111 22.1937 13.9509 21.8079C15.8907 21.422 17.6725 20.4696 19.0711 19.0711C20.4696 17.6725 21.422 15.8907 21.8079 13.9509C22.1937 12.0111 21.9957 10.0004 21.2388 8.17317C20.4819 6.3459 19.2002 4.78412 17.5557 3.6853C15.9112 2.58649 13.9778 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12ZM20 12C20 13.5823 19.5308 15.129 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00346 10.4003 4.60896 8.93853C5.21447 7.47672 6.23984 6.22729 7.55544 5.34824C8.87103 4.46919 10.4177 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" />
</svg>`,"left-arrow":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9999 11H9.4099L12.7099 7.71C12.8982 7.52169 13.004 7.2663 13.004 7C13.004 6.7337 12.8982 6.4783 12.7099 6.29C12.5216 6.10169 12.2662 5.99591 11.9999 5.99591C11.7336 5.99591 11.4782 6.10169 11.2899 6.29L6.2899 11.29C6.19886 11.3851 6.12749 11.4972 6.0799 11.62C5.97988 11.8635 5.97988 12.1365 6.0799 12.38C6.12749 12.5027 6.19886 12.6149 6.2899 12.71L11.2899 17.71C11.3829 17.8037 11.4935 17.8781 11.6153 17.9289C11.7372 17.9797 11.8679 18.0058 11.9999 18.0058C12.1319 18.0058 12.2626 17.9797 12.3845 17.9289C12.5063 17.8781 12.6169 17.8037 12.7099 17.71C12.8036 17.617 12.878 17.5064 12.9288 17.3846C12.9796 17.2627 13.0057 17.132 13.0057 17C13.0057 16.868 12.9796 16.7373 12.9288 16.6154C12.878 16.4936 12.8036 16.383 12.7099 16.29L9.4099 13H16.9999C17.2651 13 17.5195 12.8946 17.707 12.7071C17.8945 12.5196 17.9999 12.2652 17.9999 12C17.9999 11.7348 17.8945 11.4804 17.707 11.2929C17.5195 11.1054 17.2651 11 16.9999 11Z" />
</svg>`,linkedin:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4696 2H3.52957C3.33915 1.99736 3.15007 2.03225 2.97314 2.10268C2.7962 2.17312 2.63487 2.27772 2.49837 2.41051C2.36186 2.5433 2.25285 2.70168 2.17756 2.87661C2.10227 3.05153 2.06218 3.23958 2.05957 3.43V20.57C2.06218 20.7604 2.10227 20.9485 2.17756 21.1234C2.25285 21.2983 2.36186 21.4567 2.49837 21.5895C2.63487 21.7223 2.7962 21.8269 2.97314 21.8973C3.15007 21.9678 3.33915 22.0026 3.52957 22H20.4696C20.66 22.0026 20.8491 21.9678 21.026 21.8973C21.2029 21.8269 21.3643 21.7223 21.5008 21.5895C21.6373 21.4567 21.7463 21.2983 21.8216 21.1234C21.8969 20.9485 21.937 20.7604 21.9396 20.57V3.43C21.937 3.23958 21.8969 3.05153 21.8216 2.87661C21.7463 2.70168 21.6373 2.5433 21.5008 2.41051C21.3643 2.27772 21.2029 2.17312 21.026 2.10268C20.8491 2.03225 20.66 1.99736 20.4696 2ZM8.08957 18.74H5.08957V9.74H8.08957V18.74ZM6.58957 8.48C6.17583 8.48 5.77904 8.31564 5.48648 8.02309C5.19393 7.73053 5.02957 7.33374 5.02957 6.92C5.02957 6.50626 5.19393 6.10947 5.48648 5.81691C5.77904 5.52436 6.17583 5.36 6.58957 5.36C6.80927 5.33508 7.03175 5.35685 7.24245 5.42388C7.45314 5.49091 7.64731 5.60169 7.81223 5.74896C7.97715 5.89623 8.1091 6.07668 8.19944 6.27848C8.28979 6.48029 8.33649 6.6989 8.33649 6.92C8.33649 7.1411 8.28979 7.35971 8.19944 7.56152C8.1091 7.76332 7.97715 7.94377 7.81223 8.09104C7.64731 8.23831 7.45314 8.34909 7.24245 8.41612C7.03175 8.48315 6.80927 8.50491 6.58957 8.48ZM18.9096 18.74H15.9096V13.91C15.9096 12.7 15.4796 11.91 14.3896 11.91C14.0522 11.9125 13.7238 12.0183 13.4484 12.2132C13.1731 12.4081 12.9641 12.6827 12.8496 13C12.7713 13.235 12.7374 13.4826 12.7496 13.73V18.73H9.74957C9.74957 18.73 9.74957 10.55 9.74957 9.73H12.7496V11C13.0221 10.5271 13.4185 10.1375 13.896 9.8732C14.3735 9.60888 14.9141 9.47985 15.4596 9.5C17.4596 9.5 18.9096 10.79 18.9096 13.56V18.74Z" />
</svg>`,"lock-file":`<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 36.4509H6C5.46957 36.4509 4.96086 36.2402 4.58579 35.8651C4.21071 35.4901 4 34.9814 4 34.4509V6.45093C4 5.92049 4.21071 5.41179 4.58579 5.03671C4.96086 4.66164 5.46957 4.45093 6 4.45093H16V10.4509C16 12.0422 16.6321 13.5684 17.7574 14.6936C18.8826 15.8188 20.4087 16.4509 22 16.4509H30C30.3949 16.449 30.7803 16.3302 31.1077 16.1095C31.4352 15.8888 31.69 15.5762 31.84 15.2109C31.9932 14.8467 32.035 14.4453 31.9603 14.0573C31.8855 13.6693 31.6975 13.3122 31.42 13.0309L19.42 1.03093C19.2547 0.87536 19.0656 0.74709 18.86 0.650928C18.8003 0.642448 18.7397 0.642448 18.68 0.650928L18.12 0.450928H6C4.4087 0.450928 2.88258 1.08307 1.75736 2.20829C0.632141 3.33351 0 4.85963 0 6.45093V34.4509C0 36.0422 0.632141 37.5684 1.75736 38.6936C2.88258 39.8188 4.4087 40.4509 6 40.4509H16C16.5304 40.4509 17.0391 40.2402 17.4142 39.8651C17.7893 39.4901 18 38.9814 18 38.4509C18 37.9205 17.7893 37.4118 17.4142 37.0367C17.0391 36.6616 16.5304 36.4509 16 36.4509ZM20 7.27093L25.18 12.4509H22C21.4696 12.4509 20.9609 12.2402 20.5858 11.8651C20.2107 11.4901 20 10.9814 20 10.4509V7.27093ZM22 22.4509C22 21.9205 21.7893 21.4118 21.4142 21.0367C21.0391 20.6616 20.5304 20.4509 20 20.4509H10C9.46957 20.4509 8.96086 20.6616 8.58579 21.0367C8.21071 21.4118 8 21.9205 8 22.4509C8 22.9814 8.21071 23.4901 8.58579 23.8651C8.96086 24.2402 9.46957 24.4509 10 24.4509H20C20.5304 24.4509 21.0391 24.2402 21.4142 23.8651C21.7893 23.4901 22 22.9814 22 22.4509ZM10 16.4509H12C12.5304 16.4509 13.0391 16.2402 13.4142 15.8651C13.7893 15.4901 14 14.9814 14 14.4509C14 13.9205 13.7893 13.4118 13.4142 13.0367C13.0391 12.6616 12.5304 12.4509 12 12.4509H10C9.46957 12.4509 8.96086 12.6616 8.58579 13.0367C8.21071 13.4118 8 13.9205 8 14.4509C8 14.9814 8.21071 15.4901 8.58579 15.8651C8.96086 16.2402 9.46957 16.4509 10 16.4509ZM10 28.4509C9.46957 28.4509 8.96086 28.6616 8.58579 29.0367C8.21071 29.4118 8 29.9205 8 30.4509C8 30.9814 8.21071 31.4901 8.58579 31.8651C8.96086 32.2402 9.46957 32.4509 10 32.4509H14C14.5304 32.4509 15.0391 32.2402 15.4142 31.8651C15.7893 31.4901 16 30.9814 16 30.4509C16 29.9205 15.7893 29.4118 15.4142 29.0367C15.0391 28.6616 14.5304 28.4509 14 28.4509H10ZM36 26.8109V26.4509C36 24.8596 35.3679 23.3335 34.2426 22.2083C33.1174 21.0831 31.5913 20.4509 30 20.4509C28.4087 20.4509 26.8826 21.0831 25.7574 22.2083C24.6321 23.3335 24 24.8596 24 26.4509V26.8109C22.8329 27.2236 21.822 27.9871 21.1059 28.9968C20.3898 30.0065 20.0035 31.213 20 32.4509V34.4509C20 36.0422 20.6321 37.5684 21.7574 38.6936C22.8826 39.8188 24.4087 40.4509 26 40.4509H34C35.5913 40.4509 37.1174 39.8188 38.2426 38.6936C39.3679 37.5684 40 36.0422 40 34.4509V32.4509C39.9965 31.213 39.6102 30.0065 38.8941 28.9968C38.178 27.9871 37.1671 27.2236 36 26.8109V26.8109ZM30 24.4509C30.5304 24.4509 31.0391 24.6616 31.4142 25.0367C31.7893 25.4118 32 25.9205 32 26.4509H28C28 25.9205 28.2107 25.4118 28.5858 25.0367C28.9609 24.6616 29.4696 24.4509 30 24.4509ZM36 34.4509C36 34.9814 35.7893 35.4901 35.4142 35.8651C35.0391 36.2402 34.5304 36.4509 34 36.4509H26C25.4696 36.4509 24.9609 36.2402 24.5858 35.8651C24.2107 35.4901 24 34.9814 24 34.4509V32.4509C24 31.9205 24.2107 31.4118 24.5858 31.0367C24.9609 30.6616 25.4696 30.4509 26 30.4509H34C34.5304 30.4509 35.0391 30.6616 35.4142 31.0367C35.7893 31.4118 36 31.9205 36 32.4509V34.4509Z" fill="white"/>
    <path d="M16 36.4509H6C5.46957 36.4509 4.96086 36.2402 4.58579 35.8651C4.21071 35.4901 4 34.9814 4 34.4509V6.45093C4 5.92049 4.21071 5.41179 4.58579 5.03671C4.96086 4.66164 5.46957 4.45093 6 4.45093H16V10.4509C16 12.0422 16.6321 13.5684 17.7574 14.6936C18.8826 15.8188 20.4087 16.4509 22 16.4509H30C30.3949 16.449 30.7803 16.3302 31.1077 16.1095C31.4352 15.8888 31.69 15.5762 31.84 15.2109C31.9932 14.8467 32.035 14.4453 31.9603 14.0573C31.8855 13.6693 31.6975 13.3122 31.42 13.0309L19.42 1.03093C19.2547 0.87536 19.0656 0.74709 18.86 0.650928C18.8003 0.642448 18.7397 0.642448 18.68 0.650928L18.12 0.450928H6C4.4087 0.450928 2.88258 1.08307 1.75736 2.20829C0.632141 3.33351 0 4.85963 0 6.45093V34.4509C0 36.0422 0.632141 37.5684 1.75736 38.6936C2.88258 39.8188 4.4087 40.4509 6 40.4509H16C16.5304 40.4509 17.0391 40.2402 17.4142 39.8651C17.7893 39.4901 18 38.9814 18 38.4509C18 37.9205 17.7893 37.4118 17.4142 37.0367C17.0391 36.6616 16.5304 36.4509 16 36.4509ZM20 7.27093L25.18 12.4509H22C21.4696 12.4509 20.9609 12.2402 20.5858 11.8651C20.2107 11.4901 20 10.9814 20 10.4509V7.27093ZM22 22.4509C22 21.9205 21.7893 21.4118 21.4142 21.0367C21.0391 20.6616 20.5304 20.4509 20 20.4509H10C9.46957 20.4509 8.96086 20.6616 8.58579 21.0367C8.21071 21.4118 8 21.9205 8 22.4509C8 22.9814 8.21071 23.4901 8.58579 23.8651C8.96086 24.2402 9.46957 24.4509 10 24.4509H20C20.5304 24.4509 21.0391 24.2402 21.4142 23.8651C21.7893 23.4901 22 22.9814 22 22.4509ZM10 16.4509H12C12.5304 16.4509 13.0391 16.2402 13.4142 15.8651C13.7893 15.4901 14 14.9814 14 14.4509C14 13.9205 13.7893 13.4118 13.4142 13.0367C13.0391 12.6616 12.5304 12.4509 12 12.4509H10C9.46957 12.4509 8.96086 12.6616 8.58579 13.0367C8.21071 13.4118 8 13.9205 8 14.4509C8 14.9814 8.21071 15.4901 8.58579 15.8651C8.96086 16.2402 9.46957 16.4509 10 16.4509ZM10 28.4509C9.46957 28.4509 8.96086 28.6616 8.58579 29.0367C8.21071 29.4118 8 29.9205 8 30.4509C8 30.9814 8.21071 31.4901 8.58579 31.8651C8.96086 32.2402 9.46957 32.4509 10 32.4509H14C14.5304 32.4509 15.0391 32.2402 15.4142 31.8651C15.7893 31.4901 16 30.9814 16 30.4509C16 29.9205 15.7893 29.4118 15.4142 29.0367C15.0391 28.6616 14.5304 28.4509 14 28.4509H10ZM36 26.8109V26.4509C36 24.8596 35.3679 23.3335 34.2426 22.2083C33.1174 21.0831 31.5913 20.4509 30 20.4509C28.4087 20.4509 26.8826 21.0831 25.7574 22.2083C24.6321 23.3335 24 24.8596 24 26.4509V26.8109C22.8329 27.2236 21.822 27.9871 21.1059 28.9968C20.3898 30.0065 20.0035 31.213 20 32.4509V34.4509C20 36.0422 20.6321 37.5684 21.7574 38.6936C22.8826 39.8188 24.4087 40.4509 26 40.4509H34C35.5913 40.4509 37.1174 39.8188 38.2426 38.6936C39.3679 37.5684 40 36.0422 40 34.4509V32.4509C39.9965 31.213 39.6102 30.0065 38.8941 28.9968C38.178 27.9871 37.1671 27.2236 36 26.8109V26.8109ZM30 24.4509C30.5304 24.4509 31.0391 24.6616 31.4142 25.0367C31.7893 25.4118 32 25.9205 32 26.4509H28C28 25.9205 28.2107 25.4118 28.5858 25.0367C28.9609 24.6616 29.4696 24.4509 30 24.4509ZM36 34.4509C36 34.9814 35.7893 35.4901 35.4142 35.8651C35.0391 36.2402 34.5304 36.4509 34 36.4509H26C25.4696 36.4509 24.9609 36.2402 24.5858 35.8651C24.2107 35.4901 24 34.9814 24 34.4509V32.4509C24 31.9205 24.2107 31.4118 24.5858 31.0367C24.9609 30.6616 25.4696 30.4509 26 30.4509H34C34.5304 30.4509 35.0391 30.6616 35.4142 31.0367C35.7893 31.4118 36 31.9205 36 32.4509V34.4509Z" fill="black" fill-opacity="0.1"/>
</svg>`,"lock-gallery":`<svg width="40" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 8.81093V6.45093C36 4.85963 35.3679 3.33351 34.2426 2.20829C33.1174 1.08307 31.5913 0.450928 30 0.450928C28.4087 0.450928 26.8826 1.08307 25.7574 2.20829C24.6321 3.33351 24 4.85963 24 6.45093V8.81093C22.8329 9.22355 21.822 9.98707 21.1059 10.9968C20.3898 12.0065 20.0035 13.213 20 14.4509V18.4509C20 20.0422 20.6321 21.5684 21.7574 22.6936C22.8826 23.8188 24.4087 24.4509 26 24.4509H34C35.5913 24.4509 37.1174 23.8188 38.2426 22.6936C39.3679 21.5684 40 20.0422 40 18.4509V14.4509C39.9965 13.213 39.6102 12.0065 38.8941 10.9968C38.178 9.98707 37.1671 9.22355 36 8.81093ZM28 6.45093C28 5.92049 28.2107 5.41179 28.5858 5.03671C28.9609 4.66164 29.4696 4.45093 30 4.45093C30.5304 4.45093 31.0391 4.66164 31.4142 5.03671C31.7893 5.41179 32 5.92049 32 6.45093V8.45093H28V6.45093ZM36 18.4509C36 18.9814 35.7893 19.4901 35.4142 19.8651C35.0391 20.2402 34.5304 20.4509 34 20.4509H26C25.4696 20.4509 24.9609 20.2402 24.5858 19.8651C24.2107 19.4901 24 18.9814 24 18.4509V14.4509C24 13.9205 24.2107 13.4118 24.5858 13.0367C24.9609 12.6616 25.4696 12.4509 26 12.4509H34C34.5304 12.4509 35.0391 12.6616 35.4142 13.0367C35.7893 13.4118 36 13.9205 36 14.4509V18.4509ZM34 28.4509C33.4696 28.4509 32.9609 28.6616 32.5858 29.0367C32.2107 29.4118 32 29.9205 32 30.4509V36.4509C31.9971 36.8338 31.8709 37.2055 31.64 37.5109L14.82 20.6909C13.7579 19.6867 12.3517 19.1271 10.89 19.1271C9.4283 19.1271 8.02207 19.6867 6.96 20.6909L4 23.6509V12.4509C4 11.9205 4.21071 11.4118 4.58579 11.0367C4.96086 10.6616 5.46957 10.4509 6 10.4509H16C16.5304 10.4509 17.0391 10.2402 17.4142 9.86514C17.7893 9.49007 18 8.98136 18 8.45093C18 7.92049 17.7893 7.41179 17.4142 7.03671C17.0391 6.66164 16.5304 6.45093 16 6.45093H6C4.4087 6.45093 2.88258 7.08307 1.75736 8.20829C0.632141 9.33351 0 10.8596 0 12.4509V36.4509C0 38.0422 0.632141 39.5684 1.75736 40.6936C2.88258 41.8188 4.4087 42.4509 6 42.4509H30C31.5913 42.4509 33.1174 41.8188 34.2426 40.6936C35.3679 39.5684 36 38.0422 36 36.4509V30.4509C36 29.9205 35.7893 29.4118 35.4142 29.0367C35.0391 28.6616 34.5304 28.4509 34 28.4509ZM6 38.4509C5.46957 38.4509 4.96086 38.2402 4.58579 37.8651C4.21071 37.4901 4 36.9814 4 36.4509V29.3109L9.8 23.5109C10.0938 23.2309 10.4841 23.0747 10.89 23.0747C11.2959 23.0747 11.6862 23.2309 11.98 23.5109L26.92 38.4509H6Z" fill="white"/>
    <path d="M36 8.81093V6.45093C36 4.85963 35.3679 3.33351 34.2426 2.20829C33.1174 1.08307 31.5913 0.450928 30 0.450928C28.4087 0.450928 26.8826 1.08307 25.7574 2.20829C24.6321 3.33351 24 4.85963 24 6.45093V8.81093C22.8329 9.22355 21.822 9.98707 21.1059 10.9968C20.3898 12.0065 20.0035 13.213 20 14.4509V18.4509C20 20.0422 20.6321 21.5684 21.7574 22.6936C22.8826 23.8188 24.4087 24.4509 26 24.4509H34C35.5913 24.4509 37.1174 23.8188 38.2426 22.6936C39.3679 21.5684 40 20.0422 40 18.4509V14.4509C39.9965 13.213 39.6102 12.0065 38.8941 10.9968C38.178 9.98707 37.1671 9.22355 36 8.81093ZM28 6.45093C28 5.92049 28.2107 5.41179 28.5858 5.03671C28.9609 4.66164 29.4696 4.45093 30 4.45093C30.5304 4.45093 31.0391 4.66164 31.4142 5.03671C31.7893 5.41179 32 5.92049 32 6.45093V8.45093H28V6.45093ZM36 18.4509C36 18.9814 35.7893 19.4901 35.4142 19.8651C35.0391 20.2402 34.5304 20.4509 34 20.4509H26C25.4696 20.4509 24.9609 20.2402 24.5858 19.8651C24.2107 19.4901 24 18.9814 24 18.4509V14.4509C24 13.9205 24.2107 13.4118 24.5858 13.0367C24.9609 12.6616 25.4696 12.4509 26 12.4509H34C34.5304 12.4509 35.0391 12.6616 35.4142 13.0367C35.7893 13.4118 36 13.9205 36 14.4509V18.4509ZM34 28.4509C33.4696 28.4509 32.9609 28.6616 32.5858 29.0367C32.2107 29.4118 32 29.9205 32 30.4509V36.4509C31.9971 36.8338 31.8709 37.2055 31.64 37.5109L14.82 20.6909C13.7579 19.6867 12.3517 19.1271 10.89 19.1271C9.4283 19.1271 8.02207 19.6867 6.96 20.6909L4 23.6509V12.4509C4 11.9205 4.21071 11.4118 4.58579 11.0367C4.96086 10.6616 5.46957 10.4509 6 10.4509H16C16.5304 10.4509 17.0391 10.2402 17.4142 9.86514C17.7893 9.49007 18 8.98136 18 8.45093C18 7.92049 17.7893 7.41179 17.4142 7.03671C17.0391 6.66164 16.5304 6.45093 16 6.45093H6C4.4087 6.45093 2.88258 7.08307 1.75736 8.20829C0.632141 9.33351 0 10.8596 0 12.4509V36.4509C0 38.0422 0.632141 39.5684 1.75736 40.6936C2.88258 41.8188 4.4087 42.4509 6 42.4509H30C31.5913 42.4509 33.1174 41.8188 34.2426 40.6936C35.3679 39.5684 36 38.0422 36 36.4509V30.4509C36 29.9205 35.7893 29.4118 35.4142 29.0367C35.0391 28.6616 34.5304 28.4509 34 28.4509ZM6 38.4509C5.46957 38.4509 4.96086 38.2402 4.58579 37.8651C4.21071 37.4901 4 36.9814 4 36.4509V29.3109L9.8 23.5109C10.0938 23.2309 10.4841 23.0747 10.89 23.0747C11.2959 23.0747 11.6862 23.2309 11.98 23.5109L26.92 38.4509H6Z" fill="black" fill-opacity="0.1"/>
</svg>`,magnifier:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21.7104 20.2899L18.0004 16.6099C19.4405 14.8143 20.1379 12.5352 19.9492 10.2412C19.7605 7.94721 18.7001 5.81269 16.9859 4.27655C15.2718 2.74041 13.0342 1.91941 10.7333 1.98237C8.43243 2.04534 6.24311 2.98747 4.61553 4.61505C2.98795 6.24263 2.04582 8.43194 1.98286 10.7328C1.9199 13.0337 2.7409 15.2713 4.27704 16.9854C5.81318 18.6996 7.94769 19.76 10.2417 19.9487C12.5357 20.1374 14.8148 19.44 16.6104 17.9999L20.2904 21.6799C20.3834 21.7736 20.494 21.848 20.6158 21.8988C20.7377 21.9496 20.8684 21.9757 21.0004 21.9757C21.1324 21.9757 21.2631 21.9496 21.385 21.8988C21.5068 21.848 21.6174 21.7736 21.7104 21.6799C21.8906 21.4934 21.9914 21.2442 21.9914 20.9849C21.9914 20.7256 21.8906 20.4764 21.7104 20.2899ZM11.0004 17.9999C9.61592 17.9999 8.26255 17.5894 7.1114 16.8202C5.96026 16.051 5.06305 14.9578 4.53324 13.6787C4.00342 12.3996 3.8648 10.9921 4.1349 9.63427C4.40499 8.27641 5.07168 7.02912 6.05065 6.05016C7.02961 5.07119 8.27689 4.4045 9.63476 4.13441C10.9926 3.86431 12.4001 4.00293 13.6792 4.53275C14.9583 5.06256 16.0515 5.95977 16.8207 7.11091C17.5899 8.26206 18.0004 9.61544 18.0004 10.9999C18.0004 12.8564 17.2629 14.6369 15.9501 15.9497C14.6374 17.2624 12.8569 17.9999 11.0004 17.9999Z" />
</svg>`,map:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21.32 5.04999L15.32 3.04999H15.25C15.2035 3.04532 15.1566 3.04532 15.11 3.04999H14.88H14.75H14.68L9 4.99999L3.32 3.04999C3.16962 3.00041 3.00961 2.98724 2.85314 3.01158C2.69667 3.03592 2.54822 3.09707 2.42 3.18999C2.29076 3.28201 2.18527 3.40346 2.11224 3.5443C2.03921 3.68514 2.00074 3.84134 2 3.99999V18C1.99946 18.2096 2.06482 18.4141 2.18685 18.5846C2.30887 18.7551 2.48138 18.8829 2.68 18.95L8.68 20.95C8.88145 21.0157 9.09856 21.0157 9.3 20.95L15 19.05L20.68 21C20.7862 21.0144 20.8938 21.0144 21 21C21.2091 21.0029 21.4132 20.9361 21.58 20.81C21.7092 20.718 21.8147 20.5965 21.8878 20.4557C21.9608 20.3148 21.9993 20.1586 22 20V5.99999C22.0005 5.79035 21.9352 5.58584 21.8132 5.41536C21.6911 5.24489 21.5186 5.11708 21.32 5.04999ZM8 18.61L4 17.28V5.38999L8 6.71999V18.61ZM14 17.28L10 18.61V6.71999L14 5.38999V17.28ZM20 18.61L16 17.28V5.38999L20 6.71999V18.61Z" />
</svg>`,megaphone:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9912 2.00195C19.8599 2.00188 19.7298 2.02769 19.6084 2.07792C19.4871 2.12815 19.3768 2.20181 19.2839 2.29468C19.1911 2.38755 19.1174 2.49782 19.0672 2.61918C19.017 2.74054 18.9911 2.87061 18.9912 3.00195V3.63867C18.1478 4.68438 17.0819 5.52887 15.871 6.11067C14.66 6.69248 13.3346 6.99696 11.9912 7.00195H5.99121C5.19583 7.00282 4.43327 7.31917 3.87085 7.88159C3.30843 8.44401 2.99208 9.20657 2.99121 10.002V12.002C2.99208 12.7973 3.30843 13.5599 3.87085 14.1223C4.43327 14.6847 5.19583 15.0011 5.99121 15.002H6.475L4.07227 20.6084C4.00698 20.7604 3.98047 20.9263 3.99512 21.0911C4.00978 21.256 4.06514 21.4146 4.15624 21.5528C4.24734 21.6909 4.37133 21.8043 4.51706 21.8827C4.6628 21.9611 4.82572 22.0021 4.99121 22.002H8.99121C9.18696 22.0021 9.37843 21.9446 9.54182 21.8368C9.7052 21.729 9.83329 21.5755 9.91016 21.3955L12.6339 15.04C13.8646 15.1303 15.0636 15.472 16.157 16.0439C17.2505 16.6158 18.215 17.4058 18.9912 18.365V19.002C18.9912 19.2672 19.0966 19.5215 19.2841 19.7091C19.4716 19.8966 19.726 20.002 19.9912 20.002C20.2564 20.002 20.5108 19.8966 20.6983 19.7091C20.8859 19.5215 20.9912 19.2672 20.9912 19.002V3.00195C20.9913 2.87061 20.9655 2.74054 20.9152 2.61918C20.865 2.49782 20.7914 2.38755 20.6985 2.29468C20.6056 2.2018 20.4953 2.12815 20.374 2.07792C20.2526 2.02769 20.1226 2.00188 19.9912 2.00195ZM5.99121 13.002C5.72605 13.0018 5.4718 12.8964 5.2843 12.7089C5.0968 12.5214 4.99139 12.2671 4.99121 12.002V10.002C4.99139 9.73679 5.09681 9.48254 5.2843 9.29505C5.4718 9.10755 5.72605 9.00213 5.99121 9.00195H6.99121V13.002H5.99121ZM8.33203 20.002H6.50781L8.65039 15.002H10.4746L8.33203 20.002ZM18.9912 15.5238C17.0195 13.8994 14.5459 13.0082 11.9912 13.0019H8.99121V9.0019H11.9912C14.5459 8.99537 17.0195 8.10406 18.9912 6.47956V15.5238Z" />
</svg>`,message:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7L12 11.88L4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V9.28L11.48 13.85C11.632 13.9378 11.8045 13.984 11.98 13.984C12.1555 13.984 12.328 13.9378 12.48 13.85L20 9.28V17Z" />
</svg>`,mobile:`<svg width="29" height="41" viewBox="0 0 29 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.92 29.0309L15.62 28.7909C15.5085 28.7152 15.3874 28.6547 15.26 28.6109L14.9 28.4509C14.5756 28.3831 14.2395 28.397 13.9218 28.4912C13.6042 28.5855 13.3149 28.7572 13.08 28.9909C12.9033 29.1853 12.7613 29.4086 12.66 29.6509C12.5086 30.0153 12.4685 30.4164 12.5445 30.8036C12.6206 31.1907 12.8094 31.5468 13.0874 31.8269C13.3653 32.107 13.7199 32.2986 14.1065 32.3776C14.4931 32.4566 14.8944 32.4195 15.26 32.2709C15.499 32.155 15.721 32.0069 15.92 31.8309C16.1975 31.5497 16.3855 31.1925 16.4603 30.8046C16.535 30.4166 16.4932 30.0152 16.34 29.6509C16.2403 29.4197 16.0978 29.2093 15.92 29.0309ZM22.5 0.450928H6.5C4.9087 0.450928 3.38258 1.08307 2.25736 2.20829C1.13214 3.33351 0.5 4.85963 0.5 6.45093V34.4509C0.5 36.0422 1.13214 37.5684 2.25736 38.6936C3.38258 39.8188 4.9087 40.4509 6.5 40.4509H22.5C24.0913 40.4509 25.6174 39.8188 26.7426 38.6936C27.8679 37.5684 28.5 36.0422 28.5 34.4509V6.45093C28.5 4.85963 27.8679 3.33351 26.7426 2.20829C25.6174 1.08307 24.0913 0.450928 22.5 0.450928ZM24.5 34.4509C24.5 34.9814 24.2893 35.4901 23.9142 35.8651C23.5391 36.2402 23.0304 36.4509 22.5 36.4509H6.5C5.96957 36.4509 5.46086 36.2402 5.08579 35.8651C4.71071 35.4901 4.5 34.9814 4.5 34.4509V6.45093C4.5 5.92049 4.71071 5.41179 5.08579 5.03671C5.46086 4.66164 5.96957 4.45093 6.5 4.45093H22.5C23.0304 4.45093 23.5391 4.66164 23.9142 5.03671C24.2893 5.41179 24.5 5.92049 24.5 6.45093V34.4509Z" fill="white"/>
<path d="M15.92 29.0309L15.62 28.7909C15.5085 28.7152 15.3874 28.6547 15.26 28.6109L14.9 28.4509C14.5756 28.3831 14.2395 28.397 13.9218 28.4912C13.6042 28.5855 13.3149 28.7572 13.08 28.9909C12.9033 29.1853 12.7613 29.4086 12.66 29.6509C12.5086 30.0153 12.4685 30.4164 12.5445 30.8036C12.6206 31.1907 12.8094 31.5468 13.0874 31.8269C13.3653 32.107 13.7199 32.2986 14.1065 32.3776C14.4931 32.4566 14.8944 32.4195 15.26 32.2709C15.499 32.155 15.721 32.0069 15.92 31.8309C16.1975 31.5497 16.3855 31.1925 16.4603 30.8046C16.535 30.4166 16.4932 30.0152 16.34 29.6509C16.2403 29.4197 16.0978 29.2093 15.92 29.0309ZM22.5 0.450928H6.5C4.9087 0.450928 3.38258 1.08307 2.25736 2.20829C1.13214 3.33351 0.5 4.85963 0.5 6.45093V34.4509C0.5 36.0422 1.13214 37.5684 2.25736 38.6936C3.38258 39.8188 4.9087 40.4509 6.5 40.4509H22.5C24.0913 40.4509 25.6174 39.8188 26.7426 38.6936C27.8679 37.5684 28.5 36.0422 28.5 34.4509V6.45093C28.5 4.85963 27.8679 3.33351 26.7426 2.20829C25.6174 1.08307 24.0913 0.450928 22.5 0.450928ZM24.5 34.4509C24.5 34.9814 24.2893 35.4901 23.9142 35.8651C23.5391 36.2402 23.0304 36.4509 22.5 36.4509H6.5C5.96957 36.4509 5.46086 36.2402 5.08579 35.8651C4.71071 35.4901 4.5 34.9814 4.5 34.4509V6.45093C4.5 5.92049 4.71071 5.41179 5.08579 5.03671C5.46086 4.66164 5.96957 4.45093 6.5 4.45093H22.5C23.0304 4.45093 23.5391 4.66164 23.9142 5.03671C24.2893 5.41179 24.5 5.92049 24.5 6.45093V34.4509Z" fill="black" fill-opacity="0.1"/>
</svg>`,mortarboard:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21.4899 10.19L20.4899 9.64002L11.4899 4.64002H11.3799C11.3186 4.6141 11.255 4.59401 11.1899 4.58002H10.9999H10.8199C10.7516 4.59402 10.6846 4.6141 10.6199 4.64002H10.5099L1.50988 9.64002C1.35598 9.72724 1.22797 9.85371 1.13891 10.0066C1.04985 10.1594 1.00293 10.3331 1.00293 10.51C1.00293 10.6869 1.04985 10.8606 1.13891 11.0135C1.22797 11.1663 1.35598 11.2928 1.50988 11.38L3.99988 12.76V17.5C3.99988 18.2957 4.31595 19.0587 4.87856 19.6213C5.44117 20.1839 6.20423 20.5 6.99988 20.5H14.9999C15.7955 20.5 16.5586 20.1839 17.1212 19.6213C17.6838 19.0587 17.9999 18.2957 17.9999 17.5V12.76L19.9999 11.64V14.5C19.9999 14.7652 20.1052 15.0196 20.2928 15.2071C20.4803 15.3947 20.7347 15.5 20.9999 15.5C21.2651 15.5 21.5194 15.3947 21.707 15.2071C21.8945 15.0196 21.9999 14.7652 21.9999 14.5V11.06C21.9996 10.8828 21.9522 10.7089 21.8626 10.556C21.773 10.4032 21.6443 10.2768 21.4899 10.19ZM15.9999 17.5C15.9999 17.7652 15.8945 18.0196 15.707 18.2071C15.5194 18.3947 15.2651 18.5 14.9999 18.5H6.99988C6.73466 18.5 6.48031 18.3947 6.29277 18.2071C6.10524 18.0196 5.99988 17.7652 5.99988 17.5V13.87L10.5099 16.37L10.6599 16.43H10.7499C10.8329 16.4405 10.9169 16.4405 10.9999 16.43C11.0829 16.4405 11.1669 16.4405 11.2499 16.43H11.3399C11.393 16.4188 11.4437 16.3985 11.4899 16.37L15.9999 13.87V17.5ZM10.9999 14.36L4.05988 10.5L10.9999 6.64002L17.9399 10.5L10.9999 14.36Z" />
</svg>`,newspaper:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17 11H16C15.7348 11 15.4804 11.1054 15.2929 11.2929C15.1054 11.4804 15 11.7348 15 12C15 12.2652 15.1054 12.5196 15.2929 12.7071C15.4804 12.8946 15.7348 13 16 13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11ZM17 15H16C15.7348 15 15.4804 15.1054 15.2929 15.2929C15.1054 15.4804 15 15.7348 15 16C15 16.2652 15.1054 16.5196 15.2929 16.7071C15.4804 16.8946 15.7348 17 16 17H17C17.2652 17 17.5196 16.8946 17.7071 16.7071C17.8946 16.5196 18 16.2652 18 16C18 15.7348 17.8946 15.4804 17.7071 15.2929C17.5196 15.1054 17.2652 15 17 15ZM11 9H17C17.2652 9 17.5196 8.89464 17.7071 8.70711C17.8946 8.51957 18 8.26522 18 8C18 7.73478 17.8946 7.48043 17.7071 7.29289C17.5196 7.10536 17.2652 7 17 7H11C10.7348 7 10.4804 7.10536 10.2929 7.29289C10.1054 7.48043 10 7.73478 10 8C10 8.26522 10.1054 8.51957 10.2929 8.70711C10.4804 8.89464 10.7348 9 11 9ZM21 3H7C6.73478 3 6.48043 3.10536 6.29289 3.29289C6.10536 3.48043 6 3.73478 6 4V7H3C2.73478 7 2.48043 7.10536 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8V18C2 18.7956 2.31607 19.5587 2.87868 20.1213C3.44129 20.6839 4.20435 21 5 21H18C19.0609 21 20.0783 20.5786 20.8284 19.8284C21.5786 19.0783 22 18.0609 22 17V4C22 3.73478 21.8946 3.48043 21.7071 3.29289C21.5196 3.10536 21.2652 3 21 3ZM6 18C6 18.2652 5.89464 18.5196 5.70711 18.7071C5.51957 18.8946 5.26522 19 5 19C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18V9H6V18ZM20 17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H7.82C7.93642 18.6793 7.9973 18.3411 8 18V5H20V17ZM11 13H12C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11H11C10.7348 11 10.4804 11.1054 10.2929 11.2929C10.1054 11.4804 10 11.7348 10 12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13ZM11 17H12C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15H11C10.7348 15 10.4804 15.1054 10.2929 15.2929C10.1054 15.4804 10 15.7348 10 16C10 16.2652 10.1054 16.5196 10.2929 16.7071C10.4804 16.8946 10.7348 17 11 17Z" />
</svg>`,"open-source":`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 3C10.0592 3 2 11.0592 2 21.0016C2 28.718 6.85665 35.2986 13.6794 37.8577L17.8276 26.7958C15.4813 25.9168 13.8126 23.6534 13.8126 21.0016C13.8126 17.5846 16.583 14.8142 20 14.8142C23.417 14.8142 26.1874 17.5846 26.1874 21.0016C26.1874 23.655 24.5171 25.9168 22.1724 26.7958L26.3206 37.8577C33.1433 35.2986 38 28.718 38 21.0016C38 11.0592 29.9408 3 19.9984 3H20Z"/>
</svg>`,"pdf-file":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M10 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H10V7C10 7.79565 10.3161 8.55871 10.8787 9.12132C11.4413 9.68393 12.2044 10 13 10H17C17.1974 9.99901 17.3901 9.93961 17.5539 9.82928C17.7176 9.71895 17.845 9.56262 17.92 9.38C17.9966 9.19789 18.0175 8.99718 17.9801 8.80319C17.9428 8.6092 17.8488 8.43062 17.71 8.29L11.71 2.29C11.6273 2.21222 11.5328 2.14808 11.43 2.1C11.4002 2.09576 11.3699 2.09576 11.34 2.1L11.06 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H10C10.2652 22 10.5196 21.8946 10.7071 21.7071C10.8946 21.5196 11 21.2652 11 21C11 20.7348 10.8946 20.4804 10.7071 20.2929C10.5196 20.1054 10.2652 20 10 20ZM12 5.41L14.59 8H13C12.7348 8 12.4804 7.89464 12.2929 7.70711C12.1054 7.51957 12 7.26522 12 7V5.41ZM13 13C13 12.7348 12.8946 12.4804 12.7071 12.2929C12.5196 12.1054 12.2652 12 12 12H7C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14H12C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13ZM7 10H8C8.26522 10 8.51957 9.89464 8.70711 9.70711C8.89464 9.51957 9 9.26522 9 9C9 8.73478 8.89464 8.48043 8.70711 8.29289C8.51957 8.10536 8.26522 8 8 8H7C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9C6 9.26522 6.10536 9.51957 6.29289 9.70711C6.48043 9.89464 6.73478 10 7 10ZM7 16C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18H9C9.26522 18 9.51957 17.8946 9.70711 17.7071C9.89464 17.5196 10 17.2652 10 17C10 16.7348 9.89464 16.4804 9.70711 16.2929C9.51957 16.1054 9.26522 16 9 16H7Z"/>
<path d="M22.714 17.2967C22.1146 16.7075 20.4047 16.8695 19.5497 16.9775C18.7046 16.462 18.1395 15.75 17.7415 14.7041C17.9332 13.9135 18.2378 12.7105 18.0069 11.9543C17.8005 10.6679 16.1496 10.7955 15.9137 11.6646C15.6975 12.4552 15.8941 13.5551 16.2577 14.9594C15.7663 16.133 15.0342 17.7092 14.5183 18.6126C13.5356 19.1184 12.2089 19.8991 12.0124 20.8812C11.8502 21.657 13.2899 23.5916 15.7516 19.3492C16.8522 18.9858 18.0511 18.539 19.1124 18.3622C20.0411 18.8631 21.127 19.197 21.8542 19.197C23.1071 19.197 23.2299 17.8123 22.714 17.2967ZM12.9803 21.1169C13.2309 20.4442 14.1842 19.6683 14.4741 19.3983C13.5405 20.8861 12.9803 21.1512 12.9803 21.1169ZM16.9898 11.7579C17.3534 11.7579 17.319 13.3341 17.0782 13.7613C16.862 13.0788 16.8669 11.7579 16.9898 11.7579ZM15.7909 18.4653C16.2675 17.6355 16.6753 16.6485 17.0045 15.7794C17.4123 16.5209 17.9332 17.115 18.4835 17.5226C17.4615 17.7337 16.5721 18.1658 15.7909 18.4653ZM22.2571 18.2198C22.2571 18.2198 22.0114 18.5144 20.4243 17.8368C22.149 17.7092 22.434 18.102 22.2571 18.2198Z" />
</svg>`,progress:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.4443 3.6853C8.08879 2.58649 10.0222 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7363 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 13.9778 21.4135 15.9112 20.3147 17.5557C19.2159 19.2002 17.6541 20.4819 15.8268 21.2388C13.9996 21.9957 11.9889 22.1937 10.0491 21.8079C8.10929 21.422 6.32746 20.4696 4.92894 19.0711C3.53041 17.6725 2.578 15.8907 2.19215 13.9509C1.8063 12.0111 2.00433 10.0004 2.76121 8.17317C3.51809 6.3459 4.79981 4.78412 6.4443 3.6853ZM7.55544 18.6518C8.87104 19.5308 10.4178 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1572 16.1566 20 14.1217 20 12C20 10.4177 19.5308 8.87103 18.6518 7.55544C17.7727 6.23984 16.5233 5.21447 15.0615 4.60896C13.5997 4.00346 11.9911 3.84504 10.4393 4.15372C8.88743 4.4624 7.46197 5.22433 6.34315 6.34315C5.22433 7.46197 4.4624 8.88743 4.15372 10.4393C3.84504 11.9911 4.00347 13.5997 4.60897 15.0615C5.21447 16.5233 6.23985 17.7727 7.55544 18.6518ZM7.44443 11.1685C7.60888 11.0586 7.80222 11 8 11C8.26522 11 8.51957 11.1054 8.70711 11.2929C8.89464 11.4804 9 11.7348 9 12C9 12.1978 8.94135 12.3911 8.83147 12.5556C8.72159 12.72 8.56541 12.8482 8.38268 12.9239C8.19996 12.9996 7.99889 13.0194 7.80491 12.9808C7.61093 12.9422 7.43275 12.847 7.29289 12.7071C7.15304 12.5673 7.0578 12.3891 7.01922 12.1951C6.98063 12.0011 7.00043 11.8 7.07612 11.6173C7.15181 11.4346 7.27998 11.2784 7.44443 11.1685ZM11.4444 11.1685C11.6089 11.0586 11.8022 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.1978 12.9414 12.3911 12.8315 12.5556C12.7216 12.72 12.5654 12.8482 12.3827 12.9239C12.2 12.9996 11.9989 13.0194 11.8049 12.9808C11.6109 12.9422 11.4327 12.847 11.2929 12.7071C11.153 12.5673 11.0578 12.3891 11.0192 12.1951C10.9806 12.0011 11.0004 11.8 11.0761 11.6173C11.1518 11.4346 11.28 11.2784 11.4444 11.1685ZM15.4444 11.1685C15.6089 11.0586 15.8022 11 16 11C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.1978 16.9414 12.3911 16.8315 12.5556C16.7216 12.72 16.5654 12.8482 16.3827 12.9239C16.2 12.9996 15.9989 13.0194 15.8049 12.9808C15.6109 12.9422 15.4327 12.847 15.2929 12.7071C15.153 12.5673 15.0578 12.3891 15.0192 12.1951C14.9806 12.0011 15.0004 11.8 15.0761 11.6173C15.1518 11.4346 15.28 11.2784 15.4444 11.1685Z" />
</svg>`,"right-arrow-1":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5397 11.29L9.87974 5.64C9.78677 5.54627 9.67617 5.47188 9.55431 5.42111C9.43246 5.37034 9.30175 5.3442 9.16974 5.3442C9.03773 5.3442 8.90702 5.37034 8.78516 5.42111C8.6633 5.47188 8.5527 5.54627 8.45974 5.64C8.27349 5.82736 8.16895 6.08081 8.16895 6.345C8.16895 6.60918 8.27349 6.86264 8.45974 7.05L13.4097 12.05L8.45974 17C8.27349 17.1874 8.16895 17.4408 8.16895 17.705C8.16895 17.9692 8.27349 18.2226 8.45974 18.41C8.55235 18.5045 8.6628 18.5797 8.78467 18.6312C8.90655 18.6826 9.03743 18.7094 9.16974 18.71C9.30204 18.7094 9.43293 18.6826 9.5548 18.6312C9.67668 18.5797 9.78712 18.5045 9.87974 18.41L15.5397 12.76C15.6412 12.6664 15.7223 12.5527 15.7777 12.4262C15.8331 12.2997 15.8617 12.1631 15.8617 12.025C15.8617 11.8869 15.8331 11.7503 15.7777 11.6238C15.7223 11.4973 15.6412 11.3836 15.5397 11.29Z" />
</svg>`,"right-arrow-2":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17.92 11.62C17.8724 11.4973 17.801 11.3851 17.71 11.29L12.71 6.29C12.6168 6.19676 12.5061 6.1228 12.3842 6.07234C12.2624 6.02188 12.1319 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.1017 11.29 6.29C11.1968 6.38324 11.1228 6.49393 11.0723 6.61575C11.0219 6.73758 10.9959 6.86814 10.9959 7C10.9959 7.2663 11.1017 7.5217 11.29 7.71L14.59 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H14.59L11.29 16.29C11.1963 16.383 11.1219 16.4936 11.0711 16.6154C11.0203 16.7373 10.9942 16.868 10.9942 17C10.9942 17.132 11.0203 17.2627 11.0711 17.3846C11.1219 17.5064 11.1963 17.617 11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5064 17.8781 12.617 17.8037 12.71 17.71L17.71 12.71C17.801 12.6149 17.8724 12.5028 17.92 12.38C18.02 12.1365 18.02 11.8635 17.92 11.62Z" />
</svg>`,"select-box":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M9.70994 11.0058L11.9999 11C11.9999 11 14.0801 11 14.2899 11C14.4998 11 14.4998 11 14.4998 11L14.9999 11.0058C14.9999 11.0058 15.2627 10.9797 15.3845 10.9289C15.5064 10.8781 15.617 10.8037 15.7099 10.71C15.8037 10.617 15.8781 10.5064 15.9288 10.3846C15.9796 10.2627 16.0057 10.132 16.0057 10C16.0057 9.86799 15.9796 9.73728 15.9288 9.61542C15.8781 9.49356 15.8037 9.38296 15.7099 9.29L12.7099 6.29C12.617 6.19627 12.5064 6.12188 12.3845 6.07111C12.2627 6.02034 12.132 5.9942 11.9999 5.9942C11.8679 5.9942 11.7372 6.02034 11.6154 6.07111C11.4935 6.12188 11.3829 6.19627 11.2899 6.29L8.28994 9.29C8.10164 9.4783 7.99585 9.7337 7.99585 10C7.99585 10.2663 8.10164 10.5217 8.28994 10.71C8.47825 10.8983 8.73364 11.0041 8.99994 11.0041C9.26624 11.0041 9.70994 11.0058 9.70994 11.0058ZM14.2899 14H11.9999H9.70994C9.49976 14 9.49976 13.9959 9.38419 13.9959C8.99976 13.9959 9.1318 13.9959 8.99994 13.9959C8.86808 13.9959 8.73751 14.0219 8.61569 14.0723C8.49387 14.1228 8.38318 14.1968 8.28994 14.29C8.1967 14.3832 8.12274 14.4939 8.07228 14.6158C8.02182 14.7376 7.99585 14.8681 7.99585 15C7.99585 15.1319 8.02182 15.2624 8.07228 15.3842C8.12274 15.5061 8.1967 15.6168 8.28994 15.71L11.2899 18.71C11.3829 18.8037 11.4935 18.8781 11.6154 18.9289C11.7372 18.9797 11.8679 19.0058 11.9999 19.0058C12.132 19.0058 12.2627 18.9797 12.3845 18.9289C12.5064 18.8781 12.617 18.8037 12.7099 18.71L15.7099 15.71C15.8982 15.5217 16.004 15.2663 16.004 15C16.004 14.7337 15.8982 14.4783 15.7099 14.29C15.5216 14.1017 15.2662 13.9959 14.9999 13.9959C14.7336 13.9959 14.4998 14 14.2899 14Z" fill="#00698F" fill-opacity="0.5"/>
<path d="M9.70994 11.0058L11.9999 11C11.9999 11 14.0801 11 14.2899 11C14.4998 11 14.4998 11 14.4998 11L14.9999 11.0058C14.9999 11.0058 15.2627 10.9797 15.3845 10.9289C15.5064 10.8781 15.617 10.8037 15.7099 10.71C15.8037 10.617 15.8781 10.5064 15.9288 10.3846C15.9796 10.2627 16.0057 10.132 16.0057 10C16.0057 9.86799 15.9796 9.73728 15.9288 9.61542C15.8781 9.49356 15.8037 9.38296 15.7099 9.29L12.7099 6.29C12.617 6.19627 12.5064 6.12188 12.3845 6.07111C12.2627 6.02034 12.132 5.9942 11.9999 5.9942C11.8679 5.9942 11.7372 6.02034 11.6154 6.07111C11.4935 6.12188 11.3829 6.19627 11.2899 6.29L8.28994 9.29C8.10164 9.4783 7.99585 9.7337 7.99585 10C7.99585 10.2663 8.10164 10.5217 8.28994 10.71C8.47825 10.8983 8.73364 11.0041 8.99994 11.0041C9.26624 11.0041 9.70994 11.0058 9.70994 11.0058ZM14.2899 14H11.9999H9.70994C9.49976 14 9.49976 13.9959 9.38419 13.9959C8.99976 13.9959 9.1318 13.9959 8.99994 13.9959C8.86808 13.9959 8.73751 14.0219 8.61569 14.0723C8.49387 14.1228 8.38318 14.1968 8.28994 14.29C8.1967 14.3832 8.12274 14.4939 8.07228 14.6158C8.02182 14.7376 7.99585 14.8681 7.99585 15C7.99585 15.1319 8.02182 15.2624 8.07228 15.3842C8.12274 15.5061 8.1967 15.6168 8.28994 15.71L11.2899 18.71C11.3829 18.8037 11.4935 18.8781 11.6154 18.9289C11.7372 18.9797 11.8679 19.0058 11.9999 19.0058C12.132 19.0058 12.2627 18.9797 12.3845 18.9289C12.5064 18.8781 12.617 18.8037 12.7099 18.71L15.7099 15.71C15.8982 15.5217 16.004 15.2663 16.004 15C16.004 14.7337 15.8982 14.4783 15.7099 14.29C15.5216 14.1017 15.2662 13.9959 14.9999 13.9959C14.7336 13.9959 14.4998 14 14.2899 14Z" fill="black" fill-opacity="0.6"/>
</svg>`,share:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9997 14.0001C17.4088 14.004 16.8262 14.1388 16.2937 14.3947C15.7611 14.6506 15.2919 15.0213 14.9197 15.4801L9.81966 13.1301C10.0595 12.3959 10.0595 11.6044 9.81966 10.8701L14.9197 8.52011C15.5213 9.24608 16.36 9.73619 17.2878 9.90395C18.2156 10.0717 19.1729 9.90634 19.9906 9.43702C20.8084 8.96769 21.434 8.22459 21.7572 7.33886C22.0804 6.45312 22.0803 5.4817 21.757 4.59602C21.4336 3.71035 20.8078 2.96736 19.99 2.49818C19.1722 2.02901 18.2149 1.86381 17.2871 2.03174C16.3593 2.19967 15.5207 2.68993 14.9192 3.41601C14.3177 4.14208 13.992 5.05729 13.9997 6.00011C14.0027 6.23835 14.0261 6.47588 14.0697 6.71011L8.78966 9.14011C8.22674 8.58969 7.51391 8.21763 6.74047 8.07054C5.96703 7.92345 5.16738 8.00788 4.44171 8.31325C3.71604 8.61861 3.09662 9.13133 2.66106 9.78718C2.2255 10.443 1.99316 11.2128 1.99316 12.0001C1.99316 12.7874 2.2255 13.5572 2.66106 14.2131C3.09662 14.8689 3.71604 15.3816 4.44171 15.687C5.16738 15.9923 5.96703 16.0768 6.74047 15.9297C7.51391 15.7826 8.22674 15.4105 8.78966 14.8601L14.0697 17.2901C14.0261 17.5243 14.0027 17.7619 13.9997 18.0001C13.9997 18.7912 14.2343 19.5646 14.6738 20.2224C15.1133 20.8802 15.738 21.3929 16.4689 21.6956C17.1998 21.9984 18.0041 22.0776 18.78 21.9233C19.5559 21.7689 20.2687 21.388 20.8281 20.8285C21.3875 20.2691 21.7685 19.5564 21.9228 18.7805C22.0771 18.0046 21.9979 17.2003 21.6952 16.4694C21.3924 15.7385 20.8797 15.1138 20.2219 14.6742C19.5641 14.2347 18.7908 14.0001 17.9997 14.0001ZM17.9997 4.00011C18.3952 4.00011 18.7819 4.11741 19.1108 4.33718C19.4397 4.55694 19.696 4.8693 19.8474 5.23475C19.9988 5.6002 20.0384 6.00233 19.9612 6.3903C19.8841 6.77826 19.6936 7.13462 19.4139 7.41433C19.1342 7.69403 18.7778 7.88451 18.3898 7.96169C18.0019 8.03886 17.5997 7.99925 17.2343 7.84787C16.8688 7.6965 16.5565 7.44015 16.3367 7.11125C16.117 6.78236 15.9997 6.39568 15.9997 6.00011C15.9997 5.46968 16.2104 4.96097 16.5854 4.5859C16.9605 4.21083 17.4692 4.00011 17.9997 4.00011ZM5.99966 14.0001C5.6041 14.0001 5.21742 13.8828 4.88852 13.6631C4.55962 13.4433 4.30328 13.1309 4.1519 12.7655C4.00053 12.4 3.96092 11.9979 4.03809 11.6099C4.11526 11.222 4.30574 10.8656 4.58545 10.5859C4.86515 10.3062 5.22152 10.1157 5.60948 10.0385C5.99744 9.96137 6.39958 10.001 6.76503 10.1524C7.13048 10.3037 7.44284 10.5601 7.6626 10.889C7.88236 11.2179 7.99966 11.6046 7.99966 12.0001C7.99966 12.5305 7.78895 13.0393 7.41388 13.4143C7.0388 13.7894 6.5301 14.0001 5.99966 14.0001ZM17.9997 20.0001C17.6041 20.0001 17.2174 19.8828 16.8885 19.6631C16.5596 19.4433 16.3033 19.1309 16.1519 18.7655C16.0005 18.4 15.9609 17.9979 16.0381 17.6099C16.1153 17.222 16.3057 16.8656 16.5854 16.5859C16.8652 16.3062 17.2215 16.1157 17.6095 16.0385C17.9974 15.9614 18.3996 16.001 18.765 16.1524C19.1305 16.3037 19.4428 16.5601 19.6626 16.889C19.8824 17.2179 19.9997 17.6046 19.9997 18.0001C19.9997 18.5305 19.7889 19.0393 19.4139 19.4143C19.0388 19.7894 18.5301 20.0001 17.9997 20.0001Z" />
</svg>`,square:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM20 20H4V4H20V20Z" />
</svg>`,"to-do":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" />
</svg>`,twitter:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M22 5.8C21.2483 6.12609 20.4534 6.34166 19.64 6.44C20.4982 5.92732 21.1413 5.12078 21.45 4.17C20.6436 4.65006 19.7608 4.98829 18.84 5.17C18.2245 4.50257 17.405 4.05829 16.5098 3.90685C15.6147 3.7554 14.6945 3.90535 13.8938 4.33319C13.093 4.76102 12.4569 5.44253 12.0852 6.27083C11.7135 7.09914 11.6273 8.02739 11.84 8.91C10.2094 8.82752 8.61444 8.40295 7.15865 7.66386C5.70287 6.92477 4.41885 5.88769 3.39 4.62C3.02914 5.25016 2.83952 5.96382 2.84 6.69C2.83872 7.36438 3.00422 8.02861 3.32176 8.62356C3.63929 9.21851 4.09902 9.72571 4.66 10.1C4.00798 10.0823 3.36989 9.90729 2.8 9.59V9.64C2.80489 10.5849 3.13599 11.4991 3.73731 12.228C4.33864 12.9568 5.17326 13.4556 6.1 13.64C5.74326 13.7486 5.37287 13.8058 5 13.81C4.74189 13.807 4.48442 13.7836 4.23 13.74C4.49391 14.5528 5.00462 15.2631 5.69107 15.7722C6.37753 16.2812 7.20558 16.5635 8.06 16.58C6.6172 17.7153 4.83588 18.3349 3 18.34C2.66574 18.3411 2.33174 18.3211 2 18.28C3.87443 19.4903 6.05881 20.1327 8.29 20.13C9.82969 20.146 11.3571 19.855 12.7831 19.2741C14.2091 18.6931 15.505 17.8339 16.5952 16.7465C17.6854 15.6591 18.548 14.3654 19.1326 12.9409C19.7172 11.5164 20.012 9.98972 20 8.45C20 8.28 20 8.1 20 7.92C20.7847 7.33481 21.4615 6.61742 22 5.8Z" />
</svg>`,"up-arrow":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7102 11.29L12.7102 6.29C12.6151 6.19896 12.5029 6.1276 12.3802 6.08C12.1367 5.97999 11.8636 5.97999 11.6202 6.08C11.4974 6.1276 11.3853 6.19896 11.2902 6.29L6.29019 11.29C6.19695 11.3832 6.12299 11.4939 6.07253 11.6158C6.02207 11.7376 5.99609 11.8681 5.99609 12C5.99609 12.2663 6.10188 12.5217 6.29019 12.71C6.47849 12.8983 6.73388 13.0041 7.00019 13.0041C7.26649 13.0041 7.52188 12.8983 7.71019 12.71L11.0002 9.41V17C11.0002 17.2652 11.1055 17.5196 11.2931 17.7071C11.4806 17.8946 11.735 18 12.0002 18C12.2654 18 12.5198 17.8946 12.7073 17.7071C12.8948 17.5196 13.0002 17.2652 13.0002 17V9.41L16.2902 12.71C16.3831 12.8037 16.4937 12.8781 16.6156 12.9289C16.7375 12.9797 16.8682 13.0058 17.0002 13.0058C17.1322 13.0058 17.2629 12.9797 17.3848 12.9289C17.5066 12.8781 17.6172 12.8037 17.7102 12.71C17.8039 12.617 17.8783 12.5064 17.9291 12.3846C17.9798 12.2627 18.006 12.132 18.006 12C18.006 11.868 17.9798 11.7373 17.9291 11.6154C17.8783 11.4936 17.8039 11.383 17.7102 11.29Z" />
</svg>`,"upper-arrow":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9997 13.41L12.7097 9.17C12.6167 9.07628 12.5061 9.00188 12.3843 8.95111C12.2624 8.90035 12.1317 8.87421 11.9997 8.87421C11.8677 8.87421 11.737 8.90035 11.6151 8.95111C11.4933 9.00188 11.3827 9.07628 11.2897 9.17L7.0497 13.41C6.95598 13.503 6.88158 13.6136 6.83081 13.7354C6.78004 13.8573 6.75391 13.988 6.75391 14.12C6.75391 14.252 6.78004 14.3827 6.83081 14.5046C6.88158 14.6264 6.95598 14.737 7.0497 14.83C7.23707 15.0163 7.49052 15.1208 7.7547 15.1208C8.01889 15.1208 8.27234 15.0163 8.4597 14.83L11.9997 11.29L15.5397 14.83C15.726 15.0147 15.9774 15.1189 16.2397 15.12C16.3713 15.1208 16.5018 15.0955 16.6236 15.0458C16.7454 14.996 16.8563 14.9227 16.9497 14.83C17.0468 14.7404 17.1251 14.6324 17.1802 14.5123C17.2353 14.3923 17.2661 14.2625 17.2708 14.1304C17.2754 13.9984 17.2539 13.8667 17.2073 13.7431C17.1608 13.6194 17.0902 13.5062 16.9997 13.41Z" />
</svg>`,"upper-right-arrow":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9199 6.62C17.8185 6.37565 17.6243 6.18147 17.3799 6.08C17.2597 6.02876 17.1306 6.00158 16.9999 6H6.99994C6.73472 6 6.48037 6.10536 6.29283 6.29289C6.1053 6.48043 5.99994 6.73478 5.99994 7C5.99994 7.26522 6.1053 7.51957 6.29283 7.70711C6.48037 7.89464 6.73472 8 6.99994 8H14.5899L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L15.9999 9.41V17C15.9999 17.2652 16.1053 17.5196 16.2928 17.7071C16.4804 17.8946 16.7347 18 16.9999 18C17.2652 18 17.5195 17.8946 17.707 17.7071C17.8946 17.5196 17.9999 17.2652 17.9999 17V7C17.9984 6.86932 17.9712 6.74022 17.9199 6.62Z" />
</svg>`,users:`<svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.1 17.8909C24.1672 16.9672 25.0231 15.8247 25.6097 14.541C26.1964 13.2572 26.5 11.8623 26.5 10.4509C26.5 7.79876 25.4464 5.25522 23.5711 3.37986C21.6957 1.5045 19.1522 0.450928 16.5 0.450928C13.8478 0.450928 11.3043 1.5045 9.42893 3.37986C7.55357 5.25522 6.5 7.79876 6.5 10.4509C6.49998 11.8623 6.8036 13.2572 7.39025 14.541C7.9769 15.8247 8.83284 16.9672 9.9 17.8909C7.10028 19.1587 4.72493 21.206 3.05796 23.788C1.39099 26.37 0.502944 29.3775 0.5 32.4509C0.5 32.9814 0.710714 33.4901 1.08579 33.8651C1.46086 34.2402 1.96957 34.4509 2.5 34.4509C3.03043 34.4509 3.53914 34.2402 3.91421 33.8651C4.28929 33.4901 4.5 32.9814 4.5 32.4509C4.5 29.2683 5.76428 26.2161 8.01472 23.9656C10.2652 21.7152 13.3174 20.4509 16.5 20.4509C19.6826 20.4509 22.7348 21.7152 24.9853 23.9656C27.2357 26.2161 28.5 29.2683 28.5 32.4509C28.5 32.9814 28.7107 33.4901 29.0858 33.8651C29.4609 34.2402 29.9696 34.4509 30.5 34.4509C31.0304 34.4509 31.5391 34.2402 31.9142 33.8651C32.2893 33.4901 32.5 32.9814 32.5 32.4509C32.4971 29.3775 31.609 26.37 29.942 23.788C28.2751 21.206 25.8997 19.1587 23.1 17.8909ZM16.5 16.4509C15.3133 16.4509 14.1533 16.099 13.1666 15.4397C12.1799 14.7805 11.4108 13.8434 10.9567 12.747C10.5026 11.6507 10.3838 10.4443 10.6153 9.28039C10.8468 8.1165 11.4182 7.0474 12.2574 6.20829C13.0965 5.36917 14.1656 4.79773 15.3295 4.56622C16.4933 4.33471 17.6997 4.45353 18.7961 4.90765C19.8925 5.36178 20.8295 6.13081 21.4888 7.11751C22.1481 8.1042 22.5 9.26424 22.5 10.4509C22.5 12.0422 21.8679 13.5684 20.7426 14.6936C19.6174 15.8188 18.0913 16.4509 16.5 16.4509ZM35.98 17.0909C37.2599 15.6496 38.096 13.869 38.3876 11.9636C38.6792 10.0582 38.4139 8.10908 37.6235 6.35093C36.8332 4.59278 35.5516 3.10052 33.9329 2.05377C32.3143 1.00703 30.4276 0.450413 28.5 0.450928C27.9696 0.450928 27.4609 0.661642 27.0858 1.03671C26.7107 1.41179 26.5 1.9205 26.5 2.45093C26.5 2.98136 26.7107 3.49007 27.0858 3.86514C27.4609 4.24021 27.9696 4.45093 28.5 4.45093C30.0913 4.45093 31.6174 5.08307 32.7426 6.20829C33.8679 7.33351 34.5 8.85963 34.5 10.4509C34.4972 11.5014 34.2186 12.5327 33.6921 13.4418C33.1657 14.3508 32.4097 15.1057 31.5 15.6309C31.2035 15.802 30.9558 16.0463 30.7807 16.3404C30.6056 16.6346 30.509 16.9687 30.5 17.3109C30.4916 17.6505 30.5699 17.9865 30.7273 18.2874C30.8848 18.5884 31.1163 18.8442 31.4 19.0309L32.18 19.5509L32.44 19.6909C34.8508 20.8344 36.8846 22.6429 38.302 24.9036C39.7193 27.1642 40.4611 29.7828 40.44 32.4509C40.44 32.9814 40.6507 33.4901 41.0258 33.8651C41.4009 34.2402 41.9096 34.4509 42.44 34.4509C42.9704 34.4509 43.4791 34.2402 43.8542 33.8651C44.2293 33.4901 44.44 32.9814 44.44 32.4509C44.4563 29.3818 43.6876 26.3594 42.2069 23.6711C40.7262 20.9827 38.5827 18.7176 35.98 17.0909Z" fill="white"/>
<path d="M23.1 17.8909C24.1672 16.9672 25.0231 15.8247 25.6097 14.541C26.1964 13.2572 26.5 11.8623 26.5 10.4509C26.5 7.79876 25.4464 5.25522 23.5711 3.37986C21.6957 1.5045 19.1522 0.450928 16.5 0.450928C13.8478 0.450928 11.3043 1.5045 9.42893 3.37986C7.55357 5.25522 6.5 7.79876 6.5 10.4509C6.49998 11.8623 6.8036 13.2572 7.39025 14.541C7.9769 15.8247 8.83284 16.9672 9.9 17.8909C7.10028 19.1587 4.72493 21.206 3.05796 23.788C1.39099 26.37 0.502944 29.3775 0.5 32.4509C0.5 32.9814 0.710714 33.4901 1.08579 33.8651C1.46086 34.2402 1.96957 34.4509 2.5 34.4509C3.03043 34.4509 3.53914 34.2402 3.91421 33.8651C4.28929 33.4901 4.5 32.9814 4.5 32.4509C4.5 29.2683 5.76428 26.2161 8.01472 23.9656C10.2652 21.7152 13.3174 20.4509 16.5 20.4509C19.6826 20.4509 22.7348 21.7152 24.9853 23.9656C27.2357 26.2161 28.5 29.2683 28.5 32.4509C28.5 32.9814 28.7107 33.4901 29.0858 33.8651C29.4609 34.2402 29.9696 34.4509 30.5 34.4509C31.0304 34.4509 31.5391 34.2402 31.9142 33.8651C32.2893 33.4901 32.5 32.9814 32.5 32.4509C32.4971 29.3775 31.609 26.37 29.942 23.788C28.2751 21.206 25.8997 19.1587 23.1 17.8909ZM16.5 16.4509C15.3133 16.4509 14.1533 16.099 13.1666 15.4397C12.1799 14.7805 11.4108 13.8434 10.9567 12.747C10.5026 11.6507 10.3838 10.4443 10.6153 9.28039C10.8468 8.1165 11.4182 7.0474 12.2574 6.20829C13.0965 5.36917 14.1656 4.79773 15.3295 4.56622C16.4933 4.33471 17.6997 4.45353 18.7961 4.90765C19.8925 5.36178 20.8295 6.13081 21.4888 7.11751C22.1481 8.1042 22.5 9.26424 22.5 10.4509C22.5 12.0422 21.8679 13.5684 20.7426 14.6936C19.6174 15.8188 18.0913 16.4509 16.5 16.4509ZM35.98 17.0909C37.2599 15.6496 38.096 13.869 38.3876 11.9636C38.6792 10.0582 38.4139 8.10908 37.6235 6.35093C36.8332 4.59278 35.5516 3.10052 33.9329 2.05377C32.3143 1.00703 30.4276 0.450413 28.5 0.450928C27.9696 0.450928 27.4609 0.661642 27.0858 1.03671C26.7107 1.41179 26.5 1.9205 26.5 2.45093C26.5 2.98136 26.7107 3.49007 27.0858 3.86514C27.4609 4.24021 27.9696 4.45093 28.5 4.45093C30.0913 4.45093 31.6174 5.08307 32.7426 6.20829C33.8679 7.33351 34.5 8.85963 34.5 10.4509C34.4972 11.5014 34.2186 12.5327 33.6921 13.4418C33.1657 14.3508 32.4097 15.1057 31.5 15.6309C31.2035 15.802 30.9558 16.0463 30.7807 16.3404C30.6056 16.6346 30.509 16.9687 30.5 17.3109C30.4916 17.6505 30.5699 17.9865 30.7273 18.2874C30.8848 18.5884 31.1163 18.8442 31.4 19.0309L32.18 19.5509L32.44 19.6909C34.8508 20.8344 36.8846 22.6429 38.302 24.9036C39.7193 27.1642 40.4611 29.7828 40.44 32.4509C40.44 32.9814 40.6507 33.4901 41.0258 33.8651C41.4009 34.2402 41.9096 34.4509 42.44 34.4509C42.9704 34.4509 43.4791 34.2402 43.8542 33.8651C44.2293 33.4901 44.44 32.9814 44.44 32.4509C44.4563 29.3818 43.6876 26.3594 42.2069 23.6711C40.7262 20.9827 38.5827 18.7176 35.98 17.0909Z" fill="black" fill-opacity="0.1"/>
</svg>`,watch:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M11 2C9.02219 2 7.08879 2.58649 5.4443 3.6853C3.79981 4.78412 2.51809 6.3459 1.76121 8.17317C1.00433 10.0004 0.806299 12.0111 1.19215 13.9509C1.578 15.8907 2.53041 17.6725 3.92894 19.0711C5.32746 20.4696 7.10929 21.422 9.0491 21.8079C10.9889 22.1937 12.9996 21.9957 14.8268 21.2388C16.6541 20.4819 18.2159 19.2002 19.3147 17.5557C20.4135 15.9112 21 13.9778 21 12C21 10.6868 20.7413 9.38642 20.2388 8.17317C19.7363 6.95991 18.9997 5.85752 18.0711 4.92893C17.1425 4.00035 16.0401 3.26375 14.8268 2.7612C13.6136 2.25866 12.3132 2 11 2ZM11 20C9.41775 20 7.87104 19.5308 6.55544 18.6518C5.23985 17.7727 4.21447 16.5233 3.60897 15.0615C3.00347 13.5997 2.84504 11.9911 3.15372 10.4393C3.4624 8.88743 4.22433 7.46197 5.34315 6.34315C6.46197 5.22433 7.88743 4.4624 9.43928 4.15372C10.9911 3.84504 12.5997 4.00346 14.0615 4.60896C15.5233 5.21447 16.7727 6.23984 17.6518 7.55544C18.5308 8.87103 19 10.4177 19 12C19 14.1217 18.1572 16.1566 16.6569 17.6569C15.1566 19.1571 13.1217 20 11 20ZM14.1 12.63L12 11.42V7C12 6.73478 11.8946 6.48043 11.7071 6.29289C11.5196 6.10536 11.2652 6 11 6C10.7348 6 10.4804 6.10536 10.2929 6.29289C10.1054 6.48043 10 6.73478 10 7V12C10 12 10 12.08 10 12.12C10.0059 12.1889 10.0228 12.2564 10.05 12.32C10.0706 12.3793 10.0974 12.4363 10.13 12.49C10.1574 12.5468 10.1909 12.6005 10.23 12.65L10.39 12.78L10.48 12.87L13.08 14.37C13.2324 14.4564 13.4048 14.5012 13.58 14.5C13.8014 14.5015 14.0171 14.4296 14.1932 14.2953C14.3693 14.1611 14.4959 13.9722 14.5531 13.7583C14.6103 13.5444 14.5948 13.3176 14.5092 13.1134C14.4236 12.9092 14.2726 12.7392 14.08 12.63H14.1Z" />
</svg>`,"water-drop":`<svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.12 4.79004C24.7893 4.56648 24.3992 4.44702 24 4.44702C23.6008 4.44702 23.2107 4.56648 22.88 4.79004C22.28 5.19004 8.5 14.79 8.5 28.95C8.5 33.0609 10.133 37.0034 13.0398 39.9102C15.9467 42.817 19.8891 44.45 24 44.45C28.1109 44.45 32.0533 42.817 34.9602 39.9102C37.867 37.0034 39.5 33.0609 39.5 28.95C39.5 14.55 25.7 5.17004 25.12 4.79004ZM24 40.45C20.9516 40.4447 18.0296 39.2314 15.8741 37.0759C13.7186 34.9204 12.5053 31.9984 12.5 28.95C12.5 18.95 20.92 11.41 24 8.95004C27.1 11.37 35.5 18.95 35.5 28.95C35.4947 31.9984 34.2814 34.9204 32.1259 37.0759C29.9704 39.2314 27.0484 40.4447 24 40.45Z" fill="white"/>
<path d="M25.12 4.79004C24.7893 4.56648 24.3992 4.44702 24 4.44702C23.6008 4.44702 23.2107 4.56648 22.88 4.79004C22.28 5.19004 8.5 14.79 8.5 28.95C8.5 33.0609 10.133 37.0034 13.0398 39.9102C15.9467 42.817 19.8891 44.45 24 44.45C28.1109 44.45 32.0533 42.817 34.9602 39.9102C37.867 37.0034 39.5 33.0609 39.5 28.95C39.5 14.55 25.7 5.17004 25.12 4.79004ZM24 40.45C20.9516 40.4447 18.0296 39.2314 15.8741 37.0759C13.7186 34.9204 12.5053 31.9984 12.5 28.95C12.5 18.95 20.92 11.41 24 8.95004C27.1 11.37 35.5 18.95 35.5 28.95C35.4947 31.9984 34.2814 34.9204 32.1259 37.0759C29.9704 39.2314 27.0484 40.4447 24 40.45Z" fill="black" fill-opacity="0.1"/>
</svg>`,web:`<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 8.45093C18.1044 8.45093 17.7178 8.56823 17.3889 8.78799C17.06 9.00775 16.8036 9.32011 16.6522 9.68556C16.5009 10.051 16.4613 10.4531 16.5384 10.8411C16.6156 11.2291 16.8061 11.5854 17.0858 11.8651C17.3655 12.1448 17.7219 12.3353 18.1098 12.4125C18.4978 12.4897 18.8999 12.4501 19.2654 12.2987C19.6308 12.1473 19.9432 11.891 20.1629 11.5621C20.3827 11.2332 20.5 10.8465 20.5 10.4509C20.5 9.9205 20.2893 9.41179 19.9142 9.03671C19.5391 8.66164 19.0304 8.45093 18.5 8.45093ZM10.5 8.45093C10.1044 8.45093 9.71776 8.56823 9.38886 8.78799C9.05996 9.00775 8.80362 9.32011 8.65224 9.68556C8.50087 10.051 8.46126 10.4531 8.53843 10.8411C8.6156 11.2291 8.80608 11.5854 9.08579 11.8651C9.36549 12.1448 9.72186 12.3353 10.1098 12.4125C10.4978 12.4897 10.8999 12.4501 11.2654 12.2987C11.6308 12.1473 11.9432 11.891 12.1629 11.5621C12.3827 11.2332 12.5 10.8465 12.5 10.4509C12.5 9.9205 12.2893 9.41179 11.9142 9.03671C11.5391 8.66164 11.0304 8.45093 10.5 8.45093ZM26.5 8.45093C26.1044 8.45093 25.7178 8.56823 25.3889 8.78799C25.06 9.00775 24.8036 9.32011 24.6522 9.68556C24.5009 10.051 24.4613 10.4531 24.5384 10.8411C24.6156 11.2291 24.8061 11.5854 25.0858 11.8651C25.3655 12.1448 25.7219 12.3353 26.1098 12.4125C26.4978 12.4897 26.8999 12.4501 27.2654 12.2987C27.6308 12.1473 27.9432 11.891 28.1629 11.5621C28.3827 11.2332 28.5 10.8465 28.5 10.4509C28.5 9.9205 28.2893 9.41179 27.9142 9.03671C27.5391 8.66164 27.0304 8.45093 26.5 8.45093ZM38.5 0.450928H6.5C4.9087 0.450928 3.38258 1.08307 2.25736 2.20829C1.13214 3.33351 0.5 4.85963 0.5 6.45093V38.4509C0.5 40.0422 1.13214 41.5684 2.25736 42.6936C3.38258 43.8188 4.9087 44.4509 6.5 44.4509H38.5C40.0913 44.4509 41.6174 43.8188 42.7426 42.6936C43.8679 41.5684 44.5 40.0422 44.5 38.4509V6.45093C44.5 4.85963 43.8679 3.33351 42.7426 2.20829C41.6174 1.08307 40.0913 0.450928 38.5 0.450928ZM40.5 38.4509C40.5 38.9814 40.2893 39.4901 39.9142 39.8651C39.5391 40.2402 39.0304 40.4509 38.5 40.4509H6.5C5.96957 40.4509 5.46086 40.2402 5.08579 39.8651C4.71071 39.4901 4.5 38.9814 4.5 38.4509V20.4509H40.5V38.4509ZM40.5 16.4509H4.5V6.45093C4.5 5.92049 4.71071 5.41179 5.08579 5.03671C5.46086 4.66164 5.96957 4.45093 6.5 4.45093H38.5C39.0304 4.45093 39.5391 4.66164 39.9142 5.03671C40.2893 5.41179 40.5 5.92049 40.5 6.45093V16.4509Z" fill="white"/>
<path d="M18.5 8.45093C18.1044 8.45093 17.7178 8.56823 17.3889 8.78799C17.06 9.00775 16.8036 9.32011 16.6522 9.68556C16.5009 10.051 16.4613 10.4531 16.5384 10.8411C16.6156 11.2291 16.8061 11.5854 17.0858 11.8651C17.3655 12.1448 17.7219 12.3353 18.1098 12.4125C18.4978 12.4897 18.8999 12.4501 19.2654 12.2987C19.6308 12.1473 19.9432 11.891 20.1629 11.5621C20.3827 11.2332 20.5 10.8465 20.5 10.4509C20.5 9.9205 20.2893 9.41179 19.9142 9.03671C19.5391 8.66164 19.0304 8.45093 18.5 8.45093ZM10.5 8.45093C10.1044 8.45093 9.71776 8.56823 9.38886 8.78799C9.05996 9.00775 8.80362 9.32011 8.65224 9.68556C8.50087 10.051 8.46126 10.4531 8.53843 10.8411C8.6156 11.2291 8.80608 11.5854 9.08579 11.8651C9.36549 12.1448 9.72186 12.3353 10.1098 12.4125C10.4978 12.4897 10.8999 12.4501 11.2654 12.2987C11.6308 12.1473 11.9432 11.891 12.1629 11.5621C12.3827 11.2332 12.5 10.8465 12.5 10.4509C12.5 9.9205 12.2893 9.41179 11.9142 9.03671C11.5391 8.66164 11.0304 8.45093 10.5 8.45093ZM26.5 8.45093C26.1044 8.45093 25.7178 8.56823 25.3889 8.78799C25.06 9.00775 24.8036 9.32011 24.6522 9.68556C24.5009 10.051 24.4613 10.4531 24.5384 10.8411C24.6156 11.2291 24.8061 11.5854 25.0858 11.8651C25.3655 12.1448 25.7219 12.3353 26.1098 12.4125C26.4978 12.4897 26.8999 12.4501 27.2654 12.2987C27.6308 12.1473 27.9432 11.891 28.1629 11.5621C28.3827 11.2332 28.5 10.8465 28.5 10.4509C28.5 9.9205 28.2893 9.41179 27.9142 9.03671C27.5391 8.66164 27.0304 8.45093 26.5 8.45093ZM38.5 0.450928H6.5C4.9087 0.450928 3.38258 1.08307 2.25736 2.20829C1.13214 3.33351 0.5 4.85963 0.5 6.45093V38.4509C0.5 40.0422 1.13214 41.5684 2.25736 42.6936C3.38258 43.8188 4.9087 44.4509 6.5 44.4509H38.5C40.0913 44.4509 41.6174 43.8188 42.7426 42.6936C43.8679 41.5684 44.5 40.0422 44.5 38.4509V6.45093C44.5 4.85963 43.8679 3.33351 42.7426 2.20829C41.6174 1.08307 40.0913 0.450928 38.5 0.450928ZM40.5 38.4509C40.5 38.9814 40.2893 39.4901 39.9142 39.8651C39.5391 40.2402 39.0304 40.4509 38.5 40.4509H6.5C5.96957 40.4509 5.46086 40.2402 5.08579 39.8651C4.71071 39.4901 4.5 38.9814 4.5 38.4509V20.4509H40.5V38.4509ZM40.5 16.4509H4.5V6.45093C4.5 5.92049 4.71071 5.41179 5.08579 5.03671C5.46086 4.66164 5.96957 4.45093 6.5 4.45093H38.5C39.0304 4.45093 39.5391 4.66164 39.9142 5.03671C40.2893 5.41179 40.5 5.92049 40.5 6.45093V16.4509Z" fill="black" fill-opacity="0.1"/>
</svg>`,"word-file":`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H10V7C10 7.79565 10.3161 8.55871 10.8787 9.12132C11.4413 9.68393 12.2044 10 13 10H16V12C16 12.2652 16.1054 12.5196 16.2929 12.7071C16.4804 12.8946 16.7348 13 17 13C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12V9C18 9 18 9 18 8.94C17.9896 8.84813 17.9695 8.75763 17.94 8.67V8.58C17.8919 8.47718 17.8278 8.38267 17.75 8.3L11.75 2.3C11.6673 2.22222 11.5728 2.15808 11.47 2.11C11.4402 2.10576 11.4099 2.10576 11.38 2.11C11.2784 2.05174 11.1662 2.01434 11.05 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H12C12.2652 22 12.5196 21.8946 12.7071 21.7071C12.8946 21.5196 13 21.2652 13 21C13 20.7348 12.8946 20.4804 12.7071 20.2929C12.5196 20.1054 12.2652 20 12 20ZM12 5.41L14.59 8H13C12.7348 8 12.4804 7.89464 12.2929 7.70711C12.1054 7.51957 12 7.26522 12 7V5.41ZM7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9C6 9.26522 6.10536 9.51957 6.29289 9.70711C6.48043 9.89464 6.73478 10 7 10H8C8.26522 10 8.51957 9.89464 8.70711 9.70711C8.89464 9.51957 9 9.26522 9 9C9 8.73478 8.89464 8.48043 8.70711 8.29289C8.51957 8.10536 8.26522 8 8 8H7ZM13 12H7C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13C14 12.7348 13.8946 12.4804 13.7071 12.2929C13.5196 12.1054 13.2652 12 13 12ZM11 18C11.2652 18 11.5196 17.8946 11.7071 17.7071C11.8946 17.5196 12 17.2652 12 17C12 16.7348 11.8946 16.4804 11.7071 16.2929C11.5196 16.1054 11.2652 16 11 16H7C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18H11Z"/>
<path d="M20.9243 15.0075C20.7034 15.0075 20.5136 15.1575 20.471 15.3637C19.6729 19.0275 19.6807 18.9412 19.6574 19.245C19.6497 19.2 19.6419 19.1475 19.6303 19.0838C19.5993 18.8925 19.6419 19.0913 18.716 15.3525C18.6657 15.15 18.4797 15.0075 18.2628 15.0075H17.7475C17.5345 15.0075 17.3485 15.15 17.2943 15.3487C16.349 19.0612 16.3645 18.9562 16.3335 19.2375C16.3296 19.1962 16.3258 19.1437 16.3141 19.08C16.287 18.885 15.7679 16.3312 15.5742 15.3675C15.5316 15.1575 15.3417 15.0037 15.117 15.0037H14.4662C14.164 15.0037 13.9432 15.2775 14.0129 15.5588C14.3229 16.7813 15.0473 19.665 15.2991 20.6588C15.3495 20.8613 15.5354 21 15.7524 21H16.7287C16.9417 21 17.1277 20.8613 17.178 20.6588L17.8715 17.9813C17.9296 17.7487 17.9684 17.5312 17.9877 17.3325L18.1001 17.9813C18.1039 17.9962 18.5882 19.875 18.7935 20.6588C18.8439 20.8575 19.0298 21 19.2429 21H20.1998C20.4129 21 20.5988 20.8613 20.6492 20.6588C21.455 17.5875 21.8192 16.1963 21.9858 15.5588C22.0594 15.2738 21.8385 15 21.5364 15H20.9243V15.0075Z"/>
</svg>`,x:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
</svg>`,youtube:`<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M23 9.70998C23.0495 8.27864 22.7365 6.858 22.09 5.57998C21.6514 5.05558 21.0427 4.70169 20.37 4.57998C17.5875 4.32751 14.7936 4.22403 12 4.26998C9.21667 4.22194 6.43274 4.32208 3.66003 4.56998C3.11185 4.6697 2.60454 4.92683 2.20003 5.30998C1.30003 6.13998 1.20003 7.55998 1.10003 8.75998C0.954939 10.9175 0.954939 13.0824 1.10003 15.24C1.12896 15.9154 1.22952 16.5858 1.40003 17.24C1.5206 17.745 1.76455 18.2123 2.11003 18.6C2.51729 19.0034 3.03641 19.2752 3.60003 19.38C5.75594 19.6461 7.92824 19.7564 10.1 19.71C13.6 19.76 16.67 19.71 20.3 19.43C20.8775 19.3316 21.4112 19.0595 21.83 18.65C22.11 18.3699 22.3191 18.0271 22.44 17.65C22.7977 16.5526 22.9733 15.4041 22.96 14.25C23 13.69 23 10.31 23 9.70998ZM9.74003 14.85V8.65998L15.66 11.77C14 12.69 11.81 13.73 9.74003 14.85Z" />
</svg>`};var c9=Object.defineProperty,l9=Object.getOwnPropertyDescriptor,v1=(e,t,r,i)=>{for(var n=i>1?void 0:i?l9(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&c9(t,r,n),n};C.CtIcon=class extends c.LitElement{constructor(){super(...arguments),this.modifierClass=""}render(){const t=this.name?s9[this.name]:void 0;if(!t)return c.nothing;const r=["ct-icon",this.size?`ct-icon--size-${this.size}`:"",this.modifierClass].filter(Boolean).join(" "),i=t.replace(/^<svg /,`<svg class="${r}" aria-hidden="true" role="img" `);return c.html`${C9(i)}`}},C.CtIcon.styles=c.css`
    :host {
      display: inline-block;
      line-height: 0;
    }

    svg.ct-icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      fill: currentColor;
      vertical-align: middle;
    }

    svg.ct-icon--size-extra-small {
      font-size: var(--ct-icon-size-extra-small);
    }
    svg.ct-icon--size-small {
      font-size: var(--ct-icon-size-small);
    }
    svg.ct-icon--size-regular {
      font-size: var(--ct-icon-size-regular);
    }
    svg.ct-icon--size-large {
      font-size: var(--ct-icon-size-large);
    }
    svg.ct-icon--size-extra-large {
      font-size: var(--ct-icon-size-extra-large);
    }
  `,v1([d({type:String})],C.CtIcon.prototype,"name",2),v1([d({type:String})],C.CtIcon.prototype,"size",2),v1([d({type:String,attribute:"modifier-class"})],C.CtIcon.prototype,"modifierClass",2),C.CtIcon=v1([Z("ct-icon")],C.CtIcon);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=q1(class extends F1{constructor(e){var t;if(super(e),e.type!==W1.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var i,n;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in t)t[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(t)}const r=e.element.classList;for(const o of this.st)o in t||(r.remove(o),this.st.delete(o));for(const o in t){const a=!!t[o];a===this.st.has(o)||(n=this.nt)!=null&&n.has(o)||(a?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return j}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=e=>e??$;var d9=Object.defineProperty,h9=Object.getOwnPropertyDescriptor,V=(e,t,r,i)=>{for(var n=i>1?void 0:i?h9(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&d9(t,r,n),n};C.CtButton=class extends c.LitElement{constructor(){super(...arguments),this.theme="light",this.kind="button",this.variant="primary",this.size="regular",this.label="",this.iconPlacement="after",this.disabled=!1,this.newWindow=!1,this.external=!1,this.dismissable=!1,this.modifierClass=""}render(){const t={"ct-button":!0,[`ct-theme-${this.theme}`]:!0,[`ct-button--${this.variant}`]:!0,[`ct-button--${this.size}`]:!0,"ct-button--external":this.external,"ct-button--dismiss":this.dismissable,[this.modifierClass]:!!this.modifierClass},r=this.icon?c.html`<ct-icon class="ct-button__icon" name=${this.icon}></ct-icon>`:c.nothing,i=this.label?c.html`<span class="ct-button__text">${this.label}</span>`:c.nothing,n=c.html`
      ${this.iconPlacement==="before"?r:c.nothing}
      ${i}
      <slot></slot>
      ${this.iconPlacement==="after"?r:c.nothing}
    `;return this.kind==="link"?c.html`
        <a 
          href=${x(this.url)} 
          role="button" 
          class=${I(t)} 
          data-component-name="button"
          target=${x(this.newWindow?"_blank":void 0)}
          rel=${x(this.newWindow?"noopener noreferrer":void 0)}
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
        >
          ${n}
        </a>
      `:this.kind==="submit"||this.kind==="reset"?c.html`
        <input 
          type=${this.kind} 
          class=${I(t)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      `:c.html`
      <button 
        type="button" 
        class=${I(t)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${n}
      </button>
    `}},C.CtButton.styles=c.css`
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
  `,V([d({type:String})],C.CtButton.prototype,"theme",2),V([d({type:String})],C.CtButton.prototype,"kind",2),V([d({type:String})],C.CtButton.prototype,"variant",2),V([d({type:String})],C.CtButton.prototype,"size",2),V([d({type:String})],C.CtButton.prototype,"label",2),V([d({type:String})],C.CtButton.prototype,"url",2),V([d({type:String})],C.CtButton.prototype,"icon",2),V([d({type:String,attribute:"icon-placement"})],C.CtButton.prototype,"iconPlacement",2),V([d({type:Boolean,reflect:!0})],C.CtButton.prototype,"disabled",2),V([d({type:Boolean,attribute:"new-window"})],C.CtButton.prototype,"newWindow",2),V([d({type:Boolean})],C.CtButton.prototype,"external",2),V([d({type:Boolean})],C.CtButton.prototype,"dismissable",2),V([d({type:String,attribute:"modifier-class"})],C.CtButton.prototype,"modifierClass",2),C.CtButton=V([Z("ct-button")],C.CtButton);var g9=Object.defineProperty,p9=Object.getOwnPropertyDescriptor,k=(e,t,r,i)=>{for(var n=i>1?void 0:i?p9(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&g9(t,r,n),n};C.CtLink=class extends c.LitElement{constructor(){super(...arguments),this.theme="light",this.label="",this.newWindow=!1,this.external=!1,this.active=!1,this.disabled=!1,this.iconPlacement="after",this.iconGroupDisabled=!1,this.iconSingleOnly=!1,this.modifierClass=""}renderContent(){const t=this.external&&this.iconSingleOnly?"upper-right-arrow":this.icon,r=!!t||this.external,i=this.newWindow?c.html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`:c.nothing;if(!r)return c.html`<span class="ct-link__text">${this.label}</span>${i}`;const n=t?c.html`<ct-icon class="ct-link__icon" name=${t}></ct-icon>`:c.nothing;if(!this.label)return c.html`${n}${i}`;const o=this.label.trim().split(/\s+/),a=o[o.length-1]??"",l=o.slice(0,-1).join(" "),s=this.iconGroupDisabled||this.iconPlacement==="before"&&!this.external,g=this.iconPlacement==="before"?n:c.nothing,f=c.html`
      ${this.iconPlacement==="after"?n:c.nothing}
      ${this.external&&!this.iconSingleOnly?c.html`<ct-icon class="ct-link__icon ct-link__icon--external" name="upper-right-arrow"></ct-icon>`:c.nothing}
    `;return s?c.html`${g}<span class="ct-link__text">${this.label}</span>${f}${i}`:c.html`
      ${g}<span class="ct-link__text">${l} </span
      ><span class="ct-link__group"><span class="ct-link__text">${a}</span> ${f}</span
      >${i}
    `}render(){const t=!!this.icon&&!this.label,r={"ct-link":!0,[`ct-theme-${this.theme}`]:!0,"ct-link--external":this.external,"ct-link--active":this.active,"ct-link--disabled":this.disabled,"ct-link--only-icon":t,[this.modifierClass]:!!this.modifierClass};return!this.label&&!this.icon?c.nothing:c.html`
      <a
        class=${I(r)}
        data-component-name="link"
        href=${x(this.url)}
        title=${x(this.linkTitle)}
        target=${x(this.newWindow?"_blank":void 0)}
        rel=${x(this.newWindow?"noopener noreferrer":void 0)}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
      >
        ${this.renderContent()}
      </a>
    `}},C.CtLink.styles=c.css`
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
  `,k([d({type:String})],C.CtLink.prototype,"theme",2),k([d({type:String})],C.CtLink.prototype,"label",2),k([d({type:String})],C.CtLink.prototype,"url",2),k([d({type:String,attribute:"title"})],C.CtLink.prototype,"linkTitle",2),k([d({type:Boolean,attribute:"new-window"})],C.CtLink.prototype,"newWindow",2),k([d({type:Boolean})],C.CtLink.prototype,"external",2),k([d({type:Boolean,reflect:!0})],C.CtLink.prototype,"active",2),k([d({type:Boolean,reflect:!0})],C.CtLink.prototype,"disabled",2),k([d({type:String})],C.CtLink.prototype,"icon",2),k([d({type:String,attribute:"icon-placement"})],C.CtLink.prototype,"iconPlacement",2),k([d({type:Boolean,attribute:"icon-group-disabled"})],C.CtLink.prototype,"iconGroupDisabled",2),k([d({type:Boolean,attribute:"icon-single-only"})],C.CtLink.prototype,"iconSingleOnly",2),k([d({type:String,attribute:"modifier-class"})],C.CtLink.prototype,"modifierClass",2),C.CtLink=k([Z("ct-link")],C.CtLink);var u9=Object.defineProperty,v9=Object.getOwnPropertyDescriptor,f1=(e,t,r,i)=>{for(var n=i>1?void 0:i?v9(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&u9(t,r,n),n};C.CtAccordionItem=class extends c.LitElement{constructor(){super(...arguments),this.heading="",this.expanded=!1,this.disabled=!1}render(){return c.html`<slot></slot>`}},f1([d({type:String})],C.CtAccordionItem.prototype,"heading",2),f1([d({type:Boolean})],C.CtAccordionItem.prototype,"expanded",2),f1([d({type:Boolean})],C.CtAccordionItem.prototype,"disabled",2),C.CtAccordionItem=f1([Z("ct-accordion-item")],C.CtAccordionItem);var i1=(e,t=[])=>({parts:(...r)=>{if(f9(t))return i1(e,r);throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?")},extendWith:(...r)=>i1(e,[...t,...r]),omit:(...r)=>i1(e,t.filter(i=>!r.includes(i))),rename:r=>i1(r,t),keys:()=>t,build:()=>[...new Set(t)].reduce((r,i)=>Object.assign(r,{[i]:{selector:[`&[data-scope="${F(e)}"][data-part="${F(i)}"]`,`& [data-scope="${F(e)}"][data-part="${F(i)}"]`].join(", "),attrs:{"data-scope":F(e),"data-part":F(i)}}}),{})}),F=e=>e.replace(/([A-Z])([A-Z])/g,"$1-$2").replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase(),f9=e=>e.length===0,m9=i1("accordion").parts("root","item","itemTrigger","itemContent","itemIndicator"),n1=m9.build(),a2=e=>typeof e=="object"&&e!==null,G=e=>e?"":void 0,w9=9,b9=e=>a2(e)&&e.nodeType===w9,y9=e=>a2(e)&&e===e.window;function _9(e){if(!e)return!1;const t=e.getRootNode();return C2(t)===e}function $9(e){return b9(e)?e:y9(e)?e.document:(e==null?void 0:e.ownerDocument)??document}function C2(e){let t=e.activeElement;for(;t!=null&&t.shadowRoot;){const r=t.shadowRoot.activeElement;if(!r||r===t)break;t=r}return t}var s2=()=>typeof document<"u";function H9(){const e=navigator.userAgentData;return(e==null?void 0:e.platform)??navigator.platform}var T1=e=>s2()&&e.test(H9()),L9=e=>s2()&&e.test(navigator.vendor),M9=()=>T1(/^iPhone/i),V9=()=>T1(/^iPad/i)||c2()&&navigator.maxTouchPoints>1,k9=()=>M9()||V9(),Z9=()=>c2()||k9(),c2=()=>T1(/^Mac/i),x9=()=>Z9()&&L9(/apple/i),S9={Up:"ArrowUp",Down:"ArrowDown",Esc:"Escape"," ":"Space",",":"Comma",Left:"ArrowLeft",Right:"ArrowRight"},l2={ArrowLeft:"ArrowRight",ArrowRight:"ArrowLeft"};function A9(e,t={}){const{dir:r="ltr",orientation:i="horizontal"}=t;let n=e.key;return n=S9[n]??n,r==="rtl"&&i==="horizontal"&&n in l2&&(n=l2[n]),n}function E9(e,t){return Array.from((e==null?void 0:e.querySelectorAll(t))??[])}var d2=e=>e.id;function P9(e,t,r=d2){return e.find(i=>r(i)===t)}function h2(e,t,r=d2){const i=P9(e,t,r);return i?e.indexOf(i):-1}function T9(e,t,r=!0){let i=h2(e,t);return i=r?(i+1)%e.length:Math.min(i+1,e.length-1),e[i]}function B9(e,t,r=!0){let i=h2(e,t);return i===-1?r?e[e.length-1]:null:(i=r?(i-1+e.length)%e.length:Math.max(0,i-1),e[i])}function O9(e){return e==null?[]:Array.isArray(e)?e:[e]}var I9=e=>e[0],z9=e=>e[e.length-1],R9=(e,...t)=>e.concat(t),N9=(e,...t)=>e.filter(r=>!t.includes(r)),U9=e=>typeof e=="string",o1=e=>typeof e=="function",j9=Function.prototype.toString;j9.call(Object);var g2=(...e)=>(...t)=>{e.forEach(function(r){r==null||r(...t)})};function D9(...e){const t=e.length===1?e[0]:e[1];(e.length===2?e[0]:!0)&&process.env.NODE_ENV!=="production"&&console.warn(t)}function p2(...e){const t=e.length===1?e[0]:e[1];if((e.length===2?e[0]:!0)&&process.env.NODE_ENV!=="production")throw new Error(t)}function u2(e,t){if(e==null)throw new Error(t())}var m1=e=>{var t;return((t=e.ids)==null?void 0:t.root)??`accordion:${e.id}`},G9=(e,t)=>{var r,i;return((i=(r=e.ids)==null?void 0:r.item)==null?void 0:i.call(r,t))??`accordion:${e.id}:item:${t}`},B1=(e,t)=>{var r,i;return((i=(r=e.ids)==null?void 0:r.itemContent)==null?void 0:i.call(r,t))??`accordion:${e.id}:content:${t}`},w1=(e,t)=>{var r,i;return((i=(r=e.ids)==null?void 0:r.itemTrigger)==null?void 0:i.call(r,t))??`accordion:${e.id}:trigger:${t}`},W9=e=>e.getById(m1(e)),b1=e=>{const r=`[data-controls][data-ownedby='${CSS.escape(m1(e))}']:not([disabled])`;return E9(W9(e),r)},q9=e=>I9(b1(e)),F9=e=>z9(b1(e)),K9=(e,t)=>T9(b1(e),w1(e,t)),X9=(e,t)=>B9(b1(e),w1(e,t));function J9(e,t){const{send:r,context:i,prop:n,scope:o,computed:a}=e,l=i.get("focusedValue"),s=i.get("value"),g=n("multiple");function f(m){let u=m;!g&&u.length>1&&(u=[u[0]]),r({type:"VALUE.SET",value:u})}function v(m){return{expanded:s.includes(m.value),focused:l===m.value,disabled:!!(m.disabled??n("disabled"))}}return{focusedValue:l,value:s,setValue:f,getItemState:v,getRootProps(){return t.element({...n1.root.attrs,dir:n("dir"),id:m1(o),"data-orientation":n("orientation")})},getItemProps(m){const u=v(m);return t.element({...n1.item.attrs,dir:n("dir"),id:G9(o,m.value),"data-state":u.expanded?"open":"closed","data-focus":G(u.focused),"data-disabled":G(u.disabled),"data-orientation":n("orientation")})},getItemContentProps(m){const u=v(m);return t.element({...n1.itemContent.attrs,dir:n("dir"),role:"region",id:B1(o,m.value),"aria-labelledby":w1(o,m.value),hidden:!u.expanded,"data-state":u.expanded?"open":"closed","data-disabled":G(u.disabled),"data-focus":G(u.focused),"data-orientation":n("orientation")})},getItemIndicatorProps(m){const u=v(m);return t.element({...n1.itemIndicator.attrs,dir:n("dir"),"aria-hidden":!0,"data-state":u.expanded?"open":"closed","data-disabled":G(u.disabled),"data-focus":G(u.focused),"data-orientation":n("orientation")})},getItemTriggerProps(m){const{value:u}=m,H=v(m);return t.button({...n1.itemTrigger.attrs,type:"button",dir:n("dir"),id:w1(o,u),"aria-controls":B1(o,u),"data-controls":B1(o,u),"aria-expanded":H.expanded,disabled:H.disabled,"data-orientation":n("orientation"),"data-state":H.expanded?"open":"closed","data-focus":G(H.focused),"data-ownedby":m1(o),onFocus(){H.disabled||r({type:"TRIGGER.FOCUS",value:u})},onBlur(){H.disabled||r({type:"TRIGGER.BLUR"})},onClick(T){H.disabled||(x9()&&T.currentTarget.focus(),r({type:"TRIGGER.CLICK",value:u}))},onKeyDown(T){if(T.defaultPrevented||H.disabled)return;const K={ArrowDown(){a("isHorizontal")||r({type:"GOTO.NEXT",value:u})},ArrowUp(){a("isHorizontal")||r({type:"GOTO.PREV",value:u})},ArrowRight(){a("isHorizontal")&&r({type:"GOTO.NEXT",value:u})},ArrowLeft(){a("isHorizontal")&&r({type:"GOTO.PREV",value:u})},Home(){r({type:"GOTO.FIRST",value:u})},End(){r({type:"GOTO.LAST",value:u})}},A=A9(T,{dir:n("dir"),orientation:n("orientation")}),E=K[A];E&&(E(T),T.preventDefault())}})}}}var z=".",v2="#",f2=new WeakMap,m2=new WeakMap;function O1(e){return e.join(z)}function Q9(e){return e.includes(z)}function w2(e){return e.startsWith(v2)}function Y9(e){return e.startsWith(z)}function t0(e){return w2(e)?e.slice(v2.length):e}function I1(e,t){return e?`${e}${z}${t}`:t}function e0(e){const t=new Map,r=new Map,i=(n,o)=>{t.set(n,o);const a=o.id;a&&(r.has(a)&&p2(`[zag-js] Duplicate state id: "${a}"`),r.set(a,n));const l=o.states;if(l){u2(o.initial,()=>`[zag-js] Compound state "${n}" has child states but no "initial" property`),o.initial in l||p2(`[zag-js] Compound state "${n}" has initial "${String(o.initial)}" which is not a child state`);for(const[s,g]of Object.entries(l)){if(!g)continue;const f=I1(n,s);i(f,g)}}};for(const[n,o]of Object.entries(e.states))o&&i(n,o);return{index:t,idIndex:r}}function a1(e){const t=f2.get(e);if(t)return t;const{index:r,idIndex:i}=e0(e);return f2.set(e,r),m2.set(e,i),r}function r0(e,t){var r;return a1(e),(r=m2.get(e))==null?void 0:r.get(t)}function z1(e){return e?String(e).split(z).filter(Boolean):[]}function y1(e,t){if(!t)return[];const r=a1(e),i=z1(t),n=[],o=[];for(const a of i){o.push(a);const l=O1(o),s=r.get(l);if(!s)break;n.push({path:l,state:s})}return n}function C1(e,t){const r=a1(e),i=z1(t);if(!i.length)return t;const n=[];for(const l of i){n.push(l);const s=O1(n);if(!r.has(s))return t}let o=O1(n),a=r.get(o);for(;a!=null&&a.initial;){const l=`${o}${z}${a.initial}`,s=r.get(l);if(!s)break;o=l,a=s}return o}function b2(e,t){return a1(e).has(t)}function y2(e,t,r){const i=String(t);if(w2(i)){const n=t0(i),o=r0(e,n);return u2(o,()=>`[zag-js] Unknown state id: "${n}"`),C1(e,o)}if(Y9(i)&&r){const n=I1(r,i.slice(1));return C1(e,n)}if(!Q9(i)&&r){const n=z1(r);for(let o=n.length-1;o>=1;o--){const a=n.slice(0,o).join(z),l=I1(a,i);if(b2(e,l))return C1(e,l)}if(b2(e,i))return C1(e,i)}return C1(e,i)}function i0(e,t,r){var o,a;const i=y1(e,t);for(let l=i.length-1;l>=0;l--){const s=(o=i[l])==null?void 0:o.state.on,g=s==null?void 0:s[r];if(g)return{transitions:g,source:(a=i[l])==null?void 0:a.path}}const n=e.on;return{transitions:n==null?void 0:n[r],source:void 0}}function n0(e,t,r,i){var f,v,m,u;const n=t?y1(e,t):[],o=y1(e,r);let a=0;for(;a<n.length&&a<o.length&&((f=n[a])==null?void 0:f.path)===((v=o[a])==null?void 0:v.path);)a+=1;let l=n.slice(a).reverse(),s=o.slice(a);const g=((m=n.at(-1))==null?void 0:m.path)===((u=o.at(-1))==null?void 0:u.path);return i&&g&&(l=n.slice().reverse(),s=o),{exiting:l,entering:s}}function o0(e,t){return e?e===t||e.startsWith(`${t}${z}`):!1}function a0(e,t,r){return y1(e,t).some(i=>{var n;return(n=i.state.tags)==null?void 0:n.includes(r)})}function C0(){return{and:(...e)=>function(r){return e.every(i=>r.guard(i))},or:(...e)=>function(r){return e.some(i=>r.guard(i))},not:e=>function(r){return!r.guard(e)}}}function s0(e){return a1(e),e}var s1=(e=>(e.NotStarted="Not Started",e.Started="Started",e.Stopped="Stopped",e))(s1||{}),_1="__init__";function c0(e){const t=()=>{var a;return((a=e.getRootNode)==null?void 0:a.call(e))??document},r=()=>$9(t());return{...e,getRootNode:t,getDoc:r,getWin:()=>r().defaultView??window,getActiveElement:()=>C2(t()),isActiveElement:_9,getById:a=>t().getElementById(a)}}var{and:l0,not:d0}=C0(),h0=s0({props({props:e}){return{collapsible:!1,multiple:!1,orientation:"vertical",defaultValue:[],...e}},initialState(){return"idle"},context({prop:e,bindable:t}){return{focusedValue:t(()=>({defaultValue:null,sync:!0,onChange(r){var i;(i=e("onFocusChange"))==null||i({value:r})}})),value:t(()=>({defaultValue:e("defaultValue"),value:e("value"),onChange(r){var i;(i=e("onValueChange"))==null||i({value:r})}}))}},computed:{isHorizontal:({prop:e})=>e("orientation")==="horizontal"},on:{"VALUE.SET":{actions:["setValue"]}},states:{idle:{on:{"TRIGGER.FOCUS":{target:"focused",actions:["setFocusedValue"]}}},focused:{on:{"GOTO.NEXT":{actions:["focusNextTrigger"]},"GOTO.PREV":{actions:["focusPrevTrigger"]},"TRIGGER.CLICK":[{guard:l0("isExpanded","canToggle"),actions:["collapse"]},{guard:d0("isExpanded"),actions:["expand"]}],"GOTO.FIRST":{actions:["focusFirstTrigger"]},"GOTO.LAST":{actions:["focusLastTrigger"]},"TRIGGER.BLUR":{target:"idle",actions:["clearFocusedValue"]}}}},implementations:{guards:{canToggle:({prop:e})=>!!e("collapsible")||!!e("multiple"),isExpanded:({context:e,event:t})=>e.get("value").includes(t.value)},actions:{collapse({context:e,prop:t,event:r}){const i=t("multiple")?N9(e.get("value"),r.value):[];e.set("value",i)},expand({context:e,prop:t,event:r}){const i=t("multiple")?R9(e.get("value"),r.value):[r.value];e.set("value",i)},focusFirstTrigger({scope:e}){var t;(t=q9(e))==null||t.focus()},focusLastTrigger({scope:e}){var t;(t=F9(e))==null||t.focus()},focusNextTrigger({context:e,scope:t}){const r=e.get("focusedValue");if(!r)return;const i=K9(t,r);i==null||i.focus()},focusPrevTrigger({context:e,scope:t}){const r=e.get("focusedValue");if(!r)return;const i=X9(t,r);i==null||i.focus()},setFocusedValue({context:e,event:t}){e.set("focusedValue",t.value)},clearFocusedValue({context:e}){e.set("focusedValue",null)},setValue({context:e,event:t}){e.set("value",t.value)},coarseValue({context:e,prop:t}){!t("multiple")&&e.get("value").length>1&&(D9("The value of accordion should be a single value when multiple is false."),e.set("value",[e.get("value")[0]]))}}}});function g0(e){return new Proxy({},{get(t,r){return r==="style"?i=>e({style:i}).style:e}})}function p0(e,t,r){var Z2,x2,S2;const i=e,n=t(),o=c0({id:n.id,ids:n.ids,getRootNode:n.getRootNode??(()=>document)}),a=p=>{var L;const h=t();return(((L=i.props)==null?void 0:L.call(i,{props:h,scope:o}))??h)[p]};function l(p){const h=p(),_=h.isEqual??((b,w)=>b===w),L=h.hash??(b=>String(b)),M={current:h.value!==void 0?h.value:h.defaultValue};return{initial:h.defaultValue,ref:M,get:()=>M.current,set(b){var c1;const w=M.current,y=o1(b)?b(w):b;_(y,w)||(M.current=y,(c1=h.onChange)==null||c1.call(h,y,w),r())},invoke(b,w){var y;(y=h.onChange)==null||y.call(h,b,w)},hash:L}}l.cleanup=p=>{},l.ref=p=>{const h={current:p};return{get:()=>h.current,set:_=>h.current=_}};const s=(Z2=i.context)==null?void 0:Z2.call(i,{prop:a,bindable:l,scope:o,flush:p=>p(),getContext:()=>g,getComputed:()=>$1,getRefs:()=>K,getEvent:()=>H()}),g={get:p=>s==null?void 0:s[p].get(),set:(p,h)=>s==null?void 0:s[p].set(h),initial:p=>s==null?void 0:s[p].initial,hash:p=>{const h=s==null?void 0:s[p].get();return s==null?void 0:s[p].hash(h)}};let f=new Map;const v={current:null},m={current:null},u={current:{type:""}},H=()=>({...u.current,current:()=>u.current,previous:()=>m.current}),T=()=>({get:()=>R.get(),matches:(...p)=>p.some(h=>o0(R.get(),h)),hasTag:p=>a0(i,R.get(),p)}),K=((x2=i.refs)==null?void 0:x2.call(i,{prop:a,context:g}))??{},A=()=>({state:T(),context:g,event:H(),prop:a,send:k2,action:E,guard:L2,track:()=>{},refs:K,computed:$1,flush:p=>p(),scope:o,choose:V2}),E=p=>{var _,L;const h=o1(p)?p(A()):p;if(h)for(const M of h){const b=(L=(_=i.implementations)==null?void 0:_.actions)==null?void 0:L[M];b==null||b(A())}},L2=p=>{var h,_,L;return o1(p)?p(A()):(L=(_=(h=i.implementations)==null?void 0:h.guards)==null?void 0:_[p])==null?void 0:L.call(_,A())},M2=p=>{var L,M;const h=o1(p)?p(A()):p;if(!h)return;const _=[];for(const b of h){const w=(M=(L=i.implementations)==null?void 0:L.effects)==null?void 0:M[b],y=w==null?void 0:w(A());y&&_.push(y)}return()=>_.forEach(b=>b==null?void 0:b())},V2=p=>O9(p).find(h=>h!=null&&h.guard?U9(h.guard)?!!L2(h.guard):o1(h.guard)?h.guard(A()):!1:!0),$1=p=>{var _;const h=(_=i.computed)==null?void 0:_[p];return h==null?void 0:h({context:g,event:H(),prop:a,refs:K,scope:o,computed:$1})},R=l(()=>({defaultValue:y2(i,i.initialState({prop:a})),onChange(p,h){var M,b;const{exiting:_,entering:L}=n0(i,h,p,(M=v.current)==null?void 0:M.reenter);if(_.forEach(w=>{var y;(y=f.get(w.path))==null||y(),f.delete(w.path)}),_.forEach(w=>{var y;return E((y=w.state)==null?void 0:y.exit)}),E((b=v.current)==null?void 0:b.actions),L.forEach(w=>{var c1;const y=M2((c1=w.state)==null?void 0:c1.effects);if(y){const A2=f.get(w.path);f.set(w.path,A2?g2(A2,y):y)}}),h===_1){E(i.entry);const w=M2(i.effects);if(w){const y=f.get(_1);f.set(_1,y?g2(y,w):w)}}L.forEach(w=>{var y;return E((y=w.state)==null?void 0:y.entry)})}}));let H1=s1.NotStarted;function V0(){H1=s1.Started,R.invoke(R.initial,_1)}function k0(){H1=s1.Stopped,f.forEach(p=>p==null?void 0:p()),f=new Map,v.current=null,E(i.exit)}const k2=p=>{if(H1!==s1.Started)return;m.current=u.current,u.current=p;const h=R.get(),{transitions:_,source:L}=i0(i,h,p.type),M=V2(_);if(!M)return;v.current=M;const b=y2(i,M.target??h,L);b!==h?R.set(b):M.reenter?R.invoke(h,h):E(M.actions)};return(S2=i.watch)==null||S2.call(i,A()),{state:T(),send:k2,get event(){return H()},context:{get:g.get,set:g.set},prop:a,scope:o,refs:K,computed:$1,start:V0,stop:k0,getStatus:()=>H1}}const u0=g0(e=>e);var v0=Object.defineProperty,f0=Object.getOwnPropertyDescriptor,W=(e,t,r,i)=>{for(var n=i>1?void 0:i?f0(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&v0(t,r,n),n};let m0=0;const w0=c.html`
  <svg class="ct-accordion__panels__panel__header__button__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.5 5.5L8 10l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;C.CtAccordion=class extends c.LitElement{constructor(){super(...arguments),this.theme="light",this.expandAll=!1,this.singleOpen=!1,this.withBackground=!1,this.verticalSpacing="none",this.modifierClass=""}_items(){return Array.from(this.querySelectorAll(":scope > ct-accordion-item"))}connectedCallback(){super.connectedCallback(),this.id||(this.id=`ct-accordion-${++m0}`);const r=this._items().map((n,o)=>({item:n,value:`panel-${o}`})).filter(({item:n})=>this.expandAll||n.expanded).map(({value:n})=>n),i={id:this.id,getRootNode:()=>this.shadowRoot??document,multiple:!this.singleOpen,collapsible:!0,defaultValue:r};this._accordionService=p0(h0,()=>i,()=>this.requestUpdate()),this._accordionService.start()}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._accordionService)==null||t.stop()}render(){const t=this._items();if(t.forEach((o,a)=>{o.slot=`panel-${a}`}),!this._accordionService)return c.nothing;const r=J9(this._accordionService,u0),i=r.getRootProps(),n={"ct-accordion":!0,[`ct-theme-${this.theme}`]:!0,"ct-accordion--with-background":this.withBackground,[`ct-vertical-spacing-inset--${this.verticalSpacing}`]:this.verticalSpacing!=="none",[this.modifierClass]:!!this.modifierClass};return c.html`
      <div class=${I(n)} id=${i.id} data-orientation=${i["data-orientation"]}>
        <div class="ct-accordion__content">
          <ul class="ct-accordion__panels">
            ${t.map((o,a)=>this.renderPanel(r,o,`panel-${a}`))}
          </ul>
        </div>
      </div>
    `}renderPanel(t,r,i){const n=t.getItemProps({value:i,disabled:r.disabled}),o=t.getItemTriggerProps({value:i,disabled:r.disabled}),a=t.getItemContentProps({value:i,disabled:r.disabled});return c.html`
      <li
        class="ct-accordion__panels__panel"
        id=${n.id}
        data-state=${n["data-state"]}
      >
        <div class="ct-accordion__panels__panel__header">
          <button
            type="button"
            class="ct-accordion__panels__panel__header__button"
            id=${o.id}
            aria-controls=${o["aria-controls"]}
            aria-expanded=${o["aria-expanded"]}
            data-controls=${o["data-controls"]}
            data-ownedby=${o["data-ownedby"]}
            ?disabled=${o.disabled}
            @click=${o.onClick}
            @focus=${o.onFocus}
            @blur=${o.onBlur}
            @keydown=${o.onKeyDown}
          >
            <span>${r.heading}</span>
            ${w0}
          </button>
        </div>
        <div
          class="ct-accordion__panels__panel__content"
          id=${a.id}
          role="region"
          aria-labelledby=${a["aria-labelledby"]}
          ?hidden=${a.hidden}
        >
          <div class="ct-accordion__panels__panel__content__inner">
            <slot name=${i}></slot>
          </div>
        </div>
      </li>
    `}},C.CtAccordion.styles=c.css`
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
  `,W([d({type:String})],C.CtAccordion.prototype,"theme",2),W([d({type:Boolean,attribute:"expand-all"})],C.CtAccordion.prototype,"expandAll",2),W([d({type:Boolean,attribute:"single-open"})],C.CtAccordion.prototype,"singleOpen",2),W([d({type:Boolean,attribute:"with-background"})],C.CtAccordion.prototype,"withBackground",2),W([d({type:String,attribute:"vertical-spacing"})],C.CtAccordion.prototype,"verticalSpacing",2),W([d({type:String,attribute:"modifier-class"})],C.CtAccordion.prototype,"modifierClass",2),C.CtAccordion=W([Z("ct-accordion")],C.CtAccordion);var b0=Object.defineProperty,y0=Object.getOwnPropertyDescriptor,S=(e,t,r,i)=>{for(var n=i>1?void 0:i?y0(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&b0(t,r,n),n};C.CtTag=class extends c.LitElement{constructor(){super(...arguments),this.theme="light",this.variant="primary",this.label="",this.iconPlacement="after",this.newWindow=!1,this.external=!1,this.modifierClass=""}render(){if(!this.label)return c.nothing;const t={"ct-tag":!0,[`ct-theme-${this.theme}`]:!0,[`ct-tag--${this.variant}`]:!0,[`ct-tag--icon-${this.iconPlacement}`]:!!this.icon,"ct-tag--external":this.external,[this.modifierClass]:!!this.modifierClass},r=this.icon?c.html`<ct-icon class="ct-tag__icon" name=${this.icon} size="small"></ct-icon>`:c.nothing,i=c.html`<span class="ct-tag__text">${this.label}</span>`,n=this.url&&this.newWindow?c.html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`:c.nothing,o=this.external?c.html`<ct-icon class="ct-tag__icon" name="upper-right-arrow" size="small"></ct-icon>`:c.nothing,a=c.html`
      ${this.iconPlacement==="before"?r:c.nothing}
      ${i}
      ${this.iconPlacement==="after"?r:c.nothing}
      ${n}
      ${o}
      <slot></slot>
    `;return this.url?c.html`
        <a
          class=${I(t)}
          href=${this.url}
          title=${this.label}
          target=${x(this.newWindow?"_blank":void 0)}
          aria-label=${x(this.newWindow?"Opens in a new tab":void 0)}
          data-component-name="tag"
        >
          ${a}
        </a>
      `:c.html`
      <span class=${I(t)} data-component-name="tag">
        ${a}
      </span>
    `}},C.CtTag.styles=c.css`
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
  `,S([d({type:String})],C.CtTag.prototype,"theme",2),S([d({type:String})],C.CtTag.prototype,"variant",2),S([d({type:String})],C.CtTag.prototype,"label",2),S([d({type:String})],C.CtTag.prototype,"icon",2),S([d({type:String,attribute:"icon-placement"})],C.CtTag.prototype,"iconPlacement",2),S([d({type:String})],C.CtTag.prototype,"url",2),S([d({type:Boolean,attribute:"new-window"})],C.CtTag.prototype,"newWindow",2),S([d({type:Boolean})],C.CtTag.prototype,"external",2),S([d({type:String,attribute:"modifier-class"})],C.CtTag.prototype,"modifierClass",2),C.CtTag=S([Z("ct-tag")],C.CtTag);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _2=Symbol.for(""),_0=e=>{if((e==null?void 0:e.r)===_2)return e==null?void 0:e._$litStatic$},$0=e=>({_$litStatic$:e,r:_2}),$2=new Map,H0=e=>(t,...r)=>{const i=r.length;let n,o;const a=[],l=[];let s,g=0,f=!1;for(;g<i;){for(s=t[g];g<i&&(o=r[g],(n=_0(o))!==void 0);)s+=n+t[++g],f=!0;g!==i&&l.push(o),a.push(s),g++}if(g===i&&a.push(t[i]),f){const v=a.join("$$lit$$");(t=$2.get(v))===void 0&&(a.raw=a,$2.set(v,t=a)),r=l}return e(t,...r)},H2=H0(t9);var L0=Object.defineProperty,M0=Object.getOwnPropertyDescriptor,P=(e,t,r,i)=>{for(var n=i>1?void 0:i?M0(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&L0(t,r,n),n};C.CtLabel=class extends c.LitElement{constructor(){super(...arguments),this.theme="light",this.tag="label",this.content="",this.size="regular",this.required=!1,this.requiredText="(required)",this.modifierClass=""}render(){if(!this.content)return c.nothing;const t=this.tag==="legend"?"legend":"label",r={"ct-label":!0,[`ct-theme-${this.theme}`]:!0,[`ct-label--${this.size}`]:!0,"ct-label--required":this.required,[this.modifierClass]:!!this.modifierClass},i=this.required?H2`<span class="ct-label__required">${this.requiredText}</span>`:c.nothing,n=$0(t);return H2`
      <${n}
        class=${I(r)}
        for=${x(t==="label"?this.for:void 0)}
        data-component-name="label"
      >${this.content}${this.required?" ":c.nothing}${i}</${n}>
    `}},C.CtLabel.styles=c.css`
    :host {
      display: block;
    }

    .ct-label {
      display: block;
      margin: 0;
      margin-bottom: 0.5rem;
      -webkit-tap-highlight-color: transparent;
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }

    /* Sizes */
    .ct-label--extra-large {
      font-size: var(--ct-typography-label-extra-large-font-size);
      line-height: var(--ct-typography-label-extra-large-line-height);
      font-family: var(--ct-typography-label-extra-large-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-extra-large-font-weight);
      letter-spacing: var(--ct-typography-label-extra-large-letter-spacing);
    }

    .ct-label--large {
      font-size: var(--ct-typography-label-large-font-size);
      line-height: var(--ct-typography-label-large-line-height);
      font-family: var(--ct-typography-label-large-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-large-font-weight);
      letter-spacing: var(--ct-typography-label-large-letter-spacing);
    }

    .ct-label--regular {
      font-size: var(--ct-typography-label-regular-font-size);
      line-height: var(--ct-typography-label-regular-line-height);
      font-family: var(--ct-typography-label-regular-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-regular-font-weight);
      letter-spacing: var(--ct-typography-label-regular-letter-spacing);
    }

    .ct-label--small {
      font-size: var(--ct-typography-label-small-font-size);
      line-height: var(--ct-typography-label-small-line-height);
      font-family: var(--ct-typography-label-small-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-small-font-weight);
      letter-spacing: var(--ct-typography-label-small-letter-spacing);
    }

    .ct-label--extra-small {
      font-size: var(--ct-typography-label-extra-small-font-size);
      line-height: var(--ct-typography-label-extra-small-line-height);
      font-family: var(--ct-typography-label-extra-small-font-name, var(--ct-typography-family-heading, sans-serif));
      font-weight: var(--ct-typography-label-extra-small-font-weight);
      letter-spacing: var(--ct-typography-label-extra-small-letter-spacing);
    }

    /* Themes */
    .ct-label.ct-theme-light {
      color: var(--ct-label-light-color);
    }
    .ct-label.ct-theme-light .ct-label__required {
      color: var(--ct-label-light-required-color);
    }

    .ct-label.ct-theme-dark {
      color: var(--ct-label-dark-color);
    }
    .ct-label.ct-theme-dark .ct-label__required {
      color: var(--ct-label-dark-required-color);
    }
  `,P([d({type:String})],C.CtLabel.prototype,"theme",2),P([d({type:String})],C.CtLabel.prototype,"tag",2),P([d({type:String})],C.CtLabel.prototype,"content",2),P([d({type:String})],C.CtLabel.prototype,"size",2),P([d({type:Boolean})],C.CtLabel.prototype,"required",2),P([d({type:String,attribute:"required-text"})],C.CtLabel.prototype,"requiredText",2),P([d({type:String})],C.CtLabel.prototype,"for",2),P([d({type:String,attribute:"modifier-class"})],C.CtLabel.prototype,"modifierClass",2),C.CtLabel=P([Z("ct-label")],C.CtLabel),Object.defineProperty(C,Symbol.toStringTag,{value:"Module"})});
