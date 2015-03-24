var serverController = require('../../node_modules/creanvas/ServerController');

var games = [];

// called only for the first of all users
var startApplication = function(socketName) {

	var pong = exports.applicationSocket = socketName;

	console.log('Setting up pong socket ');
	
	pong.on('connection', function(socket){
		
		console.log('user connected: ' + socket.id);

		socket.on('disconnect', function(){		
			console.log('user disconnected');});
  

		// todo, common game and join stuff, avoid duplicate
		socket.on('joinGame', function() {
			console.log('Joining...');
			if (games.length == 0 || games[games.length-1].player2)
			{			
				console.log('Starting a game' );
				games.push(new PongApplication(pong, socket, 'game' + games.length));
			}
			else
			{			
				console.log('Joining a game' );
				games[games.length-1].join(socket);
			}
			
			socket.on('disconnect', function(){
				games[games.length-1].controller.applicationInstanceBroadcast(
					socket, 'textMessage', {message:'He has left !'});
			});
		});
	});
};

var PongApplication = function(pong, socket, gameName){
	var game = this;
	
	this.controller = new serverController.Controller(
			pong, gameName, true)
	this.controller.addSocket(socket);	
	this.player1 = socket.id;
	this.controller.emitToSocket(socket.id, 'textMessage', {message:'New game, you are 1'});

	this.controller.addAxeAlignedBox({
		name: 'left',
		clientType: 'wall',
		left:0,
		right:20,
		top:0,
		bottom:500,
		position: {x: 0, y: 0},			
		solid: {mass:Infinity, collisionCoefficient:1}
	});

	this.controller.addAxeAlignedBox({
		name: 'right',
		clientType: 'wall',
		left:0,
		right:20,
		top:0,
		bottom:500,
		position: {x: 680, y: 0},			
		solid: {mass:Infinity}
	});
	
	this.controller.addAxeAlignedBox({
		name: 'middle',
		clientType: 'wall',
		left:0,
		right:20,
		top:0,
		bottom:500,
		position: {x: 340, y: 0}
	});

	this.controller.addAxeAlignedBox({
		name: 'top',
		clientType: 'top',
		left:0,
		right:700,
		top:0,
		bottom:20,
		position: {x: 0, y: 0},			
		solid: {mass:Infinity}
	});

	this.controller.addAxeAlignedBox({
		name: 'bottom',
		clientType: 'top',
		left:0,
		right:700,
		top:0,
		bottom:20,
		position: {x: 0, y: 480},			
		solid: {mass:Infinity}
	});
			

	this.controller.addAxeAlignedBox({
		name: 'player1',
		clientType: 'player',
		left:-5,
		right:5,
		top:-50,
		bottom:50,
		position: {x: 670, y: 250},			
		solid: {mass:Infinity},			
		moving: {movingLimits:{yMin:80,yMax:420, xMin:370, xMax:670, vMax:300}},
		movable : {alwaysMoving: true,
			"isBlocked":function(element, originSocketId){return originSocketId != game.player1;}
			}
	});

};

PongApplication.prototype.join = function(socket){

	var game = this;
	
	this.controller.addSocket(socket);
	this.controller.applicationInstanceBroadcast(socket, 'textMessage', {message:'2 has joined'});
	this.controller.emitToSocket(socket.id, 'textMessage', {message:'New game, you are 2'});
	this.player2 = socket.id;

	this.controller.elements.forEach(function(e){ 
		// force Update
		e.previousClientData  = null;
	});
	
	this.controller.addAxeAlignedBox({
		name: 'player2',
		clientType: 'player',
		left:-5,
		right:5,
		top:-50,
		bottom:50,
		position: {x: 30, y: 250},			
		solid: {mass:Infinity},			
		moving: {movingLimits:{yMin:80,yMax:420, xMin:30, xMax:330, vMax:300}},
		movable : {
			alwaysMoving: true,
			"isBlocked":function(element, originSocketId){return originSocketId != game.player2;}
		}		
	});
	
	this.controller.addCircle({
		name: 'round1',
		clientType: 'round',
		radius: 15,
		position: {x: 350, y: 250},			
		solid: {mass:1},
		moving: {
			speed:{x:200,y:200},
			movingLimits:{vxMax:500,vyMax:500,vxMin:100}}
	});

};

exports.startApplication = startApplication;
exports.applicationSocket = null;