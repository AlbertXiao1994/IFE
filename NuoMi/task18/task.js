"use strict";
var page = require('webpage').create(),
  system = require('system'),
  beginTime = 0,
  endTime = 0,
  word;
var args = system.args;

if (args.length === 1) {
  console.log('Usage: loadspeed.js <your key word>');
  phantom.exit();
}
 
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

word = getWord();//关键词
page.open("http://baidu.com/", function(status) {
    if (status === "success") {
        page.includeJs("http://libs.baidu.com/jquery/1.9.1/jquery.min.js", function() {
            page.evaluate(function() {
                // console.log("$(\".explanation\").text() -> " + $(".explanation").text());
                $('#wd').val(word);
                $('#su').click();
                beginTime = Date.now();//抓取开始时间
            });
            phantom.exit(0);
        });
    } else {
      phantom.exit(1);
    }
});

page.onResourceReceived = function (res) {
    if (res.state === 'end') {
        
    }
}

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
