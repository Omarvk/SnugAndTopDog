"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$routeParams", "ChatResource",
function RoomController($scope, $location, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var checkJoined = false;
	ChatResource.on("updateusers", function(room, users, ops){
		var ob = {};
		var iD = 1;
		$scope.users = [];
		for(var user in users) {
			ob = {id: iD, name: user };
			$scope.users.push(ob);
			iD++;
		}
		$scope.selectedUser = 1;
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
	var funToBeCalledWhenRoomIsCreated = function() {

	}
	var funToBeCalledWhenMsgIsSend = function() {
		$scope.newMsg = "";
	}
	var funToBeCalledWhenUserLeaveRoom = function() {
		$location.path("/roomlist");
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