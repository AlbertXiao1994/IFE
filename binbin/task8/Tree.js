var arr=[];
init();//初始化

function init() {
	//按键
	var btn_DFS=document.getElementById("DFS");
	var btn_BFS=document.getElementById("BFS");
	var btn_search=document.getElementById("search");

	//输入框
	var input=document.getElementById("input");

	//根节点
	var _root=document.getElementById("root");

	//深度优先遍历
	btn_DFS.onclick=function() {
		btnRes(_root,traverseDF);
	}

	//广度优先遍历
	btn_BFS.onclick=function() {
		btnRes(_root,traverseBF);
	}

	btn_search.onclick=function() {
		if(input.value) {
			arr=[];
			traverseBF(_root);
			setAnimation(arr,input.value);
		}
		else {
			alert("请输入查询值！");
		}
	}
}

//搜索按钮处理程序
function btnRes(_root,traverse) {
	arr=[];
	traverse(_root);
	setAnimation(arr);
}

//设置动画
function setAnimation(arr,value) {
	var i=0;
	var timer=setInterval(changeStyle,500);
	value=value||"";

	//改变样式，改变背景色
	function changeStyle() {
		if(i<arr.length) {	//正在遍历
			if(i>0)						//恢复背景色
				arr[i-1].style.backgroundColor="#fff";
			if(arr[i].childNodes[0].data.replace(/\s+/g,"")==value) {
				arr[i].style.backgroundColor="#56ed60";
				alert("找到目标值“"+value+"”");
				clearInterval(timer);//停止调用
			}
			else {
				arr[i].style.backgroundColor="#337ab7";
				i++;
			}
		}
		else {				//遍历完成
			arr[i-1].style.backgroundColor="#fff";//恢复背景色
			alert("未能找到目标值“"+value+"”");
			clearInterval(timer);//停止调用
		}
	}
}

//深度优先搜索
function traverseDF(node) {
	if(node) {
		for(var i=0,length=node.children.length;i<length;i++) {
			traverseDF(node.children[i]);
		}
		arr.push(node);
	}
}

//广度优先搜索
function traverseBF(node) {
    var queue = new Queue();
 
    queue.enqueue(node);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        arr.push(currentTree);
        currentTree = queue.dequeue();

    }
}

//实现一个队列
function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
 
Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};
 
Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
 
Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};


