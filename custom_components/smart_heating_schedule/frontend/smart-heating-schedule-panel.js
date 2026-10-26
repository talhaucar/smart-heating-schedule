function t(t,e,s,i){var o,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(a<3?o(r):a>3?o(e,s,r):o(e,s))||r);return a>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new a(s,t,i)},n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,b=g?g.emptyScript:"",y=m.reactiveElementPolyfillSupport,v=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const a=i?.call(this);o?.call(this,e),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=i;const a=o.fromAttribute(e,t.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const a=this.constructor;if(!1===i&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??_)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,y?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,z=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,H=`<${E}>`,O=document,L=()=>O.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,T="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,R=/"/g,B=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),F=new WeakMap,q=O.createTreeWalker(O,129);function K(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let o,a=2===e?"<svg>":3===e?"<math>":"",r=V;for(let e=0;e<s;e++){const s=t[e];let n,l,c=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===V?"!--"===l[1]?r=U:void 0!==l[1]?r=D:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=o??V,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?j:'"'===l[3]?R:N):r===R||r===N?r=j:r===U||r===D?r=V:(r=j,o=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";a+=r===V?s+H:c>=0?(i.push(n),s.slice(0,c)+C+s.slice(c)+S+d):s+S+(-2===c?e:d)}return[K(t,a+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,a=0;const r=t.length-1,n=this.parts,[l,c]=J(t,e);if(this.el=X.createElement(l,s),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=q.nextNode())&&n.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[a++],s=i.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(S)&&(n.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],L()),q.nextNode(),n.push({type:2,index:++o});i.append(t[e],L())}}}else if(8===i.nodeType)if(i.data===E)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)n.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const a=M(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);q.currentNode=i;let o=q.nextNode(),a=0,r=0,n=s[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new Y(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new ot(o,this,t)),this._$AV.push(e),n=s[++r]}a!==n?.index&&(o=q.nextNode(),a++)}return q.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new X(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Y(this.O(L()),this.O(L()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Z}_$AI(t,e=this,s,i){const o=this.strings;let a=!1;if(void 0===o)t=G(this,t,e,0),a=!M(t)||t!==this._$AH&&t!==W,a&&(this._$AH=t);else{const i=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=G(this,i[s+r],e,r),n===W&&(n=this._$AH[r]),a||=!M(n)||n!==this._$AH[r],n===Z?t=Z:t!==Z&&(t+=(n??"")+o[r+1]),this._$AH[r]=n}a&&!i&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??Z)===W)return;const s=this._$AH,i=t===Z&&s!==Z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==Z&&(s===Z||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(X,Y),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Y(e.insertBefore(L(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:_},ht=(t=ct,e,s)=>{const{kind:i,metadata:o}=s;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),a.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return dt({...t,state:!0,attribute:!1})}const ut="smart_heating_schedule",mt=(t,e,s)=>t.callWS({type:`${ut}/room/save`,entity_id:e,...s}),gt=(t,e,s)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s}))},bt=(t,e=!1)=>{e?history.replaceState(null,"",t):history.pushState(null,"",t),gt(window,"location-changed",{replace:e})},yt=(t,e)=>{gt(t,"hass-notification",{message:e})};let vt;const ft=(t,e)=>{const s=t.states[e]?.attributes.friendly_name;if(s)return s;const i=t.entities?.[e]?.device_id,o=i?t.devices?.[i]:void 0;return o?.name_by_user||o?.name||e},_t=(t,e)=>{const s=t.entities?.[e],i=s?.area_id??(s?.device_id?t.devices?.[s.device_id]?.area_id:void 0);return i?t.areas?.[i]?.name:void 0},$t=t=>e=>{customElements.get(t)||customElements.define(t,e)},xt={title:"Smart Heating Schedule",loading:"Loading…",not_loaded:"Smart Heating Schedule is not set up. Add the integration under Settings → Devices & services.",read_only:"Only administrators can change schedules.",presence:{label:"Presence",auto:"Auto",home:"Home",away:"Away",detected_home:"Auto: someone is home",detected_away:"Auto: nobody is home",detected_unknown:"Auto: presence unknown, using the home schedule",forced:"Set manually; automatic switching is paused"},overview:{add:"Add thermostat",empty_title:"No schedules yet",empty_text:"Add a thermostat to give it a weekly home and away schedule.",no_thermostats:"All thermostats already have a schedule.",choose:"Choose a thermostat",now:"Now"},status:{until:"{temperature} until {time}",off_until:"Off until {time}",constant:"{temperature} all week",constant_off:"Off all week",disabled:"Schedule is off",pending:"Waiting for the thermostat",error:"Could not update the thermostat: {error}"},room:{back:"Back",enabled:"Smart schedule",add_block:"Add time block",copy_day:"Copy schedule",paste_day:"Paste schedule",copied:"Schedule copied. Use paste on another day.",copy_rooms:"Copy schedule to other rooms",remove:"Remove schedule",remove_text:"Stop scheduling {name} and delete its home and away schedules?",off:"Off"},block:{edit:"Edit time block",add:"Add time block",start:"Start",end:"End",heating:"Heating",off:"Off",frost:"Frost protection",delete:"Delete time block",lower:"Lower temperature",raise:"Raise temperature",overlap:"Overlapping time blocks are shortened or replaced.",invalid:"The end must be at least 15 minutes after the start."},copy:{title:"Copy schedule",text:"Replaces the home and away schedules of the selected rooms with those of {name}.",nothing:"There are no other thermostats."},common:{cancel:"Cancel",save:"Save",add:"Add",copy:"Copy",remove:"Remove",close:"Close"},error:{save:"Could not save: {error}"}},wt={en:xt,nl:{title:"Smart Heating Schedule",loading:"Laden…",not_loaded:"Smart Heating Schedule is niet ingesteld. Voeg de integratie toe via Instellingen → Apparaten & diensten.",read_only:"Alleen beheerders kunnen schema's wijzigen.",presence:{label:"Aanwezigheid",auto:"Automatisch",home:"Thuis",away:"Afwezig",detected_home:"Automatisch: er is iemand thuis",detected_away:"Automatisch: niemand thuis",detected_unknown:"Automatisch: aanwezigheid onbekend, thuis-schema actief",forced:"Handmatig ingesteld; automatisch wisselen staat uit"},overview:{add:"Thermostaat toevoegen",empty_title:"Nog geen schema's",empty_text:"Voeg een thermostaat toe om een wekelijks thuis- en afwezig-schema te maken.",no_thermostats:"Alle thermostaten hebben al een schema.",choose:"Kies een thermostaat",now:"Nu"},status:{until:"{temperature} tot {time}",off_until:"Uit tot {time}",constant:"{temperature} de hele week",constant_off:"De hele week uit",disabled:"Schema staat uit",pending:"Wachten op de thermostaat",error:"Thermostaat bijwerken mislukt: {error}"},room:{back:"Terug",enabled:"Slim schema",add_block:"Tijdsblok toevoegen",copy_day:"Kopieer schema",paste_day:"Plak schema",copied:"Schema gekopieerd. Plak het bij een andere dag.",copy_rooms:"Schema kopiëren naar andere kamers",remove:"Schema verwijderen",remove_text:"Stoppen met plannen voor {name} en het thuis- en afwezig-schema verwijderen?",off:"Uit"},block:{edit:"Tijdsblok bewerken",add:"Tijdsblok toevoegen",start:"Begin",end:"Einde",heating:"Verwarming",off:"Uit",frost:"Vorstbeveiliging",delete:"Tijdsblok verwijderen",lower:"Temperatuur lager",raise:"Temperatuur hoger",overlap:"Overlappende tijdsblokken worden ingekort of vervangen.",invalid:"Het einde moet minstens 15 minuten na het begin liggen."},copy:{title:"Schema kopiëren",text:"Vervangt het thuis- en afwezig-schema van de gekozen kamers door dat van {name}.",nothing:"Er zijn geen andere thermostaten."},common:{cancel:"Annuleren",save:"Opslaan",add:"Toevoegen",copy:"Kopiëren",remove:"Verwijderen",close:"Sluiten"},error:{save:"Opslaan mislukt: {error}"}}},kt=(t,e)=>{let s=t;for(const t of e.split("."))s=s?.[t];return"string"==typeof s?s:void 0},At=t=>{const e=wt[t]??wt[t.split("-")[0]];return(t,s)=>{let i=kt(e,t)??kt(xt,t)??t;for(const[t,e]of Object.entries(s??{}))i=i.replace(`{${t}}`,e);return i}},zt=r`
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
`,Ct=(t,e,s,i=!1)=>customElements.get("ha-switch")?I`<ha-switch
        .checked=${t}
        .disabled=${i}
        aria-label=${s}
        @change=${t=>e(t.target.checked)}
      ></ha-switch>`:I`<input
        type="checkbox"
        role="switch"
        class="switch-fallback"
        .checked=${t}
        ?disabled=${i}
        aria-label=${s}
        @change=${t=>e(t.target.checked)}
      />`,St=r`
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
`;var Et="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",Ht="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",Ot="M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",Lt="M14.12,10H19V8.2H15.38L13.38,4.87C13.08,4.37 12.54,4.03 11.92,4.03C11.74,4.03 11.58,4.06 11.42,4.11L6,5.8V11H7.8V7.33L9.91,6.67L6,22H7.8L10.67,13.89L13,17V22H14.8V15.59L12.31,11.05L13.04,8.18M14,3.8C15,3.8 15.8,3 15.8,2C15.8,1 15,0.2 14,0.2C13,0.2 12.2,1 12.2,2C12.2,3 13,3.8 14,3.8Z";const Mt="°F",Pt={"°C":{min:5,max:30,step:.5},"°F":{min:41,max:86,step:1}},Tt=t=>Pt[t]??Pt["°C"],Vt=(t,e)=>{const s=Tt(e),i=t?.attributes??{};return{min:Number(i.min_temp??s.min),max:Number(i.max_temp??s.max),step:Number(i.target_temp_step||s.step)}},Ut=t=>t===Mt?68:20,Dt=(t,e)=>{const s=Math.round(t/e.step)*e.step;return Math.min(e.max,Math.max(e.min,Number(s.toFixed(2))))},jt=(t,e,s=Tt(e).step,i=!1,o)=>{const a=((t,e)=>e<1?e<.1?2:1:t===Mt?0:1)(e,s);return`${new Intl.NumberFormat(o,{minimumFractionDigits:i?0:a,maximumFractionDigits:a}).format(t)}°`},Nt=[[12,[245,222,140]],[16,[248,206,84]],[19,[250,194,43]],[21,[248,168,48]],[23,[244,128,52]],[25,[236,90,50]],[28,[222,56,46]]],Rt="#8a9bab",Bt=([t,e,s])=>`#${[t,e,s].map(t=>Math.round(t).toString(16).padStart(2,"0")).join("")}`,It=(t,e)=>{if(null===t)return`var(--shs-color-off, ${Rt})`;const s=((t,e)=>e===Mt?5*(t-32)/9:t)(t,e);return`var(--shs-color-${Math.round(s)}, ${(t=>{if(null===t)return Rt;if(t<=Nt[0][0])return Bt(Nt[0][1]);for(let e=1;e<Nt.length;e++){const[s,i]=Nt[e];if(t<=s){const[o,a]=Nt[e-1],r=(t-o)/(s-o);return Bt(a.map((t,e)=>t+(i[e]-t)*r))}}return Bt(Nt[Nt.length-1][1])})(s)})`},Wt=15,Zt=1440,Ft=["mon","tue","wed","thu","fri","sat","sun"],qt=t=>{const[e,s]=t.split(":").map(Number);return 60*e+s},Kt=t=>t.map((e,s)=>({start:qt(e.start),end:s+1<t.length?qt(t[s+1].start):Zt,temperature:e.temperature})),Jt=t=>t.filter(t=>t.end>t.start).sort((t,e)=>t.start-e.start).map(t=>{return{start:(e=t.start,`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`),temperature:t.temperature};var e}),Xt=(t,e,s,i)=>{const o=[];for(const i of t)i.end<=e||i.start>=s?o.push(i):(i.start<e&&o.push({...i,end:e}),i.end>s&&o.push({...i,start:s}));return o.push({start:e,end:s,temperature:i}),o},Gt=(t,e)=>t>=0&&e<=Zt&&e-t>=Wt&&t%Wt===0&&e%Wt===0,Qt=(t,e)=>{if(t.length<=1)return t;const s=Kt(t),i=s[e];return e>0?s[e-1]={...s[e-1],end:i.end}:s[1]={...s[1],start:0},Jt(s.filter((t,s)=>s!==e))},Yt=(t,e,s)=>({...t,days:{...t.days,[e]:s}}),te=t=>{const e=t.locale.time_format;if("12"===e)return!0;if("24"===e)return!1;const s="system"===e?void 0:t.locale.language;return new Intl.DateTimeFormat(s,{hour:"numeric"}).resolvedOptions().hour12??!1},ee=(t,e,s=!1)=>{if(!e&&s&&t===Zt)return"24:00";const i=t%Zt,o=Math.floor(i/60),a=String(i%60).padStart(2,"0");if(e){return`${o%12||12}:${a} ${o<12?"AM":"PM"}`}return`${s?o:String(o).padStart(2,"0")}:${a}`},se={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6},ie=(t,e)=>{let s;try{s=new Intl.DateTimeFormat("en-US",{timeZone:e,weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(t)}catch{return ie(t)}const i=t=>s.find(e=>e.type===t)?.value??"0";return{weekday:se[i("weekday")]??0,minutes:60*Number(i("hour"))+Number(i("minute"))}},oe=new Date(2024,0,1);let ae=class extends nt{constructor(){super(...arguments),this.blocks=[],this.unit="°C",this.step=.5,this.language="en",this.offLabel="Off",this.h12=!1,this.now=null}render(){const t=Kt(this.blocks);return I`
      <div class="bar">
        ${t.map(t=>{const e=null===t.temperature?this.offLabel:jt(t.temperature,this.unit,this.step,!1,this.language);return I`<div
            class="block ${null===t.temperature?"off":""}"
            style="flex-grow:${t.end-t.start};--block-color:${It(t.temperature,this.unit)}"
          >
            <span>${e}</span>
          </div>`})}
        ${null===this.now?Z:I`<div class="now" style="left:${this.now/Zt*100}%"></div>`}
      </div>
      <div class="ticks" aria-hidden="true">
        ${[0,480,960,Zt].map(t=>I`<span>${ee(t,this.h12,!0)}</span>`)}
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
  `}};t([dt({attribute:!1})],ae.prototype,"blocks",void 0),t([dt()],ae.prototype,"unit",void 0),t([dt({type:Number})],ae.prototype,"step",void 0),t([dt()],ae.prototype,"language",void 0),t([dt({attribute:!1})],ae.prototype,"offLabel",void 0),t([dt({type:Boolean})],ae.prototype,"h12",void 0),t([dt({attribute:!1})],ae.prototype,"now",void 0),ae=t([$t("shs-schedule-bar")],ae);let re=class extends nt{constructor(){super(...arguments),this.options=[],this.value="",this.label="",this.small=!1,this.disabled=!1}_select(t){t===this.value||this.disabled||gt(this,"value-changed",{value:t})}_keydown(t){const e=this.options.findIndex(t=>t.value===this.value),s="ArrowRight"===t.key?1:"ArrowLeft"===t.key?-1:0;if(!s)return;t.preventDefault();const i=this.options[(e+s+this.options.length)%this.options.length];this._select(i.value),this.updateComplete.then(()=>this.renderRoot.querySelector("button[aria-checked=true]")?.focus())}render(){return I`<div class="wrapper" role="radiogroup" aria-label=${this.label} @keydown=${this._keydown}>
      ${this.options.map(t=>{const e=t.value===this.value;return I`<button
          role="radio"
          aria-checked=${e}
          tabindex=${e?0:-1}
          class=${e?"active":""}
          ?disabled=${this.disabled&&!e}
          @click=${()=>this._select(t.value)}
        >
          ${t.icon?I`<ha-svg-icon .path=${t.icon}></ha-svg-icon>`:Z}
          <span>${t.label}</span>
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
      align-items: center;
      background: none;
      border: none;
      border-radius: 999px;
      color: var(--secondary-text-color);
      cursor: pointer;
      display: flex;
      flex: 1;
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      gap: 8px;
      justify-content: center;
      min-width: 0;
      padding: 9px 12px;
      transition: background-color 0.2s, color 0.2s;
    }
    :host([small]) button {
      font-size: 14px;
      padding: 6px 8px;
    }
    button span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
  `}};t([dt({attribute:!1})],re.prototype,"options",void 0),t([dt()],re.prototype,"value",void 0),t([dt()],re.prototype,"label",void 0),t([dt({type:Boolean,reflect:!0})],re.prototype,"small",void 0),t([dt({type:Boolean})],re.prototype,"disabled",void 0),re=t([$t("shs-segment-control")],re);let ne=class extends nt{constructor(){super(...arguments),this.heading="",this.open=!1,this._previousFocus=null,this._keydown=t=>{"Escape"===t.key&&this.open&&(t.stopPropagation(),this._close())}}_close(){gt(this,"closed")}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._keydown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._keydown)}updated(t){t.has("open")&&(this.open?(this._previousFocus=document.activeElement,this.renderRoot.querySelector(".surface")?.focus()):this._previousFocus instanceof HTMLElement&&this._previousFocus.focus())}render(){return this.open?I`
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
    `:Z}static{this.styles=r`
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
      overflow-y: auto;
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
  `}};t([dt()],ne.prototype,"heading",void 0),t([dt({type:Boolean,reflect:!0})],ne.prototype,"open",void 0),ne=t([$t("shs-dialog")],ne);let le=class extends nt{constructor(){super(...arguments),this.open=!1,this.heading="",this.description="",this.emptyText="",this.confirmLabel="",this.multiple=!1,this.entityIds=[],this._selected=new Set}willUpdate(t){t.has("open")&&this.open&&(this._selected=new Set)}_toggle(t,e){const s=new Set(this._selected);e?s.add(t):s.delete(t),this._selected=s}_pick(t){gt(this,"picked",{entityIds:t})}render(){const t=[...this.entityIds].sort((t,e)=>ft(this.hass,t).localeCompare(ft(this.hass,e)));return I`<shs-dialog .open=${this.open} .heading=${this.heading} @closed=${()=>gt(this,"closed")}>
      ${this.description?I`<p class="secondary">${this.description}</p>`:Z}
      ${t.length?I`<ul>
            ${t.map(t=>{const e=_t(this.hass,t),s=I`<span class="name">${ft(this.hass,t)}</span>
                <span class="secondary">${e?`${e} · `:""}${t}</span>`;return I`<li>
                ${this.multiple?I`<label class="item">
                      <input
                        type="checkbox"
                        .checked=${this._selected.has(t)}
                        @change=${e=>this._toggle(t,e.target.checked)}
                      />
                      <span class="text">${s}</span>
                    </label>`:I`<button class="item" @click=${()=>this._pick([t])}>
                      <ha-svg-icon .path=${Ot}></ha-svg-icon>
                      <span class="text">${s}</span>
                    </button>`}
              </li>`})}
          </ul>`:I`<p class="secondary">${this.emptyText}</p>`}
      <button slot="actions" class="text-button" @click=${()=>gt(this,"closed")}>
        ${this.localize("common.cancel")}
      </button>
      ${this.multiple?I`<button
            slot="actions"
            class="filled-button"
            ?disabled=${!this._selected.size}
            @click=${()=>this._pick([...this._selected])}
          >
            ${this.confirmLabel}
          </button>`:Z}
    </shs-dialog>`}static{this.styles=[zt,r`
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
    `]}};t([dt({attribute:!1})],le.prototype,"hass",void 0),t([dt({type:Boolean})],le.prototype,"open",void 0),t([dt()],le.prototype,"heading",void 0),t([dt()],le.prototype,"description",void 0),t([dt()],le.prototype,"emptyText",void 0),t([dt()],le.prototype,"confirmLabel",void 0),t([dt({type:Boolean})],le.prototype,"multiple",void 0),t([dt({attribute:!1})],le.prototype,"entityIds",void 0),t([dt({attribute:!1})],le.prototype,"localize",void 0),t([pt()],le.prototype,"_selected",void 0),le=t([$t("shs-entity-picker-dialog")],le);const ce=(t,e,s)=>{const{status:i}=t;if(!t.enabled)return{text:e("status.disabled"),error:!1};if(i.last_error)return{text:e("status.error",{error:i.last_error}),error:!0};if(i.pending)return{text:e("status.pending"),error:!1};const o=null===i.temperature?null:jt(i.temperature,s.unit,s.step,!1,s.language);if(!i.end)return null===o?{text:e("status.constant_off"),error:!1}:{text:e("status.constant",{temperature:o}),error:!1};const a=(r=i.end,n=s.h12,l=s.timeZone,ee(ie(new Date(r),l).minutes,n));var r,n,l;return null===o?{text:e("status.off_until",{time:a}),error:!1}:{text:e("status.until",{temperature:o,time:a}),error:!1}};let he=class extends nt{constructor(){super(...arguments),this.prefix="",this.narrow=!1,this._addOpen=!1}get _readOnly(){return!this.hass.user?.is_admin}async _call(t){try{await t}catch(t){yt(this,this.localize("error.save",{error:t?.message??String(t)}))}}async _add(t){this._addOpen=!1;try{await((t,e)=>t.callWS({type:`${ut}/room/add`,entity_id:e}))(this.hass,t),bt(`${this.prefix}/room/${t}`)}catch(t){yt(this,this.localize("error.save",{error:t?.message??String(t)}))}}_presenceText(){const{presence:t}=this.state;return"auto"!==t.mode?this.localize("presence.forced"):null===t.detected_home?this.localize("presence.detected_unknown"):this.localize(t.detected_home?"presence.detected_home":"presence.detected_away")}render(){const t=this.narrow||"always_hidden"===this.hass.dockedSidebar,e=new Set(this.state.rooms.map(t=>t.entity_id)),s=Object.keys(this.hass.states).filter(t=>t.startsWith("climate.")&&!e.has(t));return I`
      <div class="toolbar">
        ${t?I`<ha-icon-button
              .path=${"M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"}
              .label=${"Menu"}
              @click=${()=>gt(this,"hass-toggle-menu")}
            ></ha-icon-button>`:Z}
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
            .options=${[{value:"auto",label:this.localize("presence.auto"),icon:"M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"},{value:"home",label:this.localize("presence.home"),icon:Et},{value:"away",label:this.localize("presence.away"),icon:Lt}]}
            @value-changed=${t=>{return this._call((e=this.hass,s=t.detail.value,e.callWS({type:`${ut}/presence/set`,mode:s})));var e,s}}
          ></shs-segment-control>
        </ha-card>

        ${this.state.rooms.length?I`<div class="rooms">${this.state.rooms.map(t=>this._renderRoom(t))}</div>`:I`<ha-card class="empty">
              <ha-svg-icon .path=${Ot}></ha-svg-icon>
              <h2>${this.localize("overview.empty_title")}</h2>
              <p class="secondary">${this.localize("overview.empty_text")}</p>
            </ha-card>`}
        ${this._readOnly?I`<p class="secondary notice">${this.localize("read_only")}</p>`:I`<div class="add">
              <button class="filled-button" @click=${()=>this._addOpen=!0}>
                <ha-svg-icon .path=${Ht}></ha-svg-icon>${this.localize("overview.add")}
              </button>
            </div>`}
      </div>

      <shs-entity-picker-dialog
        .hass=${this.hass}
        .open=${this._addOpen}
        .heading=${this.localize("overview.choose")}
        .emptyText=${this.localize("overview.no_thermostats")}
        .entityIds=${s}
        .localize=${this.localize}
        @closed=${()=>this._addOpen=!1}
        @picked=${t=>this._add(t.detail.entityIds[0])}
      ></shs-entity-picker-dialog>
    `}_renderRoom(t){const e=this.hass.states[t.entity_id],s=this.state.unit,i=Vt(e,s),o=this.hass.locale.language,a=te(this.hass),r=ie(new Date,this.hass.config.time_zone),n=((t,e)=>t.days[Ft[e]])(t[this.state.presence.profile],r.weekday),l=ce(t,this.localize,{unit:s,step:i.step,h12:a,language:o,timeZone:this.hass.config.time_zone}),c=e?.attributes.current_temperature,h=e?.attributes.temperature,d="heating"===e?.attributes.hvac_action,p=_t(this.hass,t.entity_id),u=()=>bt(`${this.prefix}/room/${t.entity_id}`);return I`<ha-card class="room ${t.enabled?"":"disabled"}">
      <div class="room-header">
        <button class="room-title" @click=${u}>
          <span class="name">${ft(this.hass,t.entity_id)}</span>
          ${p?I`<span class="secondary area">${p}</span>`:Z}
        </button>
        ${Ct(t.enabled,e=>this._call(mt(this.hass,t.entity_id,{enabled:e})),this.localize("room.enabled"),this._readOnly)}
      </div>
      <button class="room-body" @click=${u} aria-label=${ft(this.hass,t.entity_id)}>
        <div class="climate">
          ${"number"==typeof c?I`<span class="current">${jt(c,s,.1,!1,o)}</span>`:Z}
          ${e&&"unavailable"!==e.state?I`<span class="secondary target">
                ${d?I`<ha-svg-icon class="flame" .path=${"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"}></ha-svg-icon>`:Z}
                ${"off"===e.state?this.localize("room.off"):"number"==typeof h?jt(h,s,i.step,!1,o):"number"==typeof e.attributes.target_temp_low?`${jt(e.attributes.target_temp_low,s,i.step,!1,o)} – ${jt(e.attributes.target_temp_high,s,i.step,!1,o)}`:Z}
              </span>`:I`<span class="secondary">${this.hass.states[t.entity_id]?.state??"—"}</span>`}
        </div>
        <shs-schedule-bar
          .blocks=${n}
          .unit=${s}
          .step=${i.step}
          .language=${o}
          .offLabel=${this.localize("room.off")}
          .h12=${a}
          .now=${t.enabled?r.minutes:null}
        ></shs-schedule-bar>
        <div class="status ${l.error?"error":"secondary"}">${l.text}</div>
      </button>
    </ha-card>`}static{this.styles=[zt,St,r`
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
        font-size: 13px;
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
      .target {
        align-items: center;
        display: inline-flex;
        gap: 4px;
        font-size: 16px;
      }
      .flame {
        color: var(--state-climate-heat-color, #ff8100);
        --mdc-icon-size: 18px;
      }
      .status {
        font-size: 14px;
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
    `]}};t([dt({attribute:!1})],he.prototype,"hass",void 0),t([dt({attribute:!1})],he.prototype,"state",void 0),t([dt()],he.prototype,"prefix",void 0),t([dt({type:Boolean})],he.prototype,"narrow",void 0),t([dt({attribute:!1})],he.prototype,"localize",void 0),t([pt()],he.prototype,"_addOpen",void 0),he=t([$t("shs-overview-view")],he);let de=class extends nt{constructor(){super(...arguments),this.heading="",this.blocks=[],this.unit="°C",this.step=.5,this.language="en",this.h12=!1,this.expanded=!1,this.readOnly=!1,this.canPaste=!1,this.now=null}render(){const t="day-"+this.heading.replace(/\W/g,"");return I`
      <ha-card>
        <button
          class="header"
          aria-expanded=${this.expanded}
          aria-controls="${t}-blocks"
          @click=${()=>gt(this,"toggle")}
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
        ${this.expanded?this._renderBlocks(t):Z}
        ${this.readOnly?Z:this._renderActions()}
      </ha-card>
    `}_renderBlocks(t){const e=Kt(this.blocks);return I`<ul class="blocks" id="${t}-blocks">
      ${e.map((t,e)=>{const s=`${ee(t.start,this.h12)} - ${ee(t.end,this.h12)}`,i=null===t.temperature?this.localize("room.off"):jt(t.temperature,this.unit,this.step,!0,this.language);return I`<li>
          <button
            class="block"
            style="--block-color:${It(t.temperature,this.unit)}"
            ?disabled=${this.readOnly}
            @click=${()=>gt(this,"edit-block",{index:e})}
          >
            <span class="details">
              <span class="times">${s}</span>
              <span class="temperature">${i}</span>
            </span>
            ${this.readOnly?Z:I`<ha-svg-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-svg-icon>`}
          </button>
        </li>`})}
    </ul>`}_renderActions(){return I`<div class="actions">
      <ha-icon-button
        class="primary"
        .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
        .label=${this.localize("room.copy_day")}
        @click=${()=>gt(this,"copy-day")}
      ></ha-icon-button>
      <ha-icon-button
        class="primary"
        .path=${"M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z"}
        .label=${this.localize("room.paste_day")}
        ?disabled=${!this.canPaste}
        @click=${()=>gt(this,"paste-day")}
      ></ha-icon-button>
      <span class="spacer"></span>
      <button class="text-button" @click=${()=>gt(this,"add-block")}>
        ${this.localize("room.add_block")}
      </button>
    </div>`}static{this.styles=[zt,r`
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
    `]}};t([dt()],de.prototype,"heading",void 0),t([dt({attribute:!1})],de.prototype,"blocks",void 0),t([dt()],de.prototype,"unit",void 0),t([dt({type:Number})],de.prototype,"step",void 0),t([dt()],de.prototype,"language",void 0),t([dt({type:Boolean})],de.prototype,"h12",void 0),t([dt({type:Boolean,reflect:!0})],de.prototype,"expanded",void 0),t([dt({type:Boolean})],de.prototype,"readOnly",void 0),t([dt({type:Boolean})],de.prototype,"canPaste",void 0),t([dt({attribute:!1})],de.prototype,"now",void 0),t([dt({attribute:!1})],de.prototype,"localize",void 0),de=t([$t("shs-day-card")],de);let pe=class extends nt{constructor(){super(...arguments),this.value=20,this.limits={min:5,max:30,step:.5},this.unit="°C",this.language="en",this.lowerLabel="Lower",this.raiseLabel="Raise"}_change(t){const e=Dt(this.value+t*this.limits.step,this.limits);e!==this.value&&gt(this,"value-changed",{value:e})}_keydown(t){const e={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1}[t.key];e&&(t.preventDefault(),this._change(e))}render(){const{min:t,max:e,step:s}=this.limits;return I`
      <ha-icon-button
        .path=${"M19,13H5V11H19V13Z"}
        .label=${this.lowerLabel}
        ?disabled=${this.value<=t}
        @click=${()=>this._change(-1)}
      ></ha-icon-button>
      <div
        class="value"
        role="spinbutton"
        tabindex="0"
        aria-valuemin=${t}
        aria-valuemax=${e}
        aria-valuenow=${this.value}
        aria-valuetext=${jt(this.value,this.unit,s,!1,this.language)}
        style="--block-color:${It(this.value,this.unit)}"
        @keydown=${this._keydown}
      >
        ${jt(this.value,this.unit,s,!1,this.language)}
      </div>
      <ha-icon-button
        .path=${Ht}
        .label=${this.raiseLabel}
        ?disabled=${this.value>=e}
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
  `}};t([dt({type:Number})],pe.prototype,"value",void 0),t([dt({attribute:!1})],pe.prototype,"limits",void 0),t([dt()],pe.prototype,"unit",void 0),t([dt()],pe.prototype,"language",void 0),t([dt()],pe.prototype,"lowerLabel",void 0),t([dt()],pe.prototype,"raiseLabel",void 0),pe=t([$t("shs-temperature-stepper")],pe);let ue=class extends nt{constructor(){super(...arguments),this.open=!1,this.blocks=[],this.index=null,this.unit="°C",this.limits={min:5,max:30,step:.5},this.canTurnOff=!0,this.h12=!1,this.language="en",this._start=0,this._end=Zt,this._heating=!0,this._temperature=20}willUpdate(t){t.has("open")&&this.open&&this._reset()}_reset(){const t=Kt(this.blocks);if(null!==this.index){const e=t[this.index];return this._start=e.start,this._end=e.end,this._heating=null!==e.temperature,void(this._temperature=Dt(e.temperature??Ut(this.unit),this.limits))}const e=t.reduce((t,e)=>e.end-e.start>t.end-t.start?e:t),s=Math.min(120,e.end-e.start),i=e.start+(e.end-e.start)/2;this._start=Math.max(e.start,60*Math.floor((i-s/2)/60)),this._end=Math.min(Zt,this._start+s),this._heating=!0,this._temperature=Dt(Ut(this.unit),this.limits)}get _isFirst(){return 0===this.index}get _isLast(){return null!==this.index&&this.index===this.blocks.length-1}get _valid(){return this._end-this._start>=Wt}_save(){const t=this._heating?this._temperature:null,e=null===this.index?((t,e,s,i)=>{if(!Gt(e,s))throw new Error("invalid time range");return Jt(Xt(Kt(t),e,s,i))})(this.blocks,this._start,this._end,t):((t,e,s,i,o)=>{const a=Kt(t),r=a.length-1,n=a[e];if(0===e&&(s=0),e===r&&(i=Zt),!Gt(s,i))throw new Error("invalid time range");e>0&&s>n.start&&(a[e-1]={...a[e-1],end:Math.min(s,n.end)}),e<r&&i<n.end&&(a[e+1]={...a[e+1],start:Math.max(i,n.start)});const l=a.filter((t,s)=>s!==e);return Jt(Xt(l,s,i,o))})(this.blocks,this.index,this._start,this._end,t);gt(this,"save",{blocks:e})}_delete(){null!==this.index&&gt(this,"save",{blocks:Qt(this.blocks,this.index)})}_timeSelect(t,e,s,i,o,a){const r=[];for(let t=s;t<=i;t+=Wt)r.push(t);return I`<label class="field">
      <span>${t}</span>
      <select
        .value=${String(e)}
        ?disabled=${o}
        @change=${t=>a(Number(t.target.value))}
      >
        ${r.map(t=>I`<option value=${t} ?selected=${t===e}>
              ${ee(t,this.h12)}
            </option>`)}
      </select>
    </label>`}render(){const t=this.localize(this.canTurnOff?"block.off":"block.frost");return I`<shs-dialog
      .open=${this.open}
      .heading=${this.localize(null===this.index?"block.add":"block.edit")}
      @closed=${()=>gt(this,"closed")}
    >
      <div class="times">
        ${this._timeSelect(this.localize("block.start"),this._start,0,Zt-Wt,this._isFirst,t=>{this._start=t})}
        <span class="dash">–</span>
        ${this._timeSelect(this.localize("block.end"),this._end,Wt,Zt,this._isLast,t=>{this._end=t})}
      </div>
      ${this._valid?Z:I`<p class="error">${this.localize("block.invalid")}</p>`}

      <div class="row">
        <span>${this.localize("block.heating")}</span>
        ${Ct(this._heating,t=>this._heating=t,this.localize("block.heating"))}
      </div>

      <div class="temperature">
        ${this._heating?I`<shs-temperature-stepper
              .value=${this._temperature}
              .limits=${this.limits}
              .unit=${this.unit}
              .language=${this.language}
              .lowerLabel=${this.localize("block.lower")}
              .raiseLabel=${this.localize("block.raise")}
              @value-changed=${t=>this._temperature=t.detail.value}
            ></shs-temperature-stepper>`:I`<div class="off">${t}</div>`}
      </div>

      ${null===this.index?I`<p class="secondary hint">${this.localize("block.overlap")}</p>`:Z}

      ${null!==this.index&&this.blocks.length>1?I`<button slot="secondary" class="text-button danger" @click=${this._delete}>
            ${this.localize("block.delete")}
          </button>`:Z}
      <button slot="actions" class="text-button" @click=${()=>gt(this,"closed")}>
        ${this.localize("common.cancel")}
      </button>
      <button slot="actions" class="filled-button" ?disabled=${!this._valid} @click=${this._save}>
        ${this.localize(null===this.index?"common.add":"common.save")}
      </button>
    </shs-dialog>`}static{this.styles=[zt,r`
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
    `]}};t([dt({type:Boolean})],ue.prototype,"open",void 0),t([dt({attribute:!1})],ue.prototype,"blocks",void 0),t([dt({attribute:!1})],ue.prototype,"index",void 0),t([dt()],ue.prototype,"unit",void 0),t([dt({attribute:!1})],ue.prototype,"limits",void 0),t([dt({type:Boolean})],ue.prototype,"canTurnOff",void 0),t([dt({type:Boolean})],ue.prototype,"h12",void 0),t([dt()],ue.prototype,"language",void 0),t([dt({attribute:!1})],ue.prototype,"localize",void 0),t([pt()],ue.prototype,"_start",void 0),t([pt()],ue.prototype,"_end",void 0),t([pt()],ue.prototype,"_heating",void 0),t([pt()],ue.prototype,"_temperature",void 0),ue=t([$t("shs-block-dialog")],ue);let me=null,ge=class extends nt{constructor(){super(...arguments),this.prefix="",this.narrow=!1,this._profile="home",this._expanded=new Set,this._optimistic={},this._canPaste=null!==me,this._blockDialog=null,this._copyOpen=!1,this._removeOpen=!1,this._initialized=!1}willUpdate(t){t.has("room")&&(this._optimistic={},this._initialized||(this._initialized=!0,this._expanded=new Set([this._today])))}get _week(){return this._optimistic[this._profile]??this.room[this._profile]}get _readOnly(){return!this.hass.user?.is_admin}get _now(){return ie(new Date,this.hass.config.time_zone)}get _today(){return Ft[this._now.weekday]}_dayLabel(t){return((t,e,s="long")=>{const i=new Date(oe);i.setDate(oe.getDate()+e);const o=new Intl.DateTimeFormat(t,{weekday:s}).format(i);return o.charAt(0).toUpperCase()+o.slice(1)})(this.hass.locale.language,Ft.indexOf(t))}async _save(t){const e=["home","away"].filter(e=>t[e]);this._optimistic={...this._optimistic,...Object.fromEntries(e.map(e=>[e,t[e]]))};try{await mt(this.hass,this.room.entity_id,t)}catch(t){this._optimistic={},yt(this,this.localize("error.save",{error:t?.message??String(t)}))}}_saveWeek(t){return this._save({[this._profile]:t})}_toggle(t){const e=new Set(this._expanded);e.has(t)?e.delete(t):e.add(t),this._expanded=e}_copyDay(t){me=t.map(t=>({...t})),this._canPaste=!0,yt(this,this.localize("room.copied"))}async _copyToRooms(t){this._copyOpen=!1;try{await((t,e,s)=>t.callWS({type:`${ut}/room/copy`,entity_id:e,targets:s}))(this.hass,this.room.entity_id,t)}catch(t){yt(this,this.localize("error.save",{error:t?.message??String(t)}))}}async _remove(){this._removeOpen=!1;try{await(t=this.hass,e=this.room.entity_id,t.callWS({type:`${ut}/room/remove`,entity_id:e})),bt(this.prefix,!0)}catch(t){yt(this,this.localize("error.save",{error:t?.message??String(t)}))}var t,e}render(){const t=this.hass.states[this.room.entity_id],e=this.state.unit,s=Vt(t,e),i=te(this.hass),o=this.hass.locale.language,a=this._week,r=this._now,n=this._today,l=ft(this.hass,this.room.entity_id),c=ce(this.room,this.localize,{unit:e,step:s.step,h12:i,language:o,timeZone:this.hass.config.time_zone}),h=this._readOnly,d=this._blockDialog?a.days[this._blockDialog.day]:[];return I`
      <div class="toolbar">
        <ha-icon-button
          .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
          .label=${this.localize("room.back")}
          @click=${()=>bt(this.prefix)}
        ></ha-icon-button>
        <div class="title">${l}</div>
        ${h?Z:I`<ha-icon-button
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
              <div class="${c.error?"error":"secondary"}">${c.text}</div>
            </div>
            ${Ct(this.room.enabled,t=>this._save({enabled:t}),this.localize("room.enabled"),h)}
          </div>
        </ha-card>
        ${h?I`<p class="secondary notice">${this.localize("read_only")}</p>`:Z}

        <shs-segment-control
          .label=${this.localize("presence.label")}
          .value=${this._profile}
          .options=${[{value:"home",label:this.localize("presence.home"),icon:Et},{value:"away",label:this.localize("presence.away"),icon:Lt}]}
          @value-changed=${t=>{this._profile=t.detail.value,this._expanded=new Set([this._today])}}
        ></shs-segment-control>

        ${(t=>[...Ft.slice(t),...Ft.slice(0,t)])((t=>{const e=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],s=t.locale.first_weekday;if(s&&e.includes(s))return e.indexOf(s);try{const e=new Intl.Locale(t.locale.language),s=e.getWeekInfo?.()??e.weekInfo;if(s)return(s.firstDay+6)%7}catch{}return 0})(this.hass)).map(t=>{const l=a.days[t];return I`<shs-day-card
            .heading=${this._dayLabel(t)}
            .blocks=${l}
            .unit=${e}
            .step=${s.step}
            .language=${o}
            .h12=${i}
            .expanded=${this._expanded.has(t)}
            .readOnly=${h}
            .canPaste=${this._canPaste}
            .now=${t===n&&this._profile===this.state.presence.profile?r.minutes:null}
            .localize=${this.localize}
            @toggle=${()=>this._toggle(t)}
            @edit-block=${e=>this._blockDialog={day:t,index:e.detail.index}}
            @add-block=${()=>this._blockDialog={day:t,index:null}}
            @copy-day=${()=>this._copyDay(l)}
            @paste-day=${()=>me&&this._saveWeek(Yt(a,t,me))}
          ></shs-day-card>`})}
      </div>

      <shs-block-dialog
        .open=${null!==this._blockDialog}
        .blocks=${d}
        .index=${this._blockDialog?.index??null}
        .unit=${e}
        .limits=${s}
        .canTurnOff=${(t=>!t||(t.attributes.hvac_modes??[]).includes("off"))(t)}
        .h12=${i}
        .language=${o}
        .localize=${this.localize}
        @closed=${()=>this._blockDialog=null}
        @save=${t=>{const e=this._blockDialog.day;this._blockDialog=null,this._saveWeek(Yt(a,e,t.detail.blocks))}}
      ></shs-block-dialog>

      <shs-entity-picker-dialog
        multiple
        .hass=${this.hass}
        .open=${this._copyOpen}
        .heading=${this.localize("copy.title")}
        .description=${this.localize("copy.text",{name:l})}
        .emptyText=${this.localize("copy.nothing")}
        .confirmLabel=${this.localize("common.copy")}
        .entityIds=${Object.keys(this.hass.states).filter(t=>t.startsWith("climate.")&&t!==this.room.entity_id)}
        .localize=${this.localize}
        @closed=${()=>this._copyOpen=!1}
        @picked=${t=>this._copyToRooms(t.detail.entityIds)}
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
    `}static{this.styles=[zt,St,r`
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
      .summary-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .notice {
        margin: 0;
        text-align: center;
      }
    `]}};t([dt({attribute:!1})],ge.prototype,"hass",void 0),t([dt({attribute:!1})],ge.prototype,"state",void 0),t([dt({attribute:!1})],ge.prototype,"room",void 0),t([dt()],ge.prototype,"prefix",void 0),t([dt({type:Boolean})],ge.prototype,"narrow",void 0),t([dt({attribute:!1})],ge.prototype,"localize",void 0),t([pt()],ge.prototype,"_profile",void 0),t([pt()],ge.prototype,"_expanded",void 0),t([pt()],ge.prototype,"_optimistic",void 0),t([pt()],ge.prototype,"_canPaste",void 0),t([pt()],ge.prototype,"_blockDialog",void 0),t([pt()],ge.prototype,"_copyOpen",void 0),t([pt()],ge.prototype,"_removeOpen",void 0),ge=t([$t("shs-room-view")],ge);let be=class extends nt{constructor(){super(...arguments),this.narrow=!1,this._ready=!1}connectedCallback(){super.connectedCallback(),(vt??=(async()=>{if(customElements.get("ha-card")&&customElements.get("ha-switch"))return;const t=window.loadCardHelpers;if(t)try{const e=await t();e.createCardElement({type:"entities",entities:[]}),e.createRowElement?.({entity:"input_boolean.smart_heating_schedule_preload"}),await Promise.race([Promise.all(["ha-card","ha-switch","ha-icon-button"].map(t=>customElements.whenDefined(t))),new Promise(t=>setTimeout(t,3e3))])}catch{}})(),vt).then(()=>this._ready=!0),this.hass&&!this._unsubscribe&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.then(t=>t()).catch(()=>{}),this._unsubscribe=void 0}willUpdate(t){t.has("hass")&&this.hass&&(!this._unsubscribe&&this.isConnected&&this._subscribe(),this.toggleAttribute("dark",Boolean(this.hass.themes?.darkMode)),this.hass.locale.language!==this._language&&(this._language=this.hass.locale.language,this._localize=At(this._language)))}_subscribe(){var t,e;this._unsubscribe=(t=this.hass,e=t=>{this._state=t,this._error=void 0},t.connection.subscribeMessage(e,{type:`${ut}/subscribe`})),this._unsubscribe.catch(t=>{this._error="not_loaded"===t?.code?this._localize("not_loaded"):t?.message??String(t)})}render(){const t=this._localize??At("en");if(this._error)return I`<div class="message"><ha-card class="padded">${this._error}</ha-card></div>`;if(!this._state||!this._ready)return I`<div class="message secondary">${t("loading")}</div>`;const e=this.route?.prefix??"/smart-heating-schedule",s=/^\/room\/([^/]+)/.exec(this.route?.path??""),i=s?this._state.rooms.find(t=>t.entity_id===decodeURIComponent(s[1])):void 0;return i?I`<shs-room-view
        .hass=${this.hass}
        .state=${this._state}
        .room=${i}
        .prefix=${e}
        .narrow=${this.narrow}
        .localize=${t}
      ></shs-room-view>`:I`<shs-overview-view
      .hass=${this.hass}
      .state=${this._state}
      .prefix=${e}
      .narrow=${this.narrow}
      .localize=${t}
    ></shs-overview-view>`}static{this.styles=[zt,r`
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
    `]}};t([dt({attribute:!1})],be.prototype,"hass",void 0),t([dt({type:Boolean,reflect:!0})],be.prototype,"narrow",void 0),t([dt({attribute:!1})],be.prototype,"route",void 0),t([dt({attribute:!1})],be.prototype,"panel",void 0),t([pt()],be.prototype,"_state",void 0),t([pt()],be.prototype,"_error",void 0),t([pt()],be.prototype,"_ready",void 0),be=t([$t("smart-heating-schedule-panel")],be);export{be as SmartHeatingSchedulePanel};
