/**
*	《跳动的英文名》 v0.1
*	 作者：蔡斌
*	 参考：慕课网课程：http://www.imooc.com/learn/133 
*	感谢 liuyubobobo 老师
*	 
**/
var WINDOW_WIDTH, //整个窗口的宽度
	WINDOW_HEIGHT, //整个窗口的高度
	RADIUS = 8, //半径
	MARGIN_TOP = 0, //上边距
	MARGIN_LEFT = 0; //左边距

var name = "CAI BIN"; //默认的名字：即作者的名字

var balls = [];			//用来存放跳动的小球

var intervalHandler;	//用来控制小球跳动与否

//如果不输入时间，那么会启用默认时间 2014-08-22-18:47:52
const endTime = new Date(2014,7,22,18,47,52);

//当前秒数，用于和10秒后的秒数进行对比以此来控制时间间隔
var curShowTimeSeconds = 0;	

var drawbtn = document.getElementById("begin");
var stopbtn = document.getElementById("stop");

stopbtn.addEventListener("click",stopDraw);
drawbtn.addEventListener("click",function(){
	endTime = document.getElementById("lasttime").value;
	name = document.getElementById("name").value;
	var pattern = /^[a-zA-Z\s?]+$/;
	if(!pattern.test(name)){
		alert("只能输入字母和空格");
		name = "CAI BIN";
	}
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)+10;
	RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	//因为屏幕最大只能容忍 8 个字符（在15.6英寸的情况下，具体情况具体分析）
	if(name.length >= 8){
		canvas.width = name.length * 180;
	}
	begintoDraw();
});

//开始画
function begintoDraw(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext?canvas.getContext("2d"):null;
	if(!context){
		console.error("error , no context");
		return;
	}
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	intervalHandler = setInterval(
		function(){
			render( context , name);
			update(name);
		},
		50
	);
}
//停止作画
function stopDraw(){
	clearInterval(intervalHandler);
}

//获取当前显示时间的秒数
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 );
    return ret >= 0 ? ret : 0;
}

function update(name){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextSeconds = nextShowTimeSeconds % 60;
	var curSeconds = curShowTimeSeconds % 60;

	//比较两个时间的秒数，相差十秒左右会触发一次增加小球的函数
	//如果是每秒，那么应为：parseInt(curSeconds%10) != parseInt(nextSeconds%10)
	if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
		for(var i=0;i<name.length;i++){

			//遇到空格的话，就不用显示弹出效果，也不用画球
			if(name[i] === " "){
				continue;
			}
			//index 表示字符在namedigit中对应的位置索引
			var index = name[i].toLocaleLowerCase().charCodeAt(0)-97;
			addBalls(MARGIN_LEFT + i*15*(RADIUS+1),MARGIN_TOP,index);
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
}

//将小球增加到数组balls
function addBalls( x, y , num ){
	for( var i = 0  ; i < namedigit[num].length ; i ++ )
        for( var j = 0  ; j < namedigit[num][i].length ; j ++ )
            if( namedigit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1), //x 方向的位置
                    y:y+i*2*(RADIUS+1)+(RADIUS+1), //y 方向的位置
                    g:1.5+Math.random(),			//重力加速度
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4, //x 方向的速度
                    vy:-5,	//y 方向的速度
                    color: colors[ Math.floor( Math.random()*colors.length ) ] //颜色
                }
                balls.push( aBall ); 	//添加小球
            }
}

//修改小球的位置，根据其速度 ，加速度
function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    //此时屏幕视野中的小球数
    var cnt = 0;
    for( var i = 0 ; i < balls.length ; i ++ ){
    	if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < canvas.width ){
    		balls[cnt++] = balls[i];
    	}
    }   
    //将不属于视野中的小球清除，节省内存，视野中最多可以有200个小球
    while( balls.length > Math.min(cnt,200)){
        balls.pop();
    }
}

//画的过程
function render( ctx , name){
	//清除上一次的痕迹
	ctx.clearRect(0,0,canvas.width,WINDOW_HEIGHT);

	//画静止的小球
	for( var i = 0;i < name.length; i++ ){

		//遇到空格，画一个空格
		if(name[i] === " "){
			renderDigit(MARGIN_LEFT + i*15*(RADIUS+1),MARGIN_TOP,26,ctx);
		}
		else{
			//遇到一个字符，画一个字符
			var index = name[i].toLocaleLowerCase().charCodeAt(0)-97;
			renderDigit(MARGIN_LEFT + i*15*(RADIUS+1),MARGIN_TOP,index,ctx);
		}
	}

	//画跳动小球。
	for( var i = 0 ; i < balls.length ; i ++ ){
        ctx.fillStyle=balls[i].color;
        ctx.beginPath();
        ctx.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        ctx.closePath();
        ctx.fill();
    }
}

//画静止的小球 x,y分别是每一行开始的位置。
function renderDigit( x , y , num , ctx ){

    ctx.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < namedigit[num].length ; i ++ ){
    	for(var j = 0 ; j < namedigit[num][i].length ; j ++ ){
    		if( namedigit[num][i][j] == 1 ){
                ctx.beginPath();
                ctx.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                ctx.closePath();
                ctx.fill();
            }
    	}
    }
}