"use strict";

angular.module("chatApp").controller("LoginController",
["$scope", "$location", "ChatResource", "Auth",
function LoginController ($scope, $location, ChatResource, Auth) {
	$scope.errorMsg = "";
	$scope.user = "";
	var RegisterUserOrLogin = function(success){
		$scope.$apply(function(){
			if(success){
				Auth.setUser($scope.user);
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


