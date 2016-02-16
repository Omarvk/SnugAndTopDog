"use strict";

angular.module("chatApp").controller("CreateRoomController",
["$scope", "$location", "ChatResource",
function CreateRoomController($scope, $location, ChatResource) {
	var funToBeCalledWhenCreateRoom = function(sucess, reason){
		$scope.$apply(function(){
			if(sucess){
				$location.path("/room/"+$scope.room);
			}else{
				$erroMsg(reason);
			}
		});
	}
	$scope.onCreateRoom = function onCreateRoom(){
		var obj = {room: $scope.room, pass: $scope.pw };
		ChatResource.createRoom(obj, funToBeCalledWhenCreateRoom);
	};
}]);