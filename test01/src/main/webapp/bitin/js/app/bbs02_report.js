define([
          'jquery',
          'handlebars',
          'bootstrap.min',
          'app/common'
       ], function($, handlebars){
	var currPageNo = 1;
	var pageSize = 10;
	
	return {
		
		rlistBoard: function(pageNo, pageSize) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/reportBoard/list.do', 
				{
					pageNo : pageNo, 
					pageSize : pageSize
				}, 
				function(result) {
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  
				  console.log("회원 번호 비교하기");
				  console.log('#');
				  var login_memberNo = $('#hidden-member-no').val();
				  var find_memberNo = "m" + login_memberNo;
				  console.log(find_memberNo);
				  $('.data-row').find(find_memberNo).css('font-size', '2em');
				  
				  var tbody = $('#listTable_report tbody');
				  $('.data-row').remove();
				  
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_report').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#listTable_report tbody').html(content);
				  
				  // 이전, 다음 버튼 처리
				  if (result.pageNo > 1) {
				  	$('#report-prevBtn').attr('href', '#');
				  } else {
				  	$('#report-prevBtn').removeAttr('href');
				  }
				  
				  if (result.isNextPage) {
				  	$('#report-nextBtn').attr('href', '#');
				  } else {
				  	$('#report-nextBtn').removeAttr('href');
				  }
				  
				  $('.reportDetail').click(function(event){
				  	event.preventDefault();
				  	$('.content-04 > #boardMain > #content' ).load('sub/reportboard_detail.html');
				  	moduleObj.rdetailBoard(this.getAttribute('report_no'));
				  });
				});
		}, // rlistBoard
		
		rdetailBoard: function(no) {
			$.getJSON(contextRoot + '/bitin/reportBoard/detail.do?no=' + no, function(result) {
				var data = result.data;
				$('#rNo').val(data.no);
				$('#rmNo').val(data.mno);
				$('#rCreateDate').val(data.createDate);
				$('#rName').val(data.name);
				$('#rTitle').val(data.title);
				$('#rContent').val(data.content);
				
			});
		}, // rdetailBoard
		
		rdeleteBoard: function(no){
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/reportBoard/delete.do?no=' + no, function(result) {
				var data = result.data;
				if (result.data == 'success') {
					alert('Delete Success!');
					moduleObj.rlistBoard(currPageNo, pageSize);
					
					$('#cancelBtn').click();
					
				} else {
					alert('Delete Fail');
				}
			});
		}, // rdeleteBoard
		
		rupdateBoard: function(){
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/reportBoard/update.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: $('#rNo').val(),
					name: $('#rName').val(),
					title: $('#rTitle').val(),
					content: $('#rContent').val(),
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('Modify Success!');
						moduleObj.jlistBoard(currPageNo, pageSize);
						$('#cancelBtn').click();
					} else {
						alert('Modify Fail');
					}
				}
			});
		}, // rupdateBoard
		
		rinsertBoard: function() {
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/reportBoard/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					mno: $('#rNo').val(),
					title: $('#rTitle').val(),
					content: $('#rContent').val(),
					webAddress: $('#rWebAddress').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('Write Success!');
						moduleObj.rlistBoard(1, pageSize);
						$('#cancelBtn').click();
					} else {
						alert('Write Fail');
					}
				}
			});
		}, // rinsertBoard
		rinit: function() {
			var moduleObj = this;
			
			$('#rprevBtn').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.rlistBoard(currPageNo - 1, pageSize)
			});
			
			$('#rnextBtn').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.rlistBoard(currPageNo + 1, pageSize)
			});
			
			$('#rdeleteBtn').click(function(event) {
				event.preventDefault();
				moduleObj.rdeleteBoard($('#rNo').val());
				$('.content-04 > #boardMain > #content').load('sub/reportboard.html');
			});
			
			$('#rupdateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.rupdateBoard(); 
				$('.content-04 > #boardMain > #content').load('sub/reportboard.html');
			});
			
			$('#rinsertBtn').click(function(event) {
				event.preventDefault();
				moduleObj.rinsertBoard();
				$('.content-04 > #boardMain > #content').load('sub/reportboard.html');
			});
			
			// 레포트 게시판 글쓰기
			$('#r_writeBtn').click(function(event) {
			    event.preventDefault();
			    $('.content-04 > #boardMain > #content' ).load('sub/reportboard_reg.html');
			  });

			$('#rcancelBtn').click(function(event) {
				 event.preventDefault();
				 $('.content-04 > #boardMain > #content').load('sub/reportboard.html');
			    });
			
		} // 초기화 함수
	};
	
});

