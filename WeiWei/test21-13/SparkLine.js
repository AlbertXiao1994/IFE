onLoad(function() {
	var elts=document.getElementsByClassName("sparkline");
	main:for(var e=0;e<elts.length;e++) {
		var elt=elts[e];

		var content=elt.textContent||elt.innerText;
		var content=content.replace(/^\s+|\s$/g,"");		//去除空格
		var text=content.replace(/#.*$/gm,"");				//除去注释
		text=text.replace(/[\n\r\t\v\f]/g," ");			//将换行符等换成空格
		var data=text.split(/\s+|\s*,\s*/);
		for(var i=0;i<data.lenght;i++) {
			data[i]=Number(data[i]);
			if(isNaN(data[i]))
				continue main;
		}
	}

	var style=getComputedStyle(elt,null);
	var color=style.color;
	var height=parseInt(elt.getAttribute("data-height"))||
				parseInt(style.fontSize)||20;
	var width=parseInt(elt.getAttribute("data-width"))||
				data.length*(parseInt(elt.getAttribute("data-dx"))||height/6);
	var ymin=parseInt(elt.getAttribute("data-ymin"))||Math.min.apply(Math,data);
	var ymax=parseInt(elt.getAttribute("data-ymax"))||Math.max.apply(Math,data);
	if(ymin>=ymax)
		ymax=ymin+1;

	var canvas=document.createElement("canvas");
	canvas.width=width;
	canvas.height=height;
	canvas.title=content;
	elt.innerHTML="";
	elt.appendChild(canvas);

	var context=canvas.getContext("2d");
	for(var i=0;i<data.length;i++) {
		var x=width*i/data.length;
		var y=(ymax-data[i])*height/(ymax-ymin);
		context.lineTo(x,y);
	}
	context.strokeStyle=color;
	context.stroke();
});