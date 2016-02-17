"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$routeParams", "ChatResource",
function RoomController($scope, $location, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var checkJoined = false;
	var thisUser;
	$scope.users = [];
	ChatResource.on("updateusers", function(room, users, ops) {
		if(room === $scope.name) {
			var ob = {};
			var iD = 1;
			$scope.users = [];
			for(var user in users) {
				ob = {id: iD, name: user };
				$scope.users.push(ob);
				iD++;
			}
			$scope.selectedUser = 1;
		}
	});
	ChatResource.on("updatechat", function(room, msgHistory) {
		if(room === $scope.name) {
			//$scope.msgs = msgHistory;
			if(checkJoined) {
				$scope.msgs = msgHistory;
				checkJoined = false;
			}else {
				var getMsg = msgHistory[msgHistory.length - 1];
				$scope.msgs.push({timestamp: getMsg.timestamp, nick: getMsg.nick, message: getMsg.message});
			}
		}
	});
	ChatResource.on("updatetopic", function(room, topic, user) {
		if(room === $scope.name) {
			$scope.topic = topic +" "+ user;
			thisUser = user;
		}
	});
	ChatResource.on("servermessage", function(msg, room, user) {
		if(room === $scope.name) {
			$scope.msgs.push({timestamp: new Date() ,nick: $scope.name, message: user+" "+msg+" "+room});
		}
	});
	ChatResource.on("recv_privatemsg", function(user, msg) {
		$scope.msgs.push({timestamp: new Date(), nick: user + " whispers" , message: msg});
	});
	ChatResource.on("kicked", function(room, kickedUser, user) {
		if(room === $scope.name) {
			$scope.msgs.push({timestamp: new Date(), nick: room, message: kickedUser + " kicked by " + user});
		}
	});
	var funcToBeCalledWhenRoomIsJoined = function() {
		checkJoined = true;
	}
	var funToBeCalledIfFail = function() {
		$scope.msgs.push({timestamp: new Date(), nick: $scope.name, message: "You are not OP" });
	}
	ChatResource.joinRoom(obj, funcToBeCalledWhenRoomIsJoined);
	$scope.onSendMsg = function onSendMsg() {
		obj.msg = $scope.newMsg;
		obj.roomName = $scope.name;
		console.log(obj.room + " " +obj.msg);
		ChatResource.sendMsg(obj);
		$scope.newMsg = "";

	};
	$scope.set_color = function(user) {
		if(user.indexOf("whispers") > -1 || user.indexOf("To") > -1 ) {
			return { color: "#FF1493" }
		}
		if(user === $scope.name) {
			return { color: "green" }
		}
	}
	$scope.onSendPrvMsg = function onSendPrvMsg() {
		if(thisUser !== $scope.users[$scope.selectedUser - 1].name) {
			$scope.msgs.push({timestamp: new Date(), nick: "To " + $scope.users[$scope.selectedUser - 1].name, message: $scope.newMsg });
			ChatResource.sendPrvMsg({nick: $scope.users[$scope.selectedUser - 1].name, message: $scope.newMsg });
		}else {
			$scope.msgs.push({timestamp: new Date(), nick: $scope.name, message: "Dont send msg to your self" });
		}
	};
	$scope.onKick = function onKick() {
		ChatResource.kick({user: $scope.users[$scope.selectedUser - 1].name, room: $scope.name}, funToBeCalledIfFail);
	};
	$scope.onLeaveRoom = function onLeaveRoom() {
		ChatResource.leaveRoom($scope.name);
		$location.path("/roomlist");
	};
	$scope.onDisc = function onDisc() {

	};

}]);