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
	var sno;
	
	return {
		lectureList: function(pageNo, pageSize) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/lectureEvaluation/list.do', 
				{
					pageNo : pageNo, 
					pageSize : pageSize
				}, 
				function(result) {
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  
				  var tbody = $('#listTable_lecture tbody');
				  $('.data-row').remove();
				  
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_lecture').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#listTable_lecture tbody').html(content);
				  
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
				});
		}, // jlistBoard
		lectureResult: function(pageNo, pageSize) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/lectureEvaluation/result.do', 
				{
					pageNo : pageNo, 
					pageSize : pageSize
				}, 
				function(result) {
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  
				  var tbody = $('#listTable_lecture_inquire tbody');
				  $('.data-row').remove();
				  
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_lecture_inquire').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#listTable_lecture_inquire tbody').html(content);
				  
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
				});
		}, // jlistBoard2
		lectureDetail: function(no) {
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
//		jdeleteBoard: function(no){
//			var moduleObj = this;
//			$.getJSON(contextRoot + '/bitin/jobBoard/delete.do?no=' + no, function(result) {
//				var data = result.data;
//				if (result.data == 'success') {
//					alert('Delete Success!');
//					moduleObj.jlistBoard(currPageNo, pageSize);
//					
//					$('#cancelBtn').click();
//					
//				} else {
//					alert('Delete Fail');
//				}
//			});
//		}, // jdeleteBoard
//		jupdateBoard: function(){
//			var moduleObj = this;
//			$.ajax(contextRoot + '/bitin/jobBoard/update.do', 
//			{
//				method: 'POST',
//				dataType: 'json',
//				data: {
//					no: $('#jNo').val(),
//					co_name: $('#jCoName').val(),
//					line_memo: $('#jLineMemo').val()
//				},
//				success: function(result) {
//					if (result.data == 'success') {
//						alert('Modify Success!');
//						moduleObj.jlistBoard(currPageNo, pageSize);
//						$('#cancelBtn').click();
//					} else {
//						alert('Modify Fail');
//					}
//				}
//			});
//		}, // jupdateBoard
		lectureinsert: function() {
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/lectureEvaluation/insert.do', 
			{	
				method: 'POST',
				dataType: 'json',
				data: {
					eno : $("#education option").index($("#education option:selected")),
					sno : sno,
					cur_name: $("#education option:selected").val(),
					yyyyMMdd1: $('#period1').val(),
					yyyyMMdd2: $('#period2').val(),
					sub_eval1: $("input[type=radio][name=understand]:checked").val(),
					sub_eval2: $("input[type=radio][name=suitability]:checked").val(),
					sub_eval3: $("input[type=radio][name=divide]:checked").val(),
					tch_eval1: $("input[type=radio][name=ready]:checked").val(),
					tch_eval2: $("input[type=radio][name=technique]:checked").val(),
					tch_eval3: $("input[type=radio][name=professionalism]:checked").val(),
					tch_eval4: $("input[type=radio][name=example]:checked").val(),
					cur_eval1: $("input[type=radio][name=satisfaction]:checked").val(),
					cur_eval2: $("input[type=radio][name=satisfy]:checked").val(),
					cur_eval3: $("input[type=radio][name=achievement]:checked").val(),
					cur_eval4: $("input[type=radio][name=recommendation]:checked").val(),
					dev1: $("input[type=radio][name=prediction]:checked").val(),
					dev2: $("input[type=radio][name=assistance]:checked").val(),
					mng_eval1: $("input[type=radio][name=environment]:checked").val(),
					mng_eval2: $("input[type=radio][name=progress]:checked").val(),
					op: $("#op").val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('평가를 완료했습니다.');
						window.open("about:blank","_self").close();
//						moduleObj.jlistBoard(1, pageSize);
//						$('#cancelBtn').click();
					} else {
						alert('Write Fail');
					}
				
				}	
			});			//alert('잘못 입력하였거나 이미 평가하였습니다.'); 
						//window.open("about:blank","_self").close();
		}, // jinsertBoard
			init: function() {
			var moduleObj = this;
			console.log('safdsa');
			
			$('#saveContent').click(function(event) {
				
				moduleObj.lectureinsert();
				
			});
			
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
		
//			$('#j_writeBtn').click(function(event) {
//			    event.preventDefault();
//			    $('.content-04 > #boardMain > #content' ).load('sub/jobboard_reg.html');
//			  });
//			
//			$('#jcancelBtn').click(function(event) {
//				 event.preventDefault();
//				 $('.content-04 > #boardMain > #content').load('sub/jobboard.html');
//			    });

//			$('#fEmail').keyup(function(event) {
//				console.log(chkEmail);
//				console.log($(this).val());
//				$.getJSON(
//					contextRoot + '/json/member/existEmail.do', 
//					'http://localhost:8888/member/existEmail.do',
//					{
//						email: $(this).val()
//					},	
//					function(result) {
//						console.log(result.data);
//						if (result.data == 'no') {
//							$('#message').removeClass('my-message-warning')
//													 .addClass('my-message-success')
//													 .html('사용 가능합니다.');
//							
//						} else {
//							$('#message').removeClass('my-message-success')
//													 .addClass('my-message-warning')
//													 .html('사용할 수 없는 이메일입니다.');
//						}
//				});
//			});
		}, // 초기화 함수
			lectureInfo: function() {
				$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'yes') {
						sno = data.no;
						console.log("번호 호출 : " + data.no);
					} else {
						sno= 0;
					}
				});
				},// 자유게시판 첫화면 쓰기버튼 조절  
	};
	
});



