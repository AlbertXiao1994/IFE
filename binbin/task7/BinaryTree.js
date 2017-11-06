init();//初始化

function init() {
	//按键
	var btn_pre=document.getElementById("pre");
	var btn_in=document.getElementById("in");
	var btn_post=document.getElementById("post");

	//根节点
	var _root=document.getElementById("root");

	//先序
	btn_pre.onclick=function() {
		btnRes(_root,preOrder);
	}

	//中序
	btn_in.onclick=function() {
		btnRes(_root,inOrder);
	}

	//后序
	btn_post.onclick=function() {
		btnRes(_root,postOrder);
	}
}

//按钮处理程序
function btnRes(_root,traverse) {
	var arr=[];
	traverse(_root,arr);
	setAnimation(arr);
}

//先序
function preOrder(node,arr) {
	if(node) {
		arr.push(node);
		if(node.firstChild!=null) {
			preOrder(node.firstElementChild,arr);
		}
		if(node.lastChild!=null) {
			preOrder(node.lastElementChild,arr);
		}
	}
}

//中序
function inOrder(node,arr) {
	if(node) {
		if(node.firstChild!=null) {
			inOrder(node.firstElementChild,arr);
		}
		arr.push(node);
		if(node.lastChild!=null) {
			inOrder(node.lastElementChild,arr);
		}
	}
}

//后序
function postOrder(node,arr) {
	if(node) {
		if(node.firstChild!=null) {
			postOrder(node.firstElementChild,arr);
		}
		if(node.lastChild!=null) {
			postOrder(node.lastElementChild,arr);
		}
		arr.push(node);
	}
}

//设置动画
function setAnimation(arr) {
	var i=0;
	var timer=setInterval(changeStyle,500);

	//改变样式，改变背景色
	function changeStyle() {
		if(i<arr.length) {	//正在遍历
			if(i>0)						//恢复背景色
				arr[i-1].style.backgroundColor="#fff";
			arr[i].style.backgroundColor="#337ab7";
			i++;
		}
		else {				//遍历完成
			arr[i-1].style.backgroundColor="#fff";//恢复背景色
			clearInterval(timer);//停止调用
		}
	}
}
