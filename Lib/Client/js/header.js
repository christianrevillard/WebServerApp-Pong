$(document).ready(function() {

	document.body.style.position = "relative";
	document.body.style.left = "80px";
	document.body.style.top = "80px";

	var horizontalBanner = document.createElement('div');
	horizontalBanner.style.width = "100%";
	horizontalBanner.style.height = "80px";
	horizontalBanner.style.backgroundColor = "#FFFFFF";
	horizontalBanner.style.position = "absolute";
	horizontalBanner.style.left = "-80px";
	horizontalBanner.style.top = "-80px";
	horizontalBanner.style.zIndex = -2000;
	document.body.appendChild(horizontalBanner);

	var verticalBanner = document.createElement('div');
	verticalBanner.style.width = "80px";
	verticalBanner.style.height = "100%";
	verticalBanner.style.backgroundColor = "#FFFFFF";
	verticalBanner.style.position = "absolute";
	verticalBanner.style.left = "-80px";
	verticalBanner.style.top = "-80px";
	verticalBanner.style.zIndex = -2000;
	document.body.appendChild(verticalBanner);

	var headerCanvas = document.createElement('canvas');
	headerCanvas.width = 750;
	headerCanvas.height = 750;
	headerCanvas.style.position = "absolute";
	headerCanvas.style.left = "-80px";
	headerCanvas.style.top = "-80px";
	headerCanvas.style.zIndex = -1000;
	
	document.body.appendChild(headerCanvas);
	
	var context=headerCanvas.getContext("2d");		

	var color1, color2;
	color1 =  "#26D";
	color2= "#FFF";
	//color3= "#03C";
	var mainWidth = 750;
	
	var gradient = context.createRadialGradient(-100,-100,0,-100,-100, mainWidth+100);	
	gradient.addColorStop(0.0,color1);
	gradient.addColorStop(1.0,color2);

	var invertGradient = context.createRadialGradient(75,75,0,0,0,mainWidth-75);	
	invertGradient.addColorStop(0.0,color1);
	invertGradient.addColorStop(1.0,color2);
	
	context.fillStyle = gradient;
	context.fillRect(0,0,mainWidth,mainWidth);

	context.fillStyle = "#FFF";
	context.fillRect(76,76,mainWidth,mainWidth);

	context.beginPath();
	context.moveTo(75,75);
	context.lineTo(75,mainWidth);
	context.moveTo(75,75);
	context.lineTo(mainWidth,75);
	context.strokeStyle = invertGradient;
	context.stroke();
	
	var dn=-10;
	var n=mainWidth;
	var size=0;
	
	var drawTitle = function(){
	
		context.fillStyle = gradient;
		context.fillRect(0,0,mainWidth,50);
		
	if (size<40)
		size=40; //size =size+1;
		
	n+=dn;
//	if ((n>500)||(n<100))
//		dn=-dn;

      var grd = context.createLinearGradient(10, 0, mainWidth, 0);
      grd.addColorStop(0, color1);   
      grd.addColorStop(n/mainWidth, color2);   
      grd.addColorStop(1, color2);

      context.fillStyle = grd;
		context.font= size + "px Georgia";
		context.fillText("Creweb" ,75,50);

		if(n>-dn)
			setTimeout(drawTitle,50);	
	};
	
	setTimeout(drawTitle,500);
});

