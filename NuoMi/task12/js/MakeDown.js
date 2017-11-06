new Vue({
	el: ".container",
	data: {
		//文本框输入
		inputWords: ""
	},
	mounted: function() {
		this.$nextTick(function() {
			this.setPageHeight();
		});
	},
	watch: {
		//监听输入变化，重新渲染
		inputWords: function() {
			this.renderWords();
		}
	},
	methods: {
		setPageHeight: function() {
			var _this=this;
			var elt_left=document.getElementById("leftBar");//左栏
			var elt_right=document.getElementById("rightBar");//右栏

			//设置首页背景图高度等于视口高度
			var h=this.getViewportSize(window).h;//获取视口高度
			elt_left.style.height=h+"px";//设置高度
			elt_right.style.height=h+"px";//设置高度

			window.onresize=function() {
				//设置首页背景图高度等于视口高度
				var h=_this.getViewportSize(window).h;//获取视口高度
				elt_left.style.height=h+"px";//设置高度
				elt_right.style.height=h+"px";//设置高度
			};
		},
		//查询窗口的视口尺寸
		getViewportSize: function(w) {
			w=w||window;

			//除了IE8及更早的版本以外，其他的浏览器都能用
			if(w.innerWidth!=null)
				return {w:w.innerWidth,h:w.innerHeight};

			//标准模式下的IE或任何其他浏览器
			var d=w.document;
			if(document.compatMode=="CSS1Compat")
				return {w:d.documentElement.clientWidth,h:d.documentElement.clientHeight};

			//怪异模式下的浏览器
			return {w:d.body.clientWidth,h:d.body.clientHeight};
		},
		renderWords: _.debounce(
		function() {
				var parent=document.getElementById("rightBar");//右栏
				parent.innerHTML="";//清空内容

				//正则表达式
				var input=/^.+\s*$/gm;
				var heading=/#{1,6} +.+\s*/;
				var cite=/^> +.+\s*$/;
				var link=/\[.+\]\(.+\)/;
				var img=/!\[.+\]\(.+\)/;

				var result=this.inputWords.match(input);
				if(result !=null) {
					result.forEach(function(x) {
						if(x.match(heading)!=null) {
							var i=x.toString().search(/ /);
							var p;
							if(i==1)
								p = document.createElement("h1");
							else if(i==2)
								p = document.createElement("h2");
							else if(i==3)
								p = document.createElement("h3");
							else if(i=4)
								p = document.createElement("h4");
							else if(i=5)
								p = document.createElement("h5");
							else if(i=6)
								p = document.createElement("h6");
    						p.innerText = ""+x.toString().slice(i+1)+"";
     						// 添加到body元素里
     						parent.appendChild(p);
     					}
     					else if(x.match(cite)!=null) {
     						var i=x.toString().search(/ /);
							var d = document.createElement("div");
							d.classList.add("cite");
    						d.innerText = ""+x.toString().slice(i+1)+"";
     						// 添加到body元素里
     						parent.appendChild(d);
     					}
     					else if(x.match(img)!=null) {
							var i = document.createElement("img");
							var s=x.toString().search(/\(/);
							i.src=x.toString().slice(s+1,-1);
							var s1=x.toString().search(/\[/);
							var e1=x.toString().search(/\]/);
    						i.alt = x.toString().slice(s1+1,e1);
     						// 添加到body元素里
     						parent.appendChild(i);
     					}
     					else if(x.match(link)!=null) {
							var a = document.createElement("a");
							var s=x.toString().search(/\(/);
							a.href=x.toString().slice(s+1,-1);
							var s1=x.toString().search(/\[/);
							var e1=x.toString().search(/\]/);
    						a.innerText = x.toString().slice(s1+1,e1);
    						a.target="_blank";
     						// 添加到body元素里
     						parent.appendChild(a);
     					}
					});
				}		
			},
			500
		)
	}
});