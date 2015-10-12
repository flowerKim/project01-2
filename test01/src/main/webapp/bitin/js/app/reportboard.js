define([
          'jquery',
          'handlebars',
          'bootstrap.min',
          'jquery.ui.widget',
          'jquery.iframe-transport',
          'jquery.fileupload',
          /*
          'canvas-to-blob.min',
          'load-image.all.min',
          'jquery.fileupload-process',
          'jquery.fileupload-image',
          'jquery.fileupload-audio',
          'jquery.fileupload-video',
          'jquery.fileupload-validate',
          */
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
				  	$('#rprevBtn').removeAttr('disabled');
				  } else {
				  	$('#rprevBtn').attr('disabled', 'disabled');
				  }
				  
				  if (result.isNextPage) {
				  	$('#rnextBtn').removeAttr('disabled');
				  } else {
				  	$('#rnextBtn').attr('disabled', 'disabled');
				  }
				  
				  $('.nameLink').click(function(event){
				  	event.preventDefault();
				  	$('.content-04 > #boardMain > #content' ).load('sub/reportboard_detail.html');
				  	moduleObj.rdetailBoard(this.getAttribute('no'));
				  	$('.my-view').css('display', '');
				  	$('.my-new').css('display', 'none');
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
			
			$('#fEmail').keyup(function(event) {
//				console.log(chkEmail);
				console.log($(this).val());
				$.getJSON(
//					contextRoot + '/json/member/existEmail.do', 
					'http://localhost:8888/member/existEmail.do',
					{
						email: $(this).val()
					},	
					function(result) {
						console.log(result.data);
						if (result.data == 'no') {
							$('#message').removeClass('my-message-warning')
													 .addClass('my-message-success')
													 .html('사용 가능합니다.');
							
						} else {
							$('#message').removeClass('my-message-success')
													 .addClass('my-message-warning')
													 .html('사용할 수 없는 이메일입니다.');
						}
				});
			});
		}, // 초기화 함수
		rInfo: function() {
			
		    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'no') {
					$('#r_writeBtn').css('display','none');
							
					}
				});
			},// 과제게시판 첫화면 쓰기버튼 조절  
		rwriteInfo: function() {
			
			 $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'yes') {
						$('#rNo').val(data.no);
						$('#rName').val(data.name);
						console.log("번호 호출 : " + data.no);
					} else {
						$('#rNo').val("회원번보필요");
						$('#rName').val("비회원");
					}
				});
		}, // 글쓰기 버튼 클릭 시 회원 정보 로딩
		rcontentInfo: function() {
			
		    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'yes') {
						if(data.no==$('#rmNo').val()){
							$('#rupdateBtn').css('display','');
							$('#rdeleteBtn').css('display','');
							$('#rcancelBtn').css('display','');
						}else{
						$('#rupdateBtn').css('display','none');
						$('#rdeleteBtn').css('display','none');
						$('#rcancelBtn').css('display','');
						}
					} else {
						$('#rupdateBtn').css('display','none');
						$('#rdeleteBtn').css('display','none');
						$('#rcancelBtn').css('display','');
					}
				});
			},// 글의 내용 클릭시 회원 정보 로딩(리플)

	};
	
});

