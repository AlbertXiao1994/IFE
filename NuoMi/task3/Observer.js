	//观察者构造函数
	function Observer(data) {
		this.data=data;
		this.walk(data);
	}

	var p=Observer.prototype;

	//递归遍历对象的每一个属性
	//为每一个对象的每一个属性绑定getter和setter
	p.walk=function(obj) {
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

	p.convert=function(key,val) {
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
				if(newVal==val)
					return;
				val=newVal;
			}
		})
	};

	var data={
		user: {
			name: "albert",
			age: "23"
		},
		address: {
			city: "Hangzhou"
		}
	};

	var app=new Observer(data);//实例化