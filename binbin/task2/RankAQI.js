var aqiData=[
	["北京",90],
	["上海",50],
	["福州",10],
	["广州",90],
	["西安",100]
];

(function() {
	var ul=document.getElementById("aqi-list");
	var arr=["一","二","三","四","五","六"];//大写数字映射数组

	var a=aqiData.sort(function(a,b)
						{return b[1]-a[1];});

	for(var row=0,rank=0;row<a.length;row++) {
			if(a[row][1]>60) {
				var li=document.createElement("li");
				li.innerHTML="第"+arr[rank++]+"名："+a[row][0]+","+a[row][1];
				ul.appendChild(li);
			}
	}
}());