;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_cmblue_pwa',
  urlsToCache = [
    './',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css',
    './app.css',
    './app.js',
    './images/icons/android-icon-36x36.png',
    './images/icons/android-icon-48x48.png',
    './images/icons/android-icon-72x72.png',
    './images/icons/android-icon-96x96.png',
    './images/icons/android-icon-144x144.png',
    './images/icons/android-icon-192x192.png',
    './images/icons/apple-icon-57x57.png',
    './images/icons/apple-icon-60x60.png',
    './images/icons/apple-icon-72x72.png',
    './images/icons/apple-icon-114x114.png',
    './images/icons/apple-icon-120x120.png',
    './images/icons/apple-icon-144x144.png',
    './images/icons/apple-icon-152x152.png',
    './images/icons/apple-icon-180x180.png',
    './images/icons/favicon-32x32.png',
    './images/icons/favicon-96x96.png',
    './images/icons/favicon-16x16.png',
    './images/icons/ms-icon-144x144.png',
    './images/cover.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})