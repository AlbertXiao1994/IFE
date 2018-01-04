window.onload=function() {
	var input=document.getElementById("order");//输入框
	var btn=document.getElementById("btn");//执行按钮
	var dia=document.getElementById("select");//小方块

	var head=0;//0:头向上，1：头向右，2：头向下，3：头向左

	//名称获得焦点事件处理程序
	input.onfocus=function() {
		var p=document.getElementById("p_order");
		p.style.color="#646262";
		p.innerHTML="GO:向前，TUN LEF:向左转，TUN RIG：向右转，TUN BAC：向后转";
	}

	//执行按钮处理程序
	btn.onclick=function() {
		var v=input.value;//命令值
		if(v!="") {
			if(v=="GO") {	//向前
				forward(dia);
			}
			else if(v=="TUN LEF") { //向左转
				turnLeft(dia);
			}
			else if(v=="TUN RIG") { //向右转
				turnRight(dia);
			}
			else if(v=="TUN BAC") { //向后转
				turnBack(dia);
			}
		}
		else {
			var p=document.getElementById("p_order");
			p.style.color="#F16565";
			p.innerHTML="请输入正确格式的指令";
		}
	}

	function forward(dia) {
		//方块相对于祖先元素在文档中的位置
		var x = dia.offsetLeft;
		var y = dia.offsetTop;

		switch(head) {
			case 0: //向上
					if(y>0&&y<360) {
						y=y-40;
						dia.style.top=y+"px";
					}
					break;
			case 1: //向右
					if(x>0&&x<360) {
						x=x+40;
						dia.style.left=x+"px";
					}
					break;
			case 2: //向下
					if(y>0&&y<360) {
						y=y+40;
						dia.style.top=y+"px";
					}
					break;
			case 3: //向左
					if(x>0&&x<360) {
						x=x-40;
						dia.style.left=x+"px";
					}
					break;
		}
	}

	function turnLeft(dia) {
		var angle=90*(head-1)+"deg";
		dia.style.transform="rotate("+angle+")";

		//标记方向
		switch(head) {
			case 0: //向上
					head=3;
					break;
			case 1: //向右
					head=0;
					break;
			case 2: //向下
					head=1;
					break;
			case 3: //向左
					head=2;
					break;
		}
	}

	function turnRight(dia) {
		var angle=90*(head+1)+"deg";
		dia.style.transform="rotate("+angle+")";

		//标记方向
		switch(head) {
			case 0: //向上
					head=1;
					break;
			case 1: //向右
					head=2;
					break;
			case 2: //向下
					head=3;
					break;
			case 3: //向左
					head=0;
					break;
		}
	}

	function turnBack(dia) {
		//标记方向
		switch(head) {
			case 0: //向上
					dia.style.transform="rotate(180deg)";
					head=2;
					break;
			case 1: //向右
					dia.style.transform="rotate(270deg)";
					head=3;
					break;
			case 2: //向下
					dia.style.transform="rotate(0deg)";
					head=0;
					break;
			case 3: //向左
					dia.style.transform="rotate(90deg)";
					head=1;
					break;
		}
	}
}