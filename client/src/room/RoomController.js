"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$routeParams", "ChatResource",
function RoomController($scope, $location, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var funcToBeCalledWhenRoomIsJoined = function(room) {
		$scope.$apply(function(){
			$scope.users = room.users;
			$scope.topic = room.topic;
			$scope.msgs = room.msgHistory;
			$scope.msgs.push({timestamp: new Date() ,nick: room.user, message: room.msg+" "+room.room});
		});
	}
	var funToBeCalledWhenRoomIsCreated = function(room) {

	}
	var funToBeCalledWhenMsgIsSend = function(room) {
		$scope.$apply(function(){
			$scope.msgs = room.msgHistory;
		});
	}
	var funToBeCalledWhenUserLeaveRoom = function(room) {
		$scope.$apply(function(){
			$scope.users = room.users;
			$scope.ops = room.ops;
			$scope.msgs.push({timestamp: new Date() ,nick: room.user, message: room.msg+" "+room.room});
			console.log(room.msg+" wata");
			$location.path("/roomlist");
		});
	}
	ChatResource.joinRoom(obj, funcToBeCalledWhenRoomIsJoined);
	$scope.onSendMsg = function onSendMsg() {
		obj.msg = $scope.newMsg;
		obj.roomName = $scope.name;
		console.log(obj.room + " " +obj.msg);
		ChatResource.sendMsg(obj, funToBeCalledWhenMsgIsSend);
	};
	$scope.onLeaveRoom = function onLeaveRoom() {
		ChatResource.leaveRoom($scope.name, funToBeCalledWhenUserLeaveRoom);
	};
	$scope.onDisc = function onDisc() {

	};

}]);