var whenReady=(function() {
	var funcs=[];//当获得事件时，要运行的函数
	var ready=false;//当触发事件处理程序时，切换至true

	//当文档准备就绪时，调用事件处理程序
	function handler(e) {
		//如果已经运行过一次，只需返回
		if(ready)
			return;

		//如果发生readystatechange事件，
		//但其状态不是"complete"的话，那么文档尚未准备好
		if(e.type==="readystatechange"&&document.readystatechange!=="complete")
			return;

		//运行所有注册函数
		//每次都要计算func.length,
		//以防止这些函数的调用可能会注册更多的函数
		for(var i=0;i<funcs.length;i++)
			funcs[i].call(document);

		//现在设置ready标志为true，并移除所有函数
		ready=true;
		funcs-null;
	}

	//为接收到的任何事件注册处理程序
	if(document.addEventListener) {
		document.addEventListener("DOMContentLoaded",handler,false);
		document.addEventListener("readystatechange",handler,false);
		document.addEventListener("load",handler,false);
	}
	else if(document.attachEvent) {
		document.attachEvent("onreadystatechange",handler);
		window.attachEvent("onload",handler);
	}

	//返回whenReady()函数
	return function whenReady(f) {
		if(ready) f.call(document);//若准备完毕，只需要运行它；
		else funcs.push(f);
	}
}());