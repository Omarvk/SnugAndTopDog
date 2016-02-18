"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$routeParams", "ChatResource",
function RoomController($scope, $location, $routeParams, ChatResource) {
	$scope.name = $routeParams.name;
	var obj = {room: $scope.name};
	var checkJoined = false;
	var thisUser;
	var listOps = [];
	$scope.msgs = [];
	$scope.users = [];
	ChatResource.on("updateusers", function(room, users, ops) {
		if(room === $scope.name) {
			var ob = {};
			var iD = 1;
			listOps = ops;
			$scope.users = [];
			for(var user in users) {
				if(listOps[user] !== undefined){
					ob = {id: iD, name: "@"+user };
				}else{
					ob = {id: iD, name: user };
				}
				$scope.users.push(ob);
				iD++;
			}
			$scope.selectedUser = 1;
		}
	});
	ChatResource.on("updatechat", function(room, msgHistory) {
		if(room === $scope.name) {
			//$scope.msgs = msgHistory;
			var iD = 1;
			if(checkJoined) {
				/*for(var msg in msgHistory){
					msg.id = iD;
					iD++;
				}*/
				$scope.msgs = msgHistory;
				checkJoined = false;
			}else {
				if(msgHistory.length !== 0) {
					var getMsg = msgHistory[msgHistory.length - 1];
					$scope.msgs.push({timestamp: getMsg.timestamp, nick: getMsg.nick, message: getMsg.message});
				}
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
			if(thisUser === kickedUser){
				$location.path("/roomlist");
			}
			$scope.msgs.push({timestamp: new Date(), nick: room, message: kickedUser + " kicked by " + user});
		}
	});
	ChatResource.on("banned", function(room, bannedUser, user) {
		if(room === $scope.name) {
			if(thisUser === bannedUser){
				$location.path("/roomlist");
			}
			$scope.msgs.push({timestamp: new Date(), nick: room, message: bannedUser + " banned by " + user});
		}
	});
	var funcToBeCalledWhenRoomIsJoined = function() {
		console.log("joined");
		checkJoined = true;
	}
	var funToBeCalledIfFail = function() {
		$scope.msgs.push({timestamp: new Date(), nick: $scope.name, message: "You are not OP" });
	}
	ChatResource.joinRoom(obj, funcToBeCalledWhenRoomIsJoined);
	$scope.onSendMsg = function onSendMsg() {
		obj.msg = $scope.newMsg;
		obj.roomName = $scope.name;
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
	$scope.checkIfOp = function checkIfOp() {
		if(listOps[thisUser] !== undefined) {
			return true;
		}else {
			return false;
		}
	}
	$scope.onSendPrvMsg = function onSendPrvMsg() {
		var user = $scope.users[$scope.selectedUser - 1].name;
		if(user.indexOf("@") === 0) {
			user = user.substr(1);
		}
		if(thisUser !== user) {
			$scope.msgs.push({timestamp: new Date(), nick: "To " + user, message: $scope.newMsg });
			ChatResource.sendPrvMsg({nick: user, message: $scope.newMsg });
		}else {
			$scope.msgs.push({timestamp: new Date(), nick: $scope.name, message: "Dont send msg to your self" });
		}
	};
	$scope.onKick = function onKick() {
		if("@"+thisUser !== $scope.users[$scope.selectedUser - 1].name) {
			ChatResource.kick({user: $scope.users[$scope.selectedUser - 1].name, room: $scope.name}, funToBeCalledIfFail);
		}else {
			$scope.msgs.push({timestamp: new Date(), nick: $scope.name, message: "Kick your self?" });
		}
	};
	$scope.onBan = function onBan() {
		if("@"+thisUser !== $scope.users[$scope.selectedUser - 1].name) {
			ChatResource.ban({user: $scope.users[$scope.selectedUser - 1].name, room: $scope.name}, funToBeCalledIfFail);
		}else {
			$scope.msgs.push({timestamp: new Date(), nick: $scope.name, message: "ban your self?" });
		}
	};
	$scope.onLeaveRoom = function onLeaveRoom() {
		ChatResource.leaveRoom($scope.name);
		$location.path("/roomlist");
	};
	$scope.onDisc = function onDisc() {

	};

}]);