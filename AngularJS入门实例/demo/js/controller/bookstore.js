var bookStoreModule = angular.module("bookstore",[]);
bookStoreModule.service("BookService",['$rootScope',function($rootScope){
	var service = {
		books:[
			{title:'《JavaScript语言精粹》',author:'道格拉斯克劳福德'}
		],
		addBook:function(book){
			service.books.push(book);
			$rootScope.$broadcast('book.update'); //声明一个update事件，使得可以在页面上更新
		},
		getBook:function(){
			console.log(service.books);
		}
	}
	return service;
}]);

//Controller 控制器
bookStoreModule.controller('book.list',['$scope','BookService',function(scope,BookService){
	//实现这个update事件
	scope.$on('book.update',function(event){
		scope.books = BookService.books;
		scope.$apply();
	});
	//页面初始化的时候，需要从Service里面获取数据
	scope.books = BookService.books;
}]);

//Directive 指令
/*
	html页面的add-book-button形式的指令，对应为addBookButton。
*/
bookStoreModule.directive("addBookButton",['BookService',function(BookService){
	return{
		restrict:"A",
		link:function(scope,element,attrs){
			element.bind('click',function(){
				BookService.addBook({title:'《使用AngularJs开发下一代WEB应用》',author:"大漠穷秋"});
			});
		}
	};
}]);
bookStoreModule.directive("getBookButton",['BookService',function(BookService){
	return {
		restrict:'A',
		link:function(scope,element,attrs){
			element.bind('click',function(){
				BookService.getBook();
			})
		}
	}
}]);