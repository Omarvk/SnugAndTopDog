"use strict";

angular.module("chatApp").factory("ChatResource",
function ChatResource ($rootScope) {
	var socket = io.connect('http://localhost:8080');
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
			console.log("getRoomlist plz");
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
		}

	};
});









