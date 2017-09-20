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
		emit: function(key) {
			var _this=this;
			var callbackArgs=Array.prototype.slice.call(arguments,1);
			var arr=this.events[key];
			for(var i=0;i<arr.length;i++) {
				_this.events[key][i].apply(this,callbackArgs);
			}
		}
	};

	//观察者构造函数
	function Observer(data) {
		this.data=data;
		this.walk(data);
		this.eventBus=new Event();
	}

	//递归遍历对象的每一个属性
	//为每一个对象的每一个属性绑定getter和setter
	Observer.prototype.walk=function(obj) {
		var val;//属性值
		for(var key in obj) {
			//用hasOwnProperty过滤继承属性
			if(obj.hasOwnProperty(key)) {
				val=obj[key];

				//判断是否到最底层，属性值是否还是对象
				if(typeof val==='object') {
					new Observer(val);
				}

				this.convert(key,val);
			}
		}
	};

	Observer.prototype.convert=function(key,val) {
		var _this=this;
		Object.defineProperty(this.data,key,{
			enumerable: true,
			configuration: true,
			get: function() {
				console.log("你访问了"+key);
				return val;
			},
			set: function(newVal) {
				//如果设置的为对象，继续进入下一层
				if(typeof newVal==="object")
					new Observer(newVal);

				console.log("你设置了"+key);
				console.log("新的"+key+"="+newVal);
				if(newVal==val)data
					return;
				//触发$watch监听到对象的处理函数
				_this.eventBus.emit(key,newVal);
				val=newVal;
			}
		})
	};

	Observer.prototype.$watch=function(key,callback) {
		this.eventBus.on(key,callback);
	}

	var data={
		basicInfo: {
			name: "albert",
			city: "Hangzhou"
		},
		age: 23
	};

	var app=new Observer(data);//实例化

	app.$watch("age",function(age) {
		console.log(`我的年纪变了，现在已经是：${age}岁了`)
	});