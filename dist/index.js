!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).hyperactiv=t()}(this,(function(){"use strict";const e=["String","Number","Object","Array","Boolean","Date"];function t(e){return e&&"object"==typeof e}function n(e,t,n){Object.defineProperty(e,t,{value:n,enumerable:!1,configurable:!0})}function o(e,t,o){n(e,"__key",t),n(e,"__parent",o)}const r={computedStack:[],trackerSymbol:Symbol("tracker")};let c=null;const i=Symbol();function s(){if(c){for(const e of c)e(),e[i]=!1;c=null}}function u(e,t){e[i]||(null===c&&(c=[],!0===t?queueMicrotask(s):setTimeout(s,t)),c.push(e))}const{computedStack:f,trackerSymbol:a}=r,l=Symbol("__observed");const{computedStack:d,trackerSymbol:p}=r;var b={observe:function r(c,s={}){const{props:d,ignore:p,batch:b,deep:y=!0,bubble:_,bind:m}=s;if(c[l])return c;const h=(e,t)=>e!==l&&(!d||d instanceof Array&&d.includes(e)||"function"==typeof d&&d(e,t))&&(!p||!(p instanceof Array&&p.includes(e))&&!("function"==typeof p&&p(e,t)));y&&Object.entries(c).forEach((function([e,n]){t(n)&&h(e,n)&&(c[e]=r(n,s),_&&o(c[e],e,c))}));const g=new Map,k=new Proxy(c,{get(e,t){if(t===l)return!0;if(h(t,c[t])&&f.length){const e=f[0],n=e[a];if(n){let e=n.get(c);e||(e=new Set,n.set(c,e)),e.add(t)}let o=g.get(t);o||(o=new Set,g.set(t,o)),o.add(e)}return c[t]},set(e,l,d){if("__handler"===l)n(c,"__handler",d);else if(h(l,d)){if(Array.isArray(c)&&"length"===l||c[l]!==d){const e=y&&t(d),n=c[l];t(n)&&delete c[l],c[l]=e?r(d,s):d,e&&_&&o(c[l],l,c);const p=[l];let m=c;for(;m&&(!m.__handler||!1!==m.__handler(p,d,n,k));)m.__key&&m.__parent?(p.unshift(m.__key),m=m.__parent):m=null;const h=g.get(l);if(h)for(const e of h){const t=e[a],n=t&&t.get(c),o=n&&n.has(l);e.__disposed||t&&!o?h.delete(e):e!==f[0]&&(void 0!==b&&!1!==b?(u(e,b),e[i]=!0):e())}}}else c[l]=d;return!0}});var O;return m&&(O=c,Object.getOwnPropertyNames(O).concat(Object.getPrototypeOf(O)&&e.indexOf(Object.getPrototypeOf(O).constructor.name)<0?Object.getOwnPropertyNames(Object.getPrototypeOf(O)):[]).filter((e=>"constructor"!==e&&"function"==typeof O[e]))).forEach((e=>c[e]=c[e].bind(k))),k},computed:function(e,{autoRun:t=!0,callback:n,bind:o,disableTracking:r=!1}={}){function c(t,c=[]){const u=n||s;r||(u[p]=new WeakMap),d.unshift(u),c=c.length>0?[...c,i]:[i];const f=t?t():o?e.apply(o,c):e(...c);return d.shift(),f}const i={computeAsync:c},s=(...e)=>c(null,e);return t&&s(),s},dispose:function(e){return e[r.trackerSymbol]=null,e.__disposed=!0},batch:s};return b}));
//# sourceMappingURL=index.js.map
