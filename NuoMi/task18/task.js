"use strict";
var page = require('webpage').create(),
  system = require('system'),
  beginTime = 0,
  word,url;
var args = system.args;
phantom.outputEncoding = "gbk";//输出编码方式

//返回结果
var result = {
  code: 0,
  msg: '',
  word: '',
  time: 0,
  dataList: []
};

//验证输入格式
if (args.length === 1) {
  console.log('Usage: loadspeed.js <your key word>');
  phantom.exit();
}
 
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

word = getWord();//获取关键词
url = encodeURI("http://baidu.com/s?ie=UTF-8&wd=" + word);//设置url
beginTime = Date.now();//抓取开始时间
// 访问百度
page.open(url, function(status) {
    if (status === "success") {
        console.log('1');
        result.code = 1;//测试断点1
        result.msg = '抓取成功';
        result.word = word;
        page.includeJs("http://libs.baidu.com/jquery/1.9.1/jquery.min.js", function() {
            console.log('2');//测试断点2
            //page.evaluate()里无法获取全局的result对象.
            //采用返回值的形式
            var data = [];
            data = page.evaluate(function() {
                console.log("3");//测试断点3
                var temp = [];
                var res = $(".c-container");
                res.each(function(i,e) {
                  var obj = {
                    title: '',
                    info: '',
                    link: '',
                    pic: ''
                  };
                  obj.title = $(this).find('.t a').text();
                  obj.info = $(this).find('.c-abstract').text();
                  obj.link = $(this).find('.t a').attr('href');
                  obj.pic = $(this).find('.c-img').attr('src');
                  temp.push(obj);
                })
                return temp;
            });
            result.dataList = data;
            result.time = Date.now() - beginTime;//获取结束时间
            console.log(JSON.stringify(result));//返回JSON
            console.log("4");//测试断点4
            phantom.exit(0);
        });
    } else {
      result.code = 0;
      result.msg = '抓取失败';
      result.word = word;
      result.time = Date.now() - beginTime;//获取结束时间
      console.log(JSON.stringify(result));//返回JSON
      console.log("fail");
      phantom.exit(1);
    }
});

//获取关键词
function getWord() {
    var str = ''
    args.forEach(function(arg, i) {
        if (i > 0) {
            str += arg + '';
        }
    });
    return str;
}
