define(['jquery', 'alertify', 'app/common'], function($, alertify) {
	return {
		init: function() {
			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', 
				function(result) {
					var data = result.state;
					if (data != 'yes') {
						$('.content-01').css('display', 'none');
						alertify.alert("정상적인 접근이 아닙니다. 로그인 화면으로 이동합니다.", 
						function (e) {
							if (e) {
								setTimeout(function () {
									window.location.href = contextRoot + '/bitin/index.html';
								}, 400)
							}
						})
					} 
				});
		}
	}
	
});