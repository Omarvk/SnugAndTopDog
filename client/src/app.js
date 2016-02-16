"use strict";

angular.module("chatApp", ["ngRoute", "ui.bootstrap"]).config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "login/login.html",
		controller: "LoginController"
	}).when("/register", {
		templateUrl: "register/register.html",
		controller: "RegisterController"
	}).when("/roomlist", {
		templateUrl: "roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/room/:name",{
		templateUrl: "room/room.html",
		controller: "RoomController"
	}).when("/createroom", {
		templateUrl: "createroom/createroom.html",
		controller: "CreateRoomController"
	});
	
});

angular.module("chatApp").run(function($rootScope, ChatResource) {
	$rootScope.socket = io.connect('http://localhost:8080');
	var user = "Kalli";
	var hello = function(success){
		if(success){
			console.log("login");
		}else{
			console.log("new user plz");
		}
	}
	ChatResource.addUser(user, hello);
});

//https://angular-ui.github.io/bootstrap/

