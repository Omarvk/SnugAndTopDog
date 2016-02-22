"use strict";angular.module("chatApp",["ngRoute","ui.bootstrap"]).config(["$routeProvider",function(o){o.when("/",{templateUrl:"src/login/login.html",controller:"LoginController"}).when("/roomlist",{templateUrl:"src/roomlist/roomlist.html",controller:"RoomlistController"}).when("/room/:name",{templateUrl:"src/room/room.html",controller:"RoomController"}).when("/createroom",{templateUrl:"src/createroom/createroom.html",controller:"CreateRoomController"})}]),angular.module("chatApp").run(["$rootScope","$location","Auth","ChatResource",function(o,r,t,e){o.$on("$routeChangeStart",function(){t.isLoggedIn()||r.path("/")})}]),angular.module("chatApp").factory("Auth",function(){var o;return{setUser:function(r){""!==r&&(o=r)},isLoggedIn:function(){return o?o:!1}}});
"use strict";angular.module("chatApp").controller("CreateRoomController",["$scope","$location","ChatResource","$rootScope",function(o,r,e,t){var a=function(t,a){o.$apply(function(){t?(e.getRoomList(),r.path("/room/"+o.room)):o.erroMsg=a})};o.onCreateRoom=function(){if(void 0===o.room|""===o.room)o.erroMsg="Room must have Name";else{var r={room:o.room,pass:o.pw};e.joinRoom(r,a)}}}]);
"use strict";angular.module("chatApp").controller("LoginController",["$scope","$location","ChatResource","Auth",function(r,e,o,s){r.errorMsg="",r.user="";var t=function(o){r.$apply(function(){o?(s.setUser(r.user),e.path("/roomlist")):r.errorMsg="User name exists"})};r.onLogin=function(){void 0===r.user|""===r.user?r.erroMsg="User must have Name":o.addUser(r.user,t)}}]);
"use strict";angular.module("chatApp").controller("RoomController",["$scope","$location","$routeParams","ChatResource",function(e,s,n,o){e.name=n.name;var a,m={room:e.name},t=!1,r=[];e.msgs=[],e.users=[],o.on("updateusers",function(s,n,o){if(s===e.name){var a={},m=1;r=o,e.users=[];for(var t in n)a=void 0!==r[t]?{id:m,name:"@"+t}:{id:m,name:t},e.users.push(a),m++;e.selectedUser=1}}),o.on("updatechat",function(s,n){if(s===e.name)if(t)e.msgs=n,t=!1;else if(0!==n.length){var o=n[n.length-1];e.msgs.push({timestamp:o.timestamp,nick:o.nick,message:o.message})}}),o.on("updatetopic",function(s,n,o){s===e.name&&(e.topic=n+" "+o,a=o)}),o.on("servermessage",function(s,n,o){n===e.name&&e.msgs.push({timestamp:new Date,nick:e.name,message:o+" "+s+" "+n,color:{color:"green"}})}),o.on("recv_privatemsg",function(s,n){e.msgs.push({timestamp:new Date,nick:s+" whispers",message:n,color:{color:"#FF1493"}})}),o.on("kicked",function(n,o,m){n===e.name&&(a===o&&s.path("/roomlist"),e.msgs.push({timestamp:new Date,nick:n,message:o+" kicked by "+m,color:{color:"green"}}))}),o.on("banned",function(n,o,m){n===e.name&&(a===o&&s.path("/roomlist"),e.msgs.push({timestamp:new Date,nick:n,message:o+" banned by "+m,color:{color:"green"}}))});var i=function(e,a){e?(o.setReason("",""),t=!0):(o.setReason(a,n.name),s.path("/roomlist"))},c=function(){e.msgs.push({timestamp:new Date,nick:e.name,message:"You are not OP. Try asking for it OP PLZ",color:{color:"green"}})};o.joinRoom(m,i),e.onSendMsg=function(){""!==e.newMsg&&(m.msg=e.newMsg,m.roomName=e.name,o.sendMsg(m),e.newMsg="")},e.checkIfOp=function(){return void 0!==r[a]?!0:!1},e.onSendPrvMsg=function(){if(""!==e.newMsg){var s=e.users[e.selectedUser-1].name;0===s.indexOf("@")&&(s=s.substr(1)),a!==s?(e.msgs.push({timestamp:new Date,nick:"To "+s,message:e.newMsg,color:{color:"#FF1493"}}),o.sendPrvMsg({nick:s,message:e.newMsg})):e.msgs.push({timestamp:new Date,nick:e.name,message:"You are sending a message to yourself. You have no friends?",color:{color:"green"}}),e.newMsg=""}},e.onKick=function(){"@"+a!==e.users[e.selectedUser-1].name?o.kick({user:e.users[e.selectedUser-1].name,room:e.name},c):e.msgs.push({timestamp:new Date,nick:e.name,message:"Kicking yourself? Try hitting the ball first.",color:{color:"green"}})},e.onBan=function(){"@"+a!==e.users[e.selectedUser-1].name?o.ban({user:e.users[e.selectedUser-1].name,room:e.name},c):e.msgs.push({timestamp:new Date,nick:e.name,message:"Banning yourself? Nice try, kid.",color:{color:"green"}})},e.onLeaveRoom=function(){o.leaveRoom(e.name),s.path("/roomlist")}}]);
"use strict";angular.module("chatApp").factory("ChatResource",["$rootScope",function(n){var o=io.connect("http://localhost:8080"),t="",i="";return{on:function(t,i){o.on(t,function(){var t=arguments;n.$apply(function(){i.apply(o,t)})})},getRoomList:function(){o.emit("rooms")},addUser:function(n,t){o.emit("adduser",n,function(n){t(n)})},joinRoom:function(n,t){o.emit("joinroom",n,function(n,o){t(n,o)})},sendMsg:function(n){o.emit("sendmsg",n)},sendPrvMsg:function(n){o.emit("privatemsg",n,function(n){})},kick:function(n){o.emit("kick",n,function(n){})},ban:function(n){o.emit("ban",n,function(n){})},leaveRoom:function(n){o.emit("partroom",n)},setReason:function(n,o){t=n,i=o},getReason:function(n){n(t,i)}}}]);
"use strict";angular.module("chatApp").controller("RoomlistController",["$scope","$location","ChatResource",function(o,t,r){o.roomlist=[],r.getRoomList();var n=function(t,r){""!==t&&(o.errorMsg="you cannot join because "+t+" on "+r)};r.getReason(n),r.on("roomlist",function(t){o.roomlist=[];var r={},n=1;for(var e in t)t.hasOwnProperty(e)&&(r={id:n,name:e},o.roomlist.push(r),n++)}),o.createRoom=function(){t.path("/createroom")}}]);