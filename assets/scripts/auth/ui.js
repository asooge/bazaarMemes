const store = require('../store')


const onSignInSuccess = function (formData) {
  store.user = formData.user
  $('#user-auth')[0].reset()
  $('#message-display').text(`signed in as: ${store.user.email}`)
  console.log('user signed in')
  console.log(store)
}

const onSignUpSuccess = function (formData) {
  $('#user-auth')[0].reset()
  $('#message-display').text(`sign up success: ${formData.user.email}`).css('font-weight', 'bold')
}

const onSignUpFailure = function () {
  $('#message-display').text(`sign up failed`)
  $('#user-auth')[0].reset()
}

const onSignOutSuccess = function () {
  $('#user-info').text(`${store.user.email} - signed out`)
  $('#message-display').text(`sign in or sign up to play`)
}

const onSignOutFailure = function () {
  $('#message-display').text(`unable to sign out`)
}

const onChangePasswordSuccess = function () {
  store.status.changePass = !store.status.changePass
  $('#user-auth')[0].reset()
  $('#user-info').text('change password successful')
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
