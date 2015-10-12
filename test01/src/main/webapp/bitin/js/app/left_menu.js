// 현재 교육 수료일 계산
function currentEduDate() {
	var now = new Date();
	var then = new Date("june 8,2015");
	var gap = now.getTime() - then.getTime();
	gap = Math.floor(gap / (1000 * 60 * 60 * 24));
	document.write(gap + "일째 교육 중");
}
// 교육 수료일까지 남은 일수 계산
function remainEduDate() {
	var after = new Date("october 28,2015"); // 교육수료일 
	var gap = after.getTime() - now.getTime();
	gap = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;
	document.write(" ( " + gap + "일 남음 )");
}
