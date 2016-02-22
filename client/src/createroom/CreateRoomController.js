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
	};

	$scope.onCreateRoom = function onCreateRoom() {
		if($scope.room === undefined | $scope.room === "") {
			$scope.erroMsg = "Room must have Name";
		}else {
			var obj = {room: $scope.room, pass: $scope.pw };
			ChatResource.joinRoom(obj, funToBeCalledWhenCreateRoom);
		}
	};
}]);