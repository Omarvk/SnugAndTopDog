"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "ChatResource", "Auth", "$rootScope",
function RoomlistController($scope, $location, ChatResource, Auth) {
	/*$scope.$watch(ChatResource.on("roomlist"), function (value, oldValue) {
	    if(!value && oldValue && value !== "") {
	    	console.log("dsad");
	    }

	    if(value) {
	      	console.log("hehehe");
	    }
  	}, true);*/
	$scope.roomlist = [];
	/*$scope.$on('roomUp', function(roomlist) {
		console.log("roomlist plz");
		var obj = {};
		var cId = 1;
		for(var room in roomlist) {
			if(roomlist.hasOwnProperty(room)) {
				obj = {id: cId, name: room };
				$scope.roomlist.push(obj);
				cId++;
			}				
		}
	}) */
	ChatResource.on("roomlist", function(roomlist) {
		console.log("roomlist plz");
		var obj = {};
		var cId = 1;
		for(var room in roomlist) {
			if(roomlist.hasOwnProperty(room)) {
				obj = {id: cId, name: room };
				$scope.roomlist.push(obj);
				cId++;
			}				
		}
	});
	$scope.createRoom = function createRoom() {
		$location.path("/createroom")
	};
	ChatResource.getRoomList();
}]);




