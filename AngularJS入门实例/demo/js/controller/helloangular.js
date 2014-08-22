function HelloAngular($scope,$rootScope){
	$scope.greeting={text:'hello'};
	$rootScope.department = "guangzhou";
}
function GetNames($scope){
	$scope.names = ['caibin','jack','rose'];
	//$scope.department = "china";
}
function EventController($scope){
	$scope.emit = function(args){
		console.log(args);
	};
	$scope.broadcast = function(args){
		console.log(args);
	}
}