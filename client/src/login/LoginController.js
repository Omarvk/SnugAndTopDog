"use strict";

angular.module("chatApp").controller("LoginController",
["$scope", "$location", "ChatResource",
function LoginController ($scope, $location, ChatResource) {
	$scope.user = "User Name";
	$scope.errorMsg = "";
	$scope.onToRegsiter = function onToRegsiter(){
		$location.path("/register");
	};
	$scope.onLogin = function onLogin() {
		$scope.errorMsg = "wata";
		ChatResource.login($scope.user, function(success){
			if(!success){
				$scope.errorMsg = "submit fails";
			} else {
				$scope.errorMsg = "tókst";
			}
		});
	};
	/*$scope.$watch("user", function(newValue, oldValue) {
		if(newValue.lenght > 3){

		}

	});*/
	
}]);


