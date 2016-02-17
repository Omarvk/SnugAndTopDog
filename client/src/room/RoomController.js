"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$routeParams", "ChatResource",
function RoomController($scope, $location, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var checkJoined = false;
	$scope.users = [];
	ChatResource.on("updateusers", function(room, users, ops) {
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
	ChatResource.on("updatechat", function(room, msgHistory) {
		console.log("listen");
		//$scope.msgs = msgHistory;
		if(checkJoined) {
			$scope.msgs = msgHistory;
			checkJoined = false;
		}else {
			var getMsg = msgHistory[msgHistory.length - 1];
			$scope.msgs.push({timestamp: getMsg.timestamp, nick: getMsg.nick, message: getMsg.message});
		}
	});
	ChatResource.on("updatetopic", function(room, topic, user) {
		$scope.topic = topic +" "+ user;
	});
	ChatResource.on("servermessage", function(msg, room, user) {
		$scope.msgs.push({timestamp: new Date() ,nick: $scope.name, message: user+" "+msg+" "+room});
	});
	ChatResource.on("recv_privatemsg", function(user, msg) {
		$scope.msgs.push({timestamp: new Date(), nick: user, message: msg});
	});
	ChatResource.on("kicked", function(room, kickedUser, user) {
		$scope.msgs.push({timestamp: new Date(), nick: room, message: kickedUser + " kicked by " + user});
	});
	var funcToBeCalledWhenRoomIsJoined = function() {
		checkJoined = true;
	}
	ChatResource.joinRoom(obj, funcToBeCalledWhenRoomIsJoined);
	$scope.onSendMsg = function onSendMsg() {
		obj.msg = $scope.newMsg;
		obj.roomName = $scope.name;
		console.log(obj.room + " " +obj.msg);
		ChatResource.sendMsg(obj);
		$scope.newMsg = "";

	};
	$scope.onSendPrvMsg = function onSendPrvMsg() {
		ChatResource.sendPrvMsg({nick: $scope.users[$scope.selectedUser - 1].name, message: "PrivateMsg "+$scope.newMsg});
	};
	$scope.onKick = function onKick() {
		ChatResource.kick({user: $scope.users[$scope.selectedUser - 1].name, room: $scope.name});
	};
	$scope.onLeaveRoom = function onLeaveRoom() {
		ChatResource.leaveRoom($scope.name);
		$location.path("/roomlist");
	};
	$scope.onDisc = function onDisc() {

	};

}]);