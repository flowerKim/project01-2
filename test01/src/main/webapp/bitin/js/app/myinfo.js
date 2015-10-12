define([
          'jquery',
          'app/common'
       ], function($){
	
	return {
		memberInfo: function() {
			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(result) {
				var data = result.data;
				if (result.state == 'yes') {
					console.log(data.no + " + " + data.name);
					$('#member-id').text("회원 번호 : " + data.no);
					$('#member-name').text("이름 : " + data.name);
//					$('#loginBtn').css('display', 'none');
//					$('#userInfo').css('display', '');
				} else {
					$('#member-id').text("회원 번호 : ");
					$('#member-name').text("이름 : ");
//					$('#loginBtn').css('display', '');
//					$('#userInfo').css('display', 'none');
				}
			});
		}
	}
});













