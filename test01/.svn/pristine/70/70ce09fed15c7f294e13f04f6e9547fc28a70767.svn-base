define(['jquery'], function($) {
  $('#main > header').load('header.html');
  $('.content-01').load('sub/content_01.html');
  $('.content-02').load('sub/content_02.html');
  $('.content-03').load('sub/content_03_02.html');
  $('.content-04').load('sub/content_04.html');
  $('.content-05').load('sub/content_05.html');
 // $('#main > footer').load('footer.html'); 
  
  // 로그인 성공 시 트리거 이벤트
  $(document).on('login.success', function(event) {
    // 검은 배경화면 페이드 아웃 시키기
  	$('#lean_overlay').fadeOut(200);
  	$('#loginmodal').css({'display' : 'none'});
  	$('#myinfo').css({'display' : 'none'});
  	// 로그인 후 input 필드 내용 삭제하기
  	$('.txt-field input').val('');
  	// 회원 정보 로딩하기
  	var loginInfo = require('app/content_02');
  	loginInfo.memberInfo();
  });
  
  // 로그아웃 성공 시 트리거 이벤트
//  $(document).on('logout.success', function(event) {
//    $('#content').load('sub/auth.html');
//    var header = require('app/header');
//    header.loadLoginInfo();
//  });

});











