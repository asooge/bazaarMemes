const store = require('../store')
const showMemesTemplate = require('../templates/meme-stream.handlebars')

const scrollToMemes = function () {
  $('html,body').animate({
    scrollTop: $('#meme-stream').offset().top},
    'slow')
}

const scrollToTop = function () {
  $('html,body').animate({
    scrollTop: $('#welcome').offset().top},
    'fast')
}

const youMustSignIn = function () {
  console.log('you must sign in')
  scrollToTop()
  $('#message-display').addClass('animated bounceIn')
  $('#sign-up, #sign-in').addClass('animated pulse')
  setTimeout(() => $('#message-display').removeClass('animated bounceIn'), 1000)
  setTimeout(() => $('#sign-up, #sign-in').removeClass('animated pulse'), 1000)
}

const displayMemes = function (memeData) {
  console.log('displayMemes')
  store.memes = memeData.memes.sort((x, y) => y.id - x.id)
  console.log(store.memes)
  console.log(store)
  //$('#meme-stream').text(store.memes[0].image)
  //const showMemesHTML = showMemesTemplate({ memes: store.memes })
  refreshMemes()
}

const refreshMemes = function () {
  $('#meme-stream').children().remove()
  if (store.memes) {
    $('#meme-stream').append(showMemesTemplate({ memes: store.memes, comments: store.memes.comments }))
    $('.update-meme-input').hide()
  }
  // memeEventListeners()
}

const cannotDeleteMeme = function (memeID) {
  $(`#update-message${memeID}`).text('You can only delete your own memes!').show().addClass('animated bounceInRight')

  setTimeout(() => $(`#update-message${memeID}`).removeClass('animated bounceInRight'), 1000)

  // $(`#update-message${memeID}`).fadeOut(5000)
}

const cannotUpdateMeme = function (memeID) {
  $(`#update-message${memeID}`).text('You can only update your own memes!').show().addClass('animated bounceInRight')

  setTimeout(() => $(`#update-message${memeID}`).removeClass('animated bounceInRight'), 1000)

  // $(`#update-message${memeID}`).fadeOut(5000)
}

const updateMeme = function (event) {
  console.log('updateMeme')
  console.log(event)
  const dataID = event.target.dataset.id
  console.log($(`#update-meme-input${dataID}`).attr('style'))
  if ($(`#update-meme-input${dataID}`).attr('style') === ("display: none;")) {
    $(`#update-meme-input${dataID}`).show()
  } else {
    $(`#update-meme-input${dataID}`).hide()
  }
}

const onUpdateSuccess = function (memeID) {
  setTimeout(function () { displayUpdateMessage(memeID) }, 500)
}

const displayUpdateMessage = function (memeID) {
  console.log('onUpdateSuccess')
  console.log(memeID)
  $(`#update-message${memeID}`).text('Meme update successful').show()
  $(`#update-message${memeID}`).fadeOut(5000)
}

const badImagePreview = function (event) {
  console.log('bad image')
  const dataID = event.target.dataset.id
  console.log(dataID)
  $(`#image-preview${dataID}`).attr('src', 'https://i.imgflip.com/11fjj7.jpg')
  $(`#top-text-preview${dataID}`).text('')
  $(`#bottom-text-preview${dataID}`).text('')
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
    $(`#image-preview${dataID}`).attr('src', event.target.value)
    $(`#dropdown-menu${dataID}`).val('')
  } else if (event.target.id === `dropdown-menu${dataID}`) {
    $(`#image-url${dataID}`).val(event.target.value)
    $(`#image-preview${dataID}`).attr('src', event.target.value)
  }
}

module.exports = {
  displayMemes,
  updatePreview,
  badImagePreview,
  updateMeme,
  scrollToMemes,
  onUpdateSuccess,
  youMustSignIn,
  refreshMemes,
  cannotDeleteMeme,
  cannotUpdateMeme
}
