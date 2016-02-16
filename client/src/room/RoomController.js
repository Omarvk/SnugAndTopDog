"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$routeParams", "ChatResource",
function RoomController($scope, $routeParams, ChatResource) {
	var funcToBeCalledWhenRoomIsJoined = function(room) {
		console.log(room.topic);
		console.log(room.join);
		$scope.users = room.users;
		$scope.topic = room.topic;
		$scope.msgs = room.msgHistory;
	}
	var funToBeCalledWhenRoomIsCreated = function(room) {

	}
	var funToBeCalledWhenMsgIsSend = function(room, msg) {

	}
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	console.log(obj.room);
	ChatResource.joinRoom(obj, funcToBeCalledWhenRoomIsJoined);
}]);