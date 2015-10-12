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
	var noticeCurrPageNo = 1;
	var noticePageSize = 3;
	
	return {
		listNotice: function(noticePageNo, noticePageSize) {
//			listNotice: function(noticePageSize) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/notice/list.do', 
				{
				noticePageNo : noticePageNo, 
				noticePageSize : noticePageSize
				}, 
				function(result) {
					noticeCurrPageNo = result.noticePageNo;
				  $('#pageNo-notice').text(noticeCurrPageNo);
					
				  var tbody = $('#listTable-notice tbody');
				  $('data-row-notice').remove();
				  
				  // HandlebarsJS 템플릿 사용
				  var source = $('#template-notice').html();
				  var template = handlebars.compile(source);
				  var content = template(result);
//				  console.log(result.data.title)
				  $('#listTable-notice tbody').html(content);
				  
				   //이전, 다음 버튼 처리
				  if (result.noticePageNo > 1) {
				  	$('#prevBtn-notice').removeAttr('disabled');
				  } else {
				  	$('#prevBtn-notice').attr('disabled', 'disabled');
				  }
				  
				  if (result.isNoticeNextPage) {
				  	$('#nextBtn-notice').removeAttr('disabled');
				  } else {
				  	$('#nextBtn-notice').attr('disabled', 'disabled');
				  }
				  
				  //title 클릭시 detail 보이기 
				  $('.titleLink').click(function(event){
				  	event.preventDefault();
				  	moduleObj.detailNotice(this.getAttribute('nno'));
				  	$('.my-view-notice').css('display', '');
				  	$('.my-new-notice').css('display', 'none');
				  	});
					});
				}, // listNotice
		detailNotice: function(nno) {
			$.getJSON(contextRoot + '/bitin/notice/detail.do?nno=' + nno, function(result) {
				var data = result.data;
				//console.log(data + 'detail data....');
				$('#nNo').val(data.nno);
				$('#nTitle').val(data.title);
				$('#nContent').val(data.content);
				$('#nCreateDate').text(data.yyyyMMdd);
				
				
			  //이전, 다음 버튼 처리
			  	//$('paging-notice').css('display', 'none');
				
			//닫기 버튼
				$('#closeBtn-notice').click(function(event) {
					$('.my-view-notice').css('display', 'none');
			  	$('.my-new-notice').css('display', '');
					});
				//$('#tno').val(data.t_name); //mano와 tno의 조건에따라 불러오게해야한다.
				//$('#mano').val(data.ma_name); //mano와 tno의 조건에따라 불러오게해야한다.
			});
		}, // detailNotice
//		deleteNotice: function(nno){
//			var moduleObj = this;
//			$.getJSON(contextRoot + '/json/notice/delete.do?nno=' + nno, function(result) {
//				var data = result.data;
//				if (result.data == 'success') {
//					alert('삭제 성공입니다.');
//					moduleObj.listNotice(noticeCurrPageNo, noticePageSize);
//					
//					$('#cancelBtn-notice').click();
//					
//				} else {
//					alert('삭제할 수 없습니다.');
//				}
//			});
//		}, // deleteNotice
//		updateNotice: function(){
//			var moduleObj = this;
//			$.ajax(contextRoot + '/json/notice/update.do', 
//			{
//				method: 'POST',
//				dataType: 'json',
//				data: {
//					no: $('#nNo').val(),
//					title: $('#nTitle').val(data.title),
//					content: $('#nContent').val(data.content),
//					createDate: $('#nCreateDate').text(data.yyyyMMdd)
////					name: $('#nName').val()
//				},
//				success: function(result) {
//					if (result.data == 'success') {
//						alert('변경 성공입니다.');
//						moduleObj.listNotice(noticeCurrPageNo, noticePageSize);
//						$('#cancelBtn-notice').click();
//					} else {
//						alert('변경할 수 없습니다.');
//					}
//				}
//			});
//		}, // updateNotice
		insertNotice: function() {
			var moduleObj = this;
			$.ajax(contextRoot + '/bitin/notice/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: $('#nNo').val(),
					title: $('#nTitle').val(data.title),
					content: $('#nContent').val(data.content),
					createDate: $('#nCreateDate').text(data.yyyyMMdd)
				},
				success: function(result) {
					if (result.data == 'success') {
						alert('등록 성공입니다.');
						moduleObj.listNotice(1, noticePageSize);
						$('#cancelBtn-notice').click();
					} else {
						alert('등록할 수 없습니다.');
					}
				}
			});
		}, // insertNotice
		init: function() {
			var moduleObj = this;
			
			$('.my-view-notice').css('display', 'none');
			$('.my-new-notice').css('display', '');
			
			$('#prevBtn-notice').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.listNotice(noticeCurrPageNo - 1, noticePageSize)
			});
			
			$('#nextBtn-notice').click(function(event) {
				event.preventDefault();
				if ($(this).attr('disabled') == 'disabled') {
					return;
				}
				moduleObj.listNotice(noticeCurrPageNo + 1, noticePageSize)
			});
//			
	
//			$('#deleteBtn-notice').click(function(event) {
//				event.preventDefault();
//				moduleObj.deleteNotice($('#nNo').val()); 
//			});
//			
//			$('#updateBtn-notice').click(function(event) {
//				event.preventDefault();
//				moduleObj.updateNotice(); 
//			});
//			
			$('#insertBtn-notice').click(function(event) {
				$('.my-view-notice').css('display', 'none');
				$('.my-new-notice').css('display', '');
				event.preventDefault();
				moduleObj.insertNotice(); 
			});
			
			$('#cancelBtn-notice').click(function(event) {
				$('.my-view-notice').css('display', 'none');
				$('.my-new-notice').css('display', '');
				$('#files').html('');
				$('#progress .progress-bar').css('width', '0%');
			});
//
//			$('#fEmail').keyup(function(event) {
////				console.log(chkEmail);
//				console.log($(this).val());
//				$.getJSON(
////					contextRoot + '/json/notice/existEmail.do', 
//					'http://localhost:8888/notice/existEmail.do',
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
//			
//			$('#fileupload').fileupload({
//		  	url: contextRoot + '/json/file/upload.do',
//		    dataType: 'json',
//		    // autoUpload: false;
//		    maxFileSize: 10000000,
//		    disableImageResize: /Android(?!.*Chrome)|Opera/
//		      .test(window.navigator.userAgent), 
//		      previewMaxWidth: 100,
//		      previewMaxHeight: 100, 
//		      previewCrop: true
//			}).on('fileuploadsubmit', function(e, data) {
//        // 서버에 일반 폼 데이터도 보내고 싶으면, submit 하기 전에
//        // 다음과 같이 formData 프로퍼티에 값을 설정하라!
//        /*
//        data.formData = {
//          data1: 'okok',
//          data2: 'nono'
//        };
//        */
//      }).on('fileuploaddone', function(e, data) {
//        console.log(data.result);
//        $('#files').html('');
//        $.each(data.result.data, function (index, file) {
//            $('<img>')
//              .attr('src', file.url)
//              .css('width', '100px')
//              .appendTo('#files');
//            $('<span/>')
//            .text(file.name 
//                + '(' + file.originName + ')'
//                + ', ' + file.size)
//                .appendTo('#files');
//            $('#fPhoto').val(file.name);
//        });
//      }).on('fileuploadprogressall', function (e, data) {
//        var progress = parseInt(
//            data.loaded / data.total * 100, 10);
//        $('#progress .progress-bar').css(
//            'width',
//            progress + '%'
//        );
//      }); // 파일 업로드에 대한 옵션 지정
//
		} // 초기화 함수 init 
//		
//	};
//});

		}
	});