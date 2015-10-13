define([
          'jquery',
          'handlebars',
          'bootstrap.min',
          'jquery.ui.widget',
          'jquery.iframe-transport',
          'jquery.fileupload',
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
				  
				  $('.data-row').find('.rcount0').css('display', 'none');
				  
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
			$.getJSON(contextRoot + '/bitin/board/detail.do?no=' + no, function(result) {
				var data = result.data;
				//moduleObj.fcontentInfo();
				$('.detail-hidden-no').val(data.no);
//				$('#fmNo').val(data.mno);
				$('.detail-member-name').text(data.name);
				$('.detail-added-date').text(data.createDate);
				$('.detail-category').text(data.category);
				$('.detail-title').text(data.title);
				$('#bbs01-content').val(data.content);
				if (data.attachFile1 == null) {
					$('.detail-filename').remove();
				} else {
					$('.c-head-filename').val(data.attachFile);
				}
				if (data.photo != null) {
					$('#writer-photo').attr('src', contextRoot + '/files/' + data.photo);
				} else {
					$('#writer-photo').attr('src', contextRoot + '/bitin/image/anonymous.png');
				}
				
				// 덧글 입력 폼 왼쪽에 로그인한 사용자 이름
				$('#reply-name').text(replyName);
				
				var compareMemberNo = parseInt($('#hidden-member-no').val());
				if (compareMemberNo == data.mno) {
					$('#f_editBtn').css('display', 'inline');
					$('#f_deleteBtn').css('display', 'inline');
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
		fdeleteBoard: function(no){
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/board/delete.do?no=' + no, function(result) {
				var data = result.data;
				if (result.data == 'success') {
					alert('Delete Success!');
					moduleObj.flistBoard(currPageNo, pageSize);
					
					$('#bbs01-initialize').click();
					
				} else {
					alert('Delete Fail');
				}
			});
		}, // fdeleteBoard
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
			
			// 삭제 버튼
			$('#f_deleteBtn').click(function(event) {
				event.preventDefault();
				if (confirm("삭제하시겠습니까?")) {
					moduleObj.fdeleteBoard($('.detail-hidden-no').val());
					$('.content-04').load('sub/content_04.html');
				} else {
					return;
				}
			});
			
			// 수정 버튼
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
			
			// 글 작성 버튼
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
			
			// 덧글 입력
			$('#bbs01-insertReplyBtn').click(function(event) {
				event.preventDefault();
				moduleObj.replyInsert($('.detail-hidden-no').val());
			});
			
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
//					console.log("리플데이터 : ");
//					console.log(result);
					if (result.data == '') {
						$('.reply-list').css('display', 'block');
					}
					currPageNo = result.pageNo;
				  $('#pageNo').text(currPageNo);
				  moduleObj.freplInfo(result);
				  var tbody = $('#table-reply tbody');
				  $('.data-row-reply').remove();
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_reply').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#table-reply tbody').html(content);
				 
//				  // 이전, 다음 버튼 처리
//				  if (result.pageNo > 1) {
//				  	$('#prevBtn').removeAttr('disabled');
//				  } else {
//				  	$('#prevBtn').attr('disabled', 'disabled');
//				  }
//				  
//				  if (result.isNextPage) {
//				  	$('#nextBtn').removeAttr('disabled');
//				  } else {
//				  	$('#nextBtn').attr('disabled', 'disabled');
//				  }
				  console.log($('#hidden-member-no').val() + " ++++ " + $('.reply-textarea').attr('reply-member'));
				  var findNumber = ".link" + $('#hidden-member-no').val();
				  
				  $('.data-row-reply').find(findNumber).css('display', 'inline');
				  
//				  if ($('#hidden-member-no').val() != $('.reply-textarea').attr('reply-member')) {
//				  	console.log("다름");
//				  } else {
//				  	console.log("가틈");
//				  }
//				  var idname = $('.reply-edit').attr('idname');
//					console.log("idname = " + idname);
//					var rNumber = idname.substr(7);
//					console.log("idname = " + rNumber);
					
					
					// 덧글 수정
					$('.reply-edit').click(function(event) {
						event.preventDefault();
						var idname = $(this).attr('idname');
						var r_number = idname.substr(7);
						var r_number_string1 = ".reply-confirm" + r_number;
						var r_number_string2 = ".reply-textarea" + r_number;
						var r_number_string3 = ".reply-cancel" + r_number;
						var r_number_string4 = ".reply-edit" + r_number;
						var r_number_string5 = ".reply-delete" + r_number;
						$(r_number_string1).css('display', 'inline');
						$(r_number_string2).css('border', '1px solid #a9a9a9');
						$(r_number_string3).css('display', 'inline');
						$(r_number_string4).css('display', 'none');
						$(r_number_string5).css('display', 'none');
						$(r_number_string2).attr('rows', '5');
						$(r_number_string2).removeAttr('readonly');
					});
					// 덧글 수정 취소
					$('.reply-cancel').click(function(event) {
						event.preventDefault();
						var idname = $(this).attr('idname');
						var r_number = idname.substr(7);
						var r_number_string1 = ".reply-confirm" + r_number;
						var r_number_string2 = ".reply-textarea" + r_number;
						var r_number_string3 = ".reply-cancel" + r_number;
						var r_number_string4 = ".reply-edit" + r_number;
						var r_number_string5 = ".reply-delete" + r_number;
						$(r_number_string1).css('display', 'none');
						$(r_number_string2).css('border', '0px');
						$(r_number_string3).css('display', 'none');
						$(r_number_string4).css('display', 'inline');
						$(r_number_string5).css('display', 'inline');
						$(r_number_string2).removeAttr('rows');
						$(r_number_string2).attr('readonly', '');
					});
					// 덧글 업데이트 버튼
					$('.bbs01-updateReplyBtn').click(function(event) {
						event.preventDefault();
						var idname = $(this).attr('button-r-num');
						var content_cls = ".update-reply-content" + idname;
						var update_content = $(content_cls).val();
						var bbs_no = $(this).attr('button-bbs-num');
						moduleObj.replyUpdate(bbs_no, idname, update_content);
					});
					// 덧글 삭제 버튼
					$('.reply-delete').click(function(event) {
						event.preventDefault();
						var delete_no = $(this).attr('idname');
						var bbs_no = $(this).attr('bbs-num');
						if (confirm("삭제하시겠습니까?")) {
							moduleObj.replyDelete(delete_no, bbs_no);
						} else {
							return;
						}
					});
				});
		}, //리플 리스트 출력
		replyInsert: function(no) {
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/repl/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					fno: no,
					mno: $('#hidden-member-no').val(),
					content: $('#reply-content').val()
				},
				success: function(result) {	
					if (result.data == 'success') {
						alert('리플 입력을 성공했습니다!');
						moduleObj.replyList(1, 10, no);
						$('#reply-content').val('');
						$('.reply-list').css('display', 'none');
					} else {
						alert('리플 입력을 실패했습니다.');
					}
				}
			});
			
		},//리플 내용 입력
		replyDelete: function(no, fno){
			var moduleObj = this;
			var bbsNo = fno;
			$.getJSON(contextRoot + '/bitin/repl/delete.do?no=' + no, function(result) {
				if (result.data == 'success') {
					alert('삭제되었습니다.');
					moduleObj.replyList(1, 10, fno);
				} else {
					alert('삭제되지 않았습니다.');
				}
			});
		}, //리플 삭제
//		replyDetail: function(no) {
//			$.getJSON(contextRoot + '/bitin/repl/detail.do?no=' + no, function(result) {
//				var data = result.data;
//				$('#mem_No').val(data.mno);
//				$('#repl_No').val(data.no);
//				$('#repl_Content').val(data.content);
//			});
//		}, // 리플 디테일
		replyUpdate: function(fno, no, content){
			var moduleObj = this;
			var updateNo = no;
			var updateContent = content;
			var bbsNo = fno;
			$.ajax(contextRoot + '/bitin/repl/update.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: updateNo,
					content: updateContent
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('리플 수정을 완료했습니다!');
						moduleObj.replyList(1, 10, bbsNo);
					} else {
						alert('리플 수정을 실패했습니다.');
					}
				}
			});
		}, // 리플 업데이트
	};
	
});








