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
				  
				  // 본인이 작성한 글만 열람할 수 있게
				  var login_memberNo = $('#hidden-member-no').val();
				  var find_memberNo = ".m" + login_memberNo;
				  console.log(find_memberNo);
				  $('#listTable_report').find(find_memberNo).attr('href', '#');
				  // 끝
				  
				  $('.reportDetail').click(function(event){
				  	event.preventDefault();
				  	$('.content-04 > #boardMain > #content' ).load('sub/bbs02_report_detail.html');
				  	moduleObj.rdetailBoard(this.getAttribute('report_no'));
				  });
				});
		}, // rlistBoard
		// 과제 게시판 상세보기
		rdetailBoard: function(no) {
			$.getJSON(contextRoot + '/bitin/reportBoard/detail.do?no=' + no, function(result) {
				var data = result.data;
				var rNo = data.no;
				var mNo = data.mno;
				$('#bbs02-dtitle').val(data.title);
				$('#bbs02-dcontent').val(data.content);
				$('#bbs02-editBtn').css('display', 'inline');

				$('#bbs02-editBtn').click(function(event) {
					event.preventDefault();
					$('#bbs02-editBtn').css('display', 'none');
					$('#bbs02-updateBtn').css('display', 'inline');
					$('#bbs02-updateCancelBtn').css('display', 'inline');
					$('#bbs02-dtitle').removeAttr('readonly');
					$('#bbs02-dcontent').removeAttr('readonly');
					$('#bbs02-dtitle').css('border', '1px solid #a7a7a7');
					$('#bbs02-dcontent').css('border', '1px solid #a7a7a7');
					$('.report-head-title').css('border-right', '0px');
				});
				$('#bbs02-updateCancelBtn').click(function(event) {
					event.preventDefault();
					$('#bbs02-editBtn').css('display', 'inline');
					$('#bbs02-updateBtn').css('display', 'none');
					$('#bbs02-updateCancelBtn').css('display', 'none');
					$('#bbs02-dtitle').attr('readonly', '');
					$('#bbs02-dcontent').attr('readonly', '');
					$('#bbs02-dtitle').css('border', '0px');
					$('#bbs02-dcontent').css('border', '0px');
					$('.report-head-title').css('border-right', '1px dashed #ddd');
					$('#bbs02-dcontent').val(data.content);
				});
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
					mno: $('#hidden-member-no').val(),
					title: $('#bbs02-title').val(),
					content: $('#bbs02-content').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('Write Success!');
						moduleObj.rlistBoard(1, pageSize);
					} else {
						alert('Write Fail');
					}
				}
			});
		}, // rinsertBoard
		// 초기화 함수 시작
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
				$('.content-04 > #boardMain > #content').load('sub/bbs02_report_list.html');
			});
			
			$('#rupdateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.rupdateBoard(); 
				$('.content-04 > #boardMain > #content').load('sub/bbs02_report_list.html');
			});
			
			// 과제 게시판 글쓰기 등록
			$('#bbs02-insertBtn').click(function(event) {
				event.preventDefault();
				moduleObj.rinsertBoard();
				$('.content-04 > #boardMain > #content').load('sub/bbs02_report_list.html');
			});
			
			$('#bbs02-cancelBtn').click(function(event) {
				event.preventDefault();
				$('.content-04 > #boardMain > #content').load('sub/bbs02_report_list.html');
			});
			
			// 과제 게시판 글쓰기
			$('#report-writeBtn').click(function(event) {
			    event.preventDefault();
			    console.log("멤버정보 " + $('#hidden-member-no').val());
			    $('.content-04 > #boardMain > #content' ).load('sub/bbs02_report_insert.html');
			  });

			
		} // 초기화 함수
	};
	
});

