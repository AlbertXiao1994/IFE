function shake() {
	var	e=document.getElementById("img");
	var	time=500;
	var	distance=5;

	var orginalStyle=e.style.cssText;
	e.style.position="relative";
	var start=(new Date()).getTime();
	animate();

	function animate() {
		var now=(new Date()).getTime();
		var elapsed=now-start;
		var fraction=elapsed/time;

		if(fraction<1) {
			var x=distance*Math.sin(fraction*4*Math.PI);
			e.style.left=x+"px";

			setTimeout(animate,Math.min(25,time-elapsed));
		}
		else {
			e.style.cssText=orginalStyle;
		}
	}
}

function fadeout() {
	var	e=document.getElementById("img");
	var	time=500;

	var ease=Math.sqrt;
	var start=(new Date()).getTime();
	animate();

	function animate() {
		var now=(new Date()).getTime();
		var elapsed=now-start;
		var fraction=elapsed/time;

		if(fraction<1) {
			var opacity=1-ease(fraction);
			e.style.opacity=String(opacity);

			setTimeout(animate,Math.min(25,time-elapsed));
		}
		else {
			e.style.opacity="0";
		}
	}
}

function reset() {
	var	e=document.getElementById("img");
	e.style.opacity="1";
}
