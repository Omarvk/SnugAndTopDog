"use strict";

angular.module("chatApp").controller("CreateRoomController",
["$scope", "$location", "ChatResource", "$rootScope",
function CreateRoomController($scope, $location, ChatResource, $rootScope) {
	var funToBeCalledWhenCreateRoom = function(sucess, reason) {
		$scope.$apply(function() {
			if(sucess) {
				ChatResource.getRoomList();
				$location.path("/room/"+$scope.room);
			}else{
				$scope.erroMsg = reason;
			}
		});

		/*ChatResource.on("roomlist", function(roomlist) {
			console.log("listen to create");
			$rootScope.$broadcast('roomUp', roomlist);
					});*/
		
	}


	$scope.onCreateRoom = function onCreateRoom() {
		var obj = {room: $scope.room, pass: $scope.pw };
		ChatResource.joinRoom(obj, funToBeCalledWhenCreateRoom);
	};
}]);