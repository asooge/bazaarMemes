'use strict'
const store = require('../../store.js')

const finder = function (x) {
  // return `${store.global}` + x
  return store.memes.find(x => x.id === this.id).image

  // .find(x => x === 86).image
}

module.exports = finder
