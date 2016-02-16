"use strict";

//var cors = require("../cors");
//var app = express();

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



angular.module("chatApp").run(function($rootScope) {
	$rootScope.socket = io.connect('http://localhost:8080');
});

//app.use(cors());
//https://angular-ui.github.io/bootstrap/

