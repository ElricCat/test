function getDOM(id){
	return document.getElementById(id);
}


window.onload = function(){
	//让元素不被选中（包括图片元素）
	document.onselectstart = new Function('event.returnValue=false;');
	//用jquery实现拖动效果
	$("#main").draggable({containment:'parent',drag:setChoice});
	var rightDiv = getDOM("right");
	var upDiv = getDOM("up")
	var mainDiv = getDOM("main");
	var leftDiv = getDOM("left");
	var downDiv = getDOM("down");
	var leftupDiv = getDOM("left_up");
	var rightupDiv = getDOM("right_up");
	var rightdownDiv = getDOM("right_down");
	var leftdownDiv = getDOM("left_down");
	var ifKeyDown = false;//鼠标按下状态
	var contact = "";//用来表示被按下的触点
	setPreview();//获取预览
	//鼠标按下事件
	rightDiv.onmousedown = function(e){
		e.stopPropagation();//阻止事件冒泡
		ifKeyDown = true;
		contact = "right";
	}
	upDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "up";
	}
	leftDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "left";
	}
	downDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "down";
	}
	leftupDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "leftup";
	}
	rightupDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "rightup";
	}
	rightdownDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "rightdown";
	}
	leftdownDiv.onmousedown = function(e){
		e.stopPropagation();
		ifKeyDown = true;
		contact = "leftdown";
	}

	//鼠标松开事件
	window.onmouseup = function(){
		ifKeyDown = false;
		contact = "";
	}
	//鼠标移动事件
	window.onmousemove = function(e){
		if(ifKeyDown == true){
			switch(contact){
				case "right":rightMove(e);break;
				case "up":upMove(e);break;
				case "left":leftMove(e);break;
				case "down":downMove(e);break;
				case "leftup":leftMove(e);upMove(e);break;
				case "rightup":rightMove(e);upMove(e);break;
				case "rightdown":rightMove(e);downMove(e);break;
				case "leftdown":leftMove(e);downMove(e);break;
			}
		}
		setChoice();
		setPreview();
	}

	//先使用后定义，是因为js的函数声明提前了
	//right移动函数
	function rightMove(e){
		var x = e.clientX;//鼠标的x坐标
		var addWidth = "";//鼠标移动后增加的宽度
		var withBefore = mainDiv.offsetWidth - 2;//选取框变化前的宽度
		addWidth = x - getPosition(mainDiv).left-withBefore;//鼠标移动后增加的宽度
		mainDiv.style.width = addWidth + withBefore + "px";
	}

	//up移动函数
	function upMove(e){
		var y = e.clientY;//鼠标纵坐标
		var mainY = getPosition(mainDiv).top;//选取框相对于父元素的高度
		var addHeight = mainY - y;//增加的高度
		var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
		mainDiv.style.height = heightBefore + addHeight + "px";
		mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
	}

	//left移动函数
	function leftMove(e){
		var x = e.clientX;//鼠标的x坐标
		var mainX = getPosition(mainDiv).left;//选取框到屏幕父元素的宽度
		var addWidth = mainX - x;//增加的宽度
		var withBefore = mainDiv.offsetWidth - 2;
		mainDiv.style.width = withBefore + addWidth + "px";
		mainDiv.style.left = mainDiv.offsetLeft - addWidth + "px";
	}

	//down移动函数
	function downMove(e){
		var y = e.clientY;//鼠标的y坐标
		var heightBefore = mainDiv.offsetHeight - 2;//选取框原来的高度
		var mainY = getPosition(mainDiv).top;//选取框相对于屏幕的距离
		var addHeight = y - heightBefore - mainY;//增加的高度
		mainDiv.style.height = heightBefore + addHeight + "px";
	}

	//设置选取区高亮可见
	function setChoice(){
		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
		var bottom = mainDiv.offsetTop+mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;
		var img2 = getDOM("img2");
		img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}

	//预览函数
	function setPreview(){
		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
		var bottom = mainDiv.offsetTop+mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;
		var img3 = getDOM("img3");
		img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
		img3.style.top = -top + "px";
		img3.style.left = -left + "px";
	}
}


//获取元素相对于屏幕左边的距离，利用offsetLeft
function getPosition(node){
	var left = node.offsetLeft;
	var top = node.offsetTop;
	var parent = node.offsetParent;
	while(parent != null){
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {"left":left,"top":top};
}