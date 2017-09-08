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
			preOrder(node.firstChild,arr);
		}
		if(node.lastChild!=null) {
			preOrder(node.lastChild,arr);
		}
	}
}

//中序
function preOrder(node,arr) {
	if(node) {
		if(node.firstChild!=null) {
			preOrder(node.firstChild,arr);
		}
		arr.push(node);
		if(node.lastChild!=null) {
			preOrder(node.lastChild,arr);
		}
	}
}

//后序
function preOrder(node,arr) {
	if(node) {
		if(node.firstChild!=null) {
			preOrder(node.firstChild,arr);
		}
		if(node.lastChild!=null) {
			preOrder(node.lastChild,arr);
		}
		arr.push(node);
	}
}

function setAnimation(arr) {
	setTimeout(changeStyle,500);
}
