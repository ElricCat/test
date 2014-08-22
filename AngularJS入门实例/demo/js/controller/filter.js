var filterModule = angular.module("MyFilter",[]);
filterModule.controller("PhoneListCtrl",["$scope",function($scope){
	$scope.phones = [
		{
			"name":"Nexus S",
			"snippet":"Fast just got faster with Nexus S"
		},
		{
			"name":"iPhone5",
			"snippet":"it is the best phone you have ever seen"
		},
		{
			"name":"mi 4",
			"snippet":"it is the best and cheapest phone you have ever seen"
		}
	];
}]);