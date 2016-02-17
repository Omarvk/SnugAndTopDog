"use strict";

angular.module("chatApp").controller("RegisterController",
["$scope", "$location", "ChatResource",
function RegisterController ($scope, $location, ChatResource) {
	//$scope.user = "User Name";
	$scope.errorMsg = "";
	var RegisterUserOrLogin = function(success){
		$scope.$apply(function(){
			if(success){
				$location.path("/roomlist");
			}else{
				$scope.errorMsg = "User name exists";
			}
		});
	}
	$scope.onRegister = function onRegister() {
		console.log($scope.user);
		ChatResource.addUser($scope.user, RegisterUserOrLogin);
	};
	
}]);