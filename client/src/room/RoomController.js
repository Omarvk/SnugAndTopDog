"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$routeParams", "ChatResource",
function RoomController($scope, $location, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var checkJoined = false;
	ChatResource.on("updateusers", function(room, users, ops){
		$scope.users = users;
	});
	ChatResource.on("updatechat", function(room, msgHistory){
		console.log("listen");
		//$scope.msgs = msgHistory;
		if(checkJoined){
			$scope.msgs = msgHistory;
			checkJoined = false;
		}else{
			var getMsg = msgHistory[msgHistory.length - 1];
			$scope.msgs.push({timestamp: getMsg.timestamp ,nick: getMsg.nick, message: getMsg.message});
		}
	});
	ChatResource.on("updatetopic", function(room, topic, user){
		$scope.topic = topic +" "+ user;
	});
	ChatResource.on("servermessage", function(msg, room, user){
		$scope.msgs.push({timestamp: new Date() ,nick: $scope.name, message: user+" "+msg+" "+room});
	});
	var funcToBeCalledWhenRoomIsJoined = function() {
		checkJoined = true;
	}
	var funToBeCalledWhenRoomIsCreated = function(room) {

	}
	var funToBeCalledWhenMsgIsSend = function(room) {
		$scope.newMsg = "";
	}
	var funToBeCalledWhenUserLeaveRoom = function(room) {
		$scope.$apply(function(){
			//$scope.users = room.users;
			//$scope.ops = room.ops;
			//$scope.msgs.push({timestamp: new Date() ,nick: room.user, message: room.msg+" "+room.room});
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