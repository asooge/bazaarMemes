const store = require('../store')


const onSignInSuccess = function (formData) {
  store.user = formData.user
  $('#user-auth')[0].reset()
  $('#message-display').text(`signed in as: ${store.user.email}`)
  console.log('user signed in')
  console.log(store)
  $('#sign-up, #sign-in').hide()
  $('#change-pass, #sign-out').show()
  $('#modal-center').modal('toggle')
}

const onSignUpSuccess = function (formData) {
  $('#user-auth')[0].reset()
  $('#message-display').text(`sign up success: ${formData.user.email}`).css('font-weight', 'bold')
  $('#modal-center').modal('toggle')
}

const onSignUpFailure = function () {
  $('#message-display').text(`sign up failed`)
  $('#user-auth')[0].reset()
}

const onSignOutSuccess = function () {
  $('#user-info').text(`${store.user.email} - signed out`)
  $('#message-display').text(`sign in or sign up to play`)
  $('#change-pass, #sign-out').hide()
  $('#sign-up, #sign-in').show()
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
  $('#user-info').text('change password failed')
  $('#user-auth')[0].reset()
}

module.exports = {
  onSignInSuccess,
  onSignUpSuccess,
  onSignUpFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
