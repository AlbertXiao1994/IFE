window.onload=function() {
	var input=document.getElementById("order");//命令下拉框
	var btn=document.getElementById("btn");//执行按钮
	var dia=document.getElementById("select");//小方块

	var head=0;//0:头向上，1：头向右，2：头向下，3：头向左
	var angle=0;//初始角度

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
			else if(v=="TRA LEF") { //左移一格
				traLeft(dia);
			}
			else if(v=="TRA RIG") { //右移一格
				traRight(dia);
			}
			else if(v=="TRA TOP") { //上移一格
				traTop(dia);
			}
			else if(v=="TRA BOT") { //下移一格
				traBot(dia);
			}
			else if(v=="MOV LEF") { //左转并前进一格
				movLeft(dia);
			}
			else if(v=="MOV RIG") { //右转并前进一格
				movRight(dia);
			}
			else if(v=="MOV TOP") { //转向上并前进一格
				movTop(dia);
			}
			else if(v=="MOV BOT") { //转向下并前进一格
				movBot(dia);
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
		angle-=90;
		dia.style.transform="rotate("+angle+"deg)";

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
		angle+=90;
		dia.style.transform="rotate("+angle+"deg)";

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
		angle+=180;
		dia.style.transform="rotate("+angle+"deg)";

		//标记方向
		switch(head) {
			case 0: //向上
					head=2;
					break;
			case 1: //向右
					head=3;
					break;
			case 2: //向下
					head=0;
					break;
			case 3: //向左
					head=1;
					break;
		}
	}

	function traLeft(dia) {
		var x = dia.offsetLeft;//方块相对于祖先元素在文档中的位置X

		x=x-40;
	  	dia.style.left=x+"px";
	}

	function traRight(dia) {
		var x = dia.offsetLeft;//方块相对于祖先元素在文档中的位置X

		x=x+40;
	  	dia.style.left=x+"px";
	}

	function traTop(dia) {
		var y = dia.offsetTop;//方块相对于祖先元素在文档中的位置Y

		y=y-40;
	  	dia.style.top=y+"px";
	}

	function traBot(dia) {
		var y = dia.offsetTop;//方块相对于祖先元素在文档中的位置Y

		y=y+40;
	  	dia.style.top=y+"px";
	}

	function movLeft(dia) {
		dia.style.transform="rotate(-90deg)";//转向左侧
		head=3;

		forward(dia);//向前
	}

	function movRight(dia) {
		dia.style.transform="rotate(90deg)";//转向右侧
		head=1;

		forward(dia);//向前
	}

	function movTop(dia) {
		dia.style.transform="rotate(0deg)";//转向上面
		head=0;

		forward(dia);//向前
	}

	function movBot(dia) {
		dia.style.transform="rotate(180deg)";//转向下侧
		head=2;

		forward(dia);//向前
	}

}