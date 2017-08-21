whenReady(function() {
	var clock=document.getElementById("clock");
	var icon=new Image();//用于拖动的图片
	icon.src="clock.png";

	//每分钟显示一次时间
	function displayTime() {
		var now=new Date();
		var hrs=now.getHours(),mins=now.getMinutes();
		if(mins<10)
			mins="0"+mins;
		clock.innerHTML=hrs+":"+mins;//显示当前时间
		setTimeout(displayTime,60000);//一分钟后再次运行
	}
	displayTime();

	//使时钟能够拖动
	clock.draggable=true;

	//设置拖动事件处理程序
	clock.ondragstart=function(event) {
		var event=event||window.event;//用于兼容IE

		//dataTransfer属性是拖放API的关键
		var dt=event.dataTransfer;

		//告诉浏览器正在拖动什么
		//把Date()构造函数用做一个返回时间戳字符串的函数
		dt.setData("Text",Date()+"\n");
		//在支持的浏览器中，告诉它拖动图标来表现时间戳
		//没有这行代码，浏览器也可以使用时钟文本图像作为拖动的值
		if(dt.setDragImage)
			dt.setDragImage(icon,0,0);
	}
});