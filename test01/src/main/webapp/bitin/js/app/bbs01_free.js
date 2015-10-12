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
				  	num = this.getAttribute('no');
				  	moduleObj.fdetailBoard(this.getAttribute('no'));
				  	moduleObj.repllist(1, 10, this.getAttribute('no'));
				  	
				  });
				});
		}, //flistBoard
		fdetailBoard: function(no) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/board/detail.do?no=' + no, function(result) {
				var data = result.data;
				//moduleObj.fcontentInfo();
				$('#fNo').val(data.no);
				$('#fmNo').val(data.mno);
				$('#fName').val(data.name);
				$('#fCreateDate').val(data.createDate);
				$('#fTitle').val(data.title);
				$('#fContent').val(data.content);
				$('#mem_No_lb').css('display', 'none');
				$('#mem_No').css('display', 'none');
				$('#mem_Name_lb').css('display', 'none');
				$('#mem_Name').css('display', 'none');
				$('#repl_No_lb').css('display', 'none');
				$('#repl_No').css('display', 'none');
				$('#repl_Content').css('display', 'none');
				$('#replinsert_Btn').css('display', 'none');
				$('#replupdate_Btn').css('display', 'none');
				
			});
		}, // fdetailBoard
		fdeleteBoard: function(no){
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/board/delete.do?no=' + no, function(result) {
				var data = result.data;
				if (result.data == 'success') {
					alert('Delete Success!');
					moduleObj.flistBoard(currPageNo, pageSize);
					
					$('#cancelBtn').click();
					
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
					no: $('#fNo').val(),
					title: $('#fTitle').val(),
					content: $('#fContent').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('Modify Success!');
						moduleObj.flistBoard(currPageNo, pageSize);
						$('#cancelBtn').click();
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
						$('#cancelBtn').click();
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
				$('#replinsert_Btn').css('display','');
				
			});
			
			$('#deleteBtn').click(function(event) {
				event.preventDefault();
				moduleObj.fdeleteBoard($('#fNo').val());
				$('.content-04').load('sub/content_04.html');
			});
			
			$('#updateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.fupdateBoard(); 
				$('.content-04 > #boardMain > #content').load('sub/freeboard.html');
			});
			
			$('#bbs01-insertBtn').click(function(event) {
				event.preventDefault();
				moduleObj.finsertBoard();
				$('.content-04 > #boardMain > #content').load('sub/freeboard.html');
			});
			
			// 자유 게시판 글쓰기
			$('#f_writeBtn').click(function(event) {
			    event.preventDefault();
			    $('.content-04 > #boardMain > #content' ).load('sub/bbs01_free_insert.html');
			    console.log("회원번호 : " + $('#hidden-member-no').val());
					console.log("이름 : " + $('#hidden-member-name').val());
			  });
			
			$('#cancelBtn').click(function(event) {
				 event.preventDefault();
				 $('.content-04 > #boardMain > #content').load('sub/bbs01_free_list.html');
			    });
			
			$('#replinsert_Btn').click(function(event) {
				event.preventDefault();
				moduleObj.replinsert(num);
				$('.content-04 > #boardMain > #content' ).load('sub/freeboard_detail.html');
				moduleObj.fdetailBoard(num);
				moduleObj.repllist(1,10,num);
			});
			
			$('#replupdate_Btn').click(function(event) {
				event.preventDefault();
				moduleObj.replupdate();
				$('.content-04 > #boardMain > #content' ).load('sub/freeboard_detail.html');
				moduleObj.fdetailBoard(num);
				moduleObj.repllist(1,10,num);
				
			  	
			});
			
			$('.deleteLink').click(function(event){
			  	event.preventDefault();
				moduleObj.repldelete(this.getAttribute('rno'));
				$('.content-04 > #boardMain > #content' ).load('sub/freeboard_detail.html');
				moduleObj.fdetailBoard(num);
				moduleObj.repllist(1,10,num);
			  });
			
			$('.getLink').click(function(event){
			  	event.preventDefault();
				moduleObj.repldetail(this.getAttribute('rno'));
			
				$('#mem_No_lb').css('display','');
				$('#mem_No').css('display','');
				$('#repl_No_lb').css('display','');
				$('#repl_No').css('display','');
				$('#repl_Content').css('display','');
				$('#replinsert_Btn').css('display','');
				
				
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
		repllist: function(pageNo, pageSize, no) {
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
				  var tbody = $('#listTable tbody');
				  $('.data-row').remove();
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template_repl').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
				  $('#listTable_repl tbody').html(content);
				 
				  
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
		replinsert: function(no) {
			
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
						
						$('#cancelBtn').click();
					} else {
						alert('리플 입력을 실패했습니다.');
					}
				}
			});
			
		},//리플 내용 입력
		repldelete: function(no){
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/repl/delete.do?no=' + no, function(result) {
				var data = result.data;
				if (result.data == 'success') {
					alert('리플 삭제를 완료했습니다!');
//					moduleObj.repllist(currPageNo, pageSize);
				} else {
					alert('리플 삭제를 실패했습니다.');
				}
			});
		}, //리플 삭제
		repldetail: function(no) {
			$.getJSON(contextRoot + '/bitin/repl/detail.do?no=' + no, function(result) {
				var data = result.data;
				$('#mem_No').val(data.mno);
				$('#repl_No').val(data.no);
				$('#repl_Content').val(data.content);
			});
		}, // 리플 디테일
		replupdate: function(){
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








