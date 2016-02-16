"use strict";

angular.module("chatApp").controller("CreateRoomController",
["$scope", "ChatResource",
function CreateRoomController($scope, ChatResource) {
	$scope.createRoom = function createRoom(){
		var obj = {room: $scope.room, pass: $scope.pw };
		ChatResource.createRoom(obj);
	};
}]);