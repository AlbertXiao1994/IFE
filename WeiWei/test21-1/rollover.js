onLoad(function() { //所有处理逻辑都在一个匿名函数中，不定义任何一个符号
	//遍历所有的图片，查找data-rollover属性
	for(var i=0;i<document.images.length;i++) {
		var img=document.images[i];
		var rollover=img.getAttribute("data-rollover");
		if(!rollover) continue;//跳过不存在data-rollover属性的图片

		//确保将翻转的图片缓存起来
		(new Image()).src=rollover;

		//定义一个属性来标识默认图片的url
		img.setAttribute("data-rollout",img.src);

		//注册事件处理程序来创建翻转效果
		img.onmouseover=function() {
			this.src=this.getAttribute("data-rollover");
		};
		img.onmouseout=function() {
			this.src=this.getAttribute("data-rollout");
		};
	}
});
