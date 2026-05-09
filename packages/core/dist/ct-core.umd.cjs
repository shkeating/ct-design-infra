(function(h,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("lit"),require("@ct-infra/tokens")):typeof define=="function"&&define.amd?define(["exports","lit","@ct-infra/tokens"],c):(h=typeof globalThis<"u"?globalThis:h||self,c(h.CtCore={},h.lit,h.tokens))})(this,function(h,c,D){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis,G=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),Q=new WeakMap;let $t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(G&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}};const ft=n=>new $t(typeof n=="string"?n:n+"",void 0,K),mt=(n,t)=>{if(G)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=N.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},Y=G?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ft(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_t,defineProperty:gt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:vt,getOwnPropertySymbols:bt,getPrototypeOf:At}=Object,g=globalThis,tt=g.trustedTypes,St=tt?tt.emptyScript:"",k=g.reactiveElementPolyfillSupport,C=(n,t)=>n,B={toAttribute(n,t){switch(t){case Boolean:n=n?St:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},W=(n,t)=>!_t(n,t),et={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);let P=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&gt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=yt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);r==null||r.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=At(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,s=[...vt(e),...bt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Y(i))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:B).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var r,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:B;this._$Em=i;const d=a.fromAttribute(e,l.type);this[i]=d??((o=this._$Ej)==null?void 0:o.get(i))??d,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){var o;if(t!==void 0){const l=this.constructor;if(i===!1&&(r=this[t]),s??(s=l.getPropertyOptions(t)),!((s.hasChanged??W)(r,e)||s.useDefault&&s.reflect&&r===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(l._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:l}=o,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[C("elementProperties")]=new Map,P[C("finalized")]=new Map,k==null||k({ReactiveElement:P}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:W},Et=(n=wt,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+s)};function u(n){return(t,e)=>typeof e=="object"?Et(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}var Ct=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,q=(n,t,e,s)=>{for(var i=s>1?void 0:s?Pt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ct(t,e,i),i};h.ctRegion=class extends c.LitElement{constructor(){super(...arguments),this.complexity="standard",this.fluid=!1}render(){return c.html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `}},h.ctRegion.styles=c.css`
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
  `,q([u({type:String})],h.ctRegion.prototype,"complexity",2),q([u({type:Boolean})],h.ctRegion.prototype,"fluid",2),h.ctRegion=q([H("ct-region")],h.ctRegion);var Ot=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,st=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ut(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ot(t,e,i),i};h.ctGrid=class extends c.LitElement{constructor(){super(...arguments),this.gap="200"}render(){return c.html`<slot></slot>`}},h.ctGrid.styles=c.css`
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
  `,st([u({type:String})],h.ctGrid.prototype,"gap",2),h.ctGrid=st([H("ct-grid")],h.ctGrid);var Mt=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,O=(n,t,e,s)=>{for(var i=s>1?void 0:s?Tt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Mt(t,e,i),i};h.ctGridItem=class extends c.LitElement{constructor(){super(...arguments),this.span=12,this.spanM=6,this.spanL=6,this.spanXl=4}updated(t){["span","spanM","spanL","spanXl"].forEach(s=>{if(t.has(s)){const i=s.replace(/[A-Z]/g,r=>"-"+r.toLowerCase());this.style.setProperty(`--grid-item-${i}`,this[s].toString())}})}render(){return c.html`<slot></slot>`}},h.ctGridItem.styles=c.css`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${c.unsafeCSS(D.BreakpointM)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${c.unsafeCSS(D.BreakpointL)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${c.unsafeCSS(D.BreakpointXl)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `,O([u({type:Number})],h.ctGridItem.prototype,"span",2),O([u({type:Number})],h.ctGridItem.prototype,"spanM",2),O([u({type:Number})],h.ctGridItem.prototype,"spanL",2),O([u({type:Number})],h.ctGridItem.prototype,"spanXl",2),h.ctGridItem=O([H("ct-grid-item")],h.ctGridItem);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=globalThis,it=n=>n,R=U.trustedTypes,nt=R?R.createPolicy("lit-html",{createHTML:n=>n}):void 0,rt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+y,xt=`<${ot}>`,b=document,j=()=>b.createComment(""),M=n=>n===null||typeof n!="object"&&typeof n!="function",V=Array.isArray,Ht=n=>V(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",X=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,ht=/>/g,A=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,ct=/"/g,pt=/^(?:script|style|textarea|title)$/i,w=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),dt=new WeakMap,S=b.createTreeWalker(b,129);function ut(n,t){if(!V(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return nt!==void 0?nt.createHTML(t):t}const Nt=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",o=T;for(let l=0;l<e;l++){const a=n[l];let d,f,p=-1,_=0;for(;_<a.length&&(o.lastIndex=_,f=o.exec(a),f!==null);)_=o.lastIndex,o===T?f[1]==="!--"?o=at:f[1]!==void 0?o=ht:f[2]!==void 0?(pt.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=A):f[3]!==void 0&&(o=A):o===A?f[0]===">"?(o=i??T,p=-1):f[1]===void 0?p=-2:(p=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?A:f[3]==='"'?ct:lt):o===ct||o===lt?o=A:o===at||o===ht?o=T:(o=A,i=void 0);const v=o===A&&n[l+1].startsWith("/>")?" ":"";r+=o===T?a+xt:p>=0?(s.push(d),a.slice(0,p)+rt+a.slice(p)+y+v):a+y+(p===-2?l:v)}return[ut(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class x{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Nt(t,e);if(this.el=x.createElement(d,s),S.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=S.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(rt)){const _=f[o++],v=i.getAttribute(p).split(y),z=/([.?@])?(.*)/.exec(_);a.push({type:1,index:r,name:z[2],strings:v,ctor:z[1]==="."?Rt:z[1]==="?"?jt:z[1]==="@"?It:L}),i.removeAttribute(p)}else p.startsWith(y)&&(a.push({type:6,index:r}),i.removeAttribute(p));if(pt.test(i.tagName)){const p=i.textContent.split(y),_=p.length-1;if(_>0){i.textContent=R?R.emptyScript:"";for(let v=0;v<_;v++)i.append(p[v],j()),S.nextNode(),a.push({type:2,index:++r});i.append(p[_],j())}}}else if(i.nodeType===8)if(i.data===ot)a.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf(y,p+1))!==-1;)a.push({type:7,index:r}),p+=y.length-1}r++}}static createElement(t,e){const s=b.createElement("template");return s.innerHTML=t,s}}function E(n,t,e=n,s){var o,l;if(t===w)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const r=M(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=E(n,i._$AS(n,t.values),i,s)),t}class Bt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??b).importNode(e,!0);S.currentNode=i;let r=S.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new I(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Lt(r,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(r=S.nextNode(),o++)}return S.currentNode=b,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class I{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),M(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=x.createElement(ut(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const o=new Bt(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=dt.get(t.strings);return e===void 0&&dt.set(t.strings,e=new x(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new I(this.O(j()),this.O(j()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=it(t).nextSibling;it(t).remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=E(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const l=t;let a,d;for(t=r[0],a=0;a<r.length-1;a++)d=E(this,l[s+a],e,a),d===w&&(d=this._$AH[a]),o||(o=!M(d)||d!==this._$AH[a]),d===$?t=$:t!==$&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Rt extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class jt extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class It extends L{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??$)===w)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Lt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const Z=U.litHtmlPolyfillSupport;Z==null||Z(x,I),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt={ATTRIBUTE:1},Dt=n=>(...t)=>({_$litDirective$:n,values:t});class Gt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=Dt(class extends Gt{constructor(n){var t;if(super(n),n.type!==zt.ATTRIBUTE||n.name!=="class"||((t=n.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){var s,i;if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!((s=this.nt)!=null&&s.has(r))&&this.st.add(r);return this.render(t)}const e=n.element.classList;for(const r of this.st)r in t||(e.remove(r),this.st.delete(r));for(const r in t){const o=!!t[r];o===this.st.has(r)||(i=this.nt)!=null&&i.has(r)||(o?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return w}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=n=>n??$;var kt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,m=(n,t,e,s)=>{for(var i=s>1?void 0:s?Wt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&kt(t,e,i),i};h.CtButton=class extends c.LitElement{constructor(){super(...arguments),this.theme="light",this.kind="button",this.variant="primary",this.size="regular",this.label="",this.iconPlacement="after",this.disabled=!1,this.newWindow=!1,this.external=!1,this.dismissable=!1,this.modifierClass=""}render(){const t={"ct-button":!0,[`ct-theme-${this.theme}`]:!0,[`ct-button--${this.variant}`]:!0,[`ct-button--${this.size}`]:!0,"ct-button--external":this.external,"ct-button--dismiss":this.dismissable,[this.modifierClass]:!!this.modifierClass},e=this.icon?c.html`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>`:c.nothing,s=this.label?c.html`<span class="ct-button__text">${this.label}</span>`:c.nothing,i=c.html`
      ${this.iconPlacement==="before"?e:c.nothing}
      ${s}
      <slot></slot>
      ${this.iconPlacement==="after"?e:c.nothing}
    `;return this.kind==="link"?c.html`
        <a 
          href=${J(this.url)} 
          role="button" 
          class=${F(t)} 
          data-component-name="button"
          target=${J(this.newWindow?"_blank":void 0)}
          rel=${J(this.newWindow?"noopener noreferrer":void 0)}
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
        >
          ${i}
        </a>
      `:this.kind==="submit"||this.kind==="reset"?c.html`
        <input 
          type=${this.kind} 
          class=${F(t)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      `:c.html`
      <button 
        type="button" 
        class=${F(t)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${i}
      </button>
    `}},h.CtButton.styles=c.css`
    :host {
      display: inline-block;
    }
    /* Base styles and variables for the button should be provided via global CSS/tokens, 
       but we can include minimal encapsulation styles if needed.
       For now, we rely on the global CivicTheme CSS being present or imported. */
    .ct-button {
      /* Placeholder for component-specific encapsulation if not using global CSS */
    }
  `,m([u({type:String})],h.CtButton.prototype,"theme",2),m([u({type:String})],h.CtButton.prototype,"kind",2),m([u({type:String})],h.CtButton.prototype,"variant",2),m([u({type:String})],h.CtButton.prototype,"size",2),m([u({type:String})],h.CtButton.prototype,"label",2),m([u({type:String})],h.CtButton.prototype,"url",2),m([u({type:String})],h.CtButton.prototype,"icon",2),m([u({type:String,attribute:"icon-placement"})],h.CtButton.prototype,"iconPlacement",2),m([u({type:Boolean,reflect:!0})],h.CtButton.prototype,"disabled",2),m([u({type:Boolean,attribute:"new-window"})],h.CtButton.prototype,"newWindow",2),m([u({type:Boolean})],h.CtButton.prototype,"external",2),m([u({type:Boolean})],h.CtButton.prototype,"dismissable",2),m([u({type:String,attribute:"modifier-class"})],h.CtButton.prototype,"modifierClass",2),h.CtButton=m([H("ct-button")],h.CtButton),Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
