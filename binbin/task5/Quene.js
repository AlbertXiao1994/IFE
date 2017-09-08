var btn_leftIn=document.getElementById("leftIn");
var btn_rightIn=document.getElementById("rightIn");
var btn_leftOut=document.getElementById("leftOut");
var btn_rightOut=document.getElementById("rightOut");
var btn_sort=document.getElementById("sort");

var input=document.getElementById("data-input");
var ul=document.getElementById("quene");

ul.onclick=function() {
	var t=event.target;
	if(ul.childNodes.length<=0)
		alert("不存在可删除的元素");
	else if(t.tagName=="LI"){//保证是<li>元素
		t.remove();
	}
}

//左侧入
btn_leftIn.onclick=function() {
	var num=input.value;
	if(num!="") {
		if(!isNaN(num)) {
			if(num>=10&&num<=100) {
			var li=document.createElement("li");
			li.style.height=num+"%";
			ul.insertBefore(li,ul.firstChild);
			input.value="";
			}
			else {
				input.value="";
				alert("输入非法，请输入一个10~100的整数！");
			}
		}
		else {
			input.value="";
			alert("输入非法，请输入一个10~100的整数！");
		}
	}
	else {
		alert("请输入一个10~100的整数");
	}
};

//右侧入
btn_rightIn.onclick=function() {
	var num=input.value;
	if(num!="") {
		if(num>=10&&num<=100) {
			var li=document.createElement("li");
			li.style.height=num+"%";
			ul.appendChild(li);
			input.value="";
			}
		else {
			input.value="";
			alert("输入非法，请输入一个10~100的整数！");
		}
	}
	else {
		alert("请输入一个10~100的整数");
	}
};

//左侧出
btn_leftOut.onclick=function() {
	var lis=document.getElementsByTagName("li");
	if(lis[0]) {
		var num;
		if(lis[0].style.height.length==4)
			num=lis[0].style.height.substring(0,3);
		else
			num=lis[0].style.height.substring(0,2);
		alert("删除的元素是"+num);
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
		var num;
		if(lis[length-1].style.height.length==4)
			num=lis[length-1].style.height.substring(0,3);
		else
			num=lis[length-1].style.height.substring(0,2);
		alert("删除的元素是"+num);
		lis[length-1].remove();
	}
	else {
		alert("不存在可删除的元素");
	}
}

//排序
btn_sort.onclick=function() {
	var lis=document.getElementsByTagName("li");
	bubbleSort(lis);
}

//冒泡排序
function bubbleSort(array) {
	for(var i=0;i<array.length-1;i++) {
		for(var j=i+1;j<array.length;j++) {
			if(array[i].style.height>array[j].style.height) {
				var t=array[i].style.height;
				array[i].style.height=array[j].style.height;
				array[j].style.height=t;
			}
		}
	}
}