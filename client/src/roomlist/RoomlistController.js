"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "ChatResource",
function RoomlistController($scope, $location, ChatResource) {
	$scope.roomlist = [];
	/*var funToBeCalledWhenCreateRoom = function(sucess, reason) {
		$scope.$apply(function() {
			if(sucess) {
				$location.path("/room/"+$scope.room);
				ChatResource.getRoomList();
			}else{
				$scope.erroMsg = reason;
			}

		});
	}*/
	/*$scope.onCreateRoom = function onCreateRoom() {
		var obj = {room: $scope.room, pass: $scope.pw };
		ChatResource.joinRoom(obj, funToBeCalledWhenCreateRoom);
	};*/
	ChatResource.getRoomList();
	var cannotJoin = function(reason, name) {
		if(reason !== ""){
			$scope.errorMsg ="you cannot join because "+ reason + " on " + name;
		}
	};
	ChatResource.getReason(cannotJoin);
	ChatResource.on("roomlist", function(roomlist) {
		$scope.roomlist = [];
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
		$location.path("/createroom");
		//var obj = {room: $scope.room, pass: $scope.pw };
		//ChatResource.joinRoom(obj, funToBeCalledWhenCreateRoom);
	};
	
}]);




