import e from"wretch";import{normaliz as t}from"normaliz";const r="__requests__",o=(e,t)=>`${e}@${t}`,n=e=>e,c={read(e,t){const r={};return Object.entries(e).forEach((([e,o])=>{r[e]={},o.forEach((o=>{r[e][o]=t[e]&&t[e][o]||null}))})),r},write(e,t){Object.entries(e).forEach((([e,r])=>{t[e]||(t[e]={}),Object.entries(r).forEach((([r,o])=>{t[e][r]&&"object"==typeof t[e][r]&&"object"==typeof o?Object.entries(o).forEach((([o,n])=>{t[e][r][o]=n})):t[e][r]=o}))}))}};function u(t,{store:c,client:u=e(),beforeRequest:s=n,afterRequest:i=n,rootKey:l=r,serialize:f=o,bodyType:a="json",policy:y="cache-first"}){const h=s(u.url(t)),b=f("get",h._url);c[l]||(c[l]={});const d=c[l][b],p="network-only"!==y&&d||null;function j(){return h.get()[a]((e=>i(e))).then((e=>(c[l][b]=e,e)))}const m="cache-first"===y&&p?null:j();return{data:p,refetch:j,future:m}}function s(u,{store:s,normalize:i,client:l=e(),beforeRequest:f=n,afterRequest:a=n,rootKey:y=r,serialize:h=o,bodyType:b="json",policy:d="cache-first"}){const p=f(l.url(u)),j=h("get",p._url);s[y]||(s[y]={});const m=s[y][j],q="network-only"!==d&&m&&c.read(m,s)||null;function z(){return p.get()[b]((e=>a(e))).then((e=>{const r=t(e,i);s[y][j]=Object.entries(r).reduce(((e,[t,r])=>(e[t]=Object.keys(r),e)),{}),c.write(r,s);return c.read(s[y][j],s)}))}const R="cache-first"===d&&q?null:z();return{data:q,refetch:z,future:R}}function i(e,t,r){return e?null!==r?e[t]&&e[t][r]:e[t]&&Object.values(e[t]):e}function l(e,t,{id:r=null,store:o,normalize:n,client:c,beforeRequest:u,afterRequest:l,serialize:f,rootKey:a,bodyType:y,policy:h="cache-first"}){const b=r&&o[e]&&o[e][r],{data:d,future:p,refetch:j}=s(t,{store:o,normalize:{schema:[],...n,entity:e},client:c,beforeRequest:u,afterRequest:l,serialize:f,rootKey:a,bodyType:y,policy:h});return{data:"network-only"!==h&&b||i(d,e,r),future:p&&p.then((t=>i(t,e,r)))||null,refetch:()=>j().then((t=>i(t,e,r)))}}export{s as normalized,u as request,l as resource};
//# sourceMappingURL=index.mjs.map
