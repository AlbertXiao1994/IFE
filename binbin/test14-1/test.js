function displayTime() {
			var elt=document.getElementById("Clock");
			var now=new Date();
			elt.innerHTML=now.toLocaleString();
			setTimeout(displayTime,1000);
		}
window.onload=displayTime;

function inputCod() {
			showModalDialog("multiprompt.html",
							["Enter 3D point coordinates","x","y","z"],
							"dialogwidth:400px;dialogheight:300px;resizable:yes");
		}