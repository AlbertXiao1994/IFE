var btn_leftIn=document.getElementById("leftIn");
var btn_rightIn=document.getElementById("rightIn");
var btn_leftOut=document.getElementById("leftOut");
var btn_rightOut=document.getElementById("rightOut");

var input=document.getElementById("data-input");
var ul=document.getElementById("quene");

ul.onclick=function() {
	var t=event.target;
	if(ul.childNodes.length<=0)
		alert("不存在可删除的元素");
	else {
		ul.removeChild(t);
	}
}

//左侧入
btn_leftIn.onclick=function() {
	var num=input.value;
	if(num!="") {
		if(!isNaN(num)) {
			var li=document.createElement("li");
			li.innerHTML=num;
			ul.insertBefore(li,ul.firstChild);
			input.value="";
		}
		else {
			input.value="";
			alert("输入非法，请输入一个数字！");
		}
	}
	else {
		alert("请输入一个数字");
	}
};

//右侧入
btn_rightIn.onclick=function() {
	var num=input.value;
	if(num!="") {
		if(!isNaN(num)) {
			var li=document.createElement("li");
			li.innerHTML=num;
			ul.appendChild(li);
			input.value="";
		}
		else {
			input.value="";
			alert("输入非法，请输入一个数字！");
		}
	}
	else {
		alert("请输入一个数字");
	}
};

//左侧出
btn_leftOut.onclick=function() {
	var lis=document.getElementsByTagName("li");
	if(lis[0]) {
		alert("删除的元素是"+lis[0].innerHTML);
		lis[0].remove();
	}
	else {
		alert("不存在可删除的元素");
	}
}

//右侧出
btn_rightOut.onclick=function() {
	var lis=document.getElementsByTagName("li");
	var length=lis.length;
	if(lis[length-1]) {
		alert("删除的元素是"+lis[length-1].innerHTML);
		lis[length-1].remove();
	}
	else {
		alert("不存在可删除的元素");
	}
}