const config = require('../config')
const store = require('./../store')

const getMyMemes = function () {
  return $.ajax({
    url: config.apiUrl + '/memes',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'GET'
  })
}

module.exports = {
  getMyMemes
}
