window.onload=function() {
	var trees=document.getElementsByClassName("tree");
	var uls=document.getElementsByTagName("ul");
	var parent=[];

	for(var i=0;i<uls.length;i++) {
		uls[i].style.display="block";
	}

	//循环遍历每一个含有tree类的元素
	for(var i=0,len=trees.length;i<len;i++) {
		var t=trees[i];
		if(t.childElementCount>1) {//包含子节点
			var h=t.firstElementChild;//标题
			h.classList.add("open");//打开状态
			parent.push(t);
		}
	}

	for(var i=0,len=parent.length;i<len;i++) {
		var h=parent[i].firstElementChild;
		//给父节点添加点击事件
		h.onclick=function() {
			var ul=this.nextElementSibling;//节点
			if(ul.style.display=="none") { //隐藏
				ul.style.display="block";
				h.classList.remove("close");
				h.classList.add("open");
			}
			else { //显示
				ul.style.display="none";
				h.classList.remove("open");
				h.classList.add("close");
			}

			//阻止冒泡
			if(event.stopPropagation)
				event.stopPropagation();
			else
				event.cancelBubble=true;

			//阻止默认事件
			if (event.preventDefault) {
				event.preventDefault();
			}
			else
				event.returnValue=false;
		};
	}
};