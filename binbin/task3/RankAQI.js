//提取城市名和空气质量
function getData() {
  var elts=document.getElementsByTagName("li");//获得所有li元素
  var data=[];
  for(var i=0;i<elts.length;i++) {
    var text=elts[i].innerText;
    var elt=[text.substr(0,2),text.substr(-2,2)];
    data.push(elt);
  }
  return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
  return data.sort(function(a,b) {return a[1]-b[1];});
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var ul=document.getElementById("resort");
  var arr=["一","二","三","四","五","六","七"];//大写数字映射数组

  for(var row=0,rank=0;row<data.length;row++) {
      var li=document.createElement("li");
      li.innerHTML="第"+arr[rank++]+"名："+data[row][0]+"空气质量：";
      var b=document.createElement("b");
      b.innerHTML=data[row][1];
      li.appendChild(b);
      ul.appendChild(li);
  }
}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}

function init() {
  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  var btn=document.getElementById("sort-btn");//获取button元素

  //注册处理程序
  if(document.addEventListener)
    btn.addEventListener("click",btnHandle,false);
  else if(document.attach)
    btn.attach("onclick",btnHandle);
}

init();