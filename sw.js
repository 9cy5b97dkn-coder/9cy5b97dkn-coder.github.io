const C='ft-v1';
const A=['./','./FinTrack.html','./index.html','./manifest.json',
'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js',
'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Money%20bag/3D/money_bag_3d.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.allSettled(A.map(function(u){return c.add(u)}));
  }).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}));
  }).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(hit){
    return hit||fetch(e.request).then(function(r){
      if(r&&r.status===200&&(e.request.url.startsWith(self.location.origin)||e.request.url.indexOf('cdn.jsdelivr.net')>-1)){
        var cl=r.clone();caches.open(C).then(function(c){c.put(e.request,cl)});
      }
      return r;
    }).catch(function(){return hit});
  }));
});
