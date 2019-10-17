const store = require('../store')

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
  console.log('clickSignUp works')
}
const clickSignIn = function () {
  console.log('clickSignIn works')
}
const clickSignOut = function () {
  console.log('clickSignOut works')
}
const clickChangePass = function () {
  console.log('clickChangePass works')
}

const onSubmit = function (event) {
  event.preventDefault()
  console.log('onSubmit works')
  console.log(store)
}

module.exports = {
  clickSignUp,
  clickSignIn,
  clickSignOut,
  clickChangePass,
  onSubmit
}
