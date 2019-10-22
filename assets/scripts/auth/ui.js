const store = require('../store')
const ui = require('../memes/ui')


const onSignInSuccess = function (formData) {
  store.user = formData.user
  $('#user-auth')[0].reset()
  $('#message-display').text(`Welcome, ${store.user.email}`).addClass('animated bounceInRight')
  setTimeout(() => $('#message-display').removeClass('animated bounceInRight'), 1000)
  $('#user-info').text('')
  console.log('user signed in')
  console.log(store)
  $('#sign-up, #sign-in').hide()
  $('#change-pass, #sign-out').show()
  $('#modal-center').modal('toggle')
}

const onSignInFailure = function () {
  $('#modal-title').text('Sign-in failed').addClass('animated bounceInRight')
  setTimeout(() => $('#modal-title').removeClass('animated bounceInRight'), 1000)
}

const onSignUpSuccess = function (formData) {
  $('#user-auth')[0].reset()
  $('#message-display').text(`sign up success: ${formData.user.email}! sign-in to start memeing`).addClass('animated bounceInRight')
  setTimeout(() => $('#message-display').removeClass('animated bounceInRight'), 1000)
  setTimeout(() => $('#sign-in').addClass('animated shake'), 600)
  setTimeout(() => $('#sign-in').removeClass('animated shake'), 1000)
  $('#modal-center').modal('toggle')
}

const onSignUpFailure = function () {
  $('#message-display').text(`sign up failed`)
  $('#user-auth')[0].reset()
  $('#modal-title').text('Sign up failed').addClass('animated bounceInRight')
  setTimeout(() => $('#modal-title').removeClass('animated bounceInRight'), 1000)
}

const onSignOutSuccess = function () {
  $('#user-info').text(`${store.user.email} - signed out`)
  $('#message-display').text(`sign in or sign up to play`)
  $('#change-pass, #sign-out').hide()
  $('#sign-up, #sign-in').show()
  delete store.memes
  ui.refreshMemes()
  console.log(store)
}

const onSignOutFailure = function () {
  $('#message-display').text(`unable to sign out`)
}

const onChangePasswordSuccess = function () {
  store.status.changePass = !store.status.changePass
  $('#user-auth')[0].reset()
  $('#user-info').text('change password successful')
  $('#modal-center').modal('toggle')
}

const onChangePasswordFailure = function () {
  $('#modal-title').text('Change password failed').addClass('animated bounceInRight')
  setTimeout(() => $('#modal-title').removeClass('animated bounceInRight'), 1000)
  $('#user-auth')[0].reset()
}

module.exports = {
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
