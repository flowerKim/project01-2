define([
          'jquery',
          'handlebars',
          'app/common'
       ], function($, handlebars){
	
	return {
		attdList : function() {
			var moduleObj = this;
			Date.prototype.dayFunc = function() {
        var yy = this.getFullYear().toString();
        var MM = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();

        return yy +"-"+ (MM[1] ? MM : '0'+MM[0])+"-"+ (dd[1] ? dd : '0'+dd[0]);
			}
			var today = new Date().dayFunc();

			$.getJSON(contextRoot + '/bitin/attd/list.do', 
				{
					today: today
				},
  			function(result) {
					var missAttd = '미체크'; 
					var nameForTime = null;
					$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
						if (info.state == 'yes') {
							nameForTime = info.data.name;
						}
						
					
						for (var i = 0; i < result.data.length; i++) {
							if (result.data[i].checkin_t == 0) {
								result.data[i].in_time = missAttd;
							}
							if (result.data[i].checkout_t == 0) {
								result.data[i].out_time = '';
							}
							if (result.data[i].sno == nameForTime) {
								$('.checkin-time').text(result.data[i].in_time);
								console.log("시간 " + result.data[i].in_time);
							} 
							
						}
	  			  var tbody = $('#table-attd');
	  			  $('.attd-data-row').remove();
	  			  
	  			  // HandlebarsJS 템플릿 사용
	  			  var source = $('#template1').html();
	  			  var template = handlebars.compile(source);
	  			  var content = template(result);
	  			  $('#table-attd tbody').html(content);
	  			  
	  			  // 출석 미체크, 지각, 21시 이전 퇴실 시 CSS 적용
	  			  for (var n = 0; n <= result.data.length; n++) {
	  			  	if ($('#table-attd tbody tr:nth-child(' + n + ') td:nth-child(2)').text() == missAttd) {
	  			  		$('#table-attd tbody tr:nth-child(' + n + ') td:nth-child(2)').css('font-size', '1.1em').css('font-weight', 'bold').css('color', 'red');
	  			  	}
	  			  	if (parseInt(($('#table-attd tbody tr:nth-child(' + n + ') td:nth-child(2)').text()).substr(0, 2)) >= 9 && 
	  			  			parseInt(($('#table-attd tbody tr:nth-child(' + n + ') td:nth-child(2)').text()).substr(3, 2)) > 10) {
	  			  		$('#table-attd tbody tr:nth-child(' + n + ') td:nth-child(2)').css('color', 'red');
							} 
	  			  }
  			  
					});
	  		});
		}
	
	};
	
});	