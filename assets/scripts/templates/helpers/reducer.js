'use strict'

const reducer = function (upvotes) {
  // return `${store.global}` + x
  return (upvotes.reduce((x, y) => (x) + (y.value), 0))

  // .find(x => x === 86).image
}

module.exports = reducer
