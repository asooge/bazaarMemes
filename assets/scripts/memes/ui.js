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
  memeEventListeners()
}

const memeEventListeners = function () {
  $('.top-text').on('input', updatePreview)
  $('.bottom-text').on('input', updatePreview)
  $('.top-text-size').on('input', updatePreview)
  $('.bottom-text-size').on('input', updatePreview)
  $('.image-url').on('input', updatePreview)
  $('.image-preview').on('error', badImagePreview)
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
  console.log(event.target.dataset.id)
  const dataID = event.target.dataset.id
  if (event.target.id === `top-text${dataID}`) {
    $(`#top-text-preview${dataID}`).text(event.target.value)
  } else if (event.target.id === `bottom-text${dataID}`) {
    $(`#bottom-text-preview${dataID}`).text(event.target.value)
  } else if (event.target.id === `top-text-size${dataID}`) {
    $(`#top-text-preview-size${dataID}`).css('font-size', `${event.target.value}vw`)
  } else if (event.target.id === `bottom-text-size${dataID}`) {
    $(`#bottom-text-preview-size${dataID}`).css('font-size', `${event.target.value}vw`)
  } else if (event.target.id === `image-url${dataID}`) {
    $('#image-preview').attr('src', event.target.value)
  }
}

module.exports = {
  displayMemes,
  updatePreview,
  badImagePreview,
  removeMeme
}
