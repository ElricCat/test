/*监听键盘事件，显示suggest*/
$('#search_input').bind('keyup',function(){
	
	$('#search_suggest').show().css({
		"width":$('#search_form').width()+10+"px",
		"top":$('#search_form').offset().top+$('#search_form').height()+10+"px",
		"left":$('#search_form').offset().left+"px",
		"border":"0",
		'border-top':"1px solid #999",
		"position":'absolute'
	});
});

/*输入框失去焦点，隐藏suggest框*/
$('#search_input').bind('focusout',function(){
	$('#search_suggest').hide();
})