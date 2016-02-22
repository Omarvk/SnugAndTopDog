"use strict";

angular.module("chatApp", ["ngRoute", "ui.bootstrap"]).config(
	["$routeProvider",
	function($routeProvider) {
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
	
}]);

angular.module("chatApp").run(
	["$rootScope", "$location", "Auth", "ChatResource",
	function($rootScope, $location,  Auth, ChatResource) {
	$rootScope.$on('$routeChangeStart', function () {
		if(!Auth.isLoggedIn()) {
			$location.path("/");
		}
	});
}]);
// for checking if user is logged inn
angular.module("chatApp").factory('Auth', 
	[
	function() {
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
	};
}]);


