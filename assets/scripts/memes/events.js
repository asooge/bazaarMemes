const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const showMemes = function () {
  store.global = false
  if (store.user) {
    api.getMyMemes()
      .then(ui.displayMemes)
      .then(activateButtons)
      .then(ui.scrollToMemes)
      .catch(console.error)
  } else {
    ui.youMustSignIn()
  }
}

const showGlobalMemes = function () {
  store.global = true
  if (store.user) {
    api.getGlobalMemes()
      .then(ui.displayMemes)
      .then(activateButtons)
      .then(ui.scrollToMemes)
      .catch(console.error)
  } else {
    ui.youMustSignIn()
  }
}

const activateButtons = function () {
  $('.delete-meme').on('click', deleteMeme)
  $('.update-meme').on('click', ui.updateMeme)
  $('.top-text').on('input', ui.updatePreview)
  $('.bottom-text').on('input', ui.updatePreview)
  $('.top-text-size').on('input', ui.updatePreview)
  $('.bottom-text-size').on('input', ui.updatePreview)
  $('.image-url').on('input change', ui.updatePreview)
  $('.image-preview').on('error', ui.badImagePreview)
  $('.finalize-update-meme').on('submit', finalizeMemeUpdate)
  $('.comment').on('submit', submitComment)
  $('.upvote').on('click', executeVote)
}

const updateUserVotes = function (data) {
  // console.log(data)
  const upvoteLocation = store.user.upvotes.indexOf(store.user.upvotes.find(x => x.id == data.upvote.id))
  // console.log('upvote location is: ' + upvoteLocation)
  if (upvoteLocation >= 0) {
    store.user.upvotes.splice(upvoteLocation, 1)
    store.user.upvotes.push({id: data.upvote.id, value: data.upvote.value, user_id: data.upvote.user.id, meme_id: data.upvote.meme.id})
    // console.log(store)
  } else {
    store.user.upvotes.push({id: data.upvote.id, value: data.upvote.value, user_id: data.upvote.user.id, meme_id: data.upvote.meme.id})
    // console.log(store)
  }
}

const updateUserMemes = function (data) {
  // console.log('updateUserMemes')
  // console.log(data)
  store.user.memes.push(data.meme)
}

const executeVote = function (event) {
  // console.log(event)
  const voteValue = event.currentTarget.dataset.value
  // console.log(voteValue)
  const memeID = event.currentTarget.dataset.id
  // console.log(memeID)
  const upvote = store.user.upvotes.find(x => x.meme_id == memeID)
  let upvoteID = ''
  if (upvote) {
    upvoteID = upvote.id
  }
  // console.log(upvoteID)
  if (!upvote) {
    if (store.global === true) {
      api.createUpvote(memeID, voteValue)
        .then(updateUserVotes)
        .then(api.getGlobalMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        .catch(console.error)
    } else {
      api.createUpvote(memeID, voteValue)
        .then(updateUserVotes)
        .then(api.getMyMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        .catch(console.error)
    }
  } else {
    if (store.global === true) {
      api.updateUpvote(memeID, voteValue, upvoteID)
        .then(updateUserVotes)
        .then(api.getGlobalMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        // .then(console.log)
        .catch(console.error)
    } else {
      api.updateUpvote(memeID, voteValue, upvoteID)
        .then(updateUserVotes)
        .then(api.getMyMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        // .then(console.log)
        .catch(console.error)
    }
  }
}

const submitComment = function (event) {
  event.preventDefault()
  // console.log('submit comment')
  const formData = getFormFields(event.target)
  // console.log(formData)
  if (store.global === true) {
    api.createComment(formData)
      // .then(console.log)
      .then(api.getGlobalMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  } else {
    api.createComment(formData)
      // .then(console.log)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  }
}

const generateMeme = function (event) {
  event.preventDefault()
  if (store.user) {
    // console.log('generate button')
    // console.log(event.target)
    const formData = getFormFields(event.target)
    // console.log(formData)

    api.postMeme(formData)
      .then(updateUserMemes)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .then(ui.scrollToMemes)
      .then($('#meme-generator0')[0].reset())
      .then($('#top-text-preview0, #bottom-text-preview0').text(''))
      // .then($('#image-preview0').attr('src', ''))
      .catch(console.error)
  } else {
    ui.youMustSignIn()
  }
}

const finalizeMemeUpdate = function (event) {
  event.preventDefault()
  // console.log('finalize update meme button')
  const memeID = event.target.dataset.id
  // console.log(memeID)
  // console.log(store.user.memes)
  // console.log(store.user.memes.find(x => x.id == memeID))
  if (store.user.memes && store.user.memes.find(x => x.id == memeID)) {
    const formData = getFormFields(event.target)
    // console.log(formData)
    if (store.global === true) {
      api.updateMeme(formData, memeID)
        // .then(console.log)
        .then(api.getGlobalMemes)
        .then(ui.onUpdateSuccess(memeID))
        .then(ui.displayMemes)
        .then(activateButtons)
        // .then(console.log('memeID'))

        .catch(console.error)
    } else {
      api.updateMeme(formData, memeID)
        // .then(console.log)
        .then(api.getMyMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        .then(ui.onUpdateSuccess(memeID))
        .catch(console.error)
    }
  } else {
    ui.cannotUpdateMeme(memeID)
  }
}

const updateSort = function (event) {
  // console.log(event)
  store.sort = event.target.value
  // console.log(store)
}

const deleteMeme = function (event) {
  // console.log('deleteMeme', event.target.dataset.id)
  // console.log(store)
  const memeID = event.target.dataset.id
  // console.log(store.user.memes)
  // console.log(store.user.memes.find(x => x.id == memeID))
  if (store.user.memes && store.user.memes.find(x => x.id == memeID)) {
    if (store.global === true) {
      api.destroyMeme(memeID)
        .then(api.getGlobalMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        .catch(console.error)
    } else {
      api.destroyMeme(memeID)
        .then(api.getMyMemes)
        .then(ui.displayMemes)
        .then(activateButtons)
        .catch(console.error)
    }
  } else {
    ui.cannotDeleteMeme(memeID)
  }
}

// const updateMeme = function (event) {
//   console.log('updateMeme')
//   console.log(event)
// }

module.exports = {
  showMemes,
  generateMeme,
  showGlobalMemes,
  updateSort
}
