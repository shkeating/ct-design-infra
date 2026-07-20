(function(s,d){typeof exports=="object"&&typeof module<"u"?d(exports,require("lit"),require("@ct-infra/tokens")):typeof define=="function"&&define.amd?define(["exports","lit","@ct-infra/tokens"],d):(s=typeof globalThis<"u"?globalThis:s||self,d(s.CtCore={},s.lit,s.tokens))})(this,function(s,d,kt){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=globalThis,At=lt.ShadowRoot&&(lt.ShadyCSS===void 0||lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Nt=Symbol(),Ut=new WeakMap;let ke=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==Nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(At&&t===void 0){const o=r!==void 0&&r.length===1;o&&(t=Ut.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&Ut.set(r,t))}return t}toString(){return this.cssText}};const Ae=e=>new ke(typeof e=="string"?e:e+"",void 0,Nt),Se=(e,t)=>{if(At)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of t){const o=document.createElement("style"),n=lt.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=r.cssText,e.appendChild(o)}},zt=At?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const o of t.cssRules)r+=o.cssText;return Ae(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ce,defineProperty:Ee,getOwnPropertyDescriptor:Pe,getOwnPropertyNames:Te,getOwnPropertySymbols:xe,getPrototypeOf:Oe}=Object,B=globalThis,Mt=B.trustedTypes,Ie=Mt?Mt.emptyScript:"",St=B.reactiveElementPolyfillSupport,X=(e,t)=>e,dt={toAttribute(e,t){switch(t){case Boolean:e=e?Ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},Ct=(e,t)=>!Ce(e,t),jt={attribute:!0,type:String,converter:dt,reflect:!1,useDefault:!1,hasChanged:Ct};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),B.litPropertyMetadata??(B.litPropertyMetadata=new WeakMap);let Z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=jt){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){const o=Symbol(),n=this.getPropertyDescriptor(t,o,r);n!==void 0&&Ee(this.prototype,t,n)}}static getPropertyDescriptor(t,r,o){const{get:n,set:i}=Pe(this.prototype,t)??{get(){return this[r]},set(a){this[r]=a}};return{get:n,set(a){const l=n==null?void 0:n.call(this);i==null||i.call(this,a),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jt}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;const t=Oe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){const r=this.properties,o=[...Te(r),...xe(r)];for(const n of o)this.createProperty(n,r[n])}const t=this[Symbol.metadata];if(t!==null){const r=litPropertyMetadata.get(t);if(r!==void 0)for(const[o,n]of r)this.elementProperties.set(o,n)}this._$Eh=new Map;for(const[r,o]of this.elementProperties){const n=this._$Eu(r,o);n!==void 0&&this._$Eh.set(n,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const n of o)r.unshift(zt(n))}else t!==void 0&&r.push(zt(t));return r}static _$Eu(t,r){const o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(r=>r(this))}addController(t){var r;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((r=t.hostConnected)==null||r.call(t))}removeController(t){var r;(r=this._$EO)==null||r.delete(t)}_$E_(){const t=new Map,r=this.constructor.elementProperties;for(const o of r.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(r=>{var o;return(o=r.hostConnected)==null?void 0:o.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(r=>{var o;return(o=r.hostDisconnected)==null?void 0:o.call(r)})}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){var i;const o=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,o);if(n!==void 0&&o.reflect===!0){const a=(((i=o.converter)==null?void 0:i.toAttribute)!==void 0?o.converter:dt).toAttribute(r,o.type);this._$Em=t,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(t,r){var i,a;const o=this.constructor,n=o._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const l=o.getPropertyOptions(n),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((i=l.converter)==null?void 0:i.fromAttribute)!==void 0?l.converter:dt;this._$Em=n;const f=c.fromAttribute(r,l.type);this[n]=f??((a=this._$Ej)==null?void 0:a.get(n))??f,this._$Em=null}}requestUpdate(t,r,o,n=!1,i){var a;if(t!==void 0){const l=this.constructor;if(n===!1&&(i=this[t]),o??(o=l.getPropertyOptions(t)),!((o.hasChanged??Ct)(i,r)||o.useDefault&&o.reflect&&i===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(l._$Eu(t,o))))return;this.C(t,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:n,wrapped:i},a){o&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??r??this[t]),i!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,a]of n){const{wrapped:l}=a,c=this[i];l!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,a,c)}}let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(o=this._$EO)==null||o.forEach(n=>{var i;return(i=n.hostUpdate)==null?void 0:i.call(n)}),this.update(r)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(r)}willUpdate(t){}_$AE(t){var r;(r=this._$EO)==null||r.forEach(o=>{var n;return(n=o.hostUpdated)==null?void 0:n.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[X("elementProperties")]=new Map,Z[X("finalized")]=new Map,St==null||St({ReactiveElement:Z}),(B.reactiveElementVersions??(B.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re={attribute:!0,type:String,converter:dt,reflect:!1,hasChanged:Ct},Le=(e=Re,t,r)=>{const{kind:o,metadata:n}=r;let i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),i.set(r.name,e),o==="accessor"){const{name:a}=r;return{set(l){const c=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,c,e,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,e,l),l}}}if(o==="setter"){const{name:a}=r;return function(l){const c=this[a];t.call(this,l),this.requestUpdate(a,c,e,!0,l)}}throw Error("Unsupported decorator location: "+o)};function u(e){return(t,r)=>typeof r=="object"?Le(e,t,r):((o,n,i)=>{const a=n.hasOwnProperty(i);return n.constructor.createProperty(i,o),a?Object.getOwnPropertyDescriptor(n,i):void 0})(e,t,r)}var Be=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,Et=(e,t,r,o)=>{for(var n=o>1?void 0:o?Ne(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&Be(t,r,n),n};s.ctRegion=class extends d.LitElement{constructor(){super(...arguments),this.complexity="standard",this.fluid=!1}render(){return d.html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `}},s.ctRegion.styles=d.css`
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
  `,Et([u({type:String})],s.ctRegion.prototype,"complexity",2),Et([u({type:Boolean})],s.ctRegion.prototype,"fluid",2),s.ctRegion=Et([L("ct-region")],s.ctRegion);var Ue=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Dt=(e,t,r,o)=>{for(var n=o>1?void 0:o?ze(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&Ue(t,r,n),n};s.ctGrid=class extends d.LitElement{constructor(){super(...arguments),this.gap="200"}render(){return d.html`<slot></slot>`}},s.ctGrid.styles=d.css`
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
  `,Dt([u({type:String})],s.ctGrid.prototype,"gap",2),s.ctGrid=Dt([L("ct-grid")],s.ctGrid);var Me=Object.defineProperty,je=Object.getOwnPropertyDescriptor,J=(e,t,r,o)=>{for(var n=o>1?void 0:o?je(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&Me(t,r,n),n};s.ctGridItem=class extends d.LitElement{constructor(){super(...arguments),this.span=12,this.spanM=6,this.spanL=6,this.spanXl=4}updated(t){["span","spanM","spanL","spanXl"].forEach(o=>{if(t.has(o)){const n=o.replace(/[A-Z]/g,i=>"-"+i.toLowerCase());this.style.setProperty(`--grid-item-${n}`,this[o].toString())}})}render(){return d.html`<slot></slot>`}},s.ctGridItem.styles=d.css`
    :host {
      display: block;
      grid-column: span var(--grid-item-span, 12);
    }

    /* Use the constants directly without .$value */
    @media (min-width: ${d.unsafeCSS(kt.BreakpointM)}) {
      :host {
        grid-column: span var(--grid-item-span-m, var(--grid-item-span));
      }
    }

    @media (min-width: ${d.unsafeCSS(kt.BreakpointL)}) {
      :host {
        grid-column: span var(--grid-item-span-l, var(--grid-item-span-m));
      }
    }

    @media (min-width: ${d.unsafeCSS(kt.BreakpointXl)}) {
      :host {
        grid-column: span var(--grid-item-span-xl, var(--grid-item-span-l));
      }
    }
  `,J([u({type:Number})],s.ctGridItem.prototype,"span",2),J([u({type:Number})],s.ctGridItem.prototype,"spanM",2),J([u({type:Number})],s.ctGridItem.prototype,"spanL",2),J([u({type:Number})],s.ctGridItem.prototype,"spanXl",2),s.ctGridItem=J([L("ct-grid-item")],s.ctGridItem);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=globalThis,Ht=e=>e,ht=Q.trustedTypes,Gt=ht?ht.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vt="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Wt="?"+N,De=`<${Wt}>`,M=document,ut=()=>M.createComment(""),Y=e=>e===null||typeof e!="object"&&typeof e!="function",Pt=Array.isArray,He=e=>Pt(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Tt=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ft=/-->/g,qt=/>/g,j=RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Kt=/'/g,Xt=/"/g,Zt=/^(?:script|style|textarea|title)$/i,W=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Jt=new WeakMap,D=M.createTreeWalker(M,129);function Qt(e,t){if(!Pt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gt!==void 0?Gt.createHTML(t):t}const Ge=(e,t)=>{const r=e.length-1,o=[];let n,i=t===2?"<svg>":t===3?"<math>":"",a=tt;for(let l=0;l<r;l++){const c=e[l];let f,b,m=-1,v=0;for(;v<c.length&&(a.lastIndex=v,b=a.exec(c),b!==null);)v=a.lastIndex,a===tt?b[1]==="!--"?a=Ft:b[1]!==void 0?a=qt:b[2]!==void 0?(Zt.test(b[2])&&(n=RegExp("</"+b[2],"g")),a=j):b[3]!==void 0&&(a=j):a===j?b[0]===">"?(a=n??tt,m=-1):b[1]===void 0?m=-2:(m=a.lastIndex-b[2].length,f=b[1],a=b[3]===void 0?j:b[3]==='"'?Xt:Kt):a===Xt||a===Kt?a=j:a===Ft||a===qt?a=tt:(a=j,n=void 0);const g=a===j&&e[l+1].startsWith("/>")?" ":"";i+=a===tt?c+De:m>=0?(o.push(f),c.slice(0,m)+Vt+c.slice(m)+N+g):c+N+(m===-2?l:g)}return[Qt(e,i+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class et{constructor({strings:t,_$litType$:r},o){let n;this.parts=[];let i=0,a=0;const l=t.length-1,c=this.parts,[f,b]=Ge(t,r);if(this.el=et.createElement(f,o),D.currentNode=this.el.content,r===2||r===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=D.nextNode())!==null&&c.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const m of n.getAttributeNames())if(m.endsWith(Vt)){const v=b[a++],g=n.getAttribute(m).split(N),A=/([.?@])?(.*)/.exec(v);c.push({type:1,index:i,name:A[2],strings:g,ctor:A[1]==="."?We:A[1]==="?"?Fe:A[1]==="@"?qe:gt}),n.removeAttribute(m)}else m.startsWith(N)&&(c.push({type:6,index:i}),n.removeAttribute(m));if(Zt.test(n.tagName)){const m=n.textContent.split(N),v=m.length-1;if(v>0){n.textContent=ht?ht.emptyScript:"";for(let g=0;g<v;g++)n.append(m[g],ut()),D.nextNode(),c.push({type:2,index:++i});n.append(m[v],ut())}}}else if(n.nodeType===8)if(n.data===Wt)c.push({type:2,index:i});else{let m=-1;for(;(m=n.data.indexOf(N,m+1))!==-1;)c.push({type:7,index:i}),m+=N.length-1}i++}}static createElement(t,r){const o=M.createElement("template");return o.innerHTML=t,o}}function F(e,t,r=e,o){var a,l;if(t===W)return t;let n=o!==void 0?(a=r._$Co)==null?void 0:a[o]:r._$Cl;const i=Y(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==i&&((l=n==null?void 0:n._$AO)==null||l.call(n,!1),i===void 0?n=void 0:(n=new i(e),n._$AT(e,r,o)),o!==void 0?(r._$Co??(r._$Co=[]))[o]=n:r._$Cl=n),n!==void 0&&(t=F(e,n._$AS(e,t.values),n,o)),t}class Ve{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:o}=this._$AD,n=((t==null?void 0:t.creationScope)??M).importNode(r,!0);D.currentNode=n;let i=D.nextNode(),a=0,l=0,c=o[0];for(;c!==void 0;){if(a===c.index){let f;c.type===2?f=new pt(i,i.nextSibling,this,t):c.type===1?f=new c.ctor(i,c.name,c.strings,this,t):c.type===6&&(f=new Ke(i,this,t)),this._$AV.push(f),c=o[++l]}a!==(c==null?void 0:c.index)&&(i=D.nextNode(),a++)}return D.currentNode=M,n}p(t){let r=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}}class pt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,r,o,n){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=F(this,t,r),Y(t)?t===k||t==null||t===""?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==W&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):He(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==k&&Y(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){var i;const{values:r,_$litType$:o}=t,n=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=et.createElement(Qt(o.h,o.h[0]),this.options)),o);if(((i=this._$AH)==null?void 0:i._$AD)===n)this._$AH.p(r);else{const a=new Ve(n,this),l=a.u(this.options);a.p(r),this.T(l),this._$AH=a}}_$AC(t){let r=Jt.get(t.strings);return r===void 0&&Jt.set(t.strings,r=new et(t)),r}k(t){Pt(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let o,n=0;for(const i of t)n===r.length?r.push(o=new pt(this.O(ut()),this.O(ut()),this,this.options)):o=r[n],o._$AI(i),n++;n<r.length&&(this._$AR(o&&o._$AB.nextSibling,n),r.length=n)}_$AR(t=this._$AA.nextSibling,r){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,r);t!==this._$AB;){const n=Ht(t).nextSibling;Ht(t).remove(),t=n}}setConnected(t){var r;this._$AM===void 0&&(this._$Cv=t,(r=this._$AP)==null||r.call(this,t))}}class gt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,n,i){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=r,this._$AM=n,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=k}_$AI(t,r=this,o,n){const i=this.strings;let a=!1;if(i===void 0)t=F(this,t,r,0),a=!Y(t)||t!==this._$AH&&t!==W,a&&(this._$AH=t);else{const l=t;let c,f;for(t=i[0],c=0;c<i.length-1;c++)f=F(this,l[o+c],r,c),f===W&&(f=this._$AH[c]),a||(a=!Y(f)||f!==this._$AH[c]),f===k?t=k:t!==k&&(t+=(f??"")+i[c+1]),this._$AH[c]=f}a&&!n&&this.j(t)}j(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class We extends gt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===k?void 0:t}}class Fe extends gt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==k)}}class qe extends gt{constructor(t,r,o,n,i){super(t,r,o,n,i),this.type=5}_$AI(t,r=this){if((t=F(this,t,r,0)??k)===W)return;const o=this._$AH,n=t===k&&o!==k||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==k&&(o===k||n);n&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,t):this._$AH.handleEvent(t)}}class Ke{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const xt=Q.litHtmlPolyfillSupport;xt==null||xt(et,pt),(Q.litHtmlVersions??(Q.litHtmlVersions=[])).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe={ATTRIBUTE:1},Ze=e=>(...t)=>({_$litDirective$:e,values:t});class Je{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=Ze(class extends Je{constructor(e){var t;if(super(e),e.type!==Xe.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var o,n;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!((o=this.nt)!=null&&o.has(i))&&this.st.add(i);return this.render(t)}const r=e.element.classList;for(const i of this.st)i in t||(r.remove(i),this.st.delete(i));for(const i in t){const a=!!t[i];a===this.st.has(i)||(n=this.nt)!=null&&n.has(i)||(a?(r.add(i),this.st.add(i)):(r.remove(i),this.st.delete(i)))}return W}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=e=>e??k;var Qe=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,E=(e,t,r,o)=>{for(var n=o>1?void 0:o?Ye(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&Qe(t,r,n),n};s.CtButton=class extends d.LitElement{constructor(){super(...arguments),this.theme="light",this.kind="button",this.variant="primary",this.size="regular",this.label="",this.iconPlacement="after",this.disabled=!1,this.newWindow=!1,this.external=!1,this.dismissable=!1,this.modifierClass=""}render(){const t={"ct-button":!0,[`ct-theme-${this.theme}`]:!0,[`ct-button--${this.variant}`]:!0,[`ct-button--${this.size}`]:!0,"ct-button--external":this.external,"ct-button--dismiss":this.dismissable,[this.modifierClass]:!!this.modifierClass},r=this.icon?d.html`<span class="ct-button__icon ct-icon ct-icon--${this.icon}"></span>`:d.nothing,o=this.label?d.html`<span class="ct-button__text">${this.label}</span>`:d.nothing,n=d.html`
      ${this.iconPlacement==="before"?r:d.nothing}
      ${o}
      <slot></slot>
      ${this.iconPlacement==="after"?r:d.nothing}
    `;return this.kind==="link"?d.html`
        <a 
          href=${I(this.url)} 
          role="button" 
          class=${H(t)} 
          data-component-name="button"
          target=${I(this.newWindow?"_blank":void 0)}
          rel=${I(this.newWindow?"noopener noreferrer":void 0)}
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
        >
          ${n}
        </a>
      `:this.kind==="submit"||this.kind==="reset"?d.html`
        <input 
          type=${this.kind} 
          class=${H(t)} 
          data-component-name="button"
          value=${this.label}
          ?disabled=${this.disabled}
        />
      `:d.html`
      <button 
        type="button" 
        class=${H(t)} 
        data-component-name="button"
        ?disabled=${this.disabled}
      >
        ${n}
      </button>
    `}},s.CtButton.styles=d.css`
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
  `,E([u({type:String})],s.CtButton.prototype,"theme",2),E([u({type:String})],s.CtButton.prototype,"kind",2),E([u({type:String})],s.CtButton.prototype,"variant",2),E([u({type:String})],s.CtButton.prototype,"size",2),E([u({type:String})],s.CtButton.prototype,"label",2),E([u({type:String})],s.CtButton.prototype,"url",2),E([u({type:String})],s.CtButton.prototype,"icon",2),E([u({type:String,attribute:"icon-placement"})],s.CtButton.prototype,"iconPlacement",2),E([u({type:Boolean,reflect:!0})],s.CtButton.prototype,"disabled",2),E([u({type:Boolean,attribute:"new-window"})],s.CtButton.prototype,"newWindow",2),E([u({type:Boolean})],s.CtButton.prototype,"external",2),E([u({type:Boolean})],s.CtButton.prototype,"dismissable",2),E([u({type:String,attribute:"modifier-class"})],s.CtButton.prototype,"modifierClass",2),s.CtButton=E([L("ct-button")],s.CtButton);var tr=Object.defineProperty,er=Object.getOwnPropertyDescriptor,P=(e,t,r,o)=>{for(var n=o>1?void 0:o?er(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&tr(t,r,n),n};s.CtLink=class extends d.LitElement{constructor(){super(...arguments),this.theme="light",this.label="",this.newWindow=!1,this.external=!1,this.active=!1,this.disabled=!1,this.iconPlacement="after",this.iconGroupDisabled=!1,this.iconSingleOnly=!1,this.modifierClass=""}renderContent(){const t=this.external&&this.iconSingleOnly?"upper-right-arrow":this.icon,r=!!t||this.external,o=this.newWindow?d.html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`:d.nothing;if(!r)return d.html`<span class="ct-link__text">${this.label}</span>${o}`;const n=t?d.html`<span class="ct-link__icon ct-icon ct-icon--${t}" aria-hidden="true"></span>`:d.nothing;if(!this.label)return d.html`${n}${o}`;const i=this.label.trim().split(/\s+/),a=i[i.length-1]??"",l=i.slice(0,-1).join(" "),c=this.iconGroupDisabled||this.iconPlacement==="before"&&!this.external,f=this.iconPlacement==="before"?n:d.nothing,b=d.html`
      ${this.iconPlacement==="after"?n:d.nothing}
      ${this.external&&!this.iconSingleOnly?d.html`<span class="ct-link__icon ct-link__icon--external ct-icon ct-icon--upper-right-arrow" aria-hidden="true"></span>`:d.nothing}
    `;return c?d.html`${f}<span class="ct-link__text">${this.label}</span>${b}${o}`:d.html`
      ${f}<span class="ct-link__text">${l} </span
      ><span class="ct-link__group"><span class="ct-link__text">${a}</span> ${b}</span
      >${o}
    `}render(){const t=!!this.icon&&!this.label,r={"ct-link":!0,[`ct-theme-${this.theme}`]:!0,"ct-link--external":this.external,"ct-link--active":this.active,"ct-link--disabled":this.disabled,"ct-link--only-icon":t,[this.modifierClass]:!!this.modifierClass};return!this.label&&!this.icon?d.nothing:d.html`
      <a
        class=${H(r)}
        data-component-name="link"
        href=${I(this.url)}
        title=${I(this.linkTitle)}
        target=${I(this.newWindow?"_blank":void 0)}
        rel=${I(this.newWindow?"noopener noreferrer":void 0)}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
      >
        ${this.renderContent()}
      </a>
    `}},s.CtLink.styles=d.css`
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
  `,P([u({type:String})],s.CtLink.prototype,"theme",2),P([u({type:String})],s.CtLink.prototype,"label",2),P([u({type:String})],s.CtLink.prototype,"url",2),P([u({type:String,attribute:"title"})],s.CtLink.prototype,"linkTitle",2),P([u({type:Boolean,attribute:"new-window"})],s.CtLink.prototype,"newWindow",2),P([u({type:Boolean})],s.CtLink.prototype,"external",2),P([u({type:Boolean,reflect:!0})],s.CtLink.prototype,"active",2),P([u({type:Boolean,reflect:!0})],s.CtLink.prototype,"disabled",2),P([u({type:String})],s.CtLink.prototype,"icon",2),P([u({type:String,attribute:"icon-placement"})],s.CtLink.prototype,"iconPlacement",2),P([u({type:Boolean,attribute:"icon-group-disabled"})],s.CtLink.prototype,"iconGroupDisabled",2),P([u({type:Boolean,attribute:"icon-single-only"})],s.CtLink.prototype,"iconSingleOnly",2),P([u({type:String,attribute:"modifier-class"})],s.CtLink.prototype,"modifierClass",2),s.CtLink=P([L("ct-link")],s.CtLink);var rr=Object.defineProperty,or=Object.getOwnPropertyDescriptor,ft=(e,t,r,o)=>{for(var n=o>1?void 0:o?or(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&rr(t,r,n),n};s.CtAccordionItem=class extends d.LitElement{constructor(){super(...arguments),this.heading="",this.expanded=!1,this.disabled=!1}render(){return d.html`<slot></slot>`}},ft([u({type:String})],s.CtAccordionItem.prototype,"heading",2),ft([u({type:Boolean})],s.CtAccordionItem.prototype,"expanded",2),ft([u({type:Boolean})],s.CtAccordionItem.prototype,"disabled",2),s.CtAccordionItem=ft([L("ct-accordion-item")],s.CtAccordionItem);var rt=(e,t=[])=>({parts:(...r)=>{if(nr(t))return rt(e,r);throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?")},extendWith:(...r)=>rt(e,[...t,...r]),omit:(...r)=>rt(e,t.filter(o=>!r.includes(o))),rename:r=>rt(r,t),keys:()=>t,build:()=>[...new Set(t)].reduce((r,o)=>Object.assign(r,{[o]:{selector:[`&[data-scope="${q(e)}"][data-part="${q(o)}"]`,`& [data-scope="${q(e)}"][data-part="${q(o)}"]`].join(", "),attrs:{"data-scope":q(e),"data-part":q(o)}}}),{})}),q=e=>e.replace(/([A-Z])([A-Z])/g,"$1-$2").replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase(),nr=e=>e.length===0,ir=rt("accordion").parts("root","item","itemTrigger","itemContent","itemIndicator"),ot=ir.build(),Yt=e=>typeof e=="object"&&e!==null,G=e=>e?"":void 0,ar=9,sr=e=>Yt(e)&&e.nodeType===ar,cr=e=>Yt(e)&&e===e.window;function lr(e){if(!e)return!1;const t=e.getRootNode();return te(t)===e}function dr(e){return sr(e)?e:cr(e)?e.document:(e==null?void 0:e.ownerDocument)??document}function te(e){let t=e.activeElement;for(;t!=null&&t.shadowRoot;){const r=t.shadowRoot.activeElement;if(!r||r===t)break;t=r}return t}var ee=()=>typeof document<"u";function hr(){const e=navigator.userAgentData;return(e==null?void 0:e.platform)??navigator.platform}var Ot=e=>ee()&&e.test(hr()),ur=e=>ee()&&e.test(navigator.vendor),pr=()=>Ot(/^iPhone/i),gr=()=>Ot(/^iPad/i)||re()&&navigator.maxTouchPoints>1,fr=()=>pr()||gr(),mr=()=>re()||fr(),re=()=>Ot(/^Mac/i),br=()=>mr()&&ur(/apple/i),vr={Up:"ArrowUp",Down:"ArrowDown",Esc:"Escape"," ":"Space",",":"Comma",Left:"ArrowLeft",Right:"ArrowRight"},oe={ArrowLeft:"ArrowRight",ArrowRight:"ArrowLeft"};function _r(e,t={}){const{dir:r="ltr",orientation:o="horizontal"}=t;let n=e.key;return n=vr[n]??n,r==="rtl"&&o==="horizontal"&&n in oe&&(n=oe[n]),n}function yr(e,t){return Array.from((e==null?void 0:e.querySelectorAll(t))??[])}var ne=e=>e.id;function $r(e,t,r=ne){return e.find(o=>r(o)===t)}function ie(e,t,r=ne){const o=$r(e,t,r);return o?e.indexOf(o):-1}function wr(e,t,r=!0){let o=ie(e,t);return o=r?(o+1)%e.length:Math.min(o+1,e.length-1),e[o]}function kr(e,t,r=!0){let o=ie(e,t);return o===-1?r?e[e.length-1]:null:(o=r?(o-1+e.length)%e.length:Math.max(0,o-1),e[o])}function Ar(e){return e==null?[]:Array.isArray(e)?e:[e]}var Sr=e=>e[0],Cr=e=>e[e.length-1],Er=(e,...t)=>e.concat(t),Pr=(e,...t)=>e.filter(r=>!t.includes(r)),Tr=e=>typeof e=="string",nt=e=>typeof e=="function",xr=Function.prototype.toString;xr.call(Object);var ae=(...e)=>(...t)=>{e.forEach(function(r){r==null||r(...t)})};function Or(...e){const t=e.length===1?e[0]:e[1];(e.length===2?e[0]:!0)&&process.env.NODE_ENV!=="production"&&console.warn(t)}function se(...e){const t=e.length===1?e[0]:e[1];if((e.length===2?e[0]:!0)&&process.env.NODE_ENV!=="production")throw new Error(t)}function ce(e,t){if(e==null)throw new Error(t())}var mt=e=>{var t;return((t=e.ids)==null?void 0:t.root)??`accordion:${e.id}`},Ir=(e,t)=>{var r,o;return((o=(r=e.ids)==null?void 0:r.item)==null?void 0:o.call(r,t))??`accordion:${e.id}:item:${t}`},It=(e,t)=>{var r,o;return((o=(r=e.ids)==null?void 0:r.itemContent)==null?void 0:o.call(r,t))??`accordion:${e.id}:content:${t}`},bt=(e,t)=>{var r,o;return((o=(r=e.ids)==null?void 0:r.itemTrigger)==null?void 0:o.call(r,t))??`accordion:${e.id}:trigger:${t}`},Rr=e=>e.getById(mt(e)),vt=e=>{const r=`[data-controls][data-ownedby='${CSS.escape(mt(e))}']:not([disabled])`;return yr(Rr(e),r)},Lr=e=>Sr(vt(e)),Br=e=>Cr(vt(e)),Nr=(e,t)=>wr(vt(e),bt(e,t)),Ur=(e,t)=>kr(vt(e),bt(e,t));function zr(e,t){const{send:r,context:o,prop:n,scope:i,computed:a}=e,l=o.get("focusedValue"),c=o.get("value"),f=n("multiple");function b(v){let g=v;!f&&g.length>1&&(g=[g[0]]),r({type:"VALUE.SET",value:g})}function m(v){return{expanded:c.includes(v.value),focused:l===v.value,disabled:!!(v.disabled??n("disabled"))}}return{focusedValue:l,value:c,setValue:b,getItemState:m,getRootProps(){return t.element({...ot.root.attrs,dir:n("dir"),id:mt(i),"data-orientation":n("orientation")})},getItemProps(v){const g=m(v);return t.element({...ot.item.attrs,dir:n("dir"),id:Ir(i,v.value),"data-state":g.expanded?"open":"closed","data-focus":G(g.focused),"data-disabled":G(g.disabled),"data-orientation":n("orientation")})},getItemContentProps(v){const g=m(v);return t.element({...ot.itemContent.attrs,dir:n("dir"),role:"region",id:It(i,v.value),"aria-labelledby":bt(i,v.value),hidden:!g.expanded,"data-state":g.expanded?"open":"closed","data-disabled":G(g.disabled),"data-focus":G(g.focused),"data-orientation":n("orientation")})},getItemIndicatorProps(v){const g=m(v);return t.element({...ot.itemIndicator.attrs,dir:n("dir"),"aria-hidden":!0,"data-state":g.expanded?"open":"closed","data-disabled":G(g.disabled),"data-focus":G(g.focused),"data-orientation":n("orientation")})},getItemTriggerProps(v){const{value:g}=v,A=m(v);return t.button({...ot.itemTrigger.attrs,type:"button",dir:n("dir"),id:bt(i,g),"aria-controls":It(i,g),"data-controls":It(i,g),"aria-expanded":A.expanded,disabled:A.disabled,"data-orientation":n("orientation"),"data-state":A.expanded?"open":"closed","data-focus":G(A.focused),"data-ownedby":mt(i),onFocus(){A.disabled||r({type:"TRIGGER.FOCUS",value:g})},onBlur(){A.disabled||r({type:"TRIGGER.BLUR"})},onClick(R){A.disabled||(br()&&R.currentTarget.focus(),r({type:"TRIGGER.CLICK",value:g}))},onKeyDown(R){if(R.defaultPrevented||A.disabled)return;const K={ArrowDown(){a("isHorizontal")||r({type:"GOTO.NEXT",value:g})},ArrowUp(){a("isHorizontal")||r({type:"GOTO.PREV",value:g})},ArrowRight(){a("isHorizontal")&&r({type:"GOTO.NEXT",value:g})},ArrowLeft(){a("isHorizontal")&&r({type:"GOTO.PREV",value:g})},Home(){r({type:"GOTO.FIRST",value:g})},End(){r({type:"GOTO.LAST",value:g})}},x=_r(R,{dir:n("dir"),orientation:n("orientation")}),O=K[x];O&&(O(R),R.preventDefault())}})}}}var U=".",le="#",de=new WeakMap,he=new WeakMap;function Rt(e){return e.join(U)}function Mr(e){return e.includes(U)}function ue(e){return e.startsWith(le)}function jr(e){return e.startsWith(U)}function Dr(e){return ue(e)?e.slice(le.length):e}function Lt(e,t){return e?`${e}${U}${t}`:t}function Hr(e){const t=new Map,r=new Map,o=(n,i)=>{t.set(n,i);const a=i.id;a&&(r.has(a)&&se(`[zag-js] Duplicate state id: "${a}"`),r.set(a,n));const l=i.states;if(l){ce(i.initial,()=>`[zag-js] Compound state "${n}" has child states but no "initial" property`),i.initial in l||se(`[zag-js] Compound state "${n}" has initial "${String(i.initial)}" which is not a child state`);for(const[c,f]of Object.entries(l)){if(!f)continue;const b=Lt(n,c);o(b,f)}}};for(const[n,i]of Object.entries(e.states))i&&o(n,i);return{index:t,idIndex:r}}function it(e){const t=de.get(e);if(t)return t;const{index:r,idIndex:o}=Hr(e);return de.set(e,r),he.set(e,o),r}function Gr(e,t){var r;return it(e),(r=he.get(e))==null?void 0:r.get(t)}function Bt(e){return e?String(e).split(U).filter(Boolean):[]}function _t(e,t){if(!t)return[];const r=it(e),o=Bt(t),n=[],i=[];for(const a of o){i.push(a);const l=Rt(i),c=r.get(l);if(!c)break;n.push({path:l,state:c})}return n}function at(e,t){const r=it(e),o=Bt(t);if(!o.length)return t;const n=[];for(const l of o){n.push(l);const c=Rt(n);if(!r.has(c))return t}let i=Rt(n),a=r.get(i);for(;a!=null&&a.initial;){const l=`${i}${U}${a.initial}`,c=r.get(l);if(!c)break;i=l,a=c}return i}function pe(e,t){return it(e).has(t)}function ge(e,t,r){const o=String(t);if(ue(o)){const n=Dr(o),i=Gr(e,n);return ce(i,()=>`[zag-js] Unknown state id: "${n}"`),at(e,i)}if(jr(o)&&r){const n=Lt(r,o.slice(1));return at(e,n)}if(!Mr(o)&&r){const n=Bt(r);for(let i=n.length-1;i>=1;i--){const a=n.slice(0,i).join(U),l=Lt(a,o);if(pe(e,l))return at(e,l)}if(pe(e,o))return at(e,o)}return at(e,o)}function Vr(e,t,r){var i,a;const o=_t(e,t);for(let l=o.length-1;l>=0;l--){const c=(i=o[l])==null?void 0:i.state.on,f=c==null?void 0:c[r];if(f)return{transitions:f,source:(a=o[l])==null?void 0:a.path}}const n=e.on;return{transitions:n==null?void 0:n[r],source:void 0}}function Wr(e,t,r,o){var b,m,v,g;const n=t?_t(e,t):[],i=_t(e,r);let a=0;for(;a<n.length&&a<i.length&&((b=n[a])==null?void 0:b.path)===((m=i[a])==null?void 0:m.path);)a+=1;let l=n.slice(a).reverse(),c=i.slice(a);const f=((v=n.at(-1))==null?void 0:v.path)===((g=i.at(-1))==null?void 0:g.path);return o&&f&&(l=n.slice().reverse(),c=i),{exiting:l,entering:c}}function Fr(e,t){return e?e===t||e.startsWith(`${t}${U}`):!1}function qr(e,t,r){return _t(e,t).some(o=>{var n;return(n=o.state.tags)==null?void 0:n.includes(r)})}function Kr(){return{and:(...e)=>function(r){return e.every(o=>r.guard(o))},or:(...e)=>function(r){return e.some(o=>r.guard(o))},not:e=>function(r){return!r.guard(e)}}}function Xr(e){return it(e),e}var st=(e=>(e.NotStarted="Not Started",e.Started="Started",e.Stopped="Stopped",e))(st||{}),yt="__init__";function Zr(e){const t=()=>{var a;return((a=e.getRootNode)==null?void 0:a.call(e))??document},r=()=>dr(t());return{...e,getRootNode:t,getDoc:r,getWin:()=>r().defaultView??window,getActiveElement:()=>te(t()),isActiveElement:lr,getById:a=>t().getElementById(a)}}var{and:Jr,not:Qr}=Kr(),Yr=Xr({props({props:e}){return{collapsible:!1,multiple:!1,orientation:"vertical",defaultValue:[],...e}},initialState(){return"idle"},context({prop:e,bindable:t}){return{focusedValue:t(()=>({defaultValue:null,sync:!0,onChange(r){var o;(o=e("onFocusChange"))==null||o({value:r})}})),value:t(()=>({defaultValue:e("defaultValue"),value:e("value"),onChange(r){var o;(o=e("onValueChange"))==null||o({value:r})}}))}},computed:{isHorizontal:({prop:e})=>e("orientation")==="horizontal"},on:{"VALUE.SET":{actions:["setValue"]}},states:{idle:{on:{"TRIGGER.FOCUS":{target:"focused",actions:["setFocusedValue"]}}},focused:{on:{"GOTO.NEXT":{actions:["focusNextTrigger"]},"GOTO.PREV":{actions:["focusPrevTrigger"]},"TRIGGER.CLICK":[{guard:Jr("isExpanded","canToggle"),actions:["collapse"]},{guard:Qr("isExpanded"),actions:["expand"]}],"GOTO.FIRST":{actions:["focusFirstTrigger"]},"GOTO.LAST":{actions:["focusLastTrigger"]},"TRIGGER.BLUR":{target:"idle",actions:["clearFocusedValue"]}}}},implementations:{guards:{canToggle:({prop:e})=>!!e("collapsible")||!!e("multiple"),isExpanded:({context:e,event:t})=>e.get("value").includes(t.value)},actions:{collapse({context:e,prop:t,event:r}){const o=t("multiple")?Pr(e.get("value"),r.value):[];e.set("value",o)},expand({context:e,prop:t,event:r}){const o=t("multiple")?Er(e.get("value"),r.value):[r.value];e.set("value",o)},focusFirstTrigger({scope:e}){var t;(t=Lr(e))==null||t.focus()},focusLastTrigger({scope:e}){var t;(t=Br(e))==null||t.focus()},focusNextTrigger({context:e,scope:t}){const r=e.get("focusedValue");if(!r)return;const o=Nr(t,r);o==null||o.focus()},focusPrevTrigger({context:e,scope:t}){const r=e.get("focusedValue");if(!r)return;const o=Ur(t,r);o==null||o.focus()},setFocusedValue({context:e,event:t}){e.set("focusedValue",t.value)},clearFocusedValue({context:e}){e.set("focusedValue",null)},setValue({context:e,event:t}){e.set("value",t.value)},coarseValue({context:e,prop:t}){!t("multiple")&&e.get("value").length>1&&(Or("The value of accordion should be a single value when multiple is false."),e.set("value",[e.get("value")[0]]))}}}});function to(e){return new Proxy({},{get(t,r){return r==="style"?o=>e({style:o}).style:e}})}function eo(e,t,r){var _e,ye,$e;const o=e,n=t(),i=Zr({id:n.id,ids:n.ids,getRootNode:n.getRootNode??(()=>document)}),a=p=>{var S;const h=t();return(((S=o.props)==null?void 0:S.call(o,{props:h,scope:i}))??h)[p]};function l(p){const h=p(),w=h.isEqual??((y,_)=>y===_),S=h.hash??(y=>String(y)),C={current:h.value!==void 0?h.value:h.defaultValue};return{initial:h.defaultValue,ref:C,get:()=>C.current,set(y){var ct;const _=C.current,$=nt(y)?y(_):y;w($,_)||(C.current=$,(ct=h.onChange)==null||ct.call(h,$,_),r())},invoke(y,_){var $;($=h.onChange)==null||$.call(h,y,_)},hash:S}}l.cleanup=p=>{},l.ref=p=>{const h={current:p};return{get:()=>h.current,set:w=>h.current=w}};const c=(_e=o.context)==null?void 0:_e.call(o,{prop:a,bindable:l,scope:i,flush:p=>p(),getContext:()=>f,getComputed:()=>$t,getRefs:()=>K,getEvent:()=>A()}),f={get:p=>c==null?void 0:c[p].get(),set:(p,h)=>c==null?void 0:c[p].set(h),initial:p=>c==null?void 0:c[p].initial,hash:p=>{const h=c==null?void 0:c[p].get();return c==null?void 0:c[p].hash(h)}};let b=new Map;const m={current:null},v={current:null},g={current:{type:""}},A=()=>({...g.current,current:()=>g.current,previous:()=>v.current}),R=()=>({get:()=>z.get(),matches:(...p)=>p.some(h=>Fr(z.get(),h)),hasTag:p=>qr(o,z.get(),p)}),K=((ye=o.refs)==null?void 0:ye.call(o,{prop:a,context:f}))??{},x=()=>({state:R(),context:f,event:A(),prop:a,send:ve,action:O,guard:fe,track:()=>{},refs:K,computed:$t,flush:p=>p(),scope:i,choose:be}),O=p=>{var w,S;const h=nt(p)?p(x()):p;if(h)for(const C of h){const y=(S=(w=o.implementations)==null?void 0:w.actions)==null?void 0:S[C];y==null||y(x())}},fe=p=>{var h,w,S;return nt(p)?p(x()):(S=(w=(h=o.implementations)==null?void 0:h.guards)==null?void 0:w[p])==null?void 0:S.call(w,x())},me=p=>{var S,C;const h=nt(p)?p(x()):p;if(!h)return;const w=[];for(const y of h){const _=(C=(S=o.implementations)==null?void 0:S.effects)==null?void 0:C[y],$=_==null?void 0:_(x());$&&w.push($)}return()=>w.forEach(y=>y==null?void 0:y())},be=p=>Ar(p).find(h=>h!=null&&h.guard?Tr(h.guard)?!!fe(h.guard):nt(h.guard)?h.guard(x()):!1:!0),$t=p=>{var w;const h=(w=o.computed)==null?void 0:w[p];return h==null?void 0:h({context:f,event:A(),prop:a,refs:K,scope:i,computed:$t})},z=l(()=>({defaultValue:ge(o,o.initialState({prop:a})),onChange(p,h){var C,y;const{exiting:w,entering:S}=Wr(o,h,p,(C=m.current)==null?void 0:C.reenter);if(w.forEach(_=>{var $;($=b.get(_.path))==null||$(),b.delete(_.path)}),w.forEach(_=>{var $;return O(($=_.state)==null?void 0:$.exit)}),O((y=m.current)==null?void 0:y.actions),S.forEach(_=>{var ct;const $=me((ct=_.state)==null?void 0:ct.effects);if($){const we=b.get(_.path);b.set(_.path,we?ae(we,$):$)}}),h===yt){O(o.entry);const _=me(o.effects);if(_){const $=b.get(yt);b.set(yt,$?ae($,_):_)}}S.forEach(_=>{var $;return O(($=_.state)==null?void 0:$.entry)})}}));let wt=st.NotStarted;function lo(){wt=st.Started,z.invoke(z.initial,yt)}function ho(){wt=st.Stopped,b.forEach(p=>p==null?void 0:p()),b=new Map,m.current=null,O(o.exit)}const ve=p=>{if(wt!==st.Started)return;v.current=g.current,g.current=p;const h=z.get(),{transitions:w,source:S}=Vr(o,h,p.type),C=be(w);if(!C)return;m.current=C;const y=ge(o,C.target??h,S);y!==h?z.set(y):C.reenter?z.invoke(h,h):O(C.actions)};return($e=o.watch)==null||$e.call(o,x()),{state:R(),send:ve,get event(){return A()},context:{get:f.get,set:f.set},prop:a,scope:i,refs:K,computed:$t,start:lo,stop:ho,getStatus:()=>wt}}const ro=to(e=>e);var oo=Object.defineProperty,no=Object.getOwnPropertyDescriptor,V=(e,t,r,o)=>{for(var n=o>1?void 0:o?no(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&oo(t,r,n),n};let io=0;const ao=d.html`
  <svg class="ct-accordion__panels__panel__header__button__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.5 5.5L8 10l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;s.CtAccordion=class extends d.LitElement{constructor(){super(...arguments),this.theme="light",this.expandAll=!1,this.singleOpen=!1,this.withBackground=!1,this.verticalSpacing="none",this.modifierClass=""}_items(){return Array.from(this.querySelectorAll(":scope > ct-accordion-item"))}connectedCallback(){super.connectedCallback(),this.id||(this.id=`ct-accordion-${++io}`);const r=this._items().map((n,i)=>({item:n,value:`panel-${i}`})).filter(({item:n})=>this.expandAll||n.expanded).map(({value:n})=>n),o={id:this.id,getRootNode:()=>this.shadowRoot??document,multiple:!this.singleOpen,collapsible:!0,defaultValue:r};this._accordionService=eo(Yr,()=>o,()=>this.requestUpdate()),this._accordionService.start()}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._accordionService)==null||t.stop()}render(){const t=this._items();if(t.forEach((i,a)=>{i.slot=`panel-${a}`}),!this._accordionService)return d.nothing;const r=zr(this._accordionService,ro),o=r.getRootProps(),n={"ct-accordion":!0,[`ct-theme-${this.theme}`]:!0,"ct-accordion--with-background":this.withBackground,[`ct-vertical-spacing-inset--${this.verticalSpacing}`]:this.verticalSpacing!=="none",[this.modifierClass]:!!this.modifierClass};return d.html`
      <div class=${H(n)} id=${o.id} data-orientation=${o["data-orientation"]}>
        <div class="ct-accordion__content">
          <ul class="ct-accordion__panels">
            ${t.map((i,a)=>this.renderPanel(r,i,`panel-${a}`))}
          </ul>
        </div>
      </div>
    `}renderPanel(t,r,o){const n=t.getItemProps({value:o,disabled:r.disabled}),i=t.getItemTriggerProps({value:o,disabled:r.disabled}),a=t.getItemContentProps({value:o,disabled:r.disabled});return d.html`
      <li
        class="ct-accordion__panels__panel"
        id=${n.id}
        data-state=${n["data-state"]}
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
            <span>${r.heading}</span>
            ${ao}
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
            <slot name=${o}></slot>
          </div>
        </div>
      </li>
    `}},s.CtAccordion.styles=d.css`
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
  `,V([u({type:String})],s.CtAccordion.prototype,"theme",2),V([u({type:Boolean,attribute:"expand-all"})],s.CtAccordion.prototype,"expandAll",2),V([u({type:Boolean,attribute:"single-open"})],s.CtAccordion.prototype,"singleOpen",2),V([u({type:Boolean,attribute:"with-background"})],s.CtAccordion.prototype,"withBackground",2),V([u({type:String,attribute:"vertical-spacing"})],s.CtAccordion.prototype,"verticalSpacing",2),V([u({type:String,attribute:"modifier-class"})],s.CtAccordion.prototype,"modifierClass",2),s.CtAccordion=V([L("ct-accordion")],s.CtAccordion);var so=Object.defineProperty,co=Object.getOwnPropertyDescriptor,T=(e,t,r,o)=>{for(var n=o>1?void 0:o?co(t,r):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(n=(o?a(t,r,n):a(n))||n);return o&&n&&so(t,r,n),n};s.CtTag=class extends d.LitElement{constructor(){super(...arguments),this.theme="light",this.variant="primary",this.label="",this.iconPlacement="after",this.newWindow=!1,this.external=!1,this.modifierClass=""}render(){if(!this.label)return d.nothing;const t={"ct-tag":!0,[`ct-theme-${this.theme}`]:!0,[`ct-tag--${this.variant}`]:!0,[`ct-tag--icon-${this.iconPlacement}`]:!!this.icon,"ct-tag--external":this.external,[this.modifierClass]:!!this.modifierClass},r=this.icon?d.html`<span class="ct-tag__icon ct-icon ct-icon--${this.icon}"></span>`:d.nothing,o=d.html`<span class="ct-tag__text">${this.label}</span>`,n=this.url&&this.newWindow?d.html`<span class="ct-visually-hidden">(Opens in a new tab/window)</span>`:d.nothing,i=this.external?d.html`<span class="ct-tag__icon ct-icon ct-icon--upper-right-arrow"></span>`:d.nothing,a=d.html`
      ${this.iconPlacement==="before"?r:d.nothing}
      ${o}
      ${this.iconPlacement==="after"?r:d.nothing}
      ${n}
      ${i}
      <slot></slot>
    `;return this.url?d.html`
        <a
          class=${H(t)}
          href=${this.url}
          title=${this.label}
          target=${I(this.newWindow?"_blank":void 0)}
          aria-label=${I(this.newWindow?"Opens in a new tab":void 0)}
          data-component-name="tag"
        >
          ${a}
        </a>
      `:d.html`
      <span class=${H(t)} data-component-name="tag">
        ${a}
      </span>
    `}},s.CtTag.styles=d.css`
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
  `,T([u({type:String})],s.CtTag.prototype,"theme",2),T([u({type:String})],s.CtTag.prototype,"variant",2),T([u({type:String})],s.CtTag.prototype,"label",2),T([u({type:String})],s.CtTag.prototype,"icon",2),T([u({type:String,attribute:"icon-placement"})],s.CtTag.prototype,"iconPlacement",2),T([u({type:String})],s.CtTag.prototype,"url",2),T([u({type:Boolean,attribute:"new-window"})],s.CtTag.prototype,"newWindow",2),T([u({type:Boolean})],s.CtTag.prototype,"external",2),T([u({type:String,attribute:"modifier-class"})],s.CtTag.prototype,"modifierClass",2),s.CtTag=T([L("ct-tag")],s.CtTag),Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
