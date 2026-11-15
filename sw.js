var CACHE='ft-v3';
var CDN=['https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js','https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Money%20bag/3D/money_bag_3d.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(CDN.map(function(u){return c.add(u).catch(function(){}))}))})});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return k===CACHE?null:caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
if(e.request.method!=='GET')return;
var u=new URL(e.request.url);
if(u.origin===location.origin){
e.respondWith(fetch(e.request).then(function(r){if(r.ok){var cl=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cl)})}return r}).catch(function(){return caches.match(e.request)}));
}else{
e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(resp){if(resp.ok){var cl=resp.clone();caches.open(CACHE).then(function(c){c.put(e.request,cl)})}return resp})}));
}
});
