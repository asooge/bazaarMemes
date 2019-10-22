'use strict'
const store = require('../../store.js')

const addClass = function (meme, voteValue, memeID) {
  // return `${store.global}` + x
  const memeVote = (store.user.upvotes.find(x => x.meme_id == memeID))
  console.log(voteValue)
  console.log(memeVote)
  if (meme.upvotes.length === 0) {
    return ''
  }
  if (!memeVote) {
    return ''
  } else if (memeVote.value == voteValue) {
    return 'voted'
  }

  // .find(x => x === 86).image
}

module.exports = addClass
