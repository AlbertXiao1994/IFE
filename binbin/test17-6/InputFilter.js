whenReady(function() {
	//查找所有<input>元素
	var inputelts=document.getElementsByTagName("input");
	//遍历它们
	for(var i=0;i<inputelts.length;i++) {
		var elt=inputelts[i];
		//跳过不是文本域或没有data-allowed-chars属性的元素
		if(elt.type!="text"||!elt.getAttribute("data-allowed-chars"))
			continue;

		//在input元素上注册事件处理程序
		if(elt.addEventListener) {
			elt.addEventListener("keypress",filter,false);
			elt.addEventListener("textinput",filter,false);
			elt.addEventListener("textInput",filter,false);
		}
		else {
			elt.attachEvent("onkeypress",filter);
		}
	}

	//过滤事件处理程序
	function filter(event) {
		var e=event||window.event;
		var target=e.target||e.srcElement;
		var text=null;//输入的文本

		//获取输入的文本或字符
		if(e.type==="textinput"||e.type==="textInput")
			text=e.data;
		else {//传统的keypress事件
			//对于可打印键的keypress事件，FireFox使用的是charCode
			var code=e.charCode||e.keyCode;
			//如果按下的是功能键，不过滤它
			if(code<32||//ASCII控制字符
		       e.charCode==0||//功能键（FireFox）
			   e.ctrlKey||e.altKey)//按下辅助键
				return//不过滤
			var text=String.fromCharCode(code);
		}

		//从input元素中寻找所需信息
		var allowed=target.getAttribute("data-allowed-chars");//合法字符
		var messageid=target.getAttribute("data-messageid");//信息元素id
		if(messageid)
			var messageElement=document.getElementById(messageid);

		//遍历输入文本中的字符
		for(var i=0;i<text.length;i++) {
			var c=text.charAt(i);
			if(allowed.indexOf(c)==-1) {
				//如果存在不合法的字符，显示隐藏元素
				if(messageElement)
					messageElement.style.visibility="visible";

				//取消默认行为，所有不会插入文本
				if(e.preventDefault)
					e.preventDefault();
				if(e.returnValue)
					e.returnValue=false;
				return false;
			}
		}

		//如果所有字符合法，隐藏消息元素
		if(messageElement)
					messageElement.style.visibility="hidden";
	}
});