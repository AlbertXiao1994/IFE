whenReady(function() {
	//查找所有的<ul class="dnd">元素，并对其调用dnd()函数
	var lists=document.getElementsByTagName("ul");
	var spans=document.getElementsByTagName("span");
	var regexp=/\bdnd\b/;
	for(var i=0;i<lists.length;i++)
		if(regexp.test(lists[i].className))
			dnd(lists[i]);

	//查找所有span标签，并将其设为可拖动,注册拖动事件
	for(var i=0;i<spans.length;i++) {
		spans[i].draggable=true;
		spans[i].ondragstart=function(e) {
			var e=e||window.event;
			var dt=e.dataTransfer;
			var target=e.target||e.srcElement;
			dt.setData("Text",target.innerText||target.textContent);
		};
	}

	//为列表元素添加拖放处理事件
	function dnd(list) {
		var original_class=list.className;//保存原始CSS类
		var entered=0;//跟踪进入和离开

		//当拖放对象首次进入列表时调用这个处理程序
		list.ondragenter=function(e) {
			e=e||window.event;
			var from=e.relatedTarget;

			//在定义relatedTarget的浏览器中，我们能跟踪元素何时进入和离开
			//否则，统计进入和离开的次数

			//如果从列表外面或第一次进入，需做一些处理
			entered++;
			if((from&&!ischild(from,list))||entered==1) {
				var dt=e.dataTransfer;

				//dt.types对象列出可用的拖放数据的类型或格式
				//H5定义这个对象有contains()方法
				//在一些浏览器中，它是一个有indexOf()方法的数组
				var types=dt.types;//可用的数据格式

				//如果没有任何类型的数据或可用数据是纯文本格式,
				//那么高亮显示列表让用户知道我们正在监听拖放，
				//同时放回false让浏览器知晓
				if(!types||//IE
					(types.contains&&types.contains("text/plain"))||//HTML5
					(types.indexOf&&types.indexOf("text/plain")!=-1))//WebKit
				{
					list.className=original_class+" droppable";
					return false;
				}
				//如果无法识别数据类型，不希望拖放
				return;//没有取消
			}
			return false;//如果不是第一次进入，我们继续保持兴趣
		};

		//当鼠标悬停在列表上，调用这个程序
		list.ondragover=function(e) {
			return false;
		}

		//当拖放对象移出列表或或从其子元素中移出时，会调用这个处理程序
		//如果真正离开列表，不仅是从一个子元素到另一个子元素
		//那么取消高亮显示它
		list.ondragleave=function(e) {
			e=e||window.event;
			var to=e.relatedTarget;

			//如果如果要到列表以外的元素或打破进入和离开平衡
			//那么取消高亮显示列表
			entered--;
			if((to&&!ischild(to,list))||entered<=0) {
				list.className=original_class;
				entered=0;
			}
			return false;
		};

		//当实际放置时，调用这个函数
		//接受放下的文本并将其放到一个新的<li>元素中
		list.ondrop=function(e) {
			e=e||window.event;

			//获得放置的纯文本数据
			//"Text"是"Text/palin"的昵称,IE不支持"Text/palin"，则这里使用"Text"
			var dt=e.dataTransfer;
			var text=dt.getData("Text");//获取放置的纯文本

			//如果获得一些文本，把它放置列表尾部的新项中
			if(text) {
				var item=document.createElement("li");
				item.draggable=true;
				item.appendChild(document.createTextNode(text));
				list.appendChild(item);

				//恢复列表原始样式且重置进入次数
				list.className=original_class;
				entered=0;

				return false;
			}
		};

		//使列表所有项可拖动
		var items=list.getElementsByTagName("li");
		for(var i=0;i<items.length;i++)
			items[i].draggable=true;

		//为拖动列表项注册事件处理程序

		//当列表中开始拖动对象时，调用
		list.ondragstart=function(e) {
			var e=e||window.event;
			var target=e.target||e.srcElement;
			//如果它不是从<li>向上冒泡，那么忽略它
			if(target.tagName!=="LI")
				return false;
			var dt=e.dataTransfer;
			dt.setData("Text",target.innerText||target.textContent);
			//设置允许复制和移动
			dt.effectAllowed="copyMove";
		};

		//当成功放置后，调用
		list.ondragend=function(e) {
			var e=e||window.event;
			var target=e.target||e.srcElement;

			//如果拖放效果是move，那么删除列表项
			if (e.dataTransfer.dropEffect==="move") 
				target.parentNode.removeChild(target);
		};

		//如果a是b的子元素，则返回true
		function ischild(a,b) {
			for(;a;a=a.parentNode)
				if(a===b)
					return true;
			return false;
		}
	}
});