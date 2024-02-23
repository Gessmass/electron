const bonjour = require('bonjour')()

bonjour.find({ type: 'http' }, (service) => {
  console.log("Found an http server :", service)
})