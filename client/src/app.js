"use strict";

angular.module("chatApp", ["ngRoute", "ui.bootstrap"]).config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/roomlist", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/room/:name",{
		templateUrl: "src/room/room.html",
		controller: "RoomController"
	}).when("/createroom", {
		templateUrl: "src/createroom/createroom.html",
		controller: "CreateRoomController"
	});
	
});

angular.module("chatApp").run(function($rootScope, $location,  Auth, ChatResource) {
	var user = "Kalli";
	var hello = function(success){
		if(success){
			console.log("login");
		}else{
			console.log("new user plz");
		}
	}
	$rootScope.$on('$routeChangeStart', function () {
		if(!Auth.isLoggedIn()) {
			$location.path("/");
		}
	});
	ChatResource.addUser(user, hello);
});

angular.module("chatApp").factory('Auth', function() {
	var user;

	return{
		setUser : function(aUser) {
			if(aUser !== "") {
				user = aUser;
			}
		},
		isLoggedIn : function() {
			return(user)? user : false;
		}
	}
});


//https://angular-ui.github.io/bootstrap/

