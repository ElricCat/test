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
			 	if(event.target.innerHTML == "MUSIC"){
			 		document.getElementById("music-bar").play();
			 		event.target.innerHTML = "PAUSE";
			 		$("#list_music").addClass('music-active');
			 	}
			 	else if(event.target.innerHTML == "PAUSE"){
			 		clearMusicActive();
			 		document.getElementById("music-bar").pause();
			 		event.target.innerHTML = "MUSIC";
			 		$("#list_music").removeClass('music-active');
			 		$("#list_music").addClass('list-active');
			 	}
			 });

			 //PAGES
			 $("#list_pages").on("mouseenter", function() {
			 	$("#list_pages .dropdown").css("display", "block");
			 });
			 $("#list_pages").on("mouseleave", function() {
			 	$("#list_pages .dropdown").css("display", "none");
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
			 