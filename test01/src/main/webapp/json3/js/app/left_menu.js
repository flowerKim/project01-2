//// 현재 교육 수료일 계산
function currentEduDate(currentEduDate) {
	event.preventDefault();
	var currentEduDate = document.getElementById('currentEduDate');
	var now = new Date();
    var then = new Date("june 8,2015"); //교육시작
    var after = new Date("october 28,2015"); //교육수료일
    var all = Math.floor( (then.getTime() - after.getTime()) / (1000 * 60 * 60 * 24)); //식이안먹네요..
    var gap = now.getTime() - then.getTime();
    gap = Math.floor(gap / (1000 * 60 * 60 * 24));
    currentEduDate.innerHTML += "142일 중 " +gap + "일째 교육 중";
  };

// 교육 수료일까지 남은 일수 계산
function remainEduDate(remainEduDate) {
	document.getElementById("currentEduDate").removeEventListener("load", currentEduDate, false);
	event.preventDefault();
	var now = new Date();
	var remainEduDate = document.getElementById('remainEduDate');
	var after = new Date("october 28,2015"); // 교육수료일
	var gap = after.getTime() - now.getTime();
	gap = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;
//	//document.write(" ( " + gap + "일 남음 )");
	remainEduDate.innerHTML += "(앞으로 더 공부할 시간 : " + gap + " 일!)";
//	appendChild(document.createTextNode(gap2 + "bar"));
};

function qrtime(qrtime) {
	event.preventDefault();
	var qrtime = document.getElementById('qrtime');
  
	 var d = new Date();
   var t = (d.getHours() * 60) + (d.getMinutes()); //t=현재시+분
   var text='';
   if (t >= 0 && t < 420) { //0~7:00
     text += ('다음 갱신(7시)까지' + Math.floor((420 - t) / 60)
         + '시간 남음 <br /> ');
   } else if (t >= 420 && t < 1260) {
  	 text += ('다음 갱신(21시)까지' + Math.floor((1260 - t) / 60)
         + '시간 남음 <br /> ');
   } else {
  	 text += ('내일 오전 7시에 갱신됩니다.<br />' + '(다음 갱신까지 '
         + Math.floor((1859 - t) / 60) + '시간)');
   }
   qrtime.innerHTML = text;
  };
