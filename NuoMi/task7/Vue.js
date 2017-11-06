	//实现发布-订阅类
	function Event() {
		this.events={};//事件对象
	}

	//注册和触发
	Event.prototype={
		//订阅事件(注册)
		on: function(key,callback) {
			if(!this.events[key]) {
				this.events[key]=[];
			}
			this.events[key].push(callback);
		},

		//发布事件（触发）
		emit: function(path) {
			var _this=this;
			var callbackArgs=Array.prototype.slice.call(arguments,1);
			if(path.length>0) {
				for(var i=path.length-1;i>=0;i--) {
					var arr=_this.events[path[i]];
					if(arr) {
						for(var j=0;j<arr.length;j++) {
							arr[j].apply(this,callbackArgs);
						}
					}
				}
			}
			else {
				var arr=_this.events[path[0]];
				for(var j=0;j<arr.length;j++) {
							arr[j].apply(this,callbackArgs);
				}
			}
		}
	};

	//观察者构造函数
	function Vue(data,path,eventBus,el,html,inialdata) {
		this.el=el||document.getElementById(data.el.slice(1));//获取元素
		this.html=html||this.el.innerHTML;
		this.eventBus=eventBus||new Event();
		this.path=path||[];//记录路径
		this.data=data;
		this.inialdata=inialdata||data;
		this.walk(data);
	}

	Vue.prototype.$watch=function(key,callback) {
		this.eventBus.on(key,callback);
	}

	//递归遍历对象的每一个属性
	//为每一个对象的每一个属性绑定getter和setter
	Vue.prototype.walk=function(obj) {
		var val;//属性值
		var _this=this;
		for(var key in obj) {
			//用hasOwnProperty过滤继承属性
			if(obj.hasOwnProperty(key)) {
				val=obj[key];
				//判断是否到最底层，属性值是否还是对象
				if(typeof val==='object') {
					_this.path.push(key);
					new Vue(val,_this.path,_this.eventBus,_this.el,_this.html,_this.inialdata);
				}

				_this.convert(key,val);
			}
		}
	};

	Vue.prototype.convert=function(key,val) {
		var _this=this;
		Object.defineProperty(this.data,key,{
			enumerable: true,
			configuration: true,
			get: function() {
				console.log("你访问了"+key);
				return val;
			},
			set: function(newVal) {
				console.log("你设置了"+key);
				console.log("新的"+key+"="+newVal);
				val=newVal;
				//触发$watch监听到对象的处理函数
				_this.eventBus.emit(_this.path,newVal);
				//如果设置的为对象，继续进入下一层
				if(typeof newVal==="object")
					new Vue(newVal,_this.path,_this.eventBus,_this.el,_this.html,_this.inialdata);
				_this.render();
			}
		});
	};

	//将数据渲染成内容
	Vue.prototype.render=function() {
		var el=this.el;
		var html=this.html;

		var marks=html.match(/\{\{.+\}\}/g);//匹配{{}}字符串
		for(var i=0;i<marks.length;i++) {
			var key=marks[i].replace(/[\{\}]/g,"");//去除大括号
			key=key.split(".");
			var text;//属性值
			if(key.length>1) {
				text=this.inialdata.data;
				for(var j=0,len=key.length;j<len;j++) {
					text=text[key[j]];
				}
			}
			else
				value=this.data[key];
			html=html.replace(marks[i],text);
		}
		el.innerHTML=html;
	};

	var app=new Vue({
		el: '#app',
  		data: {
    		user: {
      			name: 'albert',
      			age: 23
    		}
  		}
	});

	//渲染页面
	app.render();