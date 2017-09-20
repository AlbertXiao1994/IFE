//发布-订阅类
function Event() {
    this.events = {};
}
Event.prototype = {
    listen: function(key, fun) {
        if (!this.events[key]) {
            this.events[key] = [];
        }
        this.events[key].push(fun);
    },
    trigger: function() {
        let key = Array.prototype.shift.call(arguments),
            fns = this.events[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; fn = fns[i]; i++) {
            fn.apply(this, arguments);
        }
    }
}


function Observer(data) {
    this.data = data;
    this.walk(data);
    this.events = new Event();
}
Observer.prototype = {
        //遍历对象
        walk: function(obj) {
            let keys = Object.keys(obj)
            for (var i = 0, l = keys.length; i < l; i++) {
                this.convert(keys[i], obj[keys[i]])
            }
        },
        //为对象的没一个属性绑定getter和setter
        convert: function(key, val) {
            let _this = this;
            var property = Object.getOwnPropertyDescriptor(this.data, key);
            if (property && property.configurable === false) {
                return
            }
            let child = new Observer(val);
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: true,
                get: function() {
                    console.log('你访问了' + key);
                    return val
                },
                set: function(newVal) {
                    console.log('你设置了' + key);
                    console.log('新的' + key + ' = ' + newVal)
                    if (newVal === val) return;
                    _this.events.trigger(key, newVal, val);
                    val = newVal
                    child = new Observer(newVal)
                }
            })

        },
        Observer.prototype = {
            //遍历对象
            walk: function(obj) {
                let keys = Object.keys(obj)
                for (var i = 0, l = keys.length; i < l; i++) {
                    this.convert(keys[i], obj[keys[i]])
                }
            },
            //为对象的没一个属性绑定getter和setter
            convert: function(key, val) {
                let _this = this;
                var property = Object.getOwnPropertyDescriptor(this.data, key);
                if (property && property.configurable === false) {
                    return
                }
                let child = new Observer(val);
                Object.defineProperty(this.data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function() {
                        console.log('你访问了' + key);
                        return val
                    },
                    set: function(newVal) {
                        console.log('你设置了' + key);
                        console.log('新的' + key + ' = ' + newVal)
                        if (newVal === val) return;
                        _this.events.trigger(key, newVal, val);
                        val = newVal
                        child = new Observer(newVal)
                    }
                })
            },
            convert: function(key, val) {
                Object.defineProperty(this.data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function() {
                        console.log('你访问了' + key);
                        return val
                    },
                    set: function(newVal) {
                        console.log('你设置了' + key);
                        console.log('新的' + key + ' = ' + newVal)
                        if (newVal === val) return;
                        val = newVal
                    }
                })
            },
            $watch: function(attr, callback) {
                //监听事件
                this.events.listen(attr, callback)
            }
        }

        //任务一：深层对象
        /**
        let obj = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 4
            }
        }
        let app1 = new Observer(obj)
        app1.data.c.d = 7
        */

        //任务二：添加新对象
        /**
        let app2 = new Observer({
            name: 'youngwind',
            age: 25
        });
        app2.data.name = {
            lastName: 'liang',
            firstName: 'shaofeng'
        };
        app2.data.name.lastName = "xu"
        */

        //任务三：传递回调函数
        *
        let app3 = new Observer({
            name: 'youngwind',
            age: 25
        });
        // 你需要实现 $watch 这个 API
        app3.$watch('age', function(age) {
            console.log(`我的年纪变了，现在已经是：${age}岁了`)
        });
        // app3.data.age = 100;
        