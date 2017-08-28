/*data:表示饼状图每个楔数值大小的数组
width,height:svg图形的大小，单位为像素
cxz,cy,r:饼状图的圆心和半径
colors:表示每个HTML颜色的数组
labels:表示每个饼状图每个楔含义的标签数组
lx,ly:饼状图的左上角*/
function pieChart(data,width,height,cx,cy,r,colors,labels,lx,ly) {
	//这是表示svg元素的xml命名空间
	var svgns="http://www.w3.org/2000/svg";
	
	//创建一个<svg>元素，同时指定像素大小和用户坐标
	var chart=document.createElementNS(svgns,"svg:svg");
	chart.setAttribute("width",width);
	chart.setAttribute("height",height);
	chart.setAttribute("viewBox", "0 0 "+width+" "+height);

	//累加data,以便指定饼状图的大小
	var total=0;
	for(var i=0;i<data.length;i++)
	total+=data[i];

	//计算每个饼状图每个分片的大小，其中角度以弧度计算
	var angles=[];
	for(var i=0;i<data.length;i++)
		angles[i]=data[i]/total*Math.PI*2;

	//遍历饼状图的每个分片
	startangle=0;
	for(var i=0;i<data.length;i++) {
		//楔的结束位置
		var endangle=startangle+angles[i];

		//计算楔与圆弧的两个交点
		var x1=cx+r*Math.sin(startangle);
		var y1=cy-r*Math.cos(startangle);
		var x2=cx+r*Math.sin(endangle);
		var y2=cy-r*Math.cos(endangle);

		//标记是否为优弧
		var big=0;
		if(endangle-startangle>Math.PI)
			big=1;

		//使用<svg:path>元素描述楔
		var path=document.createElementNS(svgns,"path");

		//路径的具体信息
		var d="M "+cx+","+cy+	//从圆心开始
		      " L "+x1+","+y1+	//画到(x1,y1)的线段
		      " A "+r+","+r+		//画一条半径为r的弧
		      " 0 "+big+" 1 "+		//弧的详细信息
		      x2+","+y2+		//到(x2,y2)结束
		      " Z";				//当前路径到(cx,cy)结束

		 //设置<svg:path>元素属性
		 path.setAttribute("d",d);					//设置路径
		 path.setAttribute("fill",colors[i]);		//设置颜色
		 path.setAttribute("stroke","black");		//外边框为黑色
		 path.setAttribute("stroke-width","2");		//2个单位宽
		 chart.appendChild(path);					//将楔加入饼状图中

		 //当前楔的结束时下个楔的开始
		 startangle=endangle;

		 //现在绘制一些相应的小方块用来表示图例
		 var icon=document.createElementNS(svgns,"rect");
		 icon.setAttribute("x",lx);			//定位小方块
		 icon.setAttribute("y",ly+30*i);
		 icon.setAttribute("width",20);		//设置小方块大小
		 icon.setAttribute("height",20);
		 icon.setAttribute("fill",colors[i]);	//填充小方块
		 icon.setAttribute("stroke","black");
		 icon.setAttribute("stroke-width","2");
		 chart.appendChild(icon);		//添加到饼状图

		 //在小方块的右边添加标签
		 var label=document.createElementNS(svgns,"text");
		 label.setAttribute("x",lx+30);		//定位标签
		 label.setAttribute("y",ly+i*30+18);
		 //文本样式属性还可以通过CSS来设置
		 label.setAttribute("font-family","sans-serif");
		 label.setAttribute("font-size","16");
		 //在<svg:text>元素中添加一个DOM文本节点
		 label.appendChild(document.createTextNode(labels[i]));
		 chart.appendChild(label);	//将文本添加到饼状图中
	}

	return chart;
}