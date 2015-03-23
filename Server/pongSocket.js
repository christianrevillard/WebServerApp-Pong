var serverController = require('../../node_modules/creanvas/ServerController');

var games = [];

// called only for the first of all users
var startApplication = function(socketName) {

	var pong = exports.applicationSocket = socketName;

	console.log('Setting up pong socket ');
	
	pong.on('connection', function(socket){
		
		console.log('user connected: ' + socket.id);

		// single user room stuff 
		var pongApplication = new PongApplication(pong, socket)

		socket.on('disconnect', function(){
			pongApplication.disconnect();
			console.log('user disconnected');});
		
		socket.on('clientReady', function(){
			pongApplication.start();
		});

	});
};

var PongApplication = function(collision, socket){
	var game = this;
	
	// each user gets a new room
	this.controller = new serverController.Controller(collision, socket.id, false)
	this.controller.addSocket(socket);	

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
			
	this.controller.addCircle({
		name: 'round1',
		clientType: 'round',
		radius: 15,
		position: {x: 350, y: 250},			
		solid: {mass:1},
		moving: {speed:{x:100,y:100}}
	});

	this.controller.addAxeAlignedBox({
		name: 'player1',
		clientType: 'player',
		left:-5,
		right:5,
		top:-50,
		bottom:50,
		position: {x: 640, y: 250},			
		solid: {mass:Infinity},			
		moving: {movingLimits:{xMin:500, xMax:640, vMax:300}},
		movable : {alwaysMoving: true}
	});

	this.disconnect = function()
	{
		game.controller.stop();
		console.log("Stop called, all sever timers stopped");
	};
	
	this.start = function()
	{
		game.controller.resume();
	};
};

exports.startApplication = startApplication;
exports.applicationSocket = null;