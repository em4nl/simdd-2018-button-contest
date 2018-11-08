import $ from 'jquery'
let jQuery = $
import { voteFor } from '../stats'

function myFunction(e) {
	var offsetInfo = jQuery("#tobijas-button").offset(),
		x = e.clientX,
		y = e.clientY,
		clipHeight = $("#tobijas-button").height(),
		clipWidth = $("#tobijas-button").width(),
		elPositionX = Math.floor(x - offsetInfo.left),
		elPositionY = Math.floor(y - offsetInfo.top),
		percentageX = Math.floor((elPositionX / clipWidth) * 100),
		percentageY = Math.floor((elPositionY / clipHeight) * 100);

	$("#tobijas-button").css({
    "background-image": "linear-gradient(180deg,#fff " + percentageY + "%,#999 " + elPositionY + "%)",
    });
}
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function assignClass() {
  $('#tobijas-button').addClass('tobijas-button-handler');
  $('.tobijas-button-handler').on("click", function(){
    voteFor('Tobija')
    $(document.body).append('<div id="overlay"></div>');
    $('#overlay').append('<div id="close-cross">+</div>')
    $(document.body).addClass('body-blocked');
      $('#close-cross').on("click", function(){
        $('#overlay').remove();
      });
    });
}

$("#tobijas-button").mousemove(myFunction);
assignClass();
