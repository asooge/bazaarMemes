const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

store.status = {
  signUp: false,
  signIn: false,
  signOut: false,
  changePass: false,
  reset: function () {
    this.signUp = false
    this.signIn = false
    this.signOut = false
    this.changePass = false
  }
}

const clickSignUp = function () {
  store.status.reset()
  store.status.signUp = true
  console.log('clickSignUp works')
}
const clickSignIn = function () {
  store.status.reset()
  store.status.signIn = true
  console.log('clickSignIn works')
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
