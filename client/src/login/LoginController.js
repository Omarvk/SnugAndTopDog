"use strict";

angular.module("chatApp").controller("LoginController",
["$scope", "$location", "ChatResource",
function LoginController ($scope, $location, ChatResource) {
	//$scope.user = "User Name";
	$scope.errorMsg = "";
	/*$scope.onToRegister = function onToRegister(){
		$location.path("/register");
	};*/
	var RegisterUserOrLogin = function(success){
		$scope.$apply(function(){
			if(success){
				$location.path("/roomlist");
			}else{
				$scope.errorMsg = "User name exists";
			}
		});
	}
	$scope.onLogin = function onLogin() {
		ChatResource.addUser($scope.user, RegisterUserOrLogin);
	};

	/*$scope.$watch("user", function(newValue, oldValue) {
		if(newValue.lenght > 3){

		}

	});*/
	
}]);


