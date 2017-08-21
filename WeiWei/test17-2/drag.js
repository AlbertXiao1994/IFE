function drag(elementToDrag,event) {
	//初始鼠标位置，转换为文档坐标
	var scroll=getScrollOffsets();
	var startX=event.clientX+scroll.x;
	var startY=event.clientY+scroll.y;

	//在文档坐标下，待拖动元素的原始位置
	var origX=elementToDrag.offsetLeft;
	var origY=elementToDrag.offsetTop;

	//计算mousedown事件和元素左上角之间的距离
	var deltaX=startX-origX;
	var deltaY=startY-origY;

	//注册用于响应mousedown的mousemove和mouseup事件
	if(document.addEventListener) { //标准事件模型
		//在document对象上注册捕获事件处理程序
		document.addEventListener("mousemove",moveHandler,true);
		document.addEventListener("mouseup",upHandler,true);
	}
	else if(document.attachEvent) { //用于IE5~8的IE事件模型
		elementToDrag.setCapture();
		elementToDrag.attachEvent("onmousemove",moveHandler);
		elementToDrag.attachEvent("onmouseup",upHandler);
		//鼠标丢失看待成mouseup事件
		elementToDrag.attachEvent("onlosecapture",upHandler);
	}

	//不让其他元素看待事件处理程序，防止冒泡
	if(event.stopProparation)
		event.stopProparation();//标准模型
	else 
		event.cancelBubble=true;//IE

	//阻止默认操作
	if (event.preventDefault) {
		event.preventDefault();//标准模型;
	}
	else 
		event.returnValue=false;//IE

	/*捕获mousemove事件的处理程序,当元素被拖动时，
	它用于移动这个元素
	*/
	function moveHandler(e) {
		if(!e)
			e=window.event;//IE事件模型

		//通过滚动条的位置和初始单击的偏移量来调整，移动元素到当前鼠标位置
		var scroll=getScrollOffsets();
		elementToDrag.style.left=(e.clientX+scroll.x-deltaX)+"px";
		elementToDrag.style.top=(e.clientY+scroll.y-deltaY)+"px";
		//同时不让其他元素看到这个事件
		//不让其他元素看待事件处理程序，防止冒泡
	if(e.stopPropagation)
		e.stopPropagation();//标准模型
	else 
		e.cancelBubble=true;//IE
	}

	//拖动事件结束时发生的mouseup事件处理程序
	function upHandler(e) {
		if(!e)
			e=window.event;//IE事件模型

		//注销捕获事件处理程序
		if (document.removeEventListener) {//DOM事件模型
			document.removeEventListener("mousemove",moveHandler,true);
			document.removeEventListener("mouseup",upHandler,true);
		}
		else if(document.detachEvent) {//IE5+事件模型
			elementToDrag.detachEvent("onmousemove",moveHandler);
			elementToDrag.detachEvent("onmouseup",upHandler);
			elementToDrag.detachEvent("onlosecapture",upHandler);
			elementToDrag.releaseCapture();
		}

		//不让事件进一步传播
		if(e.stopPropagation)
			e.stopPropagation();
		else
			e.cancelBubble=true;
	}
}

function getScrollOffsets(w) {
	//使用指定的窗口，如果不带参数则使用当前窗口
	w=w||window;

	//除IE8以前版本。都能使用
	if(w.pageXOffset!=null)
		return {x:w.pageXOffset,y:w.pageYOffset};
	//对标准模式下的IE（或任何浏览器）
	var d=w.document;
	if (document.compatMode=="CSS1Compat")
		return {x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};

	//怪异模式下的浏览器
	return {x:d.body.scrollLeft,y:d.body.scrollTop};
}
