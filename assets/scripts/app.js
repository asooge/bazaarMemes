'use strict'

const events = require('./auth/events')
const memeEvents = require('./memes/events')
const ui = require('./memes/ui')

$(() => {
  $('#sign-up').on('click', events.clickSignUp)
  $('#sign-in').on('click', events.clickSignIn)
  $('#sign-out').on('click', events.clickSignOut)
  $('#change-pass').on('click', events.clickChangePass)
  $('#user-auth').on('submit', events.onSubmit)
  $('#meme-button').on('click', memeEvents.showMemes)
  $('#top-text').on('input', ui.updatePreview)
  $('#bottom-text').on('input', ui.updatePreview)
  $('#top-text-size').on('input', ui.updatePreview)
  $('#bottom-text-size').on('input', ui.updatePreview)
  $('#image-url').on('input', ui.updatePreview)
  $('#image-preview').on('error', ui.badImagePreview)
  $('#meme-generator').on('submit', memeEvents.generateMeme)
})
