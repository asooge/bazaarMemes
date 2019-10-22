const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const showMemes = function () {
  store.global = false
  api.getMyMemes()
    .then(ui.displayMemes)
    .then(activateButtons)
    .then(ui.scrollToMemes)
    .catch(console.error)
}

const showGlobalMemes = function () {
  store.global = true
  api.getGlobalMemes()
    .then(ui.displayMemes)
    .then(activateButtons)
    .then(ui.scrollToMemes)
    .catch(console.error)
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
  console.log(data)
  const upvoteLocation = store.user.upvotes.indexOf(store.user.upvotes.find(x => x.id == data.upvote.id))
  console.log('upvote location is: ' + upvoteLocation)
  if (upvoteLocation >= 0) {
    store.user.upvotes.splice(upvoteLocation, 1)
    store.user.upvotes.push({id: data.upvote.id, value: data.upvote.value, user_id: data.upvote.user.id, meme_id: data.upvote.meme.id})
    console.log(store)
  } else {
    store.user.upvotes.push({id: data.upvote.id, value: data.upvote.value, user_id: data.upvote.user.id, meme_id: data.upvote.meme.id})
    console.log(store)
  }
}

const executeVote = function (event) {
  console.log(event)
  const voteValue = event.currentTarget.dataset.value
  console.log(voteValue)
  const memeID = event.currentTarget.dataset.id
  console.log(memeID)
  const upvote = store.user.upvotes.find(x => x.meme_id == memeID)
  let upvoteID = ''
  if (upvote) {
    upvoteID = upvote.id
  }
  console.log(upvoteID)
  if (!upvote) {
    api.createUpvote(memeID, voteValue)
      .then(updateUserVotes)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  } else {
    api.updateUpvote(memeID, voteValue, upvoteID)
      .then(updateUserVotes)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .then(console.log)
      .catch(console.error)
  }
}

const submitComment = function (event) {
  event.preventDefault()
  console.log('submit comment')
  const formData = getFormFields(event.target)
  console.log(formData)
  if (store.global === true) {
    api.createComment(formData)
      .then(console.log)
      .then(api.getGlobalMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  } else {
    api.createComment(formData)
      .then(console.log)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  }
}

const generateMeme = function (event) {
  event.preventDefault()
  console.log('generate button')
  console.log(event.target)
  const formData = getFormFields(event.target)
//   const inputData = event.target.form
//   const memeData = `{
//     "meme": {
//       'image': "${inputData[0].value.toString()}",
//       'text_1': "${inputData[1].value.toString()}",
//       'font_size_1': "${inputData[2].value.toString()}",
//       'text_2': "${inputData[3].value.toString()}",
//       'font_size_2': "${inputData[4].value.toString()}"}
// }`
  console.log(formData)
  // console.log(memeData)

  // console.log(event.target.form[0].value)
  // console.log(event.target.form[1].value)
  // console.log(event.target.form[2].value)
  // console.log(event.target.form[3].value)
  // console.log(event.target.form[4].value)

  api.postMeme(formData)
    .then(console.log)
    .then(api.getMyMemes)
    .then(ui.displayMemes)
    .then(activateButtons)
    .then(ui.scrollToMemes)
    .then($('#meme-generator0')[0].reset())
    .then($('#image-preview0').attr('src', ''))
    .catch(console.error)
}

const finalizeMemeUpdate = function (event) {
  event.preventDefault()
  console.log('finalize update meme button')
  const memeID = event.target.dataset.id
  console.log(memeID)
  const formData = getFormFields(event.target)
  console.log(formData)
  if (store.global === true) {
    api.updateMeme(formData, memeID)
      .then(console.log)
      .then(api.getGlobalMemes)
      .then(ui.onUpdateSuccess(memeID))
      .then(ui.displayMemes)
      .then(activateButtons)
      .then(console.log('memeID'))

      .catch(console.error)
  } else {
    api.updateMeme(formData, memeID)
      .then(console.log)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .then(ui.onUpdateSuccess(memeID))
      .catch(console.error)
  }
}

const deleteMeme = function (event) {
  console.log('deleteMeme', event.target.dataset.id)
  const id = event.target.dataset.id
  if (store.global === true) {
    api.destroyMeme(id)
      .then(api.getGlobalMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  } else {
    api.destroyMeme(id)
      .then(api.getMyMemes)
      .then(ui.displayMemes)
      .then(activateButtons)
      .catch(console.error)
  }
}

// const updateMeme = function (event) {
//   console.log('updateMeme')
//   console.log(event)
// }

module.exports = {
  showMemes,
  generateMeme,
  showGlobalMemes
}
