'use strict'

const events = require('./auth/events')
const memeEvents = require('./memes/events')

$(() => {
  $('#sign-up').on('click', events.clickSignUp)
  $('#sign-in').on('click', events.clickSignIn)
  $('#sign-out').on('click', events.clickSignOut)
  $('#change-pass').on('click', events.clickChangePass)
  $('#user-auth').on('submit', events.onSubmit)
  $('#meme-button').on('click', memeEvents.showMemes)
})
