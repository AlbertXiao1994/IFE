function enclose(content,framewidth,frameheight,contentX,contentY) {
	//这些参数不仅仅是初始值，
	//它们保存当前状态，能被mousewheel处理程序使用和修改
	framewidth=Math.max(framewidth,50);
	frameheight=Math.max(frameheight,50);
	contentX=Math.min(contentX,0)||0;
	contentY=Math.min(contentY,0)||0;

	//创建frame元素，且设置CSS类名和样式
	var frame=document.createElement("div");
	frame.className="enclosure";//这样我们能在样式表中定义样式
	frame.style.width=framewidth+"px";//设置frame的尺寸
	frame.style.height=frameheight+"px";
	frame.style.overflow="hidden";//没有滚动条，不可溢出
	frame.style.boxSizing="border-box";
	frame.style.webKitBoxSizing="border-box";
	frame.style.MozBoxSizing="border-box";

	//把frame放入文档中，并把内容移入frame在
	content.parentNode.insertBefore(frame,content);
	frame.appendChild(content);

	//确定元素相对于frame的位置
	content.style.position="relative";
	content.style.left=contentX+"px";
	content.style.top=contentY+"px";

	//我们将需要针对下面一些特定浏览器怪异进行处理
	var isMacWebkit=(navigator.userAgent.indexOf("Macintosh")!==-1&&
					 navigator.userAgent.indexOf("WebKit")!==-1);
	var isFirefox=(navigator.userAgent.indexOf("Gecko")!==-1);

	//注册mousewheel事件处理程序
	frame.onwheel=wheelHandler;//未来浏览器
	frame.onmousewheel=wheelHandler;//大多数浏览器
	if(isFirefox)//仅FireFox
		frame.addEventListener("DOMMouseScroll",wheelHandler,false);

	function wheelHandler(event) {
		var e=event||window.event;//标准或IE事件对象

		/*查找wheel事件对象和mousewheel事件对象（包括2D和1D形式）
		和FireFox的DOMMouseScroll事件对象的属性，
		从事件对象中提取旋转量
		缩放delta以便一次鼠标滚动相对于屏幕的缩放量是30px
		如果未来浏览器在同一事件上同时触发wheel和mousewheel事件，这里最终会重复计算
		所以，希望取消wheel事件将组织mousewheel事件的产生*/
		var deltaX=e.deltaX*-30||//wheel事件
				e.wheelDeltaX/4||//webkit中的mousewheel
				   			  0;//属性未定义
		var deltaY=e.deltaY*-30||//wheel事件
				e.wheelDeltaY/4||//mousewheel
	  (e.wheelDeltaY==undefined&&//如果么有2D属性
				e.wheelDelta/4)||//那么就用1D的滚轮属性
				   e.detail*-10||//FireFox的DOMMouseScroll事件
				   			  0;//属性未定义

		//在大多数浏览器中滚轮每次滚动对应delta是120
		//但是在Mac中，鼠标更敏感
		//其delta值通常要大120倍，使用Apple鼠标至少这样
		//使用浏览器测试解决这个问题
		if(isMacWebkit) {
			deltaX/=30;
			deltaY/=30;
		}

		//如果在FireFox（未来版本）中得到mousewheel或wheel事件，
		//那么就不再需要DOMMousewheelScroll
		if(isFirefox&&e.type!="DOMMouseScroll")
			frame.removeEventListener("DOMMouseScroll",wheelHandler,false);

		//获取内容元素的当前尺寸
		var contentbox=content.getBoundingClientRect();
		var contentwidth=contentbox.right-contentbox.left;
		var contentheight=contentbox.bottom-contentbox.top;

		if(e.altKey) {//如果按下Alt键，就可以调整frame大小
			if(deltaX) {
				framewidth-=deltaX;//新宽度，但不能比内容大
				framewidth=Math.min(framewidth,contentwidth);
				framewidth=Math.max(framewidth,50);//不能比50小
				frame.style.width=framewidth+"px";//在frame上设置它
			}
			if(deltaY) {
				frameheight-=deltaY;//新宽度，但不能比内容大
				frameheight=Math.min(frameheight,contentheight);
				frameheight=Math.max(frameheight,50);//不能比50小
				frame.style.height=frameheight+"px";//在frame上设置它
			}
		}
		else {//没有按下Alt辅助键，平移frame中的内容
			if(deltaX) {
				//不能再滚动了
				var minoffset=Math.min(framewidth-contentwidth,0);
				//把deltaX添加到contentX中，但不能小于minoffset
				contentX=Math.max(contentX+deltaX,minoffset);
				contentX=Math.min(contentX,0)//不能大于0
				content.style.left=contentX+"px";//设置新的偏移量
			}
			if(deltaY) {
				//不能再滚动了
				var minoffset=Math.min(frameheight-contentheight,0);
				//把deltaX添加到contentX中，但不能小于minoffset
				contentY=Math.max(contentY+deltaY,minoffset);
				contentY=Math.min(contentY,0)//不能大于0
				content.style.top=contentY+"px";//设置新的偏移量
			}
		}

		//不让这个事件冒泡，阻止任何默认操作
		//这会阻止浏览器使用mousewheel事件滚动文档
		//希望对于相同的鼠标滚动，
		//调用wheel事件上的preventDefault()也能阻止mousewheel事件的产生
		if(e.preventDefault) e.preventDefault();
		if(e.stopPropagation) e.stopPropagation();
		e.cancelBubble=true;//IE
		e.returnValue=false;//IE
		return false;
	}
}