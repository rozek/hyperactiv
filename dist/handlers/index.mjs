const r=function(r){return Number.isInteger(Number.parseInt(r,10))?[]:{}};var e={write:function(e){if(!e)throw new Error("writeHandler needs a proper target !");return function(n,t){t="object"==typeof t?JSON.parse(JSON.stringify(t)):t;for(let t=0;t<n.length-1;t++){var o=n[t];void 0===e[o]&&(e[o]=r(n[t+1])),e=e[o]}e[n[n.length-1]]=t}},debug:function(r){return r=r||console,function(e,n){const t=e.map((r=>Number.isInteger(Number.parseInt(r))?`[${r}]`:`.${r}`)).join("").substr(1);r.log(`${t} = ${JSON.stringify(n,null,"\t")}`)}},all:function(r){return Array.isArray(r)?(e,n,t)=>r.forEach((r=>r(e,n,t))):r}};export{e as default};
//# sourceMappingURL=index.mjs.map
