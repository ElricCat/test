			  /*导航栏*/
			 $("#pages").on("mouseenter", function() {
			 	$("#pages .dropdown").css("display", "block");
			 });
			 $("#pages").on("mouseleave", function() {
			 	$("#pages .dropdown").css("display", "none");
			 });
			 $("#portfolio").on("mouseenter", function() {
			 	$("#portfolio .dropdown").css("display", "block");
			 });
			 $("#portfolio").on("mouseleave", function() {
			 	$("#portfolio .dropdown").css("display", "none");
			 });

			  $("#contact").on("mouseenter",function(){
			 	$(".contact").css({"display":"block","z-index":"2001"});
			 	$("#contact").addClass('list-active');
			 });
			 $(".contact").on("mouseleave",function(){
			 	$(".contact").css("display","none");
			 	$("#contact").removeClass('list-active');
			 });
			 /*图片浏览*/

			 $("#previmg").on("click", function() {
			 	var index = $(".bg-img").attr('class');
			 	index = index.substr(-1, 1);
			 	var currentindex = 0;
			 	switch (index) {
			 		//顺序为向前的话，
			 		case '1':
			 			// 1 的下一张是 3 
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img3');
			 			currentindex = 3;
			 			break;
			 		case '2':
			 			//2 的下一张是 1
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img1');
			 			var currentindex = 1;
			 			break;
			 		case '3':
			 			//3 的下一张是 2
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img2');
			 			var currentindex = 2;
			 			break;
			 	}
			 	changeDescript(currentindex);
			 	$(".bottom-control span").removeClass('current');
			 	$(".bottom-control span[title='" + currentindex + "']").addClass('current');
			 });

			 $("#nextimg").on("click", function() {
			 	var index = $(".bg-img").attr("class");
			 	index = index.substr(-1, 1);
			 	var currentindex = 0; //变换之后是第几张图片
			 	switch (index) {
			 		//顺序为向后的话，
			 		case '1':
			 			//1 的下一张是 2
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img2');
			 			currentindex = 2;
			 			break;
			 		case '2':
			 			//2 的下一张是 3
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img3');
			 			currentindex = 3;
			 			break;
			 		case '3':
			 			//3 的下一张是 1
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img1');
			 			currentindex = 1;
			 	}
			 	changeDescript(currentindex);
			 	$(".bottom-control span").removeClass('current');
			 	$(".bottom-control span[title='" + currentindex + "']").addClass('current');
			 });

			 $(".bottom-control span").on("click", function(event) {
			 	var currentindex = parseInt(event.target.title);

			 	var index = $(".bg-img").attr("class");
			 	index = index.substr(-1, 1);

			 	$(".bg-img").removeClass('bg-img' + index);
			 	$(".bg-img").addClass('bg-img' + currentindex);
			 	changeDescript(currentindex);
			 	$(".bottom-control span").removeClass('current');
			 	$(".bottom-control span[title='" + currentindex + "']").addClass('current');
			 })

			 function changeDescript(currentindex) {
			 	switch (currentindex) {
			 		case 1:
			 			$(".img-descript").html("Ian Joseph Somerhalder")
			 			$(".img-desctipt-detail").html("扮演吸血鬼日记男主角-Demon");
			 			break;
			 		case 2:
			 			$(".img-descript").html("Benedict Cumberbatch")
			 			$(".img-desctipt-detail").html("扮演神探夏洛克男主角-Sherlock Holmes");
			 			break;
			 		case 3:
			 			$(".img-descript").html("James Hillier Blount")
			 			$(".img-desctipt-detail").html("被誉为The captain poet");
			 			break;
			 	}
			 }

			 function getDOM(id) {
			 	return document.getElementById(id);
			 }
			 $(function() {
			 	var jscv = getDOM("js"),
			 		csscv = getDOM("css"),
			 		html5cv = getDOM("html5"),
			 		nodejscv = getDOM("nodejs");
			 	
			 	
			 	jsdraw(jscv, "#E74C3C", 1/2);
			 	cssdraw(csscv,"#3CEE7C",2/3);
			 	html5draw(html5cv, "#26A8F1", 2/5);
			 	nodejsdraw(nodejscv, "#F1EA32", 1/4);

			 	function init(obj,color,deg) {
			 		var ctx = obj.getContext("2d"),
			 			W = obj.width,
			 			H = obj.height;

			 		ctx.clearRect(0, 0, W, H);
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

			 		ctx.fillStyle = color;
			 		ctx.font = "30px microsoft yahei";
			 		text = Math.floor(deg / 360 * 100) + "%";
			 		text_w = ctx.measureText(text).width;
			 		ctx.fillText(text, W / 2 - text_w / 2, H / 2 + 15);
			 	}

			 	function jsdraw(obj,color,percent){
			 		var deg = 0,new_deg = 0,dif = 0;
			 		new_deg = Math.round(percent*360);
			 		dif = new_deg - deg;
			 		var jsloop = setInterval(function(){
			 					if (deg >= new_deg) {
			 						clearInterval(jsloop);
			 					}
			 					else if (deg < new_deg) {
			 						deg++;
			 					}
			 					init(obj,color,deg);
			 		}, 1000 / dif);
			 		console.log("jsloop finished");
			 	}

			 	function cssdraw(obj,color,percent){
			 		var deg = 0,new_deg = 0,dif = 0;
			 		new_deg = Math.round(percent*360);
			 		dif = new_deg - deg;
			 		var cssloop = setInterval(function(){
			 					if (deg >= new_deg) {
			 						clearInterval(cssloop);
			 					}
			 					else if (deg < new_deg) {
			 						deg++;
			 					}
			 					init(obj,color,deg);
			 		}, 1000 / dif);
			 		console.log("cssloop finished");
			 	}

			 	function html5draw(obj,color,percent){
			 		var deg = 0,new_deg = 0,dif = 0;
			 		new_deg = Math.round(percent*360);
			 		dif = new_deg - deg;
			 		var html5loop = setInterval(function(){
			 					if (deg >= new_deg) {
			 						clearInterval(html5loop);
			 					}
			 					else if (deg < new_deg) {
			 						deg++;
			 					}
			 					init(obj,color,deg);
			 		}, 1000 / dif);
			 		console.log("html5loop finished");
			 	}
			 	function nodejsdraw(obj,color,percent){
			 		var deg = 0,new_deg = 0,dif = 0;
			 		new_deg = Math.round(percent*360);
			 		dif = new_deg - deg;

			 		var nodejsloop = setInterval(function(){
			 					if (deg >= new_deg) {
			 						clearInterval(nodejsloop);
			 					}
			 					else if (deg < new_deg) {
			 						deg++;
			 					}
			 					init(obj,color,deg);
			 		}, 1000 / dif);
			 		console.log("nodejsloop finished");
			 	}
			 });