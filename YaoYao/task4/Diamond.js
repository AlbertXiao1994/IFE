window.onload=function() {
	var input=document.getElementById("order");//输入框
	var btn=document.getElementById("btn");//执行按钮
	var dia=document.getElementById("select");//小方块

	var head=1;//1:头向上，2：头向右，3：头向下，4：头向左

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
			case 1: //向上
					if(y>0&&y<360) {
						y=y-40;
						dia.style.top=y+"px";
					}
					break;
			case 2: //向右
					if(x>0&&x<360) {
						x=x+40;
						dia.style.left=x+"px";
					}
					break;
			case 3: //向下
					if(y>0&&y<360) {
						y=y+40;
						dia.style.top=y+"px";
					}
					break;
			case 4: //向左
					if(x>0&&x<360) {
						x=x-40;
						dia.style.left=x+"px";
					}
					break;
		}
	}

	function turnLeft(dia) {
		switch(head) {
			case 1: //向上
					dia.style.borderTopWidth="0px";
					dia.style.borderLeftWidth="8px";
					dia.style.borderLeftStyle="solid";
					dia.style.borderLeftColor="#526BEB";				
					break;
			case 2: //向右
					dia.style.borderRightWidth="0px";
					dia.style.borderTopWidth="8px";
					dia.style.borderTopStyle="solid";
					dia.style.borderTopColor="#526BEB";
					break;
			case 3: //向下
					dia.style.borderBottomWidth="0px";
					dia.style.borderRightWidth="8px";
					dia.style.borderRightStyle="solid";
					dia.style.borderRightColor="#526BEB";
					break;
			case 4: //向左
					dia.style.borderLeftWidth="0px";
					dia.style.borderBottomWidth="8px";
					dia.style.borderBottomStyle="solid";
					dia.style.borderBottomColor="#526BEB";
					break;
		}

		switch(head) {
			case 1: //向上
					head=4;
					break;
			case 2: //向右
					head=1;
					break;
			case 3: //向下
					head=2;
					break;
			case 4: //向左
					head=3;
					break;
		}
	}

	function turnRight(dia) {
		switch(head) {
			case 1: //向上
					dia.style.borderTopWidth="0px";
					dia.style.borderRightWidth="8px";
					dia.style.borderRightStyle="solid";
					dia.style.borderRightColor="#526BEB";				
					break;
			case 2: //向右
					dia.style.borderRightWidth="0px";
					dia.style.borderBottomWidth="8px";
					dia.style.borderBottomStyle="solid";
					dia.style.borderBottomColor="#526BEB";
					break;
			case 3: //向下
					dia.style.borderBottomWidth="0px";
					dia.style.borderLeftWidth="8px";
					dia.style.borderLeftStyle="solid";
					dia.style.borderLeftColor="#526BEB";
					break;
			case 4: //向左
					dia.style.borderLeftWidth="0px";
					dia.style.borderTopWidth="8px";
					dia.style.borderTopStyle="solid";
					dia.style.borderTopColor="#526BEB";
					break;
		}

		switch(head) {
			case 1: //向上
					head=2;
					break;
			case 2: //向右
					head=3;
					break;
			case 3: //向下
					head=4;
					break;
			case 4: //向左
					head=1;
					break;
		}
	}

	function turnBack(dia) {
		switch(head) {
			case 1: //向上
					dia.style.borderTopWidth="0px";
					dia.style.borderBottomWidth="8px";
					dia.style.borderBottomStyle="solid";
					dia.style.borderBottomColor="#526BEB";			
					break;
			case 2: //向右
					dia.style.borderRightWidth="0px";
					dia.style.borderLeftWidth="8px";
					dia.style.borderLeftStyle="solid";
					dia.style.borderLeftColor="#526BEB";
					break;
			case 3: //向下
					dia.style.borderBottomWidth="0px";
					dia.style.borderTopWidth="8px";
					dia.style.borderTopStyle="solid";
					dia.style.borderTopColor="#526BEB";
					break;
			case 4: //向左
					dia.style.borderLeftWidth="0px";
					dia.style.borderRightWidth="8px";
					dia.style.borderRightStyle="solid";
					dia.style.borderRightColor="#526BEB";
					break;
		}

		switch(head) {
			case 1: //向上
					head=3;
					break;
			case 2: //向右
					head=4;
					break;
			case 3: //向下
					head=1;
					break;
			case 4: //向左
					head=2;
					break;
		}
	}
}