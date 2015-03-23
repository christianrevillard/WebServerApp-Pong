var CrePong = CrePong || {};

CrePong.onload = function ()
{		
	var socket = 
		window.location.href.indexOf('rhcloud.com')>-1?
	    io("http://nodejs-creweb.rhcloud.com:8000/pongOnline/pongSocket"):
		io("/pongOnline/pongSocket");

	var theCanvas = document.getElementById('theCanvas');

	var controller = new CreJs.CreanvasNodeClient.NodeJsController({
		"nodeSocket":socket,
		"lengthScale":1,
		"canvas":theCanvas
		});

	controller.addElementType(
		"wall",
		function (context) {
			context.fillStyle = "#000";
			context.fillRect(0,0,20,500);
		});		

	controller.addElementType(
		"top",
		function (context) {
			context.fillStyle = "#000";
			context.fillRect(0,0,700,20);
		});		

	controller.addElementType(
		"round",
		function (context) {
			var color1, color2;
			color1 =  "#AAF";
			color2= "#DDD";

			context.arc(0,0,15,0,2*Math.PI);
			var gradient = context.createRadialGradient(0,0,50,50,-5,3);
			gradient.addColorStop(0.0,color1);
			gradient.addColorStop(1.0,color2);
			context.fillStyle = gradient;
			context.fill();
			
			context.moveTo(0, 15);
			context.lineTo(0, 0);
			context.lineTo(15, 0);
			context.strokeStyle = "black";
			context.lineWidth = 1;
			context.stroke();
		});
		
	controller.addElementType(
		"player",
		function (context) {
			context.fillStyle = "#F00";
			context.fillRect(-5, -50, 10, 100);
		});

	
	controller.emitToServer('clientReady');
};