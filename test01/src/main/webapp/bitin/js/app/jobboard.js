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
		jlistBoard: function(pageNo, pageSize) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/jobBoard/list.do', 
				{
					pageNo : pageNo, 
					pageSize : pageSize
				}, 
				function(result) {
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  
				  var tbody = $('#listTable_job tbody');
				  $('.data-row').remove();
				  
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_job').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#listTable_job tbody').html(content);
				  
				  // 이전, 다음 버튼 처리
				  if (result.pageNo > 1) {
				  	$('#jprevBtn').removeAttr('disabled');
				  } else {
				  	$('#jprevBtn').attr('disabled', 'disabled');
				  }
				  
				  if (result.isNextPage) {
				  	$('#jnextBtn').removeAttr('disabled');
				  } else {
				  	$('#jnextBtn').attr('disabled', 'disabled');
				  }
				  
				  $('.nameLink').click(function(event){
				  	event.preventDefault();
				  	$('.content-04 > #boardMain > #content' ).load('sub/jobboard_detail.html');
				  	moduleObj.jdetailBoard(this.getAttribute('no'));
				  	$('.my-view').css('display', '');
				  	$('.my-new').css('display', 'none');
				  });
				});
		}, // jlistBoard
		jdetailBoard: function(no) {
			$.getJSON(contextRoot + '/bitin/jobBoard/detail.do?no=' + no, function(result) {
				var data = result.data;
				$('#jNo').val(data.no);
				$('#jmNo').val(data.sno);
				$('#jCreateDate').val(data.createDate);
				$('#jDefDate').val(data.jday);
				$('#jName').val(data.name);
				$('#jCoName').val(data.co_name);
				$('#jLineMemo').val(data.line_memo);
			});
		}, // jdetailBoard
		jdeleteBoard: function(no){
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/jobBoard/delete.do?no=' + no, function(result) {
				var data = result.data;
				if (result.data == 'success') {
					alert('Delete Success!');
					moduleObj.jlistBoard(currPageNo, pageSize);
					
					$('#cancelBtn').click();
					
				} else {
					alert('Delete Fail');
				}
			});
		}, // jdeleteBoard
		jupdateBoard: function(){
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/jobBoard/update.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: $('#jNo').val(),
					co_name: $('#jCoName').val(),
					line_memo: $('#jLineMemo').val()
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
		}, // jupdateBoard
		jinsertBoard: function() {
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/jobBoard/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					sno: $('#jNo').val(),
					co_name: $('#jConame').val(),
					line_memo: $('#jLinememo').val(),
					jday: $('#jDifiniteDate').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('Write Success!');
						moduleObj.jlistBoard(1, pageSize);
						$('#cancelBtn').click();
					} else {
						alert('Write Fail');
					}
				}
			});
		}, // jinsertBoard
		jinit: function() {
			var moduleObj = this;
			
			$('#jprevBtn').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.jlistBoard(currPageNo - 1, pageSize)
			});
			
			$('#jnextBtn').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.jlistBoard(currPageNo + 1, pageSize)
			});	
		
			$('#jdeleteBtn').click(function(event) {
				event.preventDefault();
				moduleObj.jdeleteBoard($('#jNo').val());
				$('.content-04 > #boardMain > #content').load('sub/jobboard.html');
			});
			
			$('#jupdateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.jupdateBoard(); 
				$('.content-04 > #boardMain > #content').load('sub/jobboard.html');
			});
			
			$('#jinsertBtn').click(function(event) {
				event.preventDefault();
				moduleObj.jinsertBoard();
				$('.content-04 > #boardMain > #content').load('sub/jobboard.html');
			});
			
			// 구직 게시판 글쓰기
		
			$('#j_writeBtn').click(function(event) {
			    event.preventDefault();
			    $('.content-04 > #boardMain > #content' ).load('sub/jobboard_reg.html');
			  });
			
			$('#jcancelBtn').click(function(event) {
				 event.preventDefault();
				 $('.content-04 > #boardMain > #content').load('sub/jobboard.html');
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
		jInfo: function() {
		    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'no') {
					$('#j_writeBtn').css('display','none');
							
					}
				});
			},// 구직게시판 첫화면 쓰기버튼 조절  
		jwriteInfo: function() {	
	    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
	    	var data = info.data;
			if (info.state == 'yes') {
				$('#jNo').val(data.no);
				$('#jName').val(data.name);
				console.log("번호 호출 : " + data.no);
			} else {
				$('#jNo').val("회원번보필요");
				$('#jName').val("비회원");
			}
			});
		},// 글쓰기 버튼 클릭 시 회원 정보 로딩
		jcontentInfo: function() {
			
		    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'yes') {
						if(data.no==$('#jmNo').val()){
							$('#jupdateBtn').css('display','');
							$('#jdeleteBtn').css('display','');
							$('#jcancelBtn').css('display','');
							
						}else{
						$('#jupdateBtn').css('display','none');
						$('#jdeleteBtn').css('display','none');
						$('#jcancelBtn').css('display','');
						}
//						console.log("번호 호출 : " + data.no);
					} else {
						$('#jupdateBtn').css('display','none');
						$('#jdeleteBtn').css('display','none');
						$('#jcancelBtn').css('display','');
					}
				});
			}// 글의 내용 클릭시 회원 정보 로딩(리플)
	};
	
});



