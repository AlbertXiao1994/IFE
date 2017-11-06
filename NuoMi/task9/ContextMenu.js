window.onload=function() {
	var elt=document.getElementById("container");//操作区域
	var lis=document.getElementsByTagName("li");

	//操作区右键事件处理程序
	if(elt.addEventListener) { //标准事件模型
		elt.addEventListener("contextmenu",mouseRightClick,false);
	}
	else if(elt.attachEvent) {	//IE事件模型
		elt.attachEvent("oncontextmenu",mouseRightClick);
	}

	//操作区左键单击事件处理程序
	if(elt.addEventListener) { //标准事件模型
		elt.addEventListener("click",mouseClick,false);
	}
	else if(elt.attachEvent) {	//IE事件模型
		elt.attachEvent("onclick",mouseClick);
	}

	//菜单选项点击事件
	for(var i=0;i<lis.length;i++) {
		if(lis[i].addEventListener) { //标准事件模型
			lis[i].addEventListener("click",itemClick,false);
		}
		else if(lis[i].attachEvent) {	//IE事件模型
			lis[i].attachEvent("click",itemClick);
		}
	}
}

//操作区右键
function mouseRightClick(e) {
	if(!e)
		e=window.event;

	var clientWidth=document.body.clientWidth;//客户区的宽
	var clientHeight=300;//客户区的高
	//鼠标位置
	var mouseX=e.pageX;
	var mouseY=e.pageY;
	//菜单元素
	var elt=document.getElementById("contextmenu");

	if(clientWidth-mouseX<=200&&clientHeight-mouseY<=120) {
		elt.style.left=mouseX-200+"px";
		elt.style.top=mouseY-120+"px";
	}
	else if(clientWidth-mouseX<=200) {
		elt.style.left=mouseX-200+"px";
		elt.style.top=mouseY+"px";
	}
	else if(clientHeight-mouseY<=120) {
		elt.style.left=mouseX+"px";
		elt.style.top=mouseY-120+"px";
	}
	else {
		elt.style.left=mouseX+"px";
		elt.style.top=mouseY+"px";
	}

	elt.style.display="block";//显示

	//阻止事件冒泡
	if(e.stopPropagation)
		e.stopPropagation();//标准模型
	else
		e.cancelBubble=true;//IE模型

	//阻止默认事件
	if(e.preventDefault)
		e.preventDefault();//标准
	else
		e.returnValue=false;//IE
}

//操作区左键事件
function mouseClick(e) {
	if(!e)
		e=window.event;

	//菜单元素
	var elt=document.getElementById("contextmenu");
	elt.style.display="none";//隐藏

	//阻止事件冒泡
	if(e.stopPropagation)
		e.stopPropagation();//标准模型
	else
		e.cancelBubble=true;//IE模型

	//阻止默认事件
	if(e.preventDefault)
		e.preventDefault();//标准
	else
		e.returnValue=false;//IE
}

//菜单选项点击事件
function itemClick(e) {
	if(!e)
		e=window.event;//IE模型
	// var target=e.target||e.srcElement;//事件目标，标准或IE模型

	alert("你选择了"+this.innerText);
	
	//菜单元素
	var elt=document.getElementById("contextmenu");
	elt.style.display="none";//隐藏

	//阻止事件冒泡
	if(e.stopPropagation)
		e.stopPropagation();//标准模型
	else
		e.cancelBubble=true;//IE模型

	//阻止默认事件
	if(e.preventDefault)
		e.preventDefault();//标准
	else
		e.returnValue=false;//IE
}
