//验证邮箱是否合法
var validateEmail = function(){
	var patterm =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!patterm.test($("#email").val())){
		$("#email_error").css("display","inline-block");
		$("#email.focus");
		return false;
	}else{
		$("#email_error").css("display","none");
	}
}
//验证用户名
var validateUsername = function(){
	var patterm=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/; 
	if(!patterm.exec($("#username").val())){
		$("#user_error").css("display","inline-block");
		$("#username").focus();
		return false;
	}else{
		$("#user_error").css("display","none");
	}
}

$("#username").on("keyup",validateUsername);

$("#email").on("keyup",validateEmail);

//求密码强度
$("#password").on("keyup",function(){
	var value = $("#password").val();
	var weakpattern = /^[0-9]{1,20}$/;
	var weakpattern2 = /^[a-zA-Z]{1,20}$/;
	var normalpatterm = /^(\w){6,15}$/;
	var strongpatterm = /^(\w){16,20}$/;

	if(value == ""){
		$("#weak").css("background","white");
		$("#normal").css("background",'white');
		$("#strong").css("background",'white');
		$("#level").html("");
		$("#diffpass").css("display",'none');
	}
	//密码为纯数字或纯字母-强度；弱
	if(weakpattern.exec(value) || weakpattern2.exec(value)){
		$("#weak").css('background','yellow');
		$("#normal").css("background",'white');
		$("#strong").css("background",'white');
		$("#level").html("弱");
	}//密码为6-15位数字和字母的组合-强度：中级
	else if(normalpatterm.exec(value)){
		$("#normal").css('background','orange');
		$("#weak").css("background","white");
		$("strong").css("background",'white');
		$("#level").html("中");
	}//密码为16-20位数字和字母的组合-强度：强
	else if(strongpatterm.exec(value) ){
		$("#strong").css('background','red');
		$("#weak").css("background","white");
		$("#normal").css("background",'white');
		$("#level").html("强");
	}
});

//验证两次输入的密码是否一致
$("#password2").on("keyup",function(){
	if($("#password2").val() != $("#password").val()){
		$("#diffpass").css("display",'inline-block');
	}else{
		$("#diffpass").css("display",'none');
	}
});

$("#submit").on("click",function(){
	//验证两次输入的密码是否一致
	if($("#password").val() != $("#password2").val()){
		$("#diffpass").css("display",'inline-block');
		$("#password2").focus();
		return false;
	}

	//验证邮箱
	validateUsername();

	//验证密码
	validateEmail();

	return true;
})