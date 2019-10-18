const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')


const showMemes = function () {
  api.getMyMemes()
    .then(ui.displayMemes)
    .catch(console.error)
}

const generateMeme = function (event) {
  event.preventDefault()
  console.log('generate button')
  console.log(event.target)
  const formData = getFormFields(event.target)
//   const inputData = event.target.form
//   const memeData = `{
//     "meme": {
//       'image': "${inputData[0].value.toString()}",
//       'text_1': "${inputData[1].value.toString()}",
//       'font_size_1': "${inputData[2].value.toString()}",
//       'text_2': "${inputData[3].value.toString()}",
//       'font_size_2': "${inputData[4].value.toString()}"}
// }`
  console.log(formData)
  // console.log(memeData)

  // console.log(event.target.form[0].value)
  // console.log(event.target.form[1].value)
  // console.log(event.target.form[2].value)
  // console.log(event.target.form[3].value)
  // console.log(event.target.form[4].value)

  api.postMeme(formData)
    .then(console.log)
    .catch(console.error)
}

module.exports = {
  showMemes,
  generateMeme
}
