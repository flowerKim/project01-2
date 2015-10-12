$(function() {
  var t;
  $('#popm').mouseover(function() {
      $('#x3').fadeIn("fast", "linear");
  });
  $('#popm').mouseout(function() {
      t = setTimeout(function(){
          $('#x3').fadeOut("fast", "linear");
      }, 300);
  });
  $('#x3').mouseover(function() {
      clearTimeout(t);
  });
  $('#x3').mouseleave(function() {
      $('#x3').fadeOut("fast", "linear");
  });
  // 클릭 시 스크롤 이동
  $('.header-home').click(function(event) {
    event.preventDefault();
    $('body,html').animate({scrollTop:$('.content-01').offset().top}, 2000, 'swing');
  });
  $('.header-mypage').click(function(event) {
  	event.preventDefault();
  	$('body,html').animate({scrollTop:$('.content-02').offset().top}, 2000, 'swing');
  });
  $('.header-attd').click(function(event) {
  	event.preventDefault();
  	$('body,html').animate({scrollTop:$('.content-03').offset().top}, 2000, 'swing');
  });
  $('.header-story').click(function(event) {
  	event.preventDefault();
  	$('body,html').animate({scrollTop:$('.content-04').offset().top}, 2000, 'swing');
  });
  $('.header-notice').click(function(event) {
  	event.preventDefault();
  	$('body,html').animate({scrollTop:$('.content-05').offset().top}, 2000, 'swing');
  });
  
  
});