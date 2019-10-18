const store = require('../store')
const showMemesTemplate = require('../templates/meme-stream.handlebars')

const displayMemes = function (memeData) {
  console.log('displayMemes')
  store.memes = memeData.memes
  console.log(store)
  //$('#meme-stream').text(store.memes[0].image)
  //const showMemesHTML = showMemesTemplate({ memes: store.memes })
  refreshMemes()
}

const refreshMemes = function () {
  $('#meme-stream').children().remove()
  $('#meme-stream').append(showMemesTemplate({ memes: store.memes }))
}

const removeMeme = function (index) {
  console.log(store)
  console.log(index)
  const deletedMeme = store.memes.findIndex((x) => x.id == index)
  store.memes.splice(deletedMeme)
  console.log(deletedMeme)
  console.log(deletedMeme.id)
  $('#meme-stream').eq(deletedMeme).remove()
  // refreshMemes()
}

const badImagePreview = function (event) {
  console.log('bad image')
  $('#image-preview').attr('src', 'https://i.imgflip.com/11fjj7.jpg')
  $('#top-text-preview').text('')
  $('#bottom-text-preview').text('')
}

const updatePreview = function (event) {
  console.log(event.target.id)
  if (event.target.id === 'top-text') {
    $('#top-text-preview').text(event.target.value)
  } else if (event.target.id === 'bottom-text') {
    $('#bottom-text-preview').text(event.target.value)
  } else if (event.target.id === 'top-text-size') {
    $('#top-text-preview-size').css('font-size', `${event.target.value}vw`)
  } else if (event.target.id === 'bottom-text-size') {
    $('#bottom-text-preview-size').css('font-size', `${event.target.value}vw`)
  } else if (event.target.id === 'image-url') {
    $('#image-preview').attr('src', event.target.value)
  }
}

module.exports = {
  displayMemes,
  updatePreview,
  badImagePreview,
  removeMeme
}
