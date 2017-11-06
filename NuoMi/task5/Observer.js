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
	function Observer(data,path,eventBus) {
		this.eventBus=eventBus||new Event();
		this.path=path||[];//记录路径
		this.data=data;
		this.walk(data);
	}

	Observer.prototype.$watch=function(key,callback) {
		this.eventBus.on(key,callback);
	}

	//递归遍历对象的每一个属性
	//为每一个对象的每一个属性绑定getter和setter
	Observer.prototype.walk=function(obj) {
		var val;//属性值
		var _this=this;
		for(var key in obj) {
			//用hasOwnProperty过滤继承属性
			if(obj.hasOwnProperty(key)) {
				val=obj[key];
				//判断是否到最底层，属性值是否还是对象
				if(typeof val==='object') {
					_this.path.push(key);
					new Observer(val,this.path,_this.eventBus);
				}

				_this.convert(key,val);
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
				console.log("你设置了"+key);
				console.log("新的"+key+"="+newVal);
				val=newVal;
				//触发$watch监听到对象的处理函数
				_this.eventBus.emit(_this.path,newVal);
				//如果设置的为对象，继续进入下一层
				if(typeof newVal==="object")
					new Observer(newVal,_this.path,_this.eventBus);
			}
		});
	};

	var data={
		name: {
			firstname: "albert",
			lastName: "xiao" 
		},
		age: 23
	};

	var app=new Observer(data);//实例化

	app.$watch("age",function(age) {
		console.log(`我的年纪变了，现在已经是：${age}岁了`)
	});

	app.$watch("name",function(newName) {
		console.log(`我的名字变了，可能是姓氏变了，也可能是名字变了。`);
	});