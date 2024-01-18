const e=["String","Number","Object","Array","Boolean","Date"];function t(e){return e&&"object"==typeof e}function r(e,t,r){Object.defineProperty(e,t,{value:r,enumerable:!1,configurable:!0})}function n(e,t,n){r(e,"__key",t),r(e,"__parent",n)}const o={computedStack:[],trackerSymbol:Symbol("tracker")};let s=null;const c=Symbol();function a(){if(s){for(const e of s)e(),e[c]=!1;s=null}}function u(e,t){e[c]||(null===s&&(s=[],!0===t?queueMicrotask(a):setTimeout(a,t)),s.push(e))}const{computedStack:i,trackerSymbol:l}=o,f=Symbol("__observed");function p(e,t,r){if(e===t)return!1;let n=typeof e;if(n!==typeof t)return!0;switch(n){case"undefined":case"boolean":case"string":case"function":default:return!0;case"number":return isNaN(e)!==isNaN(t)||Math.abs(e-t)>Number.EPSILON;case"object":return null==e||(null==t||("by-value"===r&&(e instanceof Boolean||e instanceof Number||e instanceof String)?e.valueOf()!==t.valueOf():Array.isArray(e)?function(e,t,r){if(!Array.isArray(t))return!0;if(e.length!==t.length)return!0;for(let n=0,o=e.length;n<o;n++)if(p(e[n],t[n],r))return!0;return!1}(e,t,r):"by-reference"===r||function(e,t,r){if(Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!0;for(let r in e)if(!(r in t))return!0;for(let n in t){if(!(n in e))return!0;if(p(e[n],t[n],r))return!0}return!1}(e,t,r)))}return!0}const{computedStack:y,trackerSymbol:d}=o;var b={observe:function o(s,a={}){const{props:y,ignore:d,batch:b,deep:h=!0,bubble:g,bind:_}=a;if(s[f])return s;const m=e=>e!==f&&(null==y||y instanceof Array&&y.includes(e))&&(null==d||d instanceof Array&&!d.includes(e));h&&Object.entries(s).forEach((function([e,r]){t(r)&&m(e)&&(s[e]=o(r,a),g&&n(s[e],e,s))}));const O=new Map,k=new Proxy(s,{get(e,t){if(t===f)return!0;if(m(t)&&i.length){const e=i[0],r=e[l];if(r){let e=r.get(s);e||(e=new Set,r.set(s,e)),e.add(t)}let n=O.get(t);n||(n=new Set,O.set(t,n)),n.add(e)}return s[t]},set(e,f,y){if("__handler"===f)r(s,"__handler",y);else if(m(f)){if(Array.isArray(s)&&"length"===f||p(s[f],y)){const e=h&&t(y),r=s[f];s[f]=e?o(y,a):y,e&&g&&n(s[f],f,s);const p=[f];let d=s;for(;d&&(!d.__handler||!1!==d.__handler(p,y,r,k));)d.__key&&d.__parent?(p.unshift(d.__key),d=d.__parent):d=null;const _=O.get(f);if(_)for(const e of _){const t=e[l],r=t&&t.get(s),n=r&&r.has(f);e.__disposed||t&&!n?_.delete(e):e!==i[0]&&(void 0!==b&&!1!==b?(u(e,b),e[c]=!0):e())}}}else s[f]=y;return!0},defineProperty(e,t,r){if("__handler"===t)throw new Error("Don't track bubble handlers");return m(t)?(!Array.isArray(s)||"length"===t)&&("value"in r&&((r={...r}).value=o(value,a)),Reflect.defineProperty(s,t,r)):Reflect.defineProperty(s,t,r)},deleteProperty:(e,t)=>(t in s&&(s[t]=void 0),Reflect.deleteProperty(e,t))});var v;return _&&(v=s,Object.getOwnPropertyNames(v).concat(Object.getPrototypeOf(v)&&e.indexOf(Object.getPrototypeOf(v).constructor.name)<0?Object.getOwnPropertyNames(Object.getPrototypeOf(v)):[]).filter((e=>"constructor"!==e&&"function"==typeof v[e]))).forEach((e=>s[e]=s[e].bind(k))),k},computed:function(e,{autoRun:t=!0,callback:r,bind:n,disableTracking:o=!1}={}){function s(t,s=[]){const u=r||a;o||(u[d]=new WeakMap),y.unshift(u),s=s.length>0?[...s,c]:[c];const i=t?t():n?e.apply(n,s):e(...s);return y.shift(),i}const c={computeAsync:s},a=(...e)=>s(null,e);return t&&a(),a},dispose:function(e){return e[o.trackerSymbol]=null,e.__disposed=!0},batch:a};const h=function(e){return Number.isInteger(Number.parseInt(e,10))?[]:{}};var g=function(e){if(!e)throw new Error("writeHandler needs a proper target !");return function(t,r){r="object"==typeof r?JSON.parse(JSON.stringify(r)):r;for(let r=0;r<t.length-1;r++){var n=t[r];void 0===e[n]&&(e[n]=h(t[r+1])),e=e[n]}e[t[t.length-1]]=r}};const{observe:_}=b;function m(e,t){e.send(JSON.stringify(t))}function O({target:e,autoExportMethods:t,stack:r=[],methods:n=[]}){return"object"==typeof e&&(t?Object.entries(e).forEach((([e,t])=>{"function"==typeof t&&(r.push(e),n.push(r.slice(0)),r.pop())})):e.__remoteMethods&&(Array.isArray(e.__remoteMethods)||(e.__remoteMethods=[e.__remoteMethods]),e.__remoteMethods.forEach((e=>{r.push(e),n.push(r.slice(0)),r.pop()}))),Object.keys(e).forEach((o=>{r.push(o),O({target:e[o],autoExportMethods:t,stack:r,methods:n}),r.pop()}))),n}var k={server:function(e){return e.host=(t,r)=>{const n=(r=Object.assign({},{deep:!0,batch:!0,bubble:!0},r||{})).autoExportMethods,o=_(t||{},r);return o.__handler=(t,r,n)=>{e.clients.forEach((e=>{1===e.readyState&&m(e,{type:"update",keys:t,value:r,old:n})}))},e.on("connection",(e=>{e.on("message",(async t=>{if("sync"===t)m(e,{type:"sync",state:o,methods:O({target:o,autoExportMethods:n})});else{t=JSON.parse(t);let r=o,n=null,s=null;t.keys.forEach((e=>r=r[e]));try{n=await r(...t.args)}catch(e){s=e.message}m(e,{type:"response",result:n,error:s,request:t.request})}}))})),o},e},client:function(e,t={}){let r=1;const n={};return e.on("message",(o=>{"sync"===(o=JSON.parse(o)).type?(Object.assign(t,o.state),o.methods.forEach((o=>g(t)(o,(async(...t)=>new Promise(((s,c)=>{n[r]={resolve:s,reject:c},m(e,{type:"call",keys:o,args:t,request:r++})}))))))):"update"===o.type?g(t)(o.keys,o.value):(o.error?n[o.request].reject(o.error):n[o.request].resolve(o.result),delete n[o.request])})),e.on("open",(()=>e.send("sync"))),t}};export{k as default};
//# sourceMappingURL=server.mjs.map
