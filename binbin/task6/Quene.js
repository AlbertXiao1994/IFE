//按键
var btn_leftIn=document.getElementById("leftIn");
var btn_rightIn=document.getElementById("rightIn");
var btn_leftOut=document.getElementById("leftOut");
var btn_rightOut=document.getElementById("rightOut");
var btn_search=document.getElementById("search");

//元素
var texts=document.getElementById("text");
var ul=document.getElementById("quene");
var input=document.getElementById("key");

ul.onclick=function() {
	var t=event.target;
	if(ul.childNodes.length<=0)
		alert("不存在可删除的元素");
	else if(t.tagName=="LI") {
		t.remove();
	}
}

//左侧入
btn_leftIn.onclick=function() {
	var text=texts.value;
	if(text!="") {
		text=text.split(/[\s|\,|\，|\、]/);
		for(var i=0;i<text.length;i++) {
			var li=document.createElement("li");
			li.innerHTML=text[i];
			ul.appendChild(li);
			input.value="";
		}
	}
	else {
		alert("请输入字符串");
	}
};

//右侧入
btn_rightIn.onclick=function() {
	var text=input.value;
	if(text!="") {
		text=text.split(/[\s|\,|\，|\、]/);
		for(var i=0;i<text.length;i++) {
			var li=document.createElement("li");
			li.innerHTML=text[i];
			ul.insertBefore(li,ul.firstChild);
			input.value="";
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

//查询
btn_search.onclick=function() {
	var key=input.value;//查询值
	var lis=document.getElementsByTagName("li");
	if(key!="") {
		for(var i=0;i<lis.length;i++) {//遍历每一个标签
			if(key.length>lis[i].innerHTML.length) //关键字长度大于标签，直接跳过
				continue;
			else if(key.length==lis[i].innerHTML.length) {//长度相等
					if(key==lis[i].innerHTML)			//字符串完全相等
						lis[i].innerHTML="<span>"+key+"</span>";
				 }
			else {//关键词长度小于标签长度
				var reg=new RegExp(key);
				var result=lis[i].innerHTML.split(reg);
				if(result.length>1) {//存在
					lis[i].innerHTML="";
					for(var j=0;j<result.length;j++) {
						if(result[j]=="") {//当关键词在收尾时{
							lis[i].innerHTML+="<span>"+key+"</span>";//高亮显示
							continue;
						}
						lis[i].innerHTML+=result[j];
						if(j!=result.length-1)
							lis[i].innerHTML+="<span>"+key+"</span>";//高亮显示
					}
				}
				else //不存在
					continue;
			}
		}
	}
	else 
		alert("请输入查询字符")
	input.value="";
}