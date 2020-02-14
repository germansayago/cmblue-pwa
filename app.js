if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('registro de service worker exitoso'))
    .catch(err => console.log('error al tratar de registrar el sw', err)
    )
}