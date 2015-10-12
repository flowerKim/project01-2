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
	var num;
	
	return {
		flistBoard: function(pageNo, pageSize) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/board/list.do', 
				{
					pageNo : pageNo, 
					pageSize : pageSize
				}, 
				function(result) {
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  
				  var tbody = $('#listTable tbody');
				  $('.data-row').remove();
				  
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_free').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#listTable_free tbody').html(content);
				  
				  // 이전, 다음 버튼 처리
				  if (result.pageNo > 1) {
				  	$('#prevBtn').attr('href', '#');
				  } else {
				  	$('#prevBtn').removeAttr('href');
				  }
				  
				  if (result.isNextPage) {
				  	$('#nextBtn').attr('href', '#');
				  } else {
				  	$('#nextBtn').removeAttr('href');
				  }
				  
				  $('.nameLink').click(function(event){
				  	event.preventDefault();
				  	$('.content-04 > #boardMain > #content' ).load('sub/bbs01_free_detail.html');
				  	var detailNo = this.getAttribute('no');
				  	moduleObj.fdetailBoard(detailNo);
				  	moduleObj.replyList(1, 10, detailNo);
				  	
				  });
				});
		}, //flistBoard
		fdetailBoard: function(no) {
			var detailNo = no;
			var moduleObj = this;
			var replyName = $('#hidden-member-name').val();
			console.log("덧글 이름 : " + replyName);
			$.getJSON(contextRoot + '/bitin/board/detail.do?no=' + no, function(result) {
				var data = result.data;
				//moduleObj.fcontentInfo();
				$('#fNo').val(data.no);
				$('#fmNo').val(data.mno);
				$('.detail-member-name').text(data.name);
				$('.detail-added-date').text(data.createDate);
				$('#fCreateDate').val(data.createDate);
				$('.detail-category').text(data.category);
				$('.detail-title').text(data.title);
				$('#bbs01-content').val(data.content);
				if (data.attachFile1 == null) {
					$('.detail-filename').remove();
				} else {
					$('.c-head-filename').val(data.attachFile);
				}
				$('#writer-photo').attr('src', contextRoot + '/files/' + data.photo);
				$('#reply-name').text(replyName);
				var compareMemberNo = parseInt($('#hidden-member-no').val());
				if (compareMemberNo != data.mno) {
					$('#bbs01-updateBtn').css('display', 'none');
				}
				
				$('#f_editBtn').click(function(event) {
					event.preventDefault();
					$('.content-04 > #boardMain > #content' ).load('sub/bbs01_free_edit.html');
			  	moduleObj.feditBoard(detailNo);
				});
				
				//
//				$('#mem_No_lb').css('display', 'none');
//				$('#mem_No').css('display', 'none');
//				$('#mem_Name_lb').css('display', 'none');
//				$('#mem_Name').css('display', 'none');
//				$('#repl_No_lb').css('display', 'none');
//				$('#repl_No').css('display', 'none');
//				$('#repl_Content').css('display', 'none');
//				$('#replyInsert_Btn').css('display', 'none');
//				$('#replyUpdate_Btn').css('display', 'none');
				
			});
			
		}, // fdetailBoard
		feditBoard: function(no) {
			var detailNo = no;
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/board/detail.do?no=' + no, function(result) {
				var data = result.data;
				//moduleObj.fcontentInfo();
				$('#edit-fno').val(data.no);
				$('#edit-mno').val(data.mno);
				$('#edit-createDate').val(data.createDate);
				
				$('#edit-category').val(data.category);
				$('#edit-title').val(data.title);
				$('#edit-content').val(data.content);
				
				$('#edit-filename').val(data.attachFile);
				
			});
			
		}, // feditBoard
//		fdeleteBoard: function(no){
//			var moduleObj = this;
//			$.getJSON(contextRoot + '/bitin/board/delete.do?no=' + no, function(result) {
//				var data = result.data;
//				if (result.data == 'success') {
//					alert('Delete Success!');
//					moduleObj.flistBoard(currPageNo, pageSize);
//					
//					$('#bbs01-initialize').click();
//					
//				} else {
//					alert('Delete Fail');
//				}
//			});
//		}, // fdeleteBoard
		fupdateBoard: function(){
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/board/update.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: $('#edit-fno').val(),
					mno: parseInt($('#hidden-member-no').val()),
					title: $('#edit-title').val(),
					content: $('#edit-content').val(),
					category: $('#edit-category option:selected').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('Modify Success!');
						moduleObj.flistBoard(currPageNo, pageSize);
						$('#bbs01-initialize').click();
					} else {
						alert('Modify Fail');
					}
				}
			});
		}, // fupdateBoard
		finsertBoard: function() {
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/board/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					mno: $('#hidden-member-no').val(),
					title: $('#bbs01-title').val(),
					content: $('#bbs01-content').val(),
					category: $('#select-category option:selected').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('입력 성공');
						moduleObj.flistBoard(1, pageSize);
						$('.content-04 > #boardMain > #content').load('sub/bbs01_free_list.html');
					} else {
						alert('입력 실패');
					}
				}
			});
		}, //finsertBoard
		finit: function() {
			var moduleObj = this;
			
			$('#prevBtn').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.flistBoard(currPageNo - 1, pageSize)
			});
			
			$('#nextBtn').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.flistBoard(currPageNo + 1, pageSize)
			});
			
			$('#replyBtn').click(function(event) {
				event.preventDefault();
				$('#mem_No_lb').css('display','');
				$('#mem_No').css('display','');
				$('#mem_Name_lb').css('display', '');
				$('#mem_Name').css('display', '');
				$('#repl_No_lb').css('display','none');
				$('#repl_No').css('display','none');	
				$('#repl_Content').css('display','');
				$('#replyInsert_Btn').css('display','');
				
			});
			
			$('#deleteBtn').click(function(event) {
				event.preventDefault();
				moduleObj.fdeleteBoard($('#fNo').val());
				$('.content-04').load('sub/content_04.html');
			});
			
			$('#bbs01-updateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.fupdateBoard(); 
				$('.content-04 > #boardMain > #content').load('sub/bbs01_free_list.html');
			});
			
			$('#bbs01-insertBtn').click(function(event) {
				event.preventDefault();
				moduleObj.finsertBoard();
				$('.content-04 > #boardMain > #content').load('sub/bbs01_free_list.html');
			});
			
			// 자유 게시판 글쓰기
			$('#f_writeBtn').click(function(event) {
			    event.preventDefault();
			    $('.content-04 > #boardMain > #content' ).load('sub/bbs01_free_insert.html');
			    console.log("회원번호 : " + $('#hidden-member-no').val());
					console.log("이름 : " + $('#hidden-member-name').val());
			  });
			
//			$('#bbs01-cancelBtn').click(function(event) {
//				$('#bbs01-initialize').click();
//				event.preventDefault();
//				console.log("페이지번호는 " + pageNo + ", 페이지 사이즈는 " + pageSize);
//				moduleObj.flistBoard(pageNo, pageSize)
//			});
			
			$('#f_listBtn').click(function(event) {
				event.preventDefault();
				$('.content-04 > #boardMain > #content').load('sub/bbs01_free_list.html');
			});
			
			$('#bbs01-initialize').click(function(event) {
				 event.preventDefault();
				 $('.content-04 > #boardMain > #content').load('sub/bbs01_free_list.html');
			});
			
			$('#replyInsert_Btn').click(function(event) {
				event.preventDefault();
				moduleObj.replyInsert(num);
				$('.content-04 > #boardMain > #content' ).load('sub/freeboard_detail.html');
				moduleObj.fdetailBoard(num);
				moduleObj.replyList(1,10,num);
			});
			
			$('#replyUpdate_Btn').click(function(event) {
				event.preventDefault();
				moduleObj.replyUpdate();
				$('.content-04 > #boardMain > #content' ).load('sub/freeboard_detail.html');
				moduleObj.fdetailBoard(num);
				moduleObj.replyList(1,10,num);
				
			  	
			});
			
			$('.deleteLink').click(function(event){
			  	event.preventDefault();
				moduleObj.replyDelete(this.getAttribute('rno'));
				$('.content-04 > #boardMain > #content' ).load('sub/freeboard_detail.html');
				moduleObj.fdetailBoard(num);
				moduleObj.replyList(1,10,num);
			  });
			
			$('.getLink').click(function(event){
			  	event.preventDefault();
				moduleObj.replyDetail(this.getAttribute('rno'));
			
				$('#mem_No_lb').css('display','');
				$('#mem_No').css('display','');
				$('#repl_No_lb').css('display','');
				$('#repl_No').css('display','');
				$('#repl_Content').css('display','');
				$('#replyInsert_Btn').css('display','');
				
				
			  });
			$('#fEmail').keyup(function(event) {
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
		
//		fInfo: function() {
//			
//		    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
//					var data = info.data;
//					if (info.state == 'no') {
//					$('#f_writeBtn').css('display','none');
//							
//					}
//				});
//			},// 자유게시판 첫화면 쓰기버튼 조절  
		
		fcontentInfo: function() {
		    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
					var data = info.data;
					if (info.state == 'yes') {
						if(data.no==$('#fmNo').val()){
							$('#replyBtn').css('display','');
							$('#updateBtn').css('display','');
							$('#deleteBtn').css('display','');
							$('#cancelBtn').css('display','');
							
						}else{
						$('#replyBtn').css('display','');
						$('#updateBtn').css('display','none');
						$('#deleteBtn').css('display','none');
						$('#cancelBtn').css('display','');
						}
						$('#mem_No').val(data.no);
						$('#mem_Name').val(data.name);
//						console.log("번호 호출 : " + data.no);
					} else {
						$('#replyBtn').css('display','none');
						$('#updateBtn').css('display','none');
						$('#deleteBtn').css('display','none');
						$('#cancelBtn').css('display','');
						$('#mem_No').val("회원번보필요");
						$('#mem_Name').val("비회원");
					}
				});
			},// 글의 내용 클릭시 회원 정보 로딩(리플)
			freplInfo: function(result) {
			    $.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(info) {
						var data = info.data;
						if (info.state == 'yes') {
							for(var i in result.data){
							if(result.data[i].mno == data.no){
								$('.deleteLink[data-mno!='+data.no+']').css('display','none');
								$('.getLink[get-mno!='+data.no+']').css('text-decoration','none');
//								$('.getLink[get-mno!='+data.no+']').css('color','black');		
								$('.getLink[get-mno!='+data.no+']').removeAttr('href');
								}else{
								$('.deleteLink[data-mno!='+data.no+']').css('display','none');
								$('.getLink[get-mno!='+data.no+']').css('text-decoration','none');
//								$('.getLink[get-mno!='+data.no+']').css('color','black');
								$('.getLink[get-mno!='+data.no+']').addClass('rmAttr');
								$('.getLink[get-mno!='+data.no+']').removeAttr('href');
								}
							}
						}else{
							for(var i in result.data){
								$('.deleteLink').css('display','none');
								$('.getLink').css('text-decoration','none');
//								$('.getLink').css('color','black');
								$('.getLink').removeAttr('href');
								$('.getLink[get-mno!='+data.no+']').addClass('rmAttr');	
							}
						}
							
					});
			    return result;
				},// 글의 내용 클릭시 회원 정보 로딩(리플)	
		//***********자유게시판 리플 파트*************
		replyList: function(pageNo, pageSize, no) {
			var moduleObj = this;
			
			$.getJSON(contextRoot + '/bitin/repl/list.do?no=' + no, 
				{
					pageNo : pageNo, 
					pageSize : pageSize,
				}, 
				function(result) {
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  moduleObj.freplInfo(result);
				  var tbody = $('#table-reply tbody');
				  $('.data-row').remove();
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_reply').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#table-reply tbody').html(content);
				 
				  
				  // 이전, 다음 버튼 처리
				  if (result.pageNo > 1) {
				  	$('#prevBtn').removeAttr('disabled');
				  } else {
				  	$('#prevBtn').attr('disabled', 'disabled');
				  }
				  
				  if (result.isNextPage) {
				  	$('#nextBtn').removeAttr('disabled');
				  } else {
				  	$('#nextBtn').attr('disabled', 'disabled');
				  }
				
				});
		}, //리플 리스트 출력
		replyInsert: function(no) {
			
			var moduleObj = this;
			console.log(no);
			$.ajax(contextRoot + '/bitin/repl/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					fno: no,
					mno: $('#mem_No').val(),
					content: $('#repl_Content').val()
				},
				success: function(result) {	
					if (result.data == 'success') {
						alert('리플 입력을 성공했습니다!');
						
						$('#bbs01-initialize').click();
					} else {
						alert('리플 입력을 실패했습니다.');
					}
				}
			});
			
		},//리플 내용 입력
		replyDelete: function(no){
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/repl/delete.do?no=' + no, function(result) {
				var data = result.data;
				if (result.data == 'success') {
					alert('리플 삭제를 완료했습니다!');
//					moduleObj.replyList(currPageNo, pageSize);
				} else {
					alert('리플 삭제를 실패했습니다.');
				}
			});
		}, //리플 삭제
		replyDetail: function(no) {
			$.getJSON(contextRoot + '/bitin/repl/detail.do?no=' + no, function(result) {
				var data = result.data;
				$('#mem_No').val(data.mno);
				$('#repl_No').val(data.no);
				$('#repl_Content').val(data.content);
			});
		}, // 리플 디테일
		replyUpdate: function(){
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/repl/update.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: $('#repl_No').val(),
					content: $('#repl_Content').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('리플 수정을 완료했습니다!');
						
					} else {
						alert('리플 수정을 실패했습니다.');
					}
				}
			});
		}, // 리플 업데이트
	};
	
});








