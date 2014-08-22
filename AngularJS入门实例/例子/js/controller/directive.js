var myDirectiveModule = angular.module("MyDirective",[]);
myDirectiveModule.directive("hello",function(){
	return {
		restrict:'E',
		template:'<div>Hello Directive!</div>',
		replace:true
	}
});