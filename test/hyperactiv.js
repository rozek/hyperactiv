!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.hyperactiv=t()}(this,function(){"use strict";const e=[],t=new WeakMap,n=e=>"object"==typeof e,u={timeout:null,queue:new Set,process(){for(const e of u.queue)e();u.queue.clear(),u.timeout=null},enqueue(e){null===u.timeout&&(u.timeout=setTimeout(u.process,0)),u.queue.add(e)}},o=function(s,c={}){const{props:i=null,ignore:r=null,batch:l=!1,deep:d=!1}=c;return t.set(s,new Map),d&&Object.entries(s).forEach(([e,t])=>{n(t)&&(s[e]=o(t,c))}),new Proxy(s,{get(n,u){if((!i||i.includes(u))&&(!r||!r.includes(u))){const n=t.get(s);n.has(u)||n.set(u,new Set),e.length&&n.get(u).add(e[0])}return s[u]},set(p,f,a){const h=t.get(s);if(s[f]===a)return!0;if(s[f]=!d||f in s||!n(a)?a:o(a,c),(!i||i.includes(f))&&(!r||!r.includes(f))&&h.has(f)){const t=h.get(f);for(const n of t)n.__disposed?t.delete(n):n!==e[0]&&(l?u.enqueue(n):n())}return!0}})};return{observe:o,computed:function(t,{autoRun:n=!0,callback:u=null}={}){const o=new Proxy(t,{apply(t,n,s){const c=(c=null)=>{e.unshift(u||o);const i=c?c():t.apply(n,s);return e.shift(),i};return s.push({computeAsync:e=>c(e)}),c()}});return n&&o(),o},dispose:e=>e.__disposed=!0}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJhY3Rpdi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbXB1dGVkU3RhY2sgPSBbXVxuY29uc3Qgb2JzZXJ2ZXJzTWFwID0gbmV3IFdlYWtNYXAoKVxuXG5jb25zdCBpc09iaiA9IG8gPT4gdHlwZW9mIG8gPT09ICdvYmplY3QnXG5cbmNvbnN0IGNvbXB1dGVkID0gZnVuY3Rpb24oZnVuLCB7IGF1dG9SdW4gPSB0cnVlLCBjYWxsYmFjayA9IG51bGwgfSA9IHt9KSB7XG4gICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoZnVuLCB7XG4gICAgICAgIGFwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJnc0xpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHBlcmZvcm1Db21wdXRhdGlvbiA9IChmdW4gPSBudWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZWRTdGFjay51bnNoaWZ0KGNhbGxiYWNrIHx8IHByb3h5KVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1biA/IGZ1bigpIDogdGFyZ2V0LmFwcGx5KHRoaXNBcmcsIGFyZ3NMaXN0KVxuICAgICAgICAgICAgICAgIGNvbXB1dGVkU3RhY2suc2hpZnQoKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXJnc0xpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgY29tcHV0ZUFzeW5jOiB0YXJnZXQgPT4gcGVyZm9ybUNvbXB1dGF0aW9uKHRhcmdldClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBwZXJmb3JtQ29tcHV0YXRpb24oKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBpZihhdXRvUnVuKSBwcm94eSgpXG4gICAgcmV0dXJuIHByb3h5XG59XG5cbmNvbnN0IGRpc3Bvc2UgPSBfID0+IF8uX19kaXNwb3NlZCA9IHRydWVcblxuY29uc3QgYmF0Y2hlciA9IHtcbiAgICB0aW1lb3V0OiBudWxsLFxuICAgIHF1ZXVlOiBuZXcgU2V0KCksXG4gICAgcHJvY2VzcygpIHtcbiAgICAgICAgZm9yKGNvbnN0IHRhc2sgb2YgYmF0Y2hlci5xdWV1ZSkgdGFzaygpXG4gICAgICAgIGJhdGNoZXIucXVldWUuY2xlYXIoKVxuICAgICAgICBiYXRjaGVyLnRpbWVvdXQgPSBudWxsXG4gICAgfSxcbiAgICBlbnF1ZXVlKHRhc2spIHtcbiAgICAgICAgaWYoYmF0Y2hlci50aW1lb3V0ID09PSBudWxsKVxuICAgICAgICAgICAgYmF0Y2hlci50aW1lb3V0ID0gc2V0VGltZW91dChiYXRjaGVyLnByb2Nlc3MsIDApXG4gICAgICAgIGJhdGNoZXIucXVldWUuYWRkKHRhc2spXG4gICAgfVxufVxuXG5jb25zdCBvYnNlcnZlID0gZnVuY3Rpb24ob2JqLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICAgIHByb3BzID0gbnVsbCwgaWdub3JlID0gbnVsbCwgYmF0Y2ggPSBmYWxzZSwgZGVlcCA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnNcbiAgICBvYnNlcnZlcnNNYXAuc2V0KG9iaiwgbmV3IE1hcCgpKVxuXG4gICAgZGVlcCAmJiBPYmplY3QuZW50cmllcyhvYmopLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcbiAgICAgICAgaWYoaXNPYmoodmFsKSkgb2JqW2tleV0gPSBvYnNlcnZlKHZhbCwgb3B0aW9ucylcbiAgICB9KVxuXG4gICAgcmV0dXJuIG5ldyBQcm94eShvYmosIHtcbiAgICAgICAgZ2V0KF8sIHByb3ApIHtcbiAgICAgICAgICAgIGlmKCghcHJvcHMgfHwgcHJvcHMuaW5jbHVkZXMocHJvcCkpICYmICghaWdub3JlIHx8ICFpZ25vcmUuaW5jbHVkZXMocHJvcCkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXJNYXAgPSBvYnNlcnZlcnNNYXAuZ2V0KG9iailcbiAgICAgICAgICAgICAgICBpZighb2JzZXJ2ZXJNYXAuaGFzKHByb3ApKVxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlck1hcC5zZXQocHJvcCwgbmV3IFNldCgpKVxuICAgICAgICAgICAgICAgIGlmKGNvbXB1dGVkU3RhY2subGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlck1hcC5nZXQocHJvcCkuYWRkKGNvbXB1dGVkU3RhY2tbMF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvYmpbcHJvcF1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0KF8sIHByb3AsIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlck1hcCA9IG9ic2VydmVyc01hcC5nZXQob2JqKVxuXG4gICAgICAgICAgICBpZihvYmpbcHJvcF0gPT09IHZhbHVlKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgb2JqW3Byb3BdID0gZGVlcCAmJiAhKHByb3AgaW4gb2JqKSAmJiBpc09iaih2YWx1ZSkgPyBvYnNlcnZlKHZhbHVlLCBvcHRpb25zKSA6IHZhbHVlXG5cbiAgICAgICAgICAgIGlmKCghcHJvcHMgfHwgcHJvcHMuaW5jbHVkZXMocHJvcCkpICYmICghaWdub3JlIHx8ICFpZ25vcmUuaW5jbHVkZXMocHJvcCkpKSB7XG4gICAgICAgICAgICAgICAgaWYob2JzZXJ2ZXJNYXAuaGFzKHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlcGVuZGVudHMgPSBvYnNlcnZlck1hcC5nZXQocHJvcClcbiAgICAgICAgICAgICAgICAgICAgZm9yKGNvbnN0IGRlcGVuZGVudCBvZiBkZXBlbmRlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkZXBlbmRlbnQuX19kaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVudHMuZGVsZXRlKGRlcGVuZGVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkZXBlbmRlbnQgIT09IGNvbXB1dGVkU3RhY2tbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihiYXRjaCkgYmF0Y2hlci5lbnF1ZXVlKGRlcGVuZGVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGRlcGVuZGVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG9ic2VydmUsXG4gICAgY29tcHV0ZWQsXG4gICAgZGlzcG9zZVxufSJdLCJuYW1lcyI6WyJjb21wdXRlZFN0YWNrIiwib2JzZXJ2ZXJzTWFwIiwiV2Vha01hcCIsImlzT2JqIiwibyIsImJhdGNoZXIiLCJ0aW1lb3V0IiwicXVldWUiLCJTZXQiLCJbb2JqZWN0IE9iamVjdF0iLCJ0YXNrIiwiY2xlYXIiLCJzZXRUaW1lb3V0IiwicHJvY2VzcyIsImFkZCIsIm9ic2VydmUiLCJvYmoiLCJvcHRpb25zIiwicHJvcHMiLCJpZ25vcmUiLCJiYXRjaCIsImRlZXAiLCJzZXQiLCJNYXAiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImtleSIsInZhbCIsIlByb3h5IiwiXyIsInByb3AiLCJpbmNsdWRlcyIsIm9ic2VydmVyTWFwIiwiZ2V0IiwiaGFzIiwibGVuZ3RoIiwidmFsdWUiLCJkZXBlbmRlbnRzIiwiZGVwZW5kZW50IiwiX19kaXNwb3NlZCIsImRlbGV0ZSIsImVucXVldWUiLCJjb21wdXRlZCIsImZ1biIsImF1dG9SdW4iLCJjYWxsYmFjayIsInByb3h5IiwidGFyZ2V0IiwidGhpc0FyZyIsImFyZ3NMaXN0IiwicGVyZm9ybUNvbXB1dGF0aW9uIiwidW5zaGlmdCIsInJlc3VsdCIsImFwcGx5Iiwic2hpZnQiLCJwdXNoIiwiY29tcHV0ZUFzeW5jIiwiZGlzcG9zZSJdLCJtYXBwaW5ncyI6InNMQUFBLE1BQU1BLEtBQ0FDLEVBQWUsSUFBSUMsUUFFbkJDLEVBQVFDLEdBQWtCLGlCQUFOQSxFQXlCcEJDLEdBQ0ZDLFFBQVMsS0FDVEMsTUFBTyxJQUFJQyxJQUNYQyxVQUNJLElBQUksTUFBTUMsS0FBUUwsRUFBUUUsTUFBT0csSUFDakNMLEVBQVFFLE1BQU1JLFFBQ2ROLEVBQVFDLFFBQVUsTUFFdEJHLFFBQVFDLEdBQ21CLE9BQXBCTCxFQUFRQyxVQUNQRCxFQUFRQyxRQUFVTSxXQUFXUCxFQUFRUSxRQUFTLElBQ2xEUixFQUFRRSxNQUFNTyxJQUFJSixLQUlwQkssRUFBVSxTQUFTQyxFQUFLQyxNQUMxQixNQUFNQyxNQUNGQSxFQUFRLEtBQUlDLE9BQUVBLEVBQVMsS0FBSUMsTUFBRUEsR0FBUSxFQUFLQyxLQUFFQSxHQUFPLEdBQ25ESixFQU9KLE9BTkFoQixFQUFhcUIsSUFBSU4sRUFBSyxJQUFJTyxLQUUxQkYsR0FBUUcsT0FBT0MsUUFBUVQsR0FBS1UsUUFBUSxFQUFFQyxFQUFLQyxNQUNwQ3pCLEVBQU15QixLQUFNWixFQUFJVyxHQUFPWixFQUFRYSxFQUFLWCxNQUdwQyxJQUFJWSxNQUFNYixHQUNiUCxJQUFJcUIsRUFBR0MsR0FDSCxLQUFLYixHQUFTQSxFQUFNYyxTQUFTRCxPQUFZWixJQUFXQSxFQUFPYSxTQUFTRCxJQUFRLENBQ3hFLE1BQU1FLEVBQWNoQyxFQUFhaUMsSUFBSWxCLEdBQ2pDaUIsRUFBWUUsSUFBSUosSUFDaEJFLEVBQVlYLElBQUlTLEVBQU0sSUFBSXZCLEtBQzNCUixFQUFjb0MsUUFDYkgsRUFBWUMsSUFBSUgsR0FBTWpCLElBQUlkLEVBQWMsSUFHaEQsT0FBT2dCLEVBQUllLElBRWZ0QixJQUFJcUIsRUFBR0MsRUFBTU0sR0FDVCxNQUFNSixFQUFjaEMsRUFBYWlDLElBQUlsQixHQUVyQyxHQUFHQSxFQUFJZSxLQUFVTSxFQUFPLE9BQU8sRUFHL0IsR0FGQXJCLEVBQUllLElBQVFWLEdBQVVVLEtBQVFmLElBQVFiLEVBQU1rQyxHQUFtQ0EsRUFBMUJ0QixFQUFRc0IsRUFBT3BCLEtBRS9EQyxHQUFTQSxFQUFNYyxTQUFTRCxPQUFZWixJQUFXQSxFQUFPYSxTQUFTRCxLQUM3REUsRUFBWUUsSUFBSUosR0FBTyxDQUN0QixNQUFNTyxFQUFhTCxFQUFZQyxJQUFJSCxHQUNuQyxJQUFJLE1BQU1RLEtBQWFELEVBQ2hCQyxFQUFVQyxXQUNURixFQUFXRyxPQUFPRixHQUNaQSxJQUFjdkMsRUFBYyxLQUMvQm9CLEVBQU9mLEVBQVFxQyxRQUFRSCxHQUNyQkEsS0FLckIsT0FBTyxhQU1meEIsUUFBQUEsRUFDQTRCLFNBdEZhLFNBQVNDLEdBQUtDLFFBQUVBLEdBQVUsRUFBSUMsU0FBRUEsRUFBVyxVQUN4RCxNQUFNQyxFQUFRLElBQUlsQixNQUFNZSxHQUNwQm5DLE1BQU11QyxFQUFRQyxFQUFTQyxHQUNuQixNQUFNQyxFQUFxQixDQUFDUCxFQUFNLFFBQzlCNUMsRUFBY29ELFFBQVFOLEdBQVlDLEdBQ2xDLE1BQU1NLEVBQVNULEVBQU1BLElBQVFJLEVBQU9NLE1BQU1MLEVBQVNDLEdBRW5ELE9BREFsRCxFQUFjdUQsUUFDUEYsR0FPWCxPQUpBSCxFQUFTTSxNQUNMQyxhQUFjVCxHQUFVRyxFQUFtQkgsS0FHeENHLE9BSWYsT0FER04sR0FBU0UsSUFDTEEsR0FxRVBXLFFBbEVZNUIsR0FBS0EsRUFBRVUsWUFBYSJ9
