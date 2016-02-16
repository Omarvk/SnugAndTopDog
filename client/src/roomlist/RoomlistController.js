"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "ChatResource",
function RoomlistController($scope, $location, ChatResource) {
	var funcToBeCalledWhenRoomlistChanges = function(roomlist){
		$scope.$apply(function(){
			$scope.roomlist = [];
			var obj = {};
			var cId = 1;
			for(var room in roomlist){
				if(roomlist.hasOwnProperty(room)){
					console.log(room + " -> "+roomlist[room]);
					obj = {id: cId, name: room };
					$scope.roomlist.push(obj);
					cId++;
				}				
			}
		});
		
	}
	$scope.createRoom = function createRoom(){
		$location.path("/createroom")
	};
	ChatResource.getRoomList(funcToBeCalledWhenRoomlistChanges);
}]);




