function e(e,t,o,a){var i,s=arguments.length,r=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,a);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(r=(s<3?i(r):s>3?i(t,o,r):i(t,o))||r);return s>3&&r&&Object.defineProperty(t,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),i=new WeakMap;let s=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[a+1],e[0]);return new s(o,e,a)},n=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,y=g?g.emptyScript:"",b=m.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},_=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),a=this.getPropertyDescriptor(e,o,t);void 0!==a&&d(this.prototype,e,a)}}static getPropertyDescriptor(e,t,o){const{get:a,set:i}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);i?.call(this,t),this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(o)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of a){const a=document.createElement("style"),i=t.litNonce;void 0!==i&&a.setAttribute("nonce",i),a.textContent=o.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,o);if(void 0!==a&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:f).toAttribute(t,o.type);this._$Em=e,null==i?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(e,t){const o=this.constructor,a=o._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=o.getPropertyOptions(a),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const s=i.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,o,a=!1,i){if(void 0!==e){const s=this.constructor;if(!1===a&&(i=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??_)(i,t)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:a,wrapped:i},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==i||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,b?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=e=>e,A=w.trustedTypes,z=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,H=`<${E}>`,O=document,P=()=>O.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,j="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,D=/>/g,N=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,Z=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,q=O.createTreeWalker(O,129);function K(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(t):t}const G=(e,t)=>{const o=e.length-1,a=[];let i,s=2===t?"<svg>":3===t?"<math>":"",r=T;for(let t=0;t<o;t++){const o=e[t];let n,l,d=-1,c=0;for(;c<o.length&&(r.lastIndex=c,l=r.exec(o),null!==l);)c=r.lastIndex,r===T?"!--"===l[1]?r=V:void 0!==l[1]?r=D:void 0!==l[2]?(Z.test(l[2])&&(i=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=i??T,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?N:'"'===l[3]?U:R):r===U||r===R?r=N:r===V||r===D?r=T:(r=N,i=void 0);const h=r===N&&e[t+1].startsWith("/>")?" ":"";s+=r===T?o+H:d>=0?(a.push(n),o.slice(0,d)+S+o.slice(d)+C+h):o+C+(-2===d?t:h)}return[K(e,s+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class J{constructor({strings:e,_$litType$:t},o){let a;this.parts=[];let i=0,s=0;const r=e.length-1,n=this.parts,[l,d]=G(e,t);if(this.el=J.createElement(l,o),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=q.nextNode())&&n.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(S)){const t=d[s++],o=a.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:i,name:r[2],strings:o,ctor:"."===r[1]?te:"?"===r[1]?oe:"@"===r[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:i}),a.removeAttribute(e));if(Z.test(a.tagName)){const e=a.textContent.split(C),t=e.length-1;if(t>0){a.textContent=A?A.emptyScript:"";for(let o=0;o<t;o++)a.append(e[o],P()),q.nextNode(),n.push({type:2,index:++i});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===E)n.push({type:2,index:i});else{let e=-1;for(;-1!==(e=a.data.indexOf(C,e+1));)n.push({type:7,index:i}),e+=C.length-1}i++}}static createElement(e,t){const o=O.createElement("template");return o.innerHTML=e,o}}function X(e,t,o=e,a){if(t===B)return t;let i=void 0!==a?o._$Co?.[a]:o._$Cl;const s=L(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e),i._$AT(e,o,a)),void 0!==a?(o._$Co??=[])[a]=i:o._$Cl=i),void 0!==i&&(t=X(e,i._$AS(e,t.values),i,a)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,a=(e?.creationScope??O).importNode(t,!0);q.currentNode=a;let i=q.nextNode(),s=0,r=0,n=o[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new Q(i,i.nextSibling,this,e):1===n.type?t=new n.ctor(i,n.name,n.strings,this,e):6===n.type&&(t=new ie(i,this,e)),this._$AV.push(t),n=o[++r]}s!==n?.index&&(i=q.nextNode(),s++)}return q.currentNode=O,a}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),L(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,a="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=J.createElement(K(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Y(a,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new J(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,a=0;for(const i of e)a===t.length?t.push(o=new Q(this.O(P()),this.O(P()),this,this.options)):o=t[a],o._$AI(i),a++;a<t.length&&(this._$AR(o&&o._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,a,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=W}_$AI(e,t=this,o,a){const i=this.strings;let s=!1;if(void 0===i)e=X(this,e,t,0),s=!L(e)||e!==this._$AH&&e!==B,s&&(this._$AH=e);else{const a=e;let r,n;for(e=i[0],r=0;r<i.length-1;r++)n=X(this,a[o+r],t,r),n===B&&(n=this._$AH[r]),s||=!L(n)||n!==this._$AH[r],n===W?e=W:e!==W&&(e+=(n??"")+i[r+1]),this._$AH[r]=n}s&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class oe extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ae extends ee{constructor(e,t,o,a,i){super(e,t,o,a,i),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===B)return;const o=this._$AH,a=e===W&&o!==W||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==W&&(o===W||a);a&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se=w.litHtmlPolyfillSupport;se?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.3");const re=globalThis;class ne extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const a=o?.renderBefore??t;let i=a._$litPart$;if(void 0===i){const e=o?.renderBefore??null;a._$litPart$=i=new Q(t.insertBefore(P(),e),e,void 0,o??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ne._$litElement$=!0,ne.finalized=!0,re.litElementHydrateSupport?.({LitElement:ne});const le=re.litElementPolyfillSupport;le?.({LitElement:ne}),(re.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:_},ce=(e=de,t,o)=>{const{kind:a,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),"accessor"===a){const{name:a}=o;return{set(o){const i=t.get.call(this);t.set.call(this,o),this.requestUpdate(a,i,e,!0,o)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=o;return function(o){const i=this[a];t.call(this,o),this.requestUpdate(a,i,e,!0,o)}}throw Error("Unsupported decorator location: "+a)};function he(e){return(t,o)=>"object"==typeof o?ce(e,t,o):((e,t,o)=>{const a=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),a?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function pe(e){return he({...e,state:!0,attribute:!1})}const ue="smart_heating_schedule",me=(e,t,o)=>e.callWS({type:`${ue}/room/save`,entity_id:t,...o}),ge=(e,t,o)=>{e.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:o}))},ye=(e,t=!1)=>{t?history.replaceState(null,"",e):history.pushState(null,"",e),ge(window,"location-changed",{replace:t})},be=(e,t)=>{ge(e,"hass-notification",{message:t})};let ve;const fe=(e,t)=>{const o=e.states[t]?.attributes.friendly_name;if(o)return o;const a=e.entities?.[t]?.device_id,i=a?e.devices?.[a]:void 0;return i?.name_by_user||i?.name||t},_e=(e,t)=>{const o=e.entities?.[t],a=o?.area_id??(o?.device_id?e.devices?.[o.device_id]?.area_id:void 0);return a?e.areas?.[a]?.name:void 0},xe=e=>t=>{customElements.get(e)||customElements.define(e,t)},$e={title:"Smart Heating Schedule",loading:"Loading…",not_loaded:"Smart Heating Schedule is not set up. Add the integration under Settings → Devices & services.",read_only:"Only administrators can change schedules.",presence:{label:"Presence",auto:"Auto",home:"Home",away:"Away",detected_home:"Auto: someone is home",detected_away:"Auto: nobody is home",detected_unknown:"Auto: presence unknown, using the home schedule",forced:"Set manually; automatic switching is paused"},overview:{add:"Add thermostat",empty_title:"No schedules yet",empty_text:"Add a thermostat to give it a weekly home and away schedule.",no_thermostats:"All thermostats already have a schedule.",choose:"Choose a thermostat",now:"Now",no_area:"No room"},status:{until:"{temperature} until {time}",off_until:"Off until {time}",constant:"{temperature} all week",constant_off:"Off all week",disabled:"Schedule is off",pending:"Waiting for the thermostat",error:"Could not update the thermostat: {error}"},room:{back:"Back",enabled:"Smart schedule",add_block:"Add time block",copy_day:"Copy schedule",paste_day:"Paste schedule",copied:"Schedule copied. Use paste on another day.",copy_rooms:"Copy schedule to other rooms",remove:"Remove schedule",remove_text:"Stop scheduling {name} and delete its home and away schedules?",off:"Off",overridden:"Changed by hand",resume:"Restore schedule"},block:{edit:"Edit time block",add:"Add time block",start:"Start",end:"End",heating:"Heating",off:"Off",frost:"Frost protection",delete:"Delete time block",lower:"Lower temperature",raise:"Raise temperature",overlap:"Overlapping time blocks are shortened or replaced.",invalid:"The end must be at least 15 minutes after the start."},copy:{title:"Copy schedule",text:"Replaces the home and away schedules of the selected rooms with those of {name}.",nothing:"There are no other thermostats."},common:{cancel:"Cancel",save:"Save",add:"Add",copy:"Copy",remove:"Remove",close:"Close"},error:{save:"Could not save: {error}",resume:"Could not restore the schedule: {error}"}},we={en:$e,de:{title:"Smart Heating Schedule",loading:"Wird geladen…",not_loaded:"Smart Heating Schedule ist nicht eingerichtet. Füge die Integration unter Einstellungen → Geräte & Dienste hinzu.",read_only:"Nur Administratoren können Zeitpläne ändern.",presence:{label:"Anwesenheit",auto:"Automatisch",home:"Zuhause",away:"Abwesend",detected_home:"Automatisch: jemand ist zu Hause",detected_away:"Automatisch: niemand ist zu Hause",detected_unknown:"Automatisch: Anwesenheit unbekannt, Zuhause-Zeitplan aktiv",forced:"Manuell eingestellt; automatisches Umschalten ist pausiert"},overview:{add:"Thermostat hinzufügen",empty_title:"Noch keine Zeitpläne",empty_text:"Füge ein Thermostat hinzu, um ihm einen Wochenzeitplan für Zuhause und Abwesend zu geben.",no_thermostats:"Alle Thermostate haben bereits einen Zeitplan.",choose:"Thermostat auswählen",now:"Jetzt",no_area:"Kein Raum"},status:{until:"{temperature} bis {time}",off_until:"Aus bis {time}",constant:"{temperature} die ganze Woche",constant_off:"Die ganze Woche aus",disabled:"Zeitplan ist aus",pending:"Warte auf das Thermostat",error:"Thermostat konnte nicht aktualisiert werden: {error}"},room:{back:"Zurück",enabled:"Intelligenter Zeitplan",add_block:"Zeitblock hinzufügen",copy_day:"Zeitplan kopieren",paste_day:"Zeitplan einfügen",copied:"Zeitplan kopiert. Füge ihn bei einem anderen Tag ein.",copy_rooms:"Zeitplan in andere Räume kopieren",remove:"Zeitplan entfernen",remove_text:"Planung für {name} beenden und den Zuhause- und Abwesend-Zeitplan löschen?",off:"Aus",overridden:"Manuell geändert",resume:"Zeitplan fortsetzen"},block:{edit:"Zeitblock bearbeiten",add:"Zeitblock hinzufügen",start:"Beginn",end:"Ende",heating:"Heizung",off:"Aus",frost:"Frostschutz",delete:"Zeitblock löschen",lower:"Temperatur senken",raise:"Temperatur erhöhen",overlap:"Überlappende Zeitblöcke werden gekürzt oder ersetzt.",invalid:"Das Ende muss mindestens 15 Minuten nach dem Beginn liegen."},copy:{title:"Zeitplan kopieren",text:"Ersetzt den Zuhause- und Abwesend-Zeitplan der ausgewählten Räume durch den von {name}.",nothing:"Es gibt keine anderen Thermostate."},common:{cancel:"Abbrechen",save:"Speichern",add:"Hinzufügen",copy:"Kopieren",remove:"Entfernen",close:"Schließen"},error:{save:"Speichern fehlgeschlagen: {error}",resume:"Zeitplan konnte nicht fortgesetzt werden: {error}"}},nl:{title:"Smart Heating Schedule",loading:"Laden…",not_loaded:"Smart Heating Schedule is niet ingesteld. Voeg de integratie toe via Instellingen → Apparaten & diensten.",read_only:"Alleen beheerders kunnen schema's wijzigen.",presence:{label:"Aanwezigheid",auto:"Automatisch",home:"Thuis",away:"Afwezig",detected_home:"Automatisch: er is iemand thuis",detected_away:"Automatisch: niemand thuis",detected_unknown:"Automatisch: aanwezigheid onbekend, thuis-schema actief",forced:"Handmatig ingesteld; automatisch wisselen staat uit"},overview:{add:"Thermostaat toevoegen",empty_title:"Nog geen schema's",empty_text:"Voeg een thermostaat toe om een wekelijks thuis- en afwezig-schema te maken.",no_thermostats:"Alle thermostaten hebben al een schema.",choose:"Kies een thermostaat",now:"Nu",no_area:"Geen ruimte"},status:{until:"{temperature} tot {time}",off_until:"Uit tot {time}",constant:"{temperature} de hele week",constant_off:"De hele week uit",disabled:"Schema staat uit",pending:"Wachten op de thermostaat",error:"Thermostaat bijwerken mislukt: {error}"},room:{back:"Terug",enabled:"Slim schema",add_block:"Tijdsblok toevoegen",copy_day:"Kopieer schema",paste_day:"Plak schema",copied:"Schema gekopieerd. Plak het bij een andere dag.",copy_rooms:"Schema kopiëren naar andere kamers",remove:"Schema verwijderen",remove_text:"Stoppen met plannen voor {name} en het thuis- en afwezig-schema verwijderen?",off:"Uit",overridden:"Handmatig aangepast",resume:"Schema hervatten"},block:{edit:"Tijdsblok bewerken",add:"Tijdsblok toevoegen",start:"Begin",end:"Einde",heating:"Verwarming",off:"Uit",frost:"Vorstbeveiliging",delete:"Tijdsblok verwijderen",lower:"Temperatuur lager",raise:"Temperatuur hoger",overlap:"Overlappende tijdsblokken worden ingekort of vervangen.",invalid:"Het einde moet minstens 15 minuten na het begin liggen."},copy:{title:"Schema kopiëren",text:"Vervangt het thuis- en afwezig-schema van de gekozen kamers door dat van {name}.",nothing:"Er zijn geen andere thermostaten."},common:{cancel:"Annuleren",save:"Opslaan",add:"Toevoegen",copy:"Kopiëren",remove:"Verwijderen",close:"Sluiten"},error:{save:"Opslaan mislukt: {error}",resume:"Schema hervatten mislukt: {error}"}},fr:{title:"Smart Heating Schedule",loading:"Chargement…",not_loaded:"Smart Heating Schedule n'est pas configuré. Ajoutez l'intégration dans Paramètres → Appareils et services.",read_only:"Seuls les administrateurs peuvent modifier les programmes.",presence:{label:"Présence",auto:"Auto",home:"Maison",away:"Absent",detected_home:"Auto : quelqu'un est à la maison",detected_away:"Auto : personne à la maison",detected_unknown:"Auto : présence inconnue, programme Maison utilisé",forced:"Réglé manuellement ; le basculement automatique est en pause"},overview:{add:"Ajouter un thermostat",empty_title:"Aucun programme",empty_text:"Ajoutez un thermostat pour lui donner un programme hebdomadaire Maison et Absent.",no_thermostats:"Tous les thermostats ont déjà un programme.",choose:"Choisir un thermostat",now:"Maintenant",no_area:"Aucune pièce"},status:{until:"{temperature} jusqu'à {time}",off_until:"Éteint jusqu'à {time}",constant:"{temperature} toute la semaine",constant_off:"Éteint toute la semaine",disabled:"Le programme est désactivé",pending:"En attente du thermostat",error:"Impossible de mettre à jour le thermostat : {error}"},room:{back:"Retour",enabled:"Programme intelligent",add_block:"Ajouter une plage horaire",copy_day:"Copier le programme",paste_day:"Coller le programme",copied:"Programme copié. Collez-le sur un autre jour.",copy_rooms:"Copier le programme vers d'autres pièces",remove:"Supprimer le programme",remove_text:"Arrêter la programmation de {name} et supprimer ses programmes Maison et Absent ?",off:"Éteint",overridden:"Modifié manuellement",resume:"Reprendre le programme"},block:{edit:"Modifier la plage horaire",add:"Ajouter une plage horaire",start:"Début",end:"Fin",heating:"Chauffage",off:"Éteint",frost:"Hors-gel",delete:"Supprimer la plage horaire",lower:"Baisser la température",raise:"Augmenter la température",overlap:"Les plages qui se chevauchent sont raccourcies ou remplacées.",invalid:"La fin doit être au moins 15 minutes après le début."},copy:{title:"Copier le programme",text:"Remplace les programmes Maison et Absent des pièces choisies par ceux de {name}.",nothing:"Il n'y a pas d'autres thermostats."},common:{cancel:"Annuler",save:"Enregistrer",add:"Ajouter",copy:"Copier",remove:"Supprimer",close:"Fermer"},error:{save:"Échec de l'enregistrement : {error}",resume:"Impossible de reprendre le programme : {error}"}},es:{title:"Smart Heating Schedule",loading:"Cargando…",not_loaded:"Smart Heating Schedule no está configurado. Añade la integración en Ajustes → Dispositivos y servicios.",read_only:"Solo los administradores pueden cambiar los horarios.",presence:{label:"Presencia",auto:"Auto",home:"En casa",away:"Fuera",detected_home:"Auto: hay alguien en casa",detected_away:"Auto: no hay nadie en casa",detected_unknown:"Auto: presencia desconocida, se usa el horario En casa",forced:"Ajustado manualmente; el cambio automático está en pausa"},overview:{add:"Añadir termostato",empty_title:"Aún no hay horarios",empty_text:"Añade un termostato para darle un horario semanal En casa y Fuera.",no_thermostats:"Todos los termostatos ya tienen un horario.",choose:"Elige un termostato",now:"Ahora",no_area:"Sin habitación"},status:{until:"{temperature} hasta las {time}",off_until:"Apagado hasta las {time}",constant:"{temperature} toda la semana",constant_off:"Apagado toda la semana",disabled:"El horario está desactivado",pending:"Esperando al termostato",error:"No se pudo actualizar el termostato: {error}"},room:{back:"Atrás",enabled:"Horario inteligente",add_block:"Añadir franja horaria",copy_day:"Copiar horario",paste_day:"Pegar horario",copied:"Horario copiado. Pégalo en otro día.",copy_rooms:"Copiar horario a otras habitaciones",remove:"Eliminar horario",remove_text:"¿Dejar de programar {name} y eliminar sus horarios En casa y Fuera?",off:"Apagado",overridden:"Cambiado manualmente",resume:"Reanudar horario"},block:{edit:"Editar franja horaria",add:"Añadir franja horaria",start:"Inicio",end:"Fin",heating:"Calefacción",off:"Apagado",frost:"Protección antiheladas",delete:"Eliminar franja horaria",lower:"Bajar temperatura",raise:"Subir temperatura",overlap:"Las franjas que se solapan se acortan o se sustituyen.",invalid:"El fin debe ser al menos 15 minutos después del inicio."},copy:{title:"Copiar horario",text:"Sustituye los horarios En casa y Fuera de las habitaciones elegidas por los de {name}.",nothing:"No hay otros termostatos."},common:{cancel:"Cancelar",save:"Guardar",add:"Añadir",copy:"Copiar",remove:"Eliminar",close:"Cerrar"},error:{save:"No se pudo guardar: {error}",resume:"No se pudo reanudar el horario: {error}"}},it:{title:"Smart Heating Schedule",loading:"Caricamento…",not_loaded:"Smart Heating Schedule non è configurato. Aggiungi l'integrazione in Impostazioni → Dispositivi e servizi.",read_only:"Solo gli amministratori possono modificare le programmazioni.",presence:{label:"Presenza",auto:"Auto",home:"A casa",away:"Fuori casa",detected_home:"Auto: c'è qualcuno in casa",detected_away:"Auto: non c'è nessuno in casa",detected_unknown:"Auto: presenza sconosciuta, si usa la programmazione A casa",forced:"Impostato manualmente; il cambio automatico è in pausa"},overview:{add:"Aggiungi termostato",empty_title:"Ancora nessuna programmazione",empty_text:"Aggiungi un termostato per assegnargli una programmazione settimanale A casa e Fuori casa.",no_thermostats:"Tutti i termostati hanno già una programmazione.",choose:"Scegli un termostato",now:"Ora",no_area:"Nessuna stanza"},status:{until:"{temperature} fino alle {time}",off_until:"Spento fino alle {time}",constant:"{temperature} tutta la settimana",constant_off:"Spento tutta la settimana",disabled:"La programmazione è disattivata",pending:"In attesa del termostato",error:"Impossibile aggiornare il termostato: {error}"},room:{back:"Indietro",enabled:"Programmazione intelligente",add_block:"Aggiungi fascia oraria",copy_day:"Copia programmazione",paste_day:"Incolla programmazione",copied:"Programmazione copiata. Incollala in un altro giorno.",copy_rooms:"Copia la programmazione in altre stanze",remove:"Rimuovi programmazione",remove_text:"Smettere di programmare {name} ed eliminare le programmazioni A casa e Fuori casa?",off:"Spento",overridden:"Modificato manualmente",resume:"Riprendi programmazione"},block:{edit:"Modifica fascia oraria",add:"Aggiungi fascia oraria",start:"Inizio",end:"Fine",heating:"Riscaldamento",off:"Spento",frost:"Protezione antigelo",delete:"Elimina fascia oraria",lower:"Abbassa temperatura",raise:"Alza temperatura",overlap:"Le fasce sovrapposte vengono accorciate o sostituite.",invalid:"La fine deve essere almeno 15 minuti dopo l'inizio."},copy:{title:"Copia programmazione",text:"Sostituisce le programmazioni A casa e Fuori casa delle stanze scelte con quelle di {name}.",nothing:"Non ci sono altri termostati."},common:{cancel:"Annulla",save:"Salva",add:"Aggiungi",copy:"Copia",remove:"Rimuovi",close:"Chiudi"},error:{save:"Salvataggio non riuscito: {error}",resume:"Impossibile riprendere la programmazione: {error}"}},pl:{title:"Smart Heating Schedule",loading:"Ładowanie…",not_loaded:"Smart Heating Schedule nie jest skonfigurowany. Dodaj integrację w Ustawienia → Urządzenia oraz usługi.",read_only:"Tylko administratorzy mogą zmieniać harmonogramy.",presence:{label:"Obecność",auto:"Auto",home:"W domu",away:"Poza domem",detected_home:"Auto: ktoś jest w domu",detected_away:"Auto: nikogo nie ma w domu",detected_unknown:"Auto: obecność nieznana, używany jest harmonogram W domu",forced:"Ustawione ręcznie; automatyczne przełączanie jest wstrzymane"},overview:{add:"Dodaj termostat",empty_title:"Brak harmonogramów",empty_text:"Dodaj termostat, aby nadać mu tygodniowy harmonogram W domu i Poza domem.",no_thermostats:"Wszystkie termostaty mają już harmonogram.",choose:"Wybierz termostat",now:"Teraz",no_area:"Brak pomieszczenia"},status:{until:"{temperature} do {time}",off_until:"Wyłączone do {time}",constant:"{temperature} przez cały tydzień",constant_off:"Wyłączone przez cały tydzień",disabled:"Harmonogram jest wyłączony",pending:"Oczekiwanie na termostat",error:"Nie udało się zaktualizować termostatu: {error}"},room:{back:"Wstecz",enabled:"Inteligentny harmonogram",add_block:"Dodaj przedział czasu",copy_day:"Kopiuj harmonogram",paste_day:"Wklej harmonogram",copied:"Harmonogram skopiowany. Wklej go w innym dniu.",copy_rooms:"Kopiuj harmonogram do innych pomieszczeń",remove:"Usuń harmonogram",remove_text:"Przestać planować dla {name} i usunąć harmonogramy W domu i Poza domem?",off:"Wyłączone",overridden:"Zmienione ręcznie",resume:"Wznów harmonogram"},block:{edit:"Edytuj przedział czasu",add:"Dodaj przedział czasu",start:"Początek",end:"Koniec",heating:"Ogrzewanie",off:"Wyłączone",frost:"Ochrona przed zamarzaniem",delete:"Usuń przedział czasu",lower:"Obniż temperaturę",raise:"Podnieś temperaturę",overlap:"Nakładające się przedziały są skracane lub zastępowane.",invalid:"Koniec musi być co najmniej 15 minut po początku."},copy:{title:"Kopiuj harmonogram",text:"Zastępuje harmonogramy W domu i Poza domem wybranych pomieszczeń harmonogramami z {name}.",nothing:"Nie ma innych termostatów."},common:{cancel:"Anuluj",save:"Zapisz",add:"Dodaj",copy:"Kopiuj",remove:"Usuń",close:"Zamknij"},error:{save:"Nie udało się zapisać: {error}",resume:"Nie udało się wznowić harmonogramu: {error}"}},pt:{title:"Smart Heating Schedule",loading:"Carregando…",not_loaded:"O Smart Heating Schedule não está configurado. Adicione a integração em Configurações → Dispositivos e serviços.",read_only:"Somente administradores podem alterar as programações.",presence:{label:"Presença",auto:"Automático",home:"Em casa",away:"Fora",detected_home:"Automático: há alguém em casa",detected_away:"Automático: não há ninguém em casa",detected_unknown:"Automático: presença desconhecida, usando a programação Em casa",forced:"Definido manualmente; a troca automática está pausada"},overview:{add:"Adicionar termostato",empty_title:"Nenhuma programação ainda",empty_text:"Adicione um termostato para dar a ele uma programação semanal Em casa e Fora.",no_thermostats:"Todos os termostatos já têm uma programação.",choose:"Escolha um termostato",now:"Agora",no_area:"Sem cômodo"},status:{until:"{temperature} até {time}",off_until:"Desligado até {time}",constant:"{temperature} a semana toda",constant_off:"Desligado a semana toda",disabled:"A programação está desativada",pending:"Aguardando o termostato",error:"Não foi possível atualizar o termostato: {error}"},room:{back:"Voltar",enabled:"Programação inteligente",add_block:"Adicionar faixa de horário",copy_day:"Copiar programação",paste_day:"Colar programação",copied:"Programação copiada. Cole-a em outro dia.",copy_rooms:"Copiar programação para outros cômodos",remove:"Remover programação",remove_text:"Parar de programar {name} e excluir as programações Em casa e Fora?",off:"Desligado",overridden:"Alterado manualmente",resume:"Retomar programação"},block:{edit:"Editar faixa de horário",add:"Adicionar faixa de horário",start:"Início",end:"Fim",heating:"Aquecimento",off:"Desligado",frost:"Proteção contra geada",delete:"Excluir faixa de horário",lower:"Diminuir temperatura",raise:"Aumentar temperatura",overlap:"Faixas sobrepostas são encurtadas ou substituídas.",invalid:"O fim deve ser pelo menos 15 minutos após o início."},copy:{title:"Copiar programação",text:"Substitui as programações Em casa e Fora dos cômodos escolhidos pelas de {name}.",nothing:"Não há outros termostatos."},common:{cancel:"Cancelar",save:"Salvar",add:"Adicionar",copy:"Copiar",remove:"Remover",close:"Fechar"},error:{save:"Não foi possível salvar: {error}",resume:"Não foi possível retomar a programação: {error}"}},ru:{title:"Smart Heating Schedule",loading:"Загрузка…",not_loaded:"Smart Heating Schedule не настроен. Добавьте интеграцию в разделе Настройки → Устройства и службы.",read_only:"Изменять расписания могут только администраторы.",presence:{label:"Присутствие",auto:"Авто",home:"Дома",away:"Не дома",detected_home:"Авто: кто-то дома",detected_away:"Авто: дома никого нет",detected_unknown:"Авто: присутствие неизвестно, используется расписание «Дома»",forced:"Задано вручную; автоматическое переключение приостановлено"},overview:{add:"Добавить термостат",empty_title:"Расписаний пока нет",empty_text:"Добавьте термостат, чтобы задать ему недельное расписание «Дома» и «Не дома».",no_thermostats:"У всех термостатов уже есть расписание.",choose:"Выберите термостат",now:"Сейчас",no_area:"Без помещения"},status:{until:"{temperature} до {time}",off_until:"Выключено до {time}",constant:"{temperature} всю неделю",constant_off:"Выключено всю неделю",disabled:"Расписание выключено",pending:"Ожидание термостата",error:"Не удалось обновить термостат: {error}"},room:{back:"Назад",enabled:"Умное расписание",add_block:"Добавить интервал",copy_day:"Копировать расписание",paste_day:"Вставить расписание",copied:"Расписание скопировано. Вставьте его в другой день.",copy_rooms:"Копировать расписание в другие помещения",remove:"Удалить расписание",remove_text:"Прекратить управление {name} и удалить расписания «Дома» и «Не дома»?",off:"Выкл.",overridden:"Изменено вручную",resume:"Возобновить расписание"},block:{edit:"Изменить интервал",add:"Добавить интервал",start:"Начало",end:"Конец",heating:"Отопление",off:"Выкл.",frost:"Защита от замерзания",delete:"Удалить интервал",lower:"Понизить температуру",raise:"Повысить температуру",overlap:"Пересекающиеся интервалы укорачиваются или заменяются.",invalid:"Конец должен быть не менее чем через 15 минут после начала."},copy:{title:"Копировать расписание",text:"Заменяет расписания «Дома» и «Не дома» выбранных помещений расписаниями {name}.",nothing:"Других термостатов нет."},common:{cancel:"Отмена",save:"Сохранить",add:"Добавить",copy:"Копировать",remove:"Удалить",close:"Закрыть"},error:{save:"Не удалось сохранить: {error}",resume:"Не удалось возобновить расписание: {error}"}},tr:{title:"Smart Heating Schedule",loading:"Yükleniyor…",not_loaded:"Smart Heating Schedule kurulmamış. Entegrasyonu Ayarlar → Cihazlar ve hizmetler bölümünden ekleyin.",read_only:"Programları yalnızca yöneticiler değiştirebilir.",presence:{label:"Ev durumu",auto:"Otomatik",home:"Evde",away:"Dışarıda",detected_home:"Otomatik: evde biri var",detected_away:"Otomatik: evde kimse yok",detected_unknown:"Otomatik: ev durumu bilinmiyor, Evde programı kullanılıyor",forced:"Elle ayarlandı; otomatik geçiş duraklatıldı"},overview:{add:"Termostat ekle",empty_title:"Henüz program yok",empty_text:"Haftalık bir Evde ve Dışarıda programı vermek için bir termostat ekleyin.",no_thermostats:"Tüm termostatların zaten bir programı var.",choose:"Bir termostat seçin",now:"Şimdi",no_area:"Oda yok"},status:{until:"{time} saatine kadar {temperature}",off_until:"{time} saatine kadar kapalı",constant:"Tüm hafta {temperature}",constant_off:"Tüm hafta kapalı",disabled:"Program kapalı",pending:"Termostat bekleniyor",error:"Termostat güncellenemedi: {error}"},room:{back:"Geri",enabled:"Akıllı program",add_block:"Zaman dilimi ekle",copy_day:"Programı kopyala",paste_day:"Programı yapıştır",copied:"Program kopyalandı. Başka bir güne yapıştırın.",copy_rooms:"Programı diğer odalara kopyala",remove:"Programı kaldır",remove_text:"{name} için programlama durdurulsun ve Evde ile Dışarıda programları silinsin mi?",off:"Kapalı",overridden:"Elle değiştirildi",resume:"Programa devam et"},block:{edit:"Zaman dilimini düzenle",add:"Zaman dilimi ekle",start:"Başlangıç",end:"Bitiş",heating:"Isıtma",off:"Kapalı",frost:"Donma koruması",delete:"Zaman dilimini sil",lower:"Sıcaklığı düşür",raise:"Sıcaklığı artır",overlap:"Çakışan zaman dilimleri kısaltılır veya değiştirilir.",invalid:"Bitiş, başlangıçtan en az 15 dakika sonra olmalıdır."},copy:{title:"Programı kopyala",text:"Seçilen odaların Evde ve Dışarıda programlarını {name} programlarıyla değiştirir.",nothing:"Başka termostat yok."},common:{cancel:"İptal",save:"Kaydet",add:"Ekle",copy:"Kopyala",remove:"Kaldır",close:"Kapat"},error:{save:"Kaydedilemedi: {error}",resume:"Programa devam edilemedi: {error}"}},"zh-Hans":{title:"Smart Heating Schedule",loading:"加载中…",not_loaded:"Smart Heating Schedule 尚未设置。请在 设置 → 设备与服务 中添加此集成。",read_only:"只有管理员可以更改日程。",presence:{label:"在家状态",auto:"自动",home:"在家",away:"离家",detected_home:"自动：有人在家",detected_away:"自动：无人在家",detected_unknown:"自动：在家状态未知，使用在家日程",forced:"已手动设置；自动切换已暂停"},overview:{add:"添加温控器",empty_title:"还没有日程",empty_text:"添加温控器，为其设置每周的在家和离家日程。",no_thermostats:"所有温控器都已有日程。",choose:"选择温控器",now:"现在",no_area:"无房间"},status:{until:"{temperature}，直到 {time}",off_until:"关闭，直到 {time}",constant:"全周 {temperature}",constant_off:"全周关闭",disabled:"日程已关闭",pending:"正在等待温控器",error:"无法更新温控器：{error}"},room:{back:"返回",enabled:"智能日程",add_block:"添加时间段",copy_day:"复制日程",paste_day:"粘贴日程",copied:"日程已复制。可粘贴到其他日期。",copy_rooms:"将日程复制到其他房间",remove:"删除日程",remove_text:"停止为 {name} 安排日程，并删除其在家和离家日程？",off:"关闭",overridden:"已手动更改",resume:"恢复日程"},block:{edit:"编辑时间段",add:"添加时间段",start:"开始",end:"结束",heating:"加热",off:"关闭",frost:"防冻保护",delete:"删除时间段",lower:"降低温度",raise:"提高温度",overlap:"重叠的时间段会被缩短或替换。",invalid:"结束时间必须比开始时间至少晚 15 分钟。"},copy:{title:"复制日程",text:"用 {name} 的日程替换所选房间的在家和离家日程。",nothing:"没有其他温控器。"},common:{cancel:"取消",save:"保存",add:"添加",copy:"复制",remove:"删除",close:"关闭"},error:{save:"无法保存：{error}",resume:"无法恢复日程：{error}"}}},ke=(e,t)=>{let o=e;for(const e of t.split("."))o=o?.[e];return"string"==typeof o?o:void 0},Ae=e=>{const t=we[e]??we[e.split("-")[0]];return(e,o)=>{let a=ke(t,e)??ke($e,e)??e;for(const[e,t]of Object.entries(o??{}))a=a.replace(`{${e}}`,t);return a}},ze=r`
  :host {
    color: var(--primary-text-color);
  }
  ha-card {
    display: block;
  }
  ha-card:not(:defined) {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border-radius: var(--ha-card-border-radius, 12px);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
  }
  .text-button {
    background: none;
    border: none;
    border-radius: 8px;
    color: var(--primary-color);
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    padding: 8px 10px;
  }
  .text-button:hover:not([disabled]),
  .text-button:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    outline: none;
  }
  .text-button[disabled] {
    color: var(--disabled-text-color);
    cursor: default;
  }
  .text-button.danger {
    color: var(--error-color);
  }
  .text-button.danger:hover:not([disabled]) {
    background: color-mix(in srgb, var(--error-color) 10%, transparent);
  }
  .filled-button {
    background: var(--primary-color);
    border: none;
    border-radius: 20px;
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    padding: 10px 20px;
  }
  .filled-button[disabled] {
    background: var(--disabled-color, var(--disabled-text-color));
    cursor: default;
  }
  .filled-button.danger {
    background: var(--error-color);
  }
  ha-icon-button.primary {
    color: var(--primary-color);
  }
  .secondary {
    color: var(--secondary-text-color);
  }
  .error {
    color: var(--error-color);
  }
  .switch-fallback {
    accent-color: var(--primary-color);
    height: 20px;
    width: 36px;
  }
  .visually-hidden {
    clip: rect(0 0 0 0);
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }
`,Se=(e,t,o,a=!1)=>customElements.get("ha-switch")?I`<ha-switch
        .checked=${e}
        .disabled=${a}
        aria-label=${o}
        @change=${e=>t(e.target.checked)}
      ></ha-switch>`:I`<input
        type="checkbox"
        role="switch"
        class="switch-fallback"
        .checked=${e}
        ?disabled=${a}
        aria-label=${o}
        @change=${e=>t(e.target.checked)}
      />`,Ce=r`
  .toolbar {
    align-items: center;
    background: var(--app-header-background-color);
    border-bottom: var(--app-header-border-bottom, none);
    box-sizing: border-box;
    color: var(--app-header-text-color, #fff);
    display: flex;
    font-size: 20px;
    gap: 4px;
    height: var(--header-height, 56px);
    padding: 0 12px;
    position: sticky;
    top: 0;
    z-index: 4;
  }
  .toolbar .title {
    flex: 1;
    margin-inline-start: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .toolbar ha-icon-button {
    color: inherit;
  }
`;var Ee="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",He="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",Oe="M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",Pe="M14.12,10H19V8.2H15.38L13.38,4.87C13.08,4.37 12.54,4.03 11.92,4.03C11.74,4.03 11.58,4.06 11.42,4.11L6,5.8V11H7.8V7.33L9.91,6.67L6,22H7.8L10.67,13.89L13,17V22H14.8V15.59L12.31,11.05L13.04,8.18M14,3.8C15,3.8 15.8,3 15.8,2C15.8,1 15,0.2 14,0.2C13,0.2 12.2,1 12.2,2C12.2,3 13,3.8 14,3.8Z";let Le=class extends ne{constructor(){super(...arguments),this.entityId="",this._busy=!1}async _resume(){this._busy=!0;try{await(e=this.hass,t=this.entityId,e.callWS({type:`${ue}/room/resume`,entity_id:t}))}catch(e){be(this,this.localize("error.resume",{error:e?.message??String(e)}))}finally{this._busy=!1}var e,t}render(){return I`
      <span class="secondary">${this.localize("room.overridden")}</span>
      <button class="text-button" ?disabled=${this._busy} @click=${this._resume}>
        <ha-svg-icon .path=${"M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z"}></ha-svg-icon>${this.localize("room.resume")}
      </button>
    `}static{this.styles=[ze,r`
      :host {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 4px 8px;
        justify-content: space-between;
      }
      .secondary {
        font-size: 14px;
      }
      .text-button {
        align-items: center;
        display: inline-flex;
        gap: 6px;
        margin-inline-end: -10px;
      }
      ha-svg-icon {
        --mdc-icon-size: 18px;
      }
    `]}};e([he({attribute:!1})],Le.prototype,"hass",void 0),e([he()],Le.prototype,"entityId",void 0),e([he({attribute:!1})],Le.prototype,"localize",void 0),e([pe()],Le.prototype,"_busy",void 0),Le=e([xe("shs-resume-row")],Le);const Me="°F",je={"°C":{min:5,max:30,step:.5},"°F":{min:41,max:86,step:1}},Te=e=>je[e]??je["°C"],Ve=(e,t)=>{const o=Te(t),a=e?.attributes??{};return{min:Number(a.min_temp??o.min),max:Number(a.max_temp??o.max),step:Number(a.target_temp_step||o.step)}},De=e=>e===Me?68:20,Ne=(e,t)=>{const o=Math.round(e/t.step)*t.step;return Math.min(t.max,Math.max(t.min,Number(o.toFixed(2))))},Re=(e,t,o=Te(t).step,a=!1,i)=>{const s=((e,t)=>t<1?t<.1?2:1:e===Me?0:1)(t,o);return`${new Intl.NumberFormat(i,{minimumFractionDigits:a?0:s,maximumFractionDigits:s}).format(e)}°`},Ue=[[12,[245,222,140]],[16,[248,206,84]],[19,[250,194,43]],[21,[248,168,48]],[23,[244,128,52]],[25,[236,90,50]],[28,[222,56,46]]],Ze="#8a9bab",Ie=([e,t,o])=>`#${[e,t,o].map(e=>Math.round(e).toString(16).padStart(2,"0")).join("")}`,Be=(e,t)=>{if(null===e)return`var(--shs-color-off, ${Ze})`;const o=((e,t)=>t===Me?5*(e-32)/9:e)(e,t);return`var(--shs-color-${Math.round(o)}, ${(e=>{if(null===e)return Ze;if(e<=Ue[0][0])return Ie(Ue[0][1]);for(let t=1;t<Ue.length;t++){const[o,a]=Ue[t];if(e<=o){const[i,s]=Ue[t-1],r=(e-i)/(o-i);return Ie(s.map((e,t)=>e+(a[t]-e)*r))}}return Ie(Ue[Ue.length-1][1])})(o)})`},We=15,Fe=1440,qe=["mon","tue","wed","thu","fri","sat","sun"],Ke=e=>{const[t,o]=e.split(":").map(Number);return 60*t+o},Ge=e=>e.map((t,o)=>({start:Ke(t.start),end:o+1<e.length?Ke(e[o+1].start):Fe,temperature:t.temperature})),Je=e=>e.filter(e=>e.end>e.start).sort((e,t)=>e.start-t.start).map(e=>{return{start:(t=e.start,`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`),temperature:e.temperature};var t}),Xe=(e,t,o,a)=>{const i=[];for(const a of e)a.end<=t||a.start>=o?i.push(a):(a.start<t&&i.push({...a,end:t}),a.end>o&&i.push({...a,start:o}));return i.push({start:t,end:o,temperature:a}),i},Ye=(e,t)=>e>=0&&t<=Fe&&t-e>=We&&e%We===0&&t%We===0,Qe=(e,t)=>{if(e.length<=1)return e;const o=Ge(e),a=o[t];return t>0?o[t-1]={...o[t-1],end:a.end}:o[1]={...o[1],start:0},Je(o.filter((e,o)=>o!==t))},et=(e,t,o)=>({...e,days:{...e.days,[t]:o}}),tt=e=>{const t=e.locale.time_format;if("12"===t)return!0;if("24"===t)return!1;const o="system"===t?void 0:e.locale.language;return new Intl.DateTimeFormat(o,{hour:"numeric"}).resolvedOptions().hour12??!1},ot=(e,t,o=!1)=>{if(!t&&o&&e===Fe)return"24:00";const a=e%Fe,i=Math.floor(a/60),s=String(a%60).padStart(2,"0");if(t){return`${i%12||12}:${s} ${i<12?"AM":"PM"}`}return`${o?i:String(i).padStart(2,"0")}:${s}`},at={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6},it=(e,t)=>{let o;try{o=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(e)}catch{return it(e)}const a=e=>o.find(t=>t.type===e)?.value??"0";return{weekday:at[a("weekday")]??0,minutes:60*Number(a("hour"))+Number(a("minute"))}},st=new Date(2024,0,1);let rt=class extends ne{constructor(){super(...arguments),this.blocks=[],this.unit="°C",this.step=.5,this.language="en",this.offLabel="Off",this.h12=!1,this.now=null}render(){const e=Ge(this.blocks);return I`
      <div class="bar">
        ${e.map(e=>{const t=null===e.temperature?this.offLabel:Re(e.temperature,this.unit,this.step,!1,this.language);return I`<div
            class="block ${null===e.temperature?"off":""}"
            style="flex-grow:${e.end-e.start};--block-color:${Be(e.temperature,this.unit)}"
          >
            <span>${t}</span>
          </div>`})}
        ${null===this.now?W:I`<div class="now" style="left:${this.now/Fe*100}%"></div>`}
      </div>
      <div class="ticks" aria-hidden="true">
        ${[0,480,960,Fe].map(e=>I`<span>${ot(e,this.h12,!0)}</span>`)}
      </div>
    `}static{this.styles=r`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      gap: 3px;
      height: var(--shs-bar-height, 28px);
      position: relative;
    }
    .block {
      align-items: center;
      container-type: inline-size;
      background: color-mix(
        in srgb,
        var(--block-color) var(--shs-block-mix, 45%),
        var(--ha-card-background, var(--card-background-color, #fff))
      );
      color: color-mix(in srgb, var(--block-color) var(--shs-text-mix, 100%), black);
      display: flex;
      flex-basis: 0;
      font-size: var(--shs-bar-font-size, 14px);
      font-weight: 700;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
    }
    .block span {
      overflow: hidden;
      padding: 0 8px;
      text-overflow: clip;
    }
    /* Hide labels that do not fit instead of cutting them off. */
    @container (max-width: 46px) {
      .block span {
        visibility: hidden;
      }
    }
    .block:first-of-type {
      border-radius: 4px 0 0 4px;
    }
    .block:last-of-type {
      border-radius: 0 4px 4px 0;
    }
    .block:only-of-type {
      border-radius: 4px;
    }
    .block.off {
      font-weight: 500;
    }
    .now {
      background: var(--primary-text-color);
      border-radius: 1px;
      bottom: -3px;
      position: absolute;
      top: -3px;
      transform: translateX(-1px);
      width: 2px;
    }
    .ticks {
      color: var(--secondary-text-color);
      display: flex;
      font-size: 13px;
      justify-content: space-between;
      margin-top: 8px;
    }
  `}};e([he({attribute:!1})],rt.prototype,"blocks",void 0),e([he()],rt.prototype,"unit",void 0),e([he({type:Number})],rt.prototype,"step",void 0),e([he()],rt.prototype,"language",void 0),e([he({attribute:!1})],rt.prototype,"offLabel",void 0),e([he({type:Boolean})],rt.prototype,"h12",void 0),e([he({attribute:!1})],rt.prototype,"now",void 0),rt=e([xe("shs-schedule-bar")],rt);let nt=class extends ne{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.small=!1,this.disabled=!1}_select(e){e===this.value||this.disabled||ge(this,"value-changed",{value:e})}_keydown(e){const t=this.options.findIndex(e=>e.value===this.value),o="ArrowRight"===e.key?1:"ArrowLeft"===e.key?-1:0;if(!o)return;e.preventDefault();const a=this.options[(t+o+this.options.length)%this.options.length];this._select(a.value),this.updateComplete.then(()=>this.renderRoot.querySelector("button[aria-checked=true]")?.focus())}render(){return I`<div class="wrapper" role="radiogroup" aria-label=${this.label} @keydown=${this._keydown}>
      ${this.options.map(e=>{const t=e.value===this.value;return I`<button
          role="radio"
          aria-checked=${t}
          tabindex=${t?0:-1}
          class=${t?"active":""}
          ?disabled=${this.disabled&&!t}
          @click=${()=>this._select(e.value)}
        >
          <span class="inner">
            ${e.icon?I`<ha-svg-icon .path=${e.icon}></ha-svg-icon>`:W}
            <span class="label">${e.label}</span>
          </span>
        </button>`})}
    </div>`}static{this.styles=r`
    :host {
      display: block;
    }
    .wrapper {
      background: var(
        --shs-segment-background,
        color-mix(in srgb, var(--primary-text-color) 10%, var(--card-background-color, #fff))
      );
      border-radius: 999px;
      display: flex;
      padding: 3px;
    }
    button {
      background: none;
      border: none;
      border-radius: 999px;
      color: var(--secondary-text-color);
      container-type: inline-size;
      cursor: pointer;
      display: flex;
      flex: 1;
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      justify-content: center;
      min-width: 0;
      padding: 9px 12px;
      transition: background-color 0.2s, color 0.2s;
    }
    :host([small]) button {
      font-size: 14px;
      padding: 6px 8px;
    }
    .inner {
      align-items: center;
      display: flex;
      gap: 8px;
      justify-content: center;
      max-width: 100%;
      min-width: 0;
    }
    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Too narrow for icon and label side by side (phones, long words in some
       languages): put the icon above the label so the label gets the width. */
    @container (max-width: 120px) {
      .inner {
        flex-direction: column;
        gap: 2px;
        width: 100%;
      }
      .label {
        font-size: 13px;
        max-width: 100%;
      }
    }
    button.active {
      background: var(
        --shs-segment-active-background,
        color-mix(in srgb, var(--primary-text-color) 24%, var(--card-background-color, #fff))
      );
      color: var(--primary-text-color);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    button[disabled] {
      cursor: default;
    }
    ha-svg-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }
  `}};e([he({attribute:!1})],nt.prototype,"options",void 0),e([he()],nt.prototype,"value",void 0),e([he()],nt.prototype,"label",void 0),e([he({type:Boolean,reflect:!0})],nt.prototype,"small",void 0),e([he({type:Boolean})],nt.prototype,"disabled",void 0),nt=e([xe("shs-segment-control")],nt);let lt=class extends ne{constructor(){super(...arguments),this.heading="",this.open=!1,this._previousFocus=null,this._keydown=e=>{"Escape"===e.key&&this.open&&(e.stopPropagation(),this._close())}}_close(){ge(this,"closed")}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._keydown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._keydown)}updated(e){e.has("open")&&(this.open?(this._previousFocus=document.activeElement,this.renderRoot.querySelector(".surface")?.focus()):this._previousFocus instanceof HTMLElement&&this._previousFocus.focus())}render(){return this.open?I`
      <div class="scrim" @click=${this._close}></div>
      <div class="surface" role="dialog" aria-modal="true" aria-labelledby="heading" tabindex="-1">
        <h2 id="heading">${this.heading}</h2>
        <div class="content"><slot></slot></div>
        <div class="actions">
          <slot name="secondary"></slot>
          <span class="spacer"></span>
          <slot name="actions"></slot>
        </div>
      </div>
    `:W}static{this.styles=r`
    :host {
      display: contents;
    }
    .scrim {
      background: var(--dialog-scrim-color, rgba(0, 0, 0, 0.4));
      inset: 0;
      position: fixed;
      z-index: 100;
    }
    .surface {
      background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
      border-radius: var(--ha-dialog-border-radius, 24px);
      box-shadow: var(--ha-dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.3));
      box-sizing: border-box;
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      left: 50%;
      max-height: calc(100% - 32px);
      max-width: 440px;
      outline: none;
      padding: 24px;
      position: fixed;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 32px);
      z-index: 101;
    }
    h2 {
      font-size: 22px;
      font-weight: 400;
      margin: 0 0 16px;
    }
    .content {
      /* Scroll edge to edge, so rows with a hover background that sticks out
         a little (lists) never cause a horizontal scrollbar. */
      margin: 0 -24px;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 24px;
    }
    .actions {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 24px;
    }
    .spacer {
      flex: 1;
    }
  `}};e([he()],lt.prototype,"heading",void 0),e([he({type:Boolean,reflect:!0})],lt.prototype,"open",void 0),lt=e([xe("shs-dialog")],lt);let dt=class extends ne{constructor(){super(...arguments),this.open=!1,this.heading="",this.description="",this.emptyText="",this.confirmLabel="",this.multiple=!1,this.entityIds=[],this._selected=new Set}willUpdate(e){e.has("open")&&this.open&&(this._selected=new Set)}_toggle(e,t){const o=new Set(this._selected);t?o.add(e):o.delete(e),this._selected=o}_pick(e){ge(this,"picked",{entityIds:e})}render(){const e=[...this.entityIds].sort((e,t)=>fe(this.hass,e).localeCompare(fe(this.hass,t)));return I`<shs-dialog .open=${this.open} .heading=${this.heading} @closed=${()=>ge(this,"closed")}>
      ${this.description?I`<p class="secondary">${this.description}</p>`:W}
      ${e.length?I`<ul>
            ${e.map(e=>{const t=_e(this.hass,e),o=I`<span class="name">${fe(this.hass,e)}</span>
                <span class="secondary">${t?`${t} · `:""}${e}</span>`;return I`<li>
                ${this.multiple?I`<label class="item">
                      <input
                        type="checkbox"
                        .checked=${this._selected.has(e)}
                        @change=${t=>this._toggle(e,t.target.checked)}
                      />
                      <span class="text">${o}</span>
                    </label>`:I`<button class="item" @click=${()=>this._pick([e])}>
                      <ha-svg-icon .path=${Oe}></ha-svg-icon>
                      <span class="text">${o}</span>
                    </button>`}
              </li>`})}
          </ul>`:I`<p class="secondary">${this.emptyText}</p>`}
      <button slot="actions" class="text-button" @click=${()=>ge(this,"closed")}>
        ${this.localize("common.cancel")}
      </button>
      ${this.multiple?I`<button
            slot="actions"
            class="filled-button"
            ?disabled=${!this._selected.size}
            @click=${()=>this._pick([...this._selected])}
          >
            ${this.confirmLabel}
          </button>`:W}
    </shs-dialog>`}static{this.styles=[ze,r`
      p {
        margin: 0 0 12px;
      }
      ul {
        list-style: none;
        margin: 0 -8px;
        padding: 0;
      }
      .item {
        align-items: center;
        background: none;
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        gap: 16px;
        padding: 10px 8px;
        text-align: start;
        width: 100%;
      }
      .item:hover,
      .item:focus-visible {
        background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
        outline: none;
      }
      input {
        accent-color: var(--primary-color);
        height: 18px;
        width: 18px;
      }
      ha-svg-icon {
        color: var(--state-climate-heat-color, var(--state-icon-color));
        flex-shrink: 0;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .text .secondary {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `]}};e([he({attribute:!1})],dt.prototype,"hass",void 0),e([he({type:Boolean})],dt.prototype,"open",void 0),e([he()],dt.prototype,"heading",void 0),e([he()],dt.prototype,"description",void 0),e([he()],dt.prototype,"emptyText",void 0),e([he()],dt.prototype,"confirmLabel",void 0),e([he({type:Boolean})],dt.prototype,"multiple",void 0),e([he({attribute:!1})],dt.prototype,"entityIds",void 0),e([he({attribute:!1})],dt.prototype,"localize",void 0),e([pe()],dt.prototype,"_selected",void 0),dt=e([xe("shs-entity-picker-dialog")],dt);const ct=(e,t,o)=>{const{status:a}=e;if(!e.enabled)return{text:t("status.disabled"),error:!1};if(a.last_error)return{text:t("status.error",{error:a.last_error}),error:!0};if(a.pending)return{text:t("status.pending"),error:!1};const i=null===a.temperature?null:Re(a.temperature,o.unit,o.step,!1,o.language);if(!a.end)return null===i?{text:t("status.constant_off"),error:!1}:{text:t("status.constant",{temperature:i}),error:!1};const s=(r=a.end,n=o.h12,l=o.timeZone,ot(it(new Date(r),l).minutes,n));var r,n,l;return null===i?{text:t("status.off_until",{time:s}),error:!1}:{text:t("status.until",{temperature:i,time:s}),error:!1}};let ht=class extends ne{constructor(){super(...arguments),this.prefix="",this.narrow=!1,this._addOpen=!1}get _readOnly(){return!this.hass.user?.is_admin}async _call(e){try{await e}catch(e){be(this,this.localize("error.save",{error:e?.message??String(e)}))}}async _add(e){this._addOpen=!1;try{await((e,t)=>e.callWS({type:`${ue}/room/add`,entity_id:t}))(this.hass,e),ye(`${this.prefix}/room/${e}`)}catch(e){be(this,this.localize("error.save",{error:e?.message??String(e)}))}}_presenceText(){const{presence:e}=this.state;return"auto"!==e.mode?this.localize("presence.forced"):null===e.detected_home?this.localize("presence.detected_unknown"):this.localize(e.detected_home?"presence.detected_home":"presence.detected_away")}render(){const e=this.narrow||"always_hidden"===this.hass.dockedSidebar,t=new Set(this.state.rooms.map(e=>e.entity_id)),o=Object.keys(this.hass.states).filter(e=>e.startsWith("climate.")&&!t.has(e));return I`
      <div class="toolbar">
        ${e?I`<ha-icon-button
              .path=${"M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"}
              .label=${"Menu"}
              @click=${()=>ge(this,"hass-toggle-menu")}
            ></ha-icon-button>`:W}
        <div class="title">${this.localize("title")}</div>
      </div>

      <div class="content">
        <ha-card class="presence">
          <div class="presence-header">
            <h2>${this.localize("presence.label")}</h2>
            <span class="secondary">${this._presenceText()}</span>
          </div>
          <shs-segment-control
            .label=${this.localize("presence.label")}
            .value=${this.state.presence.mode}
            .disabled=${this._readOnly}
            .options=${[{value:"auto",label:this.localize("presence.auto"),icon:"M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"},{value:"home",label:this.localize("presence.home"),icon:Ee},{value:"away",label:this.localize("presence.away"),icon:Pe}]}
            @value-changed=${e=>{return this._call((t=this.hass,o=e.detail.value,t.callWS({type:`${ue}/presence/set`,mode:o})));var t,o}}
          ></shs-segment-control>
        </ha-card>

        ${this.state.rooms.length?I`<div class="rooms">${this.state.rooms.map(e=>this._renderRoom(e))}</div>`:I`<ha-card class="empty">
              <ha-svg-icon .path=${Oe}></ha-svg-icon>
              <h2>${this.localize("overview.empty_title")}</h2>
              <p class="secondary">${this.localize("overview.empty_text")}</p>
            </ha-card>`}
        ${this._readOnly?I`<p class="secondary notice">${this.localize("read_only")}</p>`:I`<div class="add">
              <button class="filled-button" @click=${()=>this._addOpen=!0}>
                <ha-svg-icon .path=${He}></ha-svg-icon>${this.localize("overview.add")}
              </button>
            </div>`}
      </div>

      <shs-entity-picker-dialog
        .hass=${this.hass}
        .open=${this._addOpen}
        .heading=${this.localize("overview.choose")}
        .emptyText=${this.localize("overview.no_thermostats")}
        .entityIds=${o}
        .localize=${this.localize}
        @closed=${()=>this._addOpen=!1}
        @picked=${e=>this._add(e.detail.entityIds[0])}
      ></shs-entity-picker-dialog>
    `}_renderRoom(e){const t=this.hass.states[e.entity_id],o=this.state.unit,a=Ve(t,o),i=this.hass.locale.language,s=tt(this.hass),r=it(new Date,this.hass.config.time_zone),n=((e,t)=>e.days[qe[t]])(e[this.state.presence.profile],r.weekday),l=ct(e,this.localize,{unit:o,step:a.step,h12:s,language:i,timeZone:this.hass.config.time_zone}),d=t?.attributes.current_temperature,c=_e(this.hass,e.entity_id),h=()=>ye(`${this.prefix}/room/${e.entity_id}`);return I`<ha-card class="room ${e.enabled?"":"disabled"}">
      <div class="room-header">
        <button class="room-title" @click=${h}>
          <span class="name">${fe(this.hass,e.entity_id)}</span>
          <span class="secondary area">${c??this.localize("overview.no_area")}</span>
        </button>
        ${Se(e.enabled,t=>this._call(me(this.hass,e.entity_id,{enabled:t})),this.localize("room.enabled"),this._readOnly)}
      </div>
      <button class="room-body" @click=${h} aria-label=${fe(this.hass,e.entity_id)}>
        <div class="climate">
          ${"number"==typeof d?I`<span class="current">${Re(d,o,.1,!1,i)}</span>`:I`<span class="secondary">${"unavailable"===t?.state?t.state:"—"}</span>`}
        </div>
        <shs-schedule-bar
          .blocks=${n}
          .unit=${o}
          .step=${a.step}
          .language=${i}
          .offLabel=${this.localize("room.off")}
          .h12=${s}
          .now=${e.enabled?r.minutes:null}
        ></shs-schedule-bar>
        <div class="status ${l.error?"error":"secondary"}">${l.text}</div>
      </button>
      ${e.enabled&&e.status.overridden?I`<shs-resume-row
            .hass=${this.hass}
            .entityId=${e.entity_id}
            .localize=${this.localize}
          ></shs-resume-row>`:W}
    </ha-card>`}static{this.styles=[ze,Ce,r`
      :host {
        display: block;
      }
      .content {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 0 auto;
        max-width: 1200px;
        padding: 16px 16px 32px;
      }
      h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
      }
      .presence {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }
      .presence-header {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .presence shs-segment-control {
        max-width: 480px;
      }
      .rooms {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }
      .room {
        display: flex;
        flex-direction: column;
        padding: 12px 16px 16px;
      }
      .room.disabled shs-schedule-bar {
        opacity: 0.45;
      }
      .room-header {
        align-items: center;
        display: flex;
        gap: 8px;
        justify-content: space-between;
      }
      .room-title,
      .room-body {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0;
        text-align: start;
      }
      .room-title {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        padding: 4px 0;
      }
      .room-title:focus-visible,
      .room-body:focus-visible {
        border-radius: 4px;
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
      }
      .name {
        font-size: 18px;
        font-weight: 500;
      }
      .area {
        font-size: 14px;
      }
      .room-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .climate {
        align-items: baseline;
        display: flex;
        gap: 12px;
        margin-top: 4px;
      }
      .current {
        font-size: 32px;
        font-weight: 400;
      }
      .status {
        font-size: 14px;
      }
      shs-resume-row {
        border-top: 1px solid var(--divider-color);
        margin-top: 12px;
        padding-top: 4px;
      }
      .empty {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 32px 16px;
        text-align: center;
      }
      .empty ha-svg-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 48px;
      }
      .empty p {
        margin: 0;
      }
      .add {
        display: flex;
        justify-content: center;
      }
      .add .filled-button {
        align-items: center;
        display: inline-flex;
        gap: 8px;
      }
      .notice {
        margin: 0;
        text-align: center;
      }
    `]}};e([he({attribute:!1})],ht.prototype,"hass",void 0),e([he({attribute:!1})],ht.prototype,"state",void 0),e([he()],ht.prototype,"prefix",void 0),e([he({type:Boolean})],ht.prototype,"narrow",void 0),e([he({attribute:!1})],ht.prototype,"localize",void 0),e([pe()],ht.prototype,"_addOpen",void 0),ht=e([xe("shs-overview-view")],ht);let pt=class extends ne{constructor(){super(...arguments),this.heading="",this.blocks=[],this.unit="°C",this.step=.5,this.language="en",this.h12=!1,this.expanded=!1,this.readOnly=!1,this.canPaste=!1,this.now=null}render(){const e="day-"+this.heading.replace(/\W/g,"");return I`
      <ha-card>
        <button
          class="header"
          aria-expanded=${this.expanded}
          aria-controls="${e}-blocks"
          @click=${()=>ge(this,"toggle")}
        >
          <h2>${this.heading}</h2>
          <ha-svg-icon .path=${this.expanded?"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z":"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}></ha-svg-icon>
        </button>
        <shs-schedule-bar
          .blocks=${this.blocks}
          .unit=${this.unit}
          .step=${this.step}
          .language=${this.language}
          .offLabel=${this.localize("room.off")}
          .h12=${this.h12}
          .now=${this.now}
        ></shs-schedule-bar>
        ${this.expanded?this._renderBlocks(e):W}
        ${this.readOnly?W:this._renderActions()}
      </ha-card>
    `}_renderBlocks(e){const t=Ge(this.blocks);return I`<ul class="blocks" id="${e}-blocks">
      ${t.map((e,t)=>{const o=`${ot(e.start,this.h12)} - ${ot(e.end,this.h12)}`,a=null===e.temperature?this.localize("room.off"):Re(e.temperature,this.unit,this.step,!0,this.language);return I`<li>
          <button
            class="block"
            style="--block-color:${Be(e.temperature,this.unit)}"
            ?disabled=${this.readOnly}
            @click=${()=>ge(this,"edit-block",{index:t})}
          >
            <span class="details">
              <span class="times">${o}</span>
              <span class="temperature">${a}</span>
            </span>
            ${this.readOnly?W:I`<ha-svg-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-svg-icon>`}
          </button>
        </li>`})}
    </ul>`}_renderActions(){return I`<div class="actions">
      <ha-icon-button
        class="primary"
        .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
        .label=${this.localize("room.copy_day")}
        @click=${()=>ge(this,"copy-day")}
      ></ha-icon-button>
      <ha-icon-button
        class="primary"
        .path=${"M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z"}
        .label=${this.localize("room.paste_day")}
        ?disabled=${!this.canPaste}
        @click=${()=>ge(this,"paste-day")}
      ></ha-icon-button>
      <span class="spacer"></span>
      <button class="text-button" @click=${()=>ge(this,"add-block")}>
        ${this.localize("room.add_block")}
      </button>
    </div>`}static{this.styles=[ze,r`
      :host {
        display: block;
      }
      ha-card {
        padding: 4px 16px 8px;
      }
      .header {
        align-items: center;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        justify-content: space-between;
        padding: 12px 0;
        text-align: start;
        width: 100%;
      }
      .header:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 4px;
      }
      h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
      }
      .header ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .blocks {
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style: none;
        margin: 16px 0 0;
        padding: 0;
      }
      .block {
        align-items: center;
        background: color-mix(
          in srgb,
          var(--block-color) var(--shs-block-list-mix, 16%),
          var(--ha-card-background, var(--card-background-color, #fff))
        );
        border: none;
        border-inline-start: 4px solid var(--block-color);
        border-radius: 8px;
        color: inherit;
        cursor: pointer;
        display: flex;
        font: inherit;
        padding: 14px 12px 14px 16px;
        text-align: start;
        width: 100%;
      }
      .block[disabled] {
        cursor: default;
      }
      .block:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .details {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 4px;
      }
      .times {
        font-size: 17px;
        font-variant-numeric: tabular-nums;
        font-weight: 600;
      }
      .temperature {
        color: var(--secondary-text-color);
        font-size: 15px;
      }
      .block ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .actions {
        align-items: center;
        border-top: 1px solid var(--divider-color);
        display: flex;
        margin-top: 16px;
        padding-top: 4px;
      }
      .actions ha-icon-button {
        margin-inline-start: -8px;
        margin-inline-end: 8px;
      }
      .spacer {
        flex: 1;
      }
    `]}};e([he()],pt.prototype,"heading",void 0),e([he({attribute:!1})],pt.prototype,"blocks",void 0),e([he()],pt.prototype,"unit",void 0),e([he({type:Number})],pt.prototype,"step",void 0),e([he()],pt.prototype,"language",void 0),e([he({type:Boolean})],pt.prototype,"h12",void 0),e([he({type:Boolean,reflect:!0})],pt.prototype,"expanded",void 0),e([he({type:Boolean})],pt.prototype,"readOnly",void 0),e([he({type:Boolean})],pt.prototype,"canPaste",void 0),e([he({attribute:!1})],pt.prototype,"now",void 0),e([he({attribute:!1})],pt.prototype,"localize",void 0),pt=e([xe("shs-day-card")],pt);let ut=class extends ne{constructor(){super(...arguments),this.value=20,this.limits={min:5,max:30,step:.5},this.unit="°C",this.language="en",this.lowerLabel="Lower",this.raiseLabel="Raise"}_change(e){const t=Ne(this.value+e*this.limits.step,this.limits);t!==this.value&&ge(this,"value-changed",{value:t})}_keydown(e){const t={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1}[e.key];t&&(e.preventDefault(),this._change(t))}render(){const{min:e,max:t,step:o}=this.limits;return I`
      <ha-icon-button
        .path=${"M19,13H5V11H19V13Z"}
        .label=${this.lowerLabel}
        ?disabled=${this.value<=e}
        @click=${()=>this._change(-1)}
      ></ha-icon-button>
      <div
        class="value"
        role="spinbutton"
        tabindex="0"
        aria-valuemin=${e}
        aria-valuemax=${t}
        aria-valuenow=${this.value}
        aria-valuetext=${Re(this.value,this.unit,o,!1,this.language)}
        style="--block-color:${Be(this.value,this.unit)}"
        @keydown=${this._keydown}
      >
        ${Re(this.value,this.unit,o,!1,this.language)}
      </div>
      <ha-icon-button
        .path=${He}
        .label=${this.raiseLabel}
        ?disabled=${this.value>=t}
        @click=${()=>this._change(1)}
      ></ha-icon-button>
    `}static{this.styles=r`
    :host {
      align-items: center;
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    ha-icon-button {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      border-radius: 50%;
      --mdc-icon-button-size: 48px;
    }
    .value {
      border-radius: 8px;
      color: color-mix(in srgb, var(--block-color) var(--shs-text-mix, 100%), black);
      font-size: 48px;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
      min-width: 3.6em;
      outline: none;
      text-align: center;
    }
    .value:focus-visible {
      outline: 2px solid var(--primary-color);
    }
  `}};e([he({type:Number})],ut.prototype,"value",void 0),e([he({attribute:!1})],ut.prototype,"limits",void 0),e([he()],ut.prototype,"unit",void 0),e([he()],ut.prototype,"language",void 0),e([he()],ut.prototype,"lowerLabel",void 0),e([he()],ut.prototype,"raiseLabel",void 0),ut=e([xe("shs-temperature-stepper")],ut);let mt=class extends ne{constructor(){super(...arguments),this.open=!1,this.blocks=[],this.index=null,this.unit="°C",this.limits={min:5,max:30,step:.5},this.canTurnOff=!0,this.h12=!1,this.language="en",this._start=0,this._end=Fe,this._heating=!0,this._temperature=20}willUpdate(e){e.has("open")&&this.open&&this._reset()}_reset(){const e=Ge(this.blocks);if(null!==this.index){const t=e[this.index];return this._start=t.start,this._end=t.end,this._heating=null!==t.temperature,void(this._temperature=Ne(t.temperature??De(this.unit),this.limits))}const t=e.reduce((e,t)=>t.end-t.start>e.end-e.start?t:e),o=Math.min(120,t.end-t.start),a=t.start+(t.end-t.start)/2;this._start=Math.max(t.start,60*Math.floor((a-o/2)/60)),this._end=Math.min(Fe,this._start+o),this._heating=!0,this._temperature=Ne(De(this.unit),this.limits)}get _isFirst(){return 0===this.index}get _isLast(){return null!==this.index&&this.index===this.blocks.length-1}get _valid(){return this._end-this._start>=We}_save(){const e=this._heating?this._temperature:null,t=null===this.index?((e,t,o,a)=>{if(!Ye(t,o))throw new Error("invalid time range");return Je(Xe(Ge(e),t,o,a))})(this.blocks,this._start,this._end,e):((e,t,o,a,i)=>{const s=Ge(e),r=s.length-1,n=s[t];if(0===t&&(o=0),t===r&&(a=Fe),!Ye(o,a))throw new Error("invalid time range");t>0&&o>n.start&&(s[t-1]={...s[t-1],end:Math.min(o,n.end)}),t<r&&a<n.end&&(s[t+1]={...s[t+1],start:Math.max(a,n.start)});const l=s.filter((e,o)=>o!==t);return Je(Xe(l,o,a,i))})(this.blocks,this.index,this._start,this._end,e);ge(this,"save",{blocks:t})}_delete(){null!==this.index&&ge(this,"save",{blocks:Qe(this.blocks,this.index)})}_timeSelect(e,t,o,a,i,s){const r=[];for(let e=o;e<=a;e+=We)r.push(e);return I`<label class="field">
      <span>${e}</span>
      <select
        .value=${String(t)}
        ?disabled=${i}
        @change=${e=>s(Number(e.target.value))}
      >
        ${r.map(e=>I`<option value=${e} ?selected=${e===t}>
              ${ot(e,this.h12)}
            </option>`)}
      </select>
    </label>`}render(){const e=this.localize(this.canTurnOff?"block.off":"block.frost");return I`<shs-dialog
      .open=${this.open}
      .heading=${this.localize(null===this.index?"block.add":"block.edit")}
      @closed=${()=>ge(this,"closed")}
    >
      <div class="times">
        ${this._timeSelect(this.localize("block.start"),this._start,0,Fe-We,this._isFirst,e=>{this._start=e})}
        <span class="dash">–</span>
        ${this._timeSelect(this.localize("block.end"),this._end,We,Fe,this._isLast,e=>{this._end=e})}
      </div>
      ${this._valid?W:I`<p class="error">${this.localize("block.invalid")}</p>`}

      <div class="row">
        <span>${this.localize("block.heating")}</span>
        ${Se(this._heating,e=>this._heating=e,this.localize("block.heating"))}
      </div>

      <div class="temperature">
        ${this._heating?I`<shs-temperature-stepper
              .value=${this._temperature}
              .limits=${this.limits}
              .unit=${this.unit}
              .language=${this.language}
              .lowerLabel=${this.localize("block.lower")}
              .raiseLabel=${this.localize("block.raise")}
              @value-changed=${e=>this._temperature=e.detail.value}
            ></shs-temperature-stepper>`:I`<div class="off">${e}</div>`}
      </div>

      ${null===this.index?I`<p class="secondary hint">${this.localize("block.overlap")}</p>`:W}

      ${null!==this.index&&this.blocks.length>1?I`<button slot="secondary" class="text-button danger" @click=${this._delete}>
            ${this.localize("block.delete")}
          </button>`:W}
      <button slot="actions" class="text-button" @click=${()=>ge(this,"closed")}>
        ${this.localize("common.cancel")}
      </button>
      <button slot="actions" class="filled-button" ?disabled=${!this._valid} @click=${this._save}>
        ${this.localize(null===this.index?"common.add":"common.save")}
      </button>
    </shs-dialog>`}static{this.styles=[ze,r`
      .times {
        align-items: flex-end;
        display: flex;
        gap: 12px;
      }
      .dash {
        color: var(--secondary-text-color);
        padding-bottom: 12px;
      }
      .field {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 6px;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
      select {
        appearance: none;
        background: var(--input-fill-color, color-mix(in srgb, var(--primary-text-color) 6%, transparent));
        border: none;
        border-bottom: 1px solid var(--input-idle-line-color, var(--secondary-text-color));
        border-radius: 4px 4px 0 0;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 17px;
        font-variant-numeric: tabular-nums;
        padding: 12px;
      }
      select:focus {
        border-bottom: 2px solid var(--primary-color);
        outline: none;
      }
      select:disabled {
        color: var(--disabled-text-color);
      }
      option {
        background: var(--card-background-color);
      }
      .row {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
      }
      .temperature {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 88px;
        margin-top: 16px;
      }
      .off {
        color: var(--secondary-text-color);
        font-size: 32px;
        font-weight: 600;
      }
      .hint {
        font-size: 13px;
        margin: 16px 0 0;
      }
      .error {
        font-size: 13px;
        margin: 8px 0 0;
      }
    `]}};e([he({type:Boolean})],mt.prototype,"open",void 0),e([he({attribute:!1})],mt.prototype,"blocks",void 0),e([he({attribute:!1})],mt.prototype,"index",void 0),e([he()],mt.prototype,"unit",void 0),e([he({attribute:!1})],mt.prototype,"limits",void 0),e([he({type:Boolean})],mt.prototype,"canTurnOff",void 0),e([he({type:Boolean})],mt.prototype,"h12",void 0),e([he()],mt.prototype,"language",void 0),e([he({attribute:!1})],mt.prototype,"localize",void 0),e([pe()],mt.prototype,"_start",void 0),e([pe()],mt.prototype,"_end",void 0),e([pe()],mt.prototype,"_heating",void 0),e([pe()],mt.prototype,"_temperature",void 0),mt=e([xe("shs-block-dialog")],mt);let gt=null,yt=class extends ne{constructor(){super(...arguments),this.prefix="",this.narrow=!1,this._profile="home",this._expanded=new Set,this._optimistic={},this._canPaste=null!==gt,this._blockDialog=null,this._copyOpen=!1,this._removeOpen=!1,this._initialized=!1}willUpdate(e){e.has("room")&&(this._optimistic={},this._initialized||(this._initialized=!0,this._expanded=new Set([this._today])))}get _week(){return this._optimistic[this._profile]??this.room[this._profile]}get _readOnly(){return!this.hass.user?.is_admin}get _now(){return it(new Date,this.hass.config.time_zone)}get _today(){return qe[this._now.weekday]}_dayLabel(e){return((e,t,o="long")=>{const a=new Date(st);a.setDate(st.getDate()+t);const i=new Intl.DateTimeFormat(e,{weekday:o}).format(a);return i.charAt(0).toUpperCase()+i.slice(1)})(this.hass.locale.language,qe.indexOf(e))}async _save(e){const t=["home","away"].filter(t=>e[t]);this._optimistic={...this._optimistic,...Object.fromEntries(t.map(t=>[t,e[t]]))};try{await me(this.hass,this.room.entity_id,e)}catch(e){this._optimistic={},be(this,this.localize("error.save",{error:e?.message??String(e)}))}}_saveWeek(e){return this._save({[this._profile]:e})}_toggle(e){const t=new Set(this._expanded);t.has(e)?t.delete(e):t.add(e),this._expanded=t}_copyDay(e){gt=e.map(e=>({...e})),this._canPaste=!0,be(this,this.localize("room.copied"))}async _copyToRooms(e){this._copyOpen=!1;try{await((e,t,o)=>e.callWS({type:`${ue}/room/copy`,entity_id:t,targets:o}))(this.hass,this.room.entity_id,e)}catch(e){be(this,this.localize("error.save",{error:e?.message??String(e)}))}}async _remove(){this._removeOpen=!1;try{await(e=this.hass,t=this.room.entity_id,e.callWS({type:`${ue}/room/remove`,entity_id:t})),ye(this.prefix,!0)}catch(e){be(this,this.localize("error.save",{error:e?.message??String(e)}))}var e,t}render(){const e=this.hass.states[this.room.entity_id],t=this.state.unit,o=Ve(e,t),a=tt(this.hass),i=this.hass.locale.language,s=this._week,r=this._now,n=this._today,l=fe(this.hass,this.room.entity_id),d=ct(this.room,this.localize,{unit:t,step:o.step,h12:a,language:i,timeZone:this.hass.config.time_zone}),c=this._readOnly,h=this._blockDialog?s.days[this._blockDialog.day]:[];return I`
      <div class="toolbar">
        <ha-icon-button
          .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
          .label=${this.localize("room.back")}
          @click=${()=>ye(this.prefix)}
        ></ha-icon-button>
        <div class="title">${l}</div>
        ${c?W:I`<ha-icon-button
                .path=${"M12 22L16 18H13V12H11V18H8L12 22M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H8L6 19H5V8H19V19H18L16 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3Z"}
                .label=${this.localize("room.copy_rooms")}
                @click=${()=>this._copyOpen=!0}
              ></ha-icon-button>
              <ha-icon-button
                .path=${"M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"}
                .label=${this.localize("room.remove")}
                @click=${()=>this._removeOpen=!0}
              ></ha-icon-button>`}
      </div>

      <div class="content">
        <ha-card class="summary">
          <div class="summary-row">
            <div>
              <div class="summary-title">${this.localize("room.enabled")}</div>
              <div class="${d.error?"error":"secondary"}">${d.text}</div>
            </div>
            ${Se(this.room.enabled,e=>this._save({enabled:e}),this.localize("room.enabled"),c)}
          </div>
          ${this.room.enabled&&this.room.status.overridden?I`<shs-resume-row
                .hass=${this.hass}
                .entityId=${this.room.entity_id}
                .localize=${this.localize}
              ></shs-resume-row>`:W}
        </ha-card>
        ${c?I`<p class="secondary notice">${this.localize("read_only")}</p>`:W}

        <shs-segment-control
          .label=${this.localize("presence.label")}
          .value=${this._profile}
          .options=${[{value:"home",label:this.localize("presence.home"),icon:Ee},{value:"away",label:this.localize("presence.away"),icon:Pe}]}
          @value-changed=${e=>{this._profile=e.detail.value,this._expanded=new Set([this._today])}}
        ></shs-segment-control>

        ${(e=>[...qe.slice(e),...qe.slice(0,e)])((e=>{const t=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],o=e.locale.first_weekday;if(o&&t.includes(o))return t.indexOf(o);try{const t=new Intl.Locale(e.locale.language),o=t.getWeekInfo?.()??t.weekInfo;if(o)return(o.firstDay+6)%7}catch{}return 0})(this.hass)).map(e=>{const l=s.days[e];return I`<shs-day-card
            .heading=${this._dayLabel(e)}
            .blocks=${l}
            .unit=${t}
            .step=${o.step}
            .language=${i}
            .h12=${a}
            .expanded=${this._expanded.has(e)}
            .readOnly=${c}
            .canPaste=${this._canPaste}
            .now=${e===n&&this._profile===this.state.presence.profile?r.minutes:null}
            .localize=${this.localize}
            @toggle=${()=>this._toggle(e)}
            @edit-block=${t=>this._blockDialog={day:e,index:t.detail.index}}
            @add-block=${()=>this._blockDialog={day:e,index:null}}
            @copy-day=${()=>this._copyDay(l)}
            @paste-day=${()=>gt&&this._saveWeek(et(s,e,gt))}
          ></shs-day-card>`})}
      </div>

      <shs-block-dialog
        .open=${null!==this._blockDialog}
        .blocks=${h}
        .index=${this._blockDialog?.index??null}
        .unit=${t}
        .limits=${o}
        .canTurnOff=${(e=>!e||(e.attributes.hvac_modes??[]).includes("off"))(e)}
        .h12=${a}
        .language=${i}
        .localize=${this.localize}
        @closed=${()=>this._blockDialog=null}
        @save=${e=>{const t=this._blockDialog.day;this._blockDialog=null,this._saveWeek(et(s,t,e.detail.blocks))}}
      ></shs-block-dialog>

      <shs-entity-picker-dialog
        multiple
        .hass=${this.hass}
        .open=${this._copyOpen}
        .heading=${this.localize("copy.title")}
        .description=${this.localize("copy.text",{name:l})}
        .emptyText=${this.localize("copy.nothing")}
        .confirmLabel=${this.localize("common.copy")}
        .entityIds=${Object.keys(this.hass.states).filter(e=>e.startsWith("climate.")&&e!==this.room.entity_id)}
        .localize=${this.localize}
        @closed=${()=>this._copyOpen=!1}
        @picked=${e=>this._copyToRooms(e.detail.entityIds)}
      ></shs-entity-picker-dialog>

      <shs-dialog
        .open=${this._removeOpen}
        .heading=${this.localize("room.remove")}
        @closed=${()=>this._removeOpen=!1}
      >
        <p>${this.localize("room.remove_text",{name:l})}</p>
        <button slot="actions" class="text-button" @click=${()=>this._removeOpen=!1}>
          ${this.localize("common.cancel")}
        </button>
        <button slot="actions" class="filled-button danger" @click=${this._remove}>
          ${this.localize("common.remove")}
        </button>
      </shs-dialog>
    `}static{this.styles=[ze,Ce,r`
      :host {
        display: block;
      }
      .content {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 0 auto;
        max-width: 600px;
        padding: 16px 16px 32px;
      }
      .summary {
        padding: 16px;
      }
      .summary-row {
        align-items: center;
        display: flex;
        gap: 16px;
        justify-content: space-between;
      }
      .summary shs-resume-row {
        border-top: 1px solid var(--divider-color);
        margin-top: 12px;
        padding-top: 4px;
      }
      .summary-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .notice {
        margin: 0;
        text-align: center;
      }
    `]}};e([he({attribute:!1})],yt.prototype,"hass",void 0),e([he({attribute:!1})],yt.prototype,"state",void 0),e([he({attribute:!1})],yt.prototype,"room",void 0),e([he()],yt.prototype,"prefix",void 0),e([he({type:Boolean})],yt.prototype,"narrow",void 0),e([he({attribute:!1})],yt.prototype,"localize",void 0),e([pe()],yt.prototype,"_profile",void 0),e([pe()],yt.prototype,"_expanded",void 0),e([pe()],yt.prototype,"_optimistic",void 0),e([pe()],yt.prototype,"_canPaste",void 0),e([pe()],yt.prototype,"_blockDialog",void 0),e([pe()],yt.prototype,"_copyOpen",void 0),e([pe()],yt.prototype,"_removeOpen",void 0),yt=e([xe("shs-room-view")],yt);let bt=class extends ne{constructor(){super(...arguments),this.narrow=!1,this._ready=!1}connectedCallback(){super.connectedCallback(),(ve??=(async()=>{if(customElements.get("ha-card")&&customElements.get("ha-switch"))return;const e=window.loadCardHelpers;if(e)try{const t=await e();t.createCardElement({type:"entities",entities:[]}),t.createRowElement?.({entity:"input_boolean.smart_heating_schedule_preload"}),await Promise.race([Promise.all(["ha-card","ha-switch","ha-icon-button"].map(e=>customElements.whenDefined(e))),new Promise(e=>setTimeout(e,3e3))])}catch{}})(),ve).then(()=>this._ready=!0),this.hass&&!this._unsubscribe&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.then(e=>e()).catch(()=>{}),this._unsubscribe=void 0}willUpdate(e){e.has("hass")&&this.hass&&(!this._unsubscribe&&this.isConnected&&this._subscribe(),this.toggleAttribute("dark",Boolean(this.hass.themes?.darkMode)),this.hass.locale.language!==this._language&&(this._language=this.hass.locale.language,this._localize=Ae(this._language)))}_subscribe(){var e,t;this._unsubscribe=(e=this.hass,t=e=>{this._state=e,this._error=void 0},e.connection.subscribeMessage(t,{type:`${ue}/subscribe`})),this._unsubscribe.catch(e=>{this._error="not_loaded"===e?.code?this._localize("not_loaded"):e?.message??String(e)})}render(){const e=this._localize??Ae("en");if(this._error)return I`<div class="message"><ha-card class="padded">${this._error}</ha-card></div>`;if(!this._state||!this._ready)return I`<div class="message secondary">${e("loading")}</div>`;const t=this.route?.prefix??"/smart-heating-schedule",o=/^\/room\/([^/]+)/.exec(this.route?.path??""),a=o?this._state.rooms.find(e=>e.entity_id===decodeURIComponent(o[1])):void 0;return a?I`<shs-room-view
        .hass=${this.hass}
        .state=${this._state}
        .room=${a}
        .prefix=${t}
        .narrow=${this.narrow}
        .localize=${e}
      ></shs-room-view>`:I`<shs-overview-view
      .hass=${this.hass}
      .state=${this._state}
      .prefix=${t}
      .narrow=${this.narrow}
      .localize=${e}
    ></shs-overview-view>`}static{this.styles=[ze,r`
      :host {
        background: var(--primary-background-color);
        display: block;
        height: 100%;
        overflow-y: auto;
        /* Light themes: darker block text and lighter block backgrounds. */
        --shs-text-mix: 55%;
        --shs-block-mix: 38%;
        --shs-block-list-mix: 14%;
      }
      :host([dark]) {
        --shs-text-mix: 100%;
        --shs-block-mix: 42%;
        --shs-block-list-mix: 18%;
      }
      .message {
        margin: 0 auto;
        max-width: 600px;
        padding: 32px 16px;
        text-align: center;
      }
      .padded {
        padding: 16px;
      }
    `]}};e([he({attribute:!1})],bt.prototype,"hass",void 0),e([he({type:Boolean,reflect:!0})],bt.prototype,"narrow",void 0),e([he({attribute:!1})],bt.prototype,"route",void 0),e([he({attribute:!1})],bt.prototype,"panel",void 0),e([pe()],bt.prototype,"_state",void 0),e([pe()],bt.prototype,"_error",void 0),e([pe()],bt.prototype,"_ready",void 0),bt=e([xe("smart-heating-schedule-panel")],bt);export{bt as SmartHeatingSchedulePanel};
