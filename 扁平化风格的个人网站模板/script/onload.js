function getDOM(id) {
	return document.getElementById(id);
}
//这里主要是在页面加载的时候画出About Me中的四个圆环.
$(function() {
	var jscv = getDOM("js"),
		csscv = getDOM("css"),
		html5cv = getDOM("html5"),
		nodejscv = getDOM("nodejs");

	jsdraw(jscv, "#E74C3C", 1 / 2);
	cssdraw(csscv, "#3CEE7C", 2 / 3);
	html5draw(html5cv, "#26A8F1", 2 / 5);
	nodejsdraw(nodejscv, "#F1EA32", 1 / 4);

	function init(obj, color, deg) {
		var ctx = obj.getContext("2d"),
			W = obj.width,
			H = obj.height;

		ctx.clearRect(0, 0, W, H);//注意要清除掉上次的痕迹
		//第一个圆
		ctx.beginPath();
		ctx.strokeStyle = "#ddd";
		ctx.lineWidth = 20;
		ctx.arc(W / 2, H / 2, 60, 0, Math.PI * 2, false);
		ctx.stroke();

		//第二个圆
		var r = deg * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 20;
		ctx.arc(W / 2, H / 2, 60, 0 - 90 * Math.PI / 180, r - 90 * Math.PI / 180, false);
		ctx.stroke();

		//圆中心的数字
		ctx.fillStyle = color;
		ctx.font = "30px microsoft yahei";
		text = Math.floor(deg / 360 * 100) + "%";
		text_w = ctx.measureText(text).width;
		ctx.fillText(text, W / 2 - text_w / 2, H / 2 + 15);
	}

	//画JS的圆
	function jsdraw(obj, color, percent) {
		var deg = 0,	
			new_deg = 0,
			dif = 0;	
		new_deg = Math.round(percent * 360);//根据百分比算出的度数
		dif = new_deg - deg;
		var jsloop = setInterval(function() {
			if (deg >= new_deg) {
				clearInterval(jsloop);
			} else if (deg < new_deg) {
				deg++;
			}
			init(obj, color, deg);
		}, 1000 / dif);
		//console.log("jsloop finished");
	}

	//CSS
	function cssdraw(obj, color, percent) {
		var deg = 0,
			new_deg = 0,
			dif = 0;
		new_deg = Math.round(percent * 360);
		dif = new_deg - deg;
		var cssloop = setInterval(function() {
			if (deg >= new_deg) {
				clearInterval(cssloop);
			} else if (deg < new_deg) {
				deg++;
			}
			init(obj, color, deg);
		}, 1000 / dif);
		//console.log("cssloop finished");
	}

	//HTML5
	function html5draw(obj, color, percent) {
		var deg = 0,
			new_deg = 0,
			dif = 0;
		new_deg = Math.round(percent * 360);
		dif = new_deg - deg;
		var html5loop = setInterval(function() {
			if (deg >= new_deg) {
				clearInterval(html5loop);
			} else if (deg < new_deg) {
				deg++;
			}
			init(obj, color, deg);
		}, 1000 / dif);
		//console.log("html5loop finished");
	}

	//NodeJs
	function nodejsdraw(obj, color, percent) {
		var deg = 0,
			new_deg = 0,
			dif = 0;
		new_deg = Math.round(percent * 360);
		dif = new_deg - deg;

		var nodejsloop = setInterval(function() {
			if (deg >= new_deg) {
				clearInterval(nodejsloop);
			} else if (deg < new_deg) {
				deg++;
			}
			init(obj, color, deg);
		}, 1000 / dif);
		//console.log("nodejsloop finished");
	}
});