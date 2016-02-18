"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "ChatResource", "Auth",
function RoomlistController($scope, $location, ChatResource, Auth) {
	/*$scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

	    if(!value && oldValue && value !== "") {
	    	console.log("Disconnect");
	    	$location.path('/');
	    }

	    if(value) {
	      	console.log("Connect");
	      //Do something when the user is connected
	    }
  	}, true);*/
	var funcToBeCalledWhenRoomlistChanges = function(roomlist){
		$scope.$apply(function(){
			$scope.roomlist = [];
			var obj = {};
			var cId = 1;
			for(var room in roomlist){
				if(roomlist.hasOwnProperty(room)){
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




