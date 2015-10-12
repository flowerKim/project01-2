
/**
 * jQuery-плагин для построения круговых диаграмм
 * author: monochromer
 * https://github.com/monochromer/jquery.circle-diagram
*/

(function($) {

	$.fn.circleDiagram = function(params){

		/**
		 * 회전 각도의 보조 기능 
		 * @param {Number} angle - 회전 각도
		 * @return {Object} object - CSS 속성이 회전하도록 설정
		 */
		function rotate(angle) {
			return {
				"-webkit-transform": "rotate(" + angle + "deg)",
				   "-moz-transform": "rotate(" + angle + "deg)",
				    "-ms-transform": "rotate(" + angle + "deg)",
				     "-o-transform": "rotate(" + angle + "deg)",
				        "transform": "rotate(" + angle + "deg)"
			};
		};

		/**
		 * 기본 차트 설정 매개 변수
		 */
		var defaults = {
			size: "100",
			borderWidth: "10",
			bgFill: '#bbb',
			frFill: '#0bf',
			textSize: 30 + 'px',
			font: "inherit",
			textColor: "#000"
		};

		/**
		 * 일부 변수 캐싱(?)
		 */
		var $this = this;
		var dataAttr;
		var options;

		if($this.attr("data-circle-diagram") != undefined) {
			dataAttr = $.parseJSON($this.attr("data-circle-diagram"));
			options = $.extend(true, {}, defaults, params, dataAttr);
		} else {
			options = $.extend(true, {}, defaults, params);
		}

		/**
		 * CSS 생성 요소에 대한 기본 속성 설정
		 * 별도의 CSS 파일 이동 가능
		 */
		var cssMain = {
			"position": "relative",
			"width": parseFloat(options.size) + "px",
			"height":  parseFloat(options.size) + "px",
			"border": parseFloat(options.borderWidth) + "px" + " " + "solid" + " " + options.bgFill,
			"border-radius": "50%",
			"z-index": "1"
		};

		var cssElems = {
			"position": "absolute",
			"z-index": "1",
			"top": -parseFloat(options.borderWidth) + "px",
			"right": -parseFloat(options.borderWidth) + "px",
			"bottom": -parseFloat(options.borderWidth) + "px",
			"left": -parseFloat(options.borderWidth) + "px",
			"border": parseFloat(options.borderWidth) + "px" + " " + "solid",
			"border-radius": "50%"
		};

		$this.css(cssMain);

		var text = $('<span></span>')
			.css({
				"display": "block",
				"position": "relative",
				"z-index": "2",
				"text-align": "center",
				"font-size": options.textSize + "px",
				"font-family": options.font,
				"height": parseFloat(options.size) + "px",
				"line-height": parseFloat(options.size) + "px",
				"color": options.textColor
			})
			.text(options.percent)
			.appendTo($this);

		var bg = $('<div></div>')
			.css(cssElems)
			.css({
				"border-color": options.frFill,
				"border-left-color": "transparent",
				"border-bottom-color": "transparent"
			})
			.appendTo($this);

		var fill = $('<div></div>')
			.css(cssElems)
			.css({
				"border-color": options.bgFill,
				"border-left-color": "transparent",
				"border-bottom-color": "transparent"
			})
			.appendTo($this);

		/**
		 * 회전 각도 계산 필요
		 */
		var angle;
		var data = parseFloat(options.percent);

		if (data >= 0 && data <= 50) {
			angle = (225 - 45)/50*data + 45;
		} else {
			angle = (405 - 225)/50*data + 225;
			fill.css({
				"border-color": options.frFill,
				"border-left-color": "transparent",
				"border-bottom-color": "transparent",
			});
		};

		bg.css(rotate(45));
		fill.css(rotate(angle));

		/**
		 * Возвращаем $this для поддержки цепочек вызова
		 */
		return $this;
	};

})(jQuery);
