			  /*导航栏*/
			 //主页
			 $("#list_home").on("click",function(){
			 	clearActive();
			 	$("#list_home").addClass('list-active');
			 });

			 //关于我
			 $("#list_about").on("click",function($event){
			 	clearActive();
			 	$("#list_about").addClass('list-active');
			 });

			 //PORTFOLIO
			 $("#list_portfolio").on("mouseenter", function() {
			 	$("#list_portfolio .dropdown").css("display", "block");
			 });
			 $("#list_portfolio").on("mouseleave", function() {
			 	$("#list_portfolio .dropdown").css("display", "none");
			 });

			  //音乐
			 $("#list_music").on("click",function(event){
			 	clearActive();
			 	if(event.target.innerHTML === "MUSIC"){
			 		getDOM("music-bar").play();
			 		event.target.innerHTML = "PAUSE";
			 		$("#list_music").addClass('music-active');
			 	}
			 	else if(event.target.innerHTML === "PAUSE"){
			 		clearMusicActive();
			 		getDOM("music-bar").pause();
			 		event.target.innerHTML = "MUSIC";
			 		$("#list_music").removeClass('music-active');
			 		$("#list_music").addClass('list-active');
			 	}
			 });

			 //视频
			 $("#list_pages").on("mouseenter", function() {
			 	$("#list_pages .dropdown").css("display", "block");
			 });
			 $("#list_pages").on("mouseleave", function() {
			 	$("#list_pages .dropdown").css("display", "none");
			 });
			
			 $("#video1").on("click",function(){
			 	clearActive();//清除所有样式
			 	getDOM("music-bar").pause();//暂停音乐
			 	var video1Div = $("<div></div>"),
			 		video1Mask = $("<div></div>"),
			 		video1 = $("<video></video>"),
			 		control = $("<div></div>"),
			 		source = $("<source></source>")
				control.css({
					'position':'absolute',
					'top':'50px',
					'right':'50px',
					'width': '50px',
					'height': '50px',
					'z-index':'3000',
					'background':'url(./image/close.png)',
					'background-size':'50px 50px',
					'cursor':'pointer',
					'border':'1px solid #6699cc',
					'border-radius':'50%'
				});
				control.attr({
					'id':'closevideo1',
					'title':'关闭'
				});
			 	video1Div.attr('id', 'video1div');
			 	video1Div.css({
			 		"position":"absolute",
			 		'width': '800px',
			 		'height': '600px',
			 		"left":"300px",
			 		"top":"50px"
			 	}); 
			 	source.attr({
			 		//视频在github上就不包括了，只是一个示例
			 		'src': './video/video1.mp4',
			 		'type': 'video/mp4'
			 	});	
			 	video1.attr({
			 		'controls': 'controls',
			 		'id':'video1mp4',
			 		'autoplay':'autoplay',
			 		'width': '800px',
			 		'height': '520px'
			 	});
				video1.append(source);
				video1.append('你的浏览器不支持HTML5的video标签');
			 	video1Mask.attr('id', 'video1mask');
			 	video1Mask.css({
			 		"position":"fixed",
			 		"top":0,
			 		"left":0,
			 		"width": '100%',
			 		"height": '766px',
			 		"background-color":'rgba(0,0,0,0.9)',
			 		"z-index":"2004"
			 	});
			 	video1Div.append(video1);
			 	video1Mask.append(video1Div);
			 	$("body").append(control);
			 	$("body").append(video1Mask);

			 	$("#closevideo1").on("click",function(){
			  		$("#video1mp4").remove();
			  		
			  		$("#video1div").remove();
			  		
			  		$("#video1mask").remove();
			  		
			  		$("#closevideo1").remove();
			  		
			  		if($("#list_music > a").html() === "PAUSE"){
			  			getDOM("music-bar").play();
			  		}
			  	});
			 });
			 
			  

			 //联系我
			 $("#list_contact").on("mouseenter",function(){
			  	clearActive();
			 	$(".contact").css({"display":"block","z-index":"2001"});
			 	$("#list_contact").addClass('list-active');
			 });
			 $(".contact").on("mouseleave",function(){
			 	clearActive();
			 	$(".contact").css("display","none");
			 	$("#list_contact").removeClass('list-active');
			 });

			 //清除所有的active类
			 function clearActive(){
			 	$(".list-group").children('li').removeClass('list-active');
			 }
			 function clearMusicActive(){
			 	$(".list-group").children('#list_music').removeClass('music-active');
			 }

			 /*图片浏览*/
			 //上一张图片
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
			 			currentindex = 1;
			 			break;
			 		case '3':
			 			//3 的下一张是 2
			 			$(".bg-img").removeClass('bg-img' + index);
			 			$(".bg-img").addClass('bg-img2');
			 			currentindex = 2;
			 			break;
			 	}
			 	changeDescript(currentindex);
			 	$(".bottom-control span").removeClass('current');
			 	$(".bottom-control span[title='" + currentindex + "']").addClass('current');
			 });

			 //下一张图片
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

			 //轮播底部控制按钮
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

			 //修改图片上面的文字
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
			 