const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

store.status = {
  signUp: false,
  signIn: false,
  signOut: false,
  changePass: false,
  global: false,
  reset: function () {
    this.signUp = false
    this.signIn = false
    this.signOut = false
    this.changePass = false
  }
}

const resetForm = function () {
  $('.clear-auth').hide()
  $('#user-auth')[0].reset()
}

const clickSignUp = function () {
  $('#modal-title').text('Sign up')
  store.status.reset()
  store.status.signUp = true
  console.log('clickSignUp works')
  resetForm()
  $('#enter-email, #enter-password, #enter-confirm-pass').show()
}
const clickSignIn = function () {
  $('#modal-title').text('Sign in')
  store.status.reset()
  store.status.signIn = true
  console.log('clickSignIn works')
  resetForm()
  $('#enter-email, #enter-password').show()
}
const clickSignOut = function () {
  store.status.reset()
  store.status.signOut = true
  console.log('clickSignOut works')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}
const clickChangePass = function () {
  $('#modal-title').text('Change password')
  store.status.reset()
  store.status.changePass = true
  console.log('clickChangePass works')
}

const onSubmit = function (event) {
  event.preventDefault()
  console.log('onSubmit works')
  console.log(store)
  const form = event.target
  const formData = getFormFields(form)
  console.log(formData)
  if (store.status.signIn && $('#email').val() && $('#password').val()) {
    delete formData.credentials.password_confirmation
    api.signIn(formData)
      .then(ui.onSignInSuccess)
      .catch(ui.onSignInFailure)
  } else if (store.status.signUp && $('#email').val() && $('#password').val() && $('#password-confirm').val()) {
    delete formData.passwords
    api.signUp(formData)
      .then(ui.onSignUpSuccess)
      .catch(ui.onSignUpFailure)
  } else if (store.status.changePass && $('#old-pass').val() && $('#new-pass').val()) {
    delete formData.credentials
    api.changePassword(formData)
      .then(ui.onChangePasswordSuccess)
      .catch(ui.onChangePasswordFailure)
  }
}

module.exports = {
  clickSignUp,
  clickSignIn,
  clickSignOut,
  clickChangePass,
  onSubmit
}
