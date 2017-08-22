window.onload=function() {
	forceToUpperCase("inputbox");
}

function forceToUpperCase(element) {
	if(typeof element==="string")
		elt=document.getElementById(element);
	elt.oninput=upcase;
	elt.onpropertychange=upcaseOnproperChange;

	//简易案例：用于input事件的处理程序
	function upcase(event) {
		this.value=this.value.toUpperCase();
	}
	//疑难案例：用于propertychange事件的处理程序
	function upcaseOnproperChange(event) {
		var e=event||window.event;
		//如果value值改变
		if(e.propertyName=="value") {
			//移除onpropertychange处理程序，避免循环调用
			this.onpropertychange=null;
			//把值变成大写
			this.value=this.value.toUpperCase();
			//恢复原来的onpropertychange处理程序
			this.onpropertychange=upcaseOnproperChange;
		}
	}
}