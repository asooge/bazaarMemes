const store = require('../store')


const onSignInSuccess = function (formData) {
  store.user = formData.user
  console.log('user signed in')
  console.log(store)
}




module.exports = {
  onSignInSuccess
}
