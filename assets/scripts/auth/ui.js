const store = require('../store')


const onSignInSuccess = function (formData) {
  store.user = formData.user
  console.log('user signed in')
  console.log(store)
}

const onSignUpSuccess = function (formData) {
  $('#message-display').text(`sign up success: ${formData.user.email}`).css('font-weight', 'bold')
}

const onSignUpFailure = function () {
  $('#message-display').text(`sign up failed`)
  $('#user-auth')[0].reset()
}



module.exports = {
  onSignInSuccess,
  onSignUpSuccess
}
