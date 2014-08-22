var expanderModule = angular.module("expanderModule",[]);
expanderModule.directive("expander",function(){
	return {
			restrict:'EA',
			replace:true,
			transclude:true,
			scope:{
					title:'=expanderTitle'
			},
			template:"<div>"
							+"<div class='title' ng-click='toggle()'>{{title}}</div>"
							+"<div class='body' ng-show='showMe' ng-transclude></div>"
					+"</div>",
			link:function(scope,element,attrs){
				scope.showMe = false;
				scope.toggle = function toggle(){
					scope.showMe = !scope.showMe;
				}
			}
	}
});
expanderModule.controller("ExpanderController",function($scope){
	$scope.title = "点击展开";
	$scope.text = "从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚对小和尚说：从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚对小和尚说：从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚对小和尚说...";
});