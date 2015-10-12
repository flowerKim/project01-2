define([
          'jquery',
          'qrcode',
          'alertify',
          'validate',
          'countdown',
          'app/common'
       ], function($, qrcode, alertify){
	
	return {
		memberInfo: function() {
			var moduleObj = this;
			var memberNo = null;
			$.getJSON(contextRoot + '/bitin/auth/loginInfo.do', function(result) {
				var data = result.data;
				if (result.state == 'yes') {
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
				} else {
					$('#myid').val('');
					$('#myname').val('');
				}
				$.getJSON(contextRoot + '/bitin/member/detail.do?no=' + data.no, function(detail) {
					$('#hiddenPass').val(detail.data.password);
				});
				memberNo = data.no;
				moduleObj.attendancePercent(memberNo);
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
						$(document).trigger('information-initialize');
				  	
				  	alertify.alert('변경 성공입니다.');
				  	moduleObj.memberInfo();
					} else {
						alertify.alert('변경할 수 없습니다.');
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
				var data = result.data; //login member info
				
				Date.prototype.thisDay = function() {
	        var yy = this.getFullYear().toString();
	        var MM = (this.getMonth() + 1).toString();
	        var dd = this.getDate().toString();

	        return yy +"-"+ (MM[1] ? MM : '0'+MM[0])+"-"+ (dd[1] ? dd : '0'+dd[0]);
				}
				var today = new Date().thisDay();
				console.log("오늘은 " + today);
				
				Date.prototype.yyMMdd3 = function() {
					var yy = this.getFullYear().toString();
					var MM = (this.getMonth() + 1).toString();
					var dd = this.getDate().toString();
					var hh=this.getHours().toString();
					var mm= this.getMinutes().toString();
					var ss = this.getSeconds().toString();
					return yy + (MM[1] ? MM : '0'+MM[0]) + (dd[1] ? dd : '0'+dd[0]);
//					return yy + (MM[1] ? MM : '0'+MM[0]) + (dd[1] ? dd : '0'+dd[0]) +
//					(hh[1]?hh:'0'+hh[0]) + (mm[1]?mm:'0'+mm[0]) + (ss[1]?ss:'0'+ss[0]);
				}
				Date.prototype.time = function() {
					var hh=this.getHours().toString();
					return hh;
				}
				var currentDT = new Date().yyMMdd3(); //년월일시분초
				
				//id+currentDT url생성
				var attendUrl = "http://192.168.1.34:9999" + contextRoot +"/bitin/checkin.html?qr="
				+ data.no;
				
				var curTime = new Date().time();
				console.log("시간:" + curTime);
				if (curTime > 07 && curTime < 21) {
					$('#inout-check').text("일반 입/퇴실용 코드입니다. ");
					$('#inout-check').css('font-weight', 'bold');
				} else if (curTime > 21 && curTime < 23) {
					$('#inout-check').text("자율학습 퇴실 전용 코드입니다.");
					$('#inout-check').css('font-weight', 'bold').css('color', 'blue');
				} else {
					$('#inout-check').text("지금은 출석 체크 시간이 아닙니다.");
				}
				
				$.getJSON(contextRoot + '/bitin/attd/dayInfo.do', 
	  			function(thisDay) {
						var todayInfo = thisDay.data;
						if (todayInfo == 1 || todayInfo == 7) {
							// 주말일 경우 QR 코드를 출력하지 않음.
							attendUrl = contextRoot + '/bitin/image/nolecture.png';
							$('<img>').attr('src', attendUrl).css('width', '150').appendTo('#qr-encode');
							$('#inout-check').text("오늘은 강의가 없습니다.");
							$('.checkin-time').text("강의 없음");
							$('.checkout-time').text("강의 없음");
							$('#next-qr').remove();
							$('#qrupdate-time').remove();
						} else {
							if (curTime >= 7 && curTime < 21) {
								attendUrl += "07to21";
							} else if (curTime >= 21 && curTime <= 22 ) {
								attendUrl += "21to22";
							} else {
								attendUrl = "지금은 출결 체크 시간이 아닙니다.";
							}
							$('#qr-encode').qrcode({
								render: 'image',
								size: 150,
								radius: 0.5,
								text: attendUrl
							}); 
						}
					});
			}); //getJSON
			console.log("정상 작동")
		}, // qrEncode 끝
		// 출석률 표시 그래프
		attendancePercent: function(memberNo) {
			var moduleObj = this;
			$.getJSON(contextRoot + '/bitin/attd/attdInfo.do?memNo=' + memberNo, function(result) {
				var data = result.data;
				var totalCount = 0;
				var generalCount = 0;
				for (var i = 0; i < result.data.length; i++) {
					if (data[i].checkin_t != null) {
						totalCount++;
					}
					if (data[i].checkin_t !=0 && data[i].checkout_t !=0) {
						generalCount++;
					}
				}
				var percentNo = ((generalCount / totalCount) * 100).toFixed(1);
				$('#attend-graph').attr('data-percent', percentNo);
				moduleObj.init2(percentNo);
			});
		}, // 출석률 표시 끝
		init2: function(percentNo) {
			$('#attend-graph span').remove();
			var el = document.getElementById('attend-graph'); // get canvas
			var options = {
					percent:  percentNo,
					size: el.getAttribute('data-size') || 200,
					lineWidth: el.getAttribute('data-line') || 15,
					rotate: el.getAttribute('data-rotate') || 0
			}
			
			var canvas = document.createElement('canvas');
			var span = document.createElement('span');
			span.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + options.percent + '%';
			
			if (typeof(G_vmlCanvasManager) !== 'undefined') {
				G_vmlCanvasManager.initElement(canvas);
			}
			
			var ctx = canvas.getContext('2d');
			canvas.width = canvas.height = options.size;
			
			el.appendChild(span);
			el.appendChild(canvas);
			
			ctx.translate(options.size / 2, options.size / 2); // 중심점 이동 translate > 좌표 이동
			ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
			
//imd = ctx.getImageData(0, 0, 240, 240);
			var radius = (options.size - options.lineWidth) / 2;
			
			var drawCircle = function(color, lineWidth, percent) {
				percent = Math.min(Math.max(0, percent || 1), 1);
				ctx.beginPath();
				ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
				ctx.strokeStyle = color;
				ctx.lineCap = 'square'; // butt, round or square
				ctx.lineWidth = lineWidth
				ctx.stroke();
			};
			
			drawCircle('#d0f5d8', options.lineWidth, 100 / 100);
			drawCircle('#71d687', options.lineWidth, options.percent / 100);
		},
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
			
			// 마이 페이지 클릭 이벤트
			$('.info-click').click(function(event) {
				event.preventDefault();
				moduleObj.infoValidate();
		  });
			// QR 코드 클릭 이벤트
		  $('.qr-click').click(function(event) {
		  	event.preventDefault();
		    moduleObj.countdown();
		    moduleObj.qrEncode();
		  });
			// 멤버 정보 수정 이벤트
			$('#memUpdateBtn').click(function(event) {
				event.preventDefault();
				moduleObj.updateMember(); 
			});
			// 사진 변경 버튼 클릭 테스트
			$('.fileinput-button').click(function(event){
				console.log("클릭클릭");
			})
			// 첨부 파일이 있는 상태에서 저장하지 않고 배경 클릭시 첨부 파일 정보 삭제
			$('#lean_overlay').click(function(event){
				$(document).trigger('information-initialize');
				$('#qr-encode img').removeAttr('src');
			})
			// 초기화 함수 따로 만들 것 ////////////////////////////////////////////
			$('.hidemodal').click(function(event){
				$(document).trigger('information-initialize');
			});
			$(document).on('information-initialize', function(event){
				$('#lean_overlay').fadeOut(200);
				$('#myinfo').css({'display' : 'none'});
				$('#mypass').val('');
				$('#myrepass').val('');
				$('#mypass-error').remove();
				$('#myrepass-error').remove();
			});
			
			$('.qr_close').click(function(event){
				$('#qr-encode img').removeAttr('src');
			});
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











