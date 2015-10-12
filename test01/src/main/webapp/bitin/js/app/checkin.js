define([
          'jquery',
          'alertify',
          'app/common'
       ], function($, alertify){
	
	return {
		attendCheck: function(){
			 var this_url = document.location.href;
			 var this_url = document.location.href;
			 
			 Date.prototype.thisDay = function() {
	        var yy = this.getFullYear().toString();
	        var MM = (this.getMonth() + 1).toString();
	        var dd = this.getDate().toString();

	        return yy +"-"+ (MM[1] ? MM : '0'+MM[0])+"-"+ (dd[1] ? dd : '0'+dd[0]);
			 }
			 var today = new Date().thisDay();
			 console.log("오늘은요 " + today);
			 $.getJSON(contextRoot + '/bitin/checkin/getTodayInfo.do?today=' + today, function(todayInfo) {
				 var data = todayInfo.data;
				 if (data == "null") {
					 $.getJSON(contextRoot + '/bitin/checkin/allMember.do', function(allMember) {
						 
						 for (var i = 0; i < allMember.data.length; i++) {
							 console.log(allMember.data[i].studentNo);
							 $.getJSON(contextRoot + '/bitin/checkin/insertToday.do', 
						  	 {
						  		 studentNo: allMember.data[i].studentNo
					  		 },
					  		 function(inputResult) {
				  		 });
							 
							 if (i == allMember.data.length -1) {
									$.getJSON(contextRoot + '/bitin/checkin/updateMyAttd.do', 
										{
											thisUrl: this_url,
											todayInfo: today
											
										}, 
										function(myattd) {
										  if (myattd.data == "success") {
										  	alert("출석 체크 완료");
										  } else {
											  alert("출석 체크 실패!!")
										  }
									});
							 }
					   } // for문 끝
						 
					 });
					 // 최초 내 데이터 쿼리문으로 Update
				 } else {
					 $.getJSON(contextRoot + '/bitin/checkin/updateMyAttd.do', 
							 {
						 thisUrl: this_url,
						 todayInfo: today
							 }, 
							 function(myattd) {
								 if (myattd.data == "success") {
									 alert("출석 체크 완료");
								 } else {
									 alert("출석 체크 실패!!")
								 }
							 });
					 console.log("널 아님!!!!!!!!!");
					 // update 쿼리문으로 데이터 입력.
				 };
				 });
			
		 }
	}//return
});	







