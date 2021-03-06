/**
*模拟抽奖，可以用鼠标点击，也可以敲回车键
*
**/
var timer = null;//定时器
window.onload = function(){
	var btn = document.getElementById("choujiang");

	//鼠标事件
	btn.onclick = play;
	
	//键盘事件
	document.onkeyup = function(event){
		event = event || window.event;
		if(event.keyCode == 13){
			play(btn);
		}
	}
}

function play(){
		var cj = document.getElementById("cj");
		var btn = document.getElementById("choujiang")
		var i = 0;

		//每一次调用都要清楚之前的定时器
		clearInterval(timer);
		
		var pre = cj.querySelector(".yes"),//当前的那个节点
			random = Math.floor(Math.random()*cj.children.length), //随机生成一个数，从这个数开始轮转
			randomTime = Math.floor(Math.random()*5); //随机运行的时间
		timer = setInterval(function(){

				//跳过中间抽奖的那个按钮
				if(random == 4){
					random = (random + 1) % 9;
				}
				else{
					//设置当前的被选中的框的class
					cj.children[random].className = "yes";

					//设置之前那个框的class
					pre.className = "no";

					pre = cj.children[random];

					random = (random + 1) % 9;
				}
		},80);

		//设置抽奖按钮的背景

		btn.style.background="#999";
		btn.onclick = null;
		document.onkeyup = null;

		//停止抽奖
		setTimeout(function(){
			//清除定时器
			clearInterval(timer); 
			//弹出抽奖结果
			var choosen = cj.querySelector(".yes").innerHTML;
			if(choosen != "谢谢参与"){
				alert("恭喜你抽中了："+choosen);
			}else{
				alert(choosen);
			}
			//重设抽奖按钮背景
			btn.style.background="#F00";
			
			btn.onclick = play;
			document.onkeyup = function(event){
				event = event || window.event;
				if(event.keyCode == 13){
					play();
				}
			}
		},randomTime * 1000 + 2000);
}

