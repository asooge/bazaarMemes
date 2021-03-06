const config = require('../config')
const store = require('./../store')

const createUpvote = function (memeID, voteValue) {
  return $.ajax({
    url: config.apiUrl + '/upvotes',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'POST',
    data: {
      "upvote": {
        "value": voteValue,
        "meme_id": memeID
      }
    }
  })
}

const updateUpvote = function (memeID, voteValue, upvoteID) {
  return $.ajax({
    url: config.apiUrl + '/upvotes/' + upvoteID,
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'PATCH',
    data: {
      "upvote": {
        "value": voteValue,
        "meme_id": memeID
      }
    }
  })
}

const getMyMemes = function () {
  return $.ajax({
    url: config.apiUrl + '/memes',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'GET'
  })
}

const getGlobalMemes = function () {
  return $.ajax({
    url: config.apiUrl + '/global',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'GET'
  })
}

const postMeme = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/memes',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'POST',
    data: formData
  })
}

const updateMeme = function (memeData, id) {
  return $.ajax({
    url: config.apiUrl + '/memes/' + id,
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'PATCH',
    data: memeData
  })
}

const destroyMeme = function (id) {
  return $.ajax({
    url: config.apiUrl + '/memes/' + id,
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'DELETE'
  })
}

const createComment = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/comments',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'POST',
    data: formData
  })
}


module.exports = {
  getMyMemes,
  postMeme,
  updateMeme,
  destroyMeme,
  createComment,
  getGlobalMemes,
  createUpvote,
  updateUpvote
}
