(function() {
	var btn=document.getElementById("button");
	btn.onclick=display;

	function display() {
		var input=document.getElementById("aqi-input");
		var text=input.value;
		var elt=document.getElementById("aqi-display");
		elt.innerHTML=text;
	}
}());