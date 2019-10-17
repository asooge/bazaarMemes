const store = require('../store')
const showMemesTemplate = require('../templates/meme-stream.handlebars')

const displayMemes = function (memeData) {
  console.log('displayMemes')
  store.memes = memeData.memes
  console.log(store)
  //$('#meme-stream').text(store.memes[0].image)
  //const showMemesHTML = showMemesTemplate({ memes: store.memes })
  $('#meme-stream').append(showMemesTemplate({ memes: store.memes }))
}

module.exports = {
  displayMemes
}
