"use strict";

angular.module("chatApp").factory("ChatResource",
function ChatResource ($rootScope) {
	var socket = io.connect('http://localhost:8080');// $rootScope.socket;
	return {
		on: function on(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		getRoomList: function getRoomList(fun) {
			socket.emit("rooms");
			socket.on("roomlist", function(data) {
				fun(data);
			});
		},
		addUser: function addUser(user, fun){
			socket.emit("adduser", user, function(available){
				fun(available);
			});
		},
		createRoom: function createRoom(obj, fun){
			socket.emit("joinroom", obj, function(available, Reason){
				fun(available, Reason);
			});
		},
		joinRoom: function joinRoom(obj, fun){
			socket.emit("joinroom", obj, function(available, Reason){
				if(!available) {
					fun(available, Reason);
				}
			});
			fun();
		},
		sendMsg: function sendMsg(msgs) {
			socket.emit("sendmsg", msgs);
		},
		sendPrvMsg: function sendPrvMsg(data) {
			socket.emit("privatemsg", data, function(sucess){
				if(!sucess) {
				}
			});
		},
		leaveRoom: function leaveRoom(room) {
			socket.emit("partroom", room);
		}

	};
});









