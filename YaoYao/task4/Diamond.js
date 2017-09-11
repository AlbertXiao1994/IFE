init();

function init() {
	var input=document.getElementById("order");//输入框
	var btn=document.getElementById("btn");//执行按钮
	var dia=document.getElementById("select");

	//名称获得焦点事件处理程序
	input.onfocus=function() {
		var p=document.getElementById("p_order");
		p.style.color="#CACACA";
		p.innerHTML="GO:向前，TUN LEF:向左转，TUN RIG：向右转，TUN BAC：向后转";
	}

	//执行按钮处理程序
	btn.onclick=function() {
		var v=input.value;//命令值
		if(v!="") {
			if(v=="GO") {	//向前
				forward(dia);
			}
			else if(v="TUN LEF") { //向左转
				turnLeft(dia);
			}
			else if(v="TUN RIG") { //向右转
				turnRight(dia);
			}
			else if(v="TUN BAC") { //向后转
				turnBack(dia);
			}
		}
		else {
			var p=document.getElementById("p_order");
			p.style.color="#F16565";
			p.innerHTML="请输入正确格式的指令";
		}
	}
}

function forward(dia) {
	dia.style.top=dia.style.top-40+"px";
}

function turnLeft(dia) {

}

function turnRight(dia) {

}

function turnBack(dia) {

}