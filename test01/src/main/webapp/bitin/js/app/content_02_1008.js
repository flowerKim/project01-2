define([
          'jquery',
          'qrcode',
          'validate',
          'countdown',
          'app/common'
       ], function($, qrcode){
	
	var textUrl;
	
	return {
		memberInfo: function() {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(result) {
				var data = result.data;
				if (result.state == 'yes') {
					console.log("data.no: "+ data.no + " + data.name" + data.name);
					console.log("사진: " + data.photo);
					$('#myid').val(data.no);
					$('#myname').val(data.name);
					$('#myemail').val(data.email);
					$('#mytel').val(data.tel);
					$('#myPhoto').val(data.photo);
					if (data.photo != null) {
						$('#profileImg').attr('src', contextRoot + '/files/' + data.photo);
						$('#profile-img').attr('src', contextRoot + '/files/' + data.photo);
					} else {
						$('#profileImg').attr('src', contextRoot + '/bitin/image/defaultImg.jpg');
						$('#profile-img').attr('src', contextRoot + '/bitin/image/defaultImg.jpg');
					}
					
//					$('#mNo').val(data.name);
					
//					$('#loginBtn').css('display', 'none');
//					$('#userInfo').css('display', '');
				} else {
					$('#myid').val('아무개');
					$('#myname').val('아무개');
//					$('#loginBtn').css('display', '');
//					$('#userInfo').css('display', 'none');
				}
				$.getJSON(contextRoot + '/bitin/member/detail.do?no=' + data.no, function(detail) {
					$('#hiddenPass').val(detail.data.password);
					console.log("임시 태그 비번 : " + $('#hiddenPass').val());
				});
			});
		},
		updateMember: function(){
			var moduleObj = this;
			// *pass : 비밀번호를 입력하지 않았을 때 기존 비밀번호를 DB에 저장
			var updatePass;
			if ($('#mypass').val() == '') {
				updatePass = $('#hiddenPass').val();
			} else {
				updatePass = $('#mypass').val();
			}
			// *pass 끝.
			$.ajax(contextRoot + '/bitin/member/update.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					no: $('#myid').val(),
				  name: $('#myname').val(),
					email: $('#myemail').val(),
					tel: $('#mytel').val(),
					password: updatePass,
					photo: $('#myPhoto').val()
				},
				success: function(result) {
					if (result.data == 'success') {
						$('#memberFiles').css('display', 'none');
						$('#mypass').val('');
						$('#myrepass').val('');
						alert('변경 성공입니다.');
						// 모달창 제거
						$('#lean_overlay').fadeOut(200);
				  	$('#myinfo').css({'display' : 'none'});
					} else {
						alert('변경할 수 없습니다.');
					}
				}
			});
		}, // updateMember
		infoValidate: function(){
			$('#edit-myinformation').validate({
				rules: {
					mno: { required: true },
					name: { required: true },
					password: { required: true, minlength: 6 },
					repassword: { required: true, minlength: 6, equalTo: '#mypass' },
					email: { required: true, email: true },
					tel: { required: true }
				}, 
				messages: {
					mno: { required: "필수 입력 항목입니다." },
					name: { required: "필수 입력 항목입니다." },
					password: { required: "필수 입력 항목입니다.", minlength: "6글자 이상이어야 합니다." },
					repassword: { 
						required: "필수 입력 항목입니다.", 
						minlength: "6글자 이상이어야 합니다.",
						equalTo: "비밀번호가 일치하지 않습니다." 
					},
					email: { required: "필수 입력 항목입니다.", email: "이메일 규칙에 맞춰 주세요."},
					tel: { required: "필수 입력 항목입니다." }
				}
			});
		},
		
		qrEncode: function(){
			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(result) {
				var data = result.data; //login member
				console.log("result:" + result );
				console.log("result.data:" + data );
				console.log("result.data.no:" + data.no );
				console.log("result.clientIp:" + result.clientIp);
				var studentNo = result.data.no;
				var client_ip = result.clientIp;
				
				Date.prototype.yyMMdd3 = function() {
					var yy = this.getFullYear().toString();
					var MM = (this.getMonth() + 1).toString();
					var dd = this.getDate().toString();
					var hh=this.getHours().toString();
					var mm= this.getMinutes().toString();
					var ss = this.getSeconds().toString();
					return yy + (MM[1] ? MM : '0'+MM[0]) + (dd[1] ? dd : '0'+dd[0]) +
					(hh[1]?hh:'0'+hh[0]) + (mm[1]?mm:'0'+mm[0]) + (ss[1]?ss:'0'+ss[0]);
				}
				var currentDT = new Date().yyMMdd3(); //년월일시분초
//				console.log("cuurentDT: "+currentDT);
				//id+currentDT url생성

				var attendUrl = location.protocol+ "//"+location.host + contextRoot +"/bitin/checkin.html?qr="
				+ data.no + currentDT;
				console.log("attendUrl: "+ attendUrl);
				
					console.log("currentDT.getHours:"+currentDT.getHours);
				if(currentDT.getHours  >=7 && currentDT.getHours <21) {
					if(checkinTime==0) {
						$('#qr-encode').qrcode({
							render: 'image',
							size: 150,
							radius: 0.5,
							text: attendUrl
						}); //qrcode
					} else {
						//출석이미 진행함: 체크시간: 
					}
					
					
				} else {
					//출석 타임이 아님.
				}
				
				});
//				} else {
//					대체이미지.
//				}
				
				
//			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(checkinMap) {
//				var checkinMap = checkinMap.checkinMap;
//				
//				//domain에 값 넣기
//				$.ajax('/test01/bitin/sub/checkin.do', 
//						{
//					method: 'GET',
//					dataType: 'json',
//					data: {
//						inTime: checkinMap.inTime,
//						studentNo: checkinMap.studentNo,
//						currentDT: currentDT,
//						attendUrl: textUrl,
//					}, function (re){
//						console.log("qrEncode ajax진입성공");
//					}
//						});
//			})
		}, //qrEncode 끝
		
		
		init: function() {
			var moduleObj = this;
			
//			$('#deleteBtn').click(function(event) {
//				event.preventDefault();
//				moduleObj.deleteMember($('#fNo').val()); 
//			});
//		
			// 로그아웃 이벤트
			$('#logout-btn').click(function(event) {
				if (confirm("로그아웃 하시겠습니까? 메인 화면으로 돌아갑니다.") == true) {
					event.preventDefault();
					$.getJSON(contextRoot + '/bitin/auth/logout.do', function(result) {
						window.location.replace('index.html');
						// $(document).trigger('logout.success');
					});
				} else { // 취소
					event.preventDefault();
					return; 
				}
			});
			
			$('#memUpdateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.updateMember(); 
			});
			$('.fileinput-button').click(function(event){
				console.log("클릭클릭");
			})
			// 첨부 파일이 있는 상태에서 저장하지 않고 배경 클릭시 첨부 파일 정보 삭제
			$('#lean_overlay').click(function(event){
				$('#memberFiles').css('display', 'none');
			})
			
//			$('#cancelBtn').click(function(event) {
//				$('.my-view').css('display', 'none');
//				$('.my-new').css('display', '');
//				$('#files').html('');
//				$('#progress .progress-bar').css('width', '0%');
//			});

//			$('#fEmail').keyup(function(event) {
////				console.log(chkEmail);
//				console.log($(this).val());
//				$.getJSON(
////					contextRoot + '/json/member/existEmail.do', 
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
			
			// 사진 변경 (jQuery file upload plugin)
			$('#fileupload').fileupload({
		  	url: contextRoot + '/bitin/file/upload.do',
		    dataType: 'json',
//		    autoUpload: false,
		    maxFileSize: 10000000,
		    disableImageResize: /Android(?!.*Chrome)|Opera/
		      .test(window.navigator.userAgent), 
		      previewMaxWidth: 100,
		      previewMaxHeight: 100, 
		      previewCrop: true
			}).on('fileuploadsubmit', function(e, data) {
				
      }).on('fileuploaddone', function(e, data) {
        $('#memberFiles').html('');
        $.each(data.result.data, function (index, file) {
            $('#memberFiles').css('display', 'block')
            .html("첨부파일 : " + file.originName).appendTo('#memb-img br');
            $('#myPhoto').val(file.name);
        });
      }).on('fileuploadprogressall', function (e, data) {
      }); // 파일 업로드에 대한 옵션 지정
			
			
		}, // 초기화 함수
		// QR 코드 재생성 카운트 다운 플러그
		countdown: function() {
			//var moduleObj = this;
		    /* 21시 시간 변환 */
		    Date.prototype.yyMMdd1 = function() {
		        var yy = this.getFullYear().toString();
		        var MM = (this.getMonth() + 1).toString();
		        var dd = this.getDate().toString();
		        var hh=this.getHours().toString();
		        var mm= this.getMinutes().toString();
		        var ss = this.getSeconds().toString();

		        return yy +"-"+ (MM[1] ? MM : '0'+MM[0])+"-"+ (dd[1] ? dd : '0'+dd[0]) +' '+
		        "21:00:00";
		    }
		    /* 7시 시간 변환 */
		    Date.prototype.yyMMdd2 = function() {
		        var yy = this.getFullYear().toString();
		        var MM = (this.getMonth() + 1).toString();
		        var dd = this.getDate().toString();
		        var hh=this.getHours().toString();
		        var mm= this.getMinutes().toString();
		        var ss = this.getSeconds().toString();

		        return yy +"-"+ (MM[1] ? MM : '0'+MM[0])+"-"+ (dd[1] ? dd : '0'+dd[0]) +' '+
		        "7:00:00";
		    }
		    
		    var d = new Date();
		    var h = d.getHours();
		    
		    if (h>7 && h<21) {
		    var t = d.getHours() * 60 + d.getMinutes(); 
		       $("#qrupdate-time")
		       .countdown((new Date()).yyMMdd1(), function(event) {
		         $(this).text(
//		           event.strftime('%D days %H:%M:%S')
		           event.strftime('%H:%M:%S')
		         );
		       });
		      
		    }else {
		       $("#qrupdate-time")
		       .countdown((new Date()).yyMMdd2(), function(event) {
		         $(this).text(
//		           event.strftime('%D days %H:%M:%S')
		           event.strftime('%H:%M:%S')
		         );
		       });
		    }
		} // QR 코드 재생성 카운트 다운 
	}
});

/* qr코드 옵션 
 
 {
    // render method: 'canvas', 'image' or 'div'
    render: 'canvas',

    // version range somewhere in 1 .. 40
    minVersion: 1,
    maxVersion: 40,

    // error correction level: 'L', 'M', 'Q' or 'H'
    ecLevel: 'L',

    // offset in pixel if drawn onto existing canvas
    left: 0,
    top: 0,

    // size in pixel
    size: 200,

    // code color or image element
    fill: '#000',

    // background color or image element, null for transparent background
    background: null,

    // content
    text: 'no text',

    // corner radius relative to module width: 0.0 .. 0.5
    radius: 0,

    // quiet zone in modules
    quiet: 0,

    // modes
    // 0: normal
    // 1: label strip
    // 2: label box
    // 3: image strip
    // 4: image box
    mode: 0,

    mSize: 0.1,
    mPosX: 0.5,
    mPosY: 0.5,

    label: 'no label',
    fontname: 'sans',
    fontcolor: '#000',

    image: null
}
 
 */










