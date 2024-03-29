define([
          'jquery',
          'app/common'
       ], function($){
	
	return {
		init: function() {
			var el = document.getElementById('attend-graph'); // get canvas
			console.log("그래프 진입");
			var options = {
					percent:  el.getAttribute('data-percent') || 25,
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
		}
	}
});	
