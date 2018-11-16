import $ from 'jquery'
let jQuery = $

function myFunction(e) {
  var offsetInfo = jQuery('#tobijas-button').offset(),
    y = e.clientY,
    clipHeight = $('#tobijas-button').height(),
    elPositionY = Math.floor(y - offsetInfo.top),
    percentageY = Math.floor(elPositionY / clipHeight * 100)

  $('#tobijas-button').css({
    'background-image':
      'linear-gradient(180deg,#fff ' +
      percentageY +
      '%,#999 ' +
      elPositionY +
      '%)',
  })
}
function assignClass() {
  $('#tobijas-button').addClass('tobijas-button-handler')
  $('.tobijas-button-handler').on('click', function() {
    $(document.body).append('<div id="overlay"></div>')
    $('#overlay').append('<div id="close-cross">+</div>')
    $(document.body).addClass('body-blocked')
    $('#close-cross').on('click', function() {
      $('#overlay').remove()
    })
  })
}

$('#tobijas-button').mousemove(myFunction)
assignClass()
