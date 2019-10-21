'use strict'

const events = require('./auth/events')
const memeEvents = require('./memes/events')
const ui = require('./memes/ui')

$(() => {
  $('#change-pass').hide()
  $('#sign-out').hide()

  $('#sign-up').on('click', events.clickSignUp)
  $('#sign-in').on('click', events.clickSignIn)
  $('#sign-out').on('click', events.clickSignOut)
  $('#change-pass').on('click', events.clickChangePass)
  $('#user-auth').on('submit', events.onSubmit)


  $('#meme-button').on('click', memeEvents.showMemes)
  $('#global-memes').on('click', memeEvents.showGlobalMemes)

  $('.top-text').on('input', ui.updatePreview)
  $('.bottom-text').on('input', ui.updatePreview)
  $('.top-text-size').on('input', ui.updatePreview)
  $('.bottom-text-size').on('input', ui.updatePreview)
  $('.image-url').on('input change', ui.updatePreview)
  $('.image-preview').on('error', ui.badImagePreview)

  $('.meme-generator').on('submit', memeEvents.generateMeme)
  // $('.delete-meme').on('click', memeEvents.deleteMeme)
  // $('.update-meme').on('click', memeEvents.updateMeme)
})
