"use strict";

angular.module("chatApp").factory("ChatResource",
["$rootScope",
function ChatResource ($rootScope) {
	var socket = io.connect('http://localhost:8080');
	var reason = "";
	var roomName = "";
	return {
		on: function on(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		getRoomList: function getRoomList() {
			socket.emit("rooms");
		},
		addUser: function addUser(user, fun){
			socket.emit("adduser", user, function(available) {
				fun(available);
			});
		},
		joinRoom: function joinRoom(obj, fun){
			socket.emit("joinroom", obj, function(available, Reason) {
				fun(available, Reason);
			});
		},
		sendMsg: function sendMsg(msgs) {
			socket.emit("sendmsg", msgs);
		},
		sendPrvMsg: function sendPrvMsg(data) {
			socket.emit("privatemsg", data, function(bla){});
		},
		kick: function kick(data) {
			socket.emit("kick", data, function(bla){});	
		},
		ban: function ban(data) {
			socket.emit("ban", data, function(bla){});
		},
		leaveRoom: function leaveRoom(room) {
			socket.emit("partroom", room);
		},
		setReason: function setReason(aReason, name) {
			reason = aReason;
			roomName = name;
		},
		getReason: function getReason(fun) {
			fun(reason, roomName);
		} 
	};
}]);









