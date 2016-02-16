"use strict";
/*
angular.module("chatApp").factory("Socket", 
function Socket(){
	var socket = io.connect('http://localhost:8080');
	return {
		connect: function connect(fun) {
			console.log("reyna");
			socket.emit("connection", function(){
				console.log("tengdu");
				fun(socket);
			});
		}
	};
	
}); */
angular.module("chatApp").factory("ChatResource",
function ChatResource ($rootScope) {
	var socket = io.connect('http://localhost:8080');// $rootScope.socket;
	return {
		login: function login(user, callback) {
			socket.emit("login", user, function(available){

			});

		},
		getRoomList: function getRoomList(fun) {
			//this.connect();
			//var socket = io.connect('http://localhost:8080'); 
			socket.emit("rooms");
			socket.on("roomlist", function(data) {
				fun(data);
			});
		},
		addUser: function addUser(user, fun){
			console.log(user);
			socket.emit("adduser", user, function(available){
				fun(available);
			});
		},
		createRoom: function createRoom(obj, fun){
			var data = {};
			socket.emit("joinroom", obj, function(available, Reason){
				fun(available, Reason);
			});
			socket.on("updateusers", function(room, users, ops) {
				data.room = room;
				data.users = users;
				data.ops = ops;
				
			});
			socket.on('updatetopic', function(room, topic, user){
				data.topic = topic;
				data.user = user;
			});
			socket.on('servermessage', function(join, room, user){
				data.join = join;
				fun(data);
			});
		},
		joinRoom: function joinRoom(obj, fun){
			var data = {};
			console.log(obj.room);
			socket.emit("joinroom", obj, function(available, Reason){
				if(available){
					console.log("yeah");
				}else{
					console.log("noooo " + Reason);
				}
			});
			socket.on("updateusers", function(room, users, ops) {
				data.room = room;
				data.users = users;
				data.ops = ops;
				
			});
			socket.on("updatechat", function(room, msgHistory){
				data.msgHistory = msgHistory;
			});
			socket.on('updatetopic', function(room, topic, user){
				data.topic = topic;
				data.user = user;
			});
			socket.on('servermessage', function(join, room, user){
				data.join = join;
				fun(data);
			});
		},
		sendMsg: function sendMsg(msgs, fun){
			var data = {};
			socket.emit("sendmsg", msgs);
			socket.on("updatechat", function(room, msgHistory){
				data.msgHistory = msgHistory;
				fun(data);
			});
		}

	};
	// body...
});


/*
angular.module("chatApp").provider("ChatResource", 
	["socket", "$q",
	function ChatResource(socket, $q){
	return {
		configFun: function(){

		},
		$get: function(){
			return {
				addUser: function(user){
					var deferred = $q.defer();
					socket.emit("addUser", user, function(available){
						defferred.resolve(available);
					});
					return defferred.promise;
				},
				getRoomList: function(){

				}
			};

		}

	};
}]);
*/








