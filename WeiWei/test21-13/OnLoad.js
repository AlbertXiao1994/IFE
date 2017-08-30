//注册函数f，当文档载入完成时调用一个函数
//如果文档已经载入完成了，尽快以异步方式执行它
function onLoad(f) {
	if(onLoad.loaded) 			      					//如果文档已经载入完成
		window.setTimeout(f,0);       					//将f放入异步队列，并尽快执行它
	else if(window.addEventListener)  					//注册事件的标准方法
		window.addEventListener("load",f,false);
	else if(window.attachEvent)							//IE8及更早的IE注册事件方法
		window.attachEvent("onload",f);
}
//给onLoad设置一个标准，用来指示文档是否载入完成
onLoad.loaded=false;
//注册一个函数，当文档载入完成时设置这个标志
onLoad(function() {onLoad.loaded=true;});