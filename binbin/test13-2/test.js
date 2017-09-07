function displayTime() {
			var elt=document.getElementById("Clock");
			var now=new Date();
			elt.innerHTML=now.toLocaleString();
			setTimeout(displayTime,1000);
		}
		window.onload=displayTime;