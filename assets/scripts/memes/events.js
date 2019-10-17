const api = require('./api')
const ui = require('./ui')

const showMemes = function () {
  api.getMyMemes()
    .then(ui.displayMemes)
    .catch(console.error)
}

module.exports = {
  showMemes
}
