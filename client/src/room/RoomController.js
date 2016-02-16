"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$routeParams", "ChatResource",
function RoomController($scope, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var funcToBeCalledWhenRoomIsJoined = function(room) {
		$scope.$apply(function(){
			$scope.users = room.users;
			$scope.topic = room.topic;
			$scope.msgs = room.msgHistory;
		});
	}
	var funToBeCalledWhenRoomIsCreated = function(room) {

	}
	var funToBeCalledWhenMsgIsSend = function(room) {
		$scope.$apply(function(){
			console.log("GET MSG MEN");
			$scope.msgs = room.msgHistory;
		});
	}
	ChatResource.joinRoom(obj, funcToBeCalledWhenRoomIsJoined);
	$scope.onSendMsg = function onSendMsg() {
		obj.msg = $scope.newMsg;
		obj.roomName = $scope.name;
		console.log(obj.room + " " +obj.msg);
		ChatResource.sendMsg(obj, funToBeCalledWhenMsgIsSend);
	};

}]);