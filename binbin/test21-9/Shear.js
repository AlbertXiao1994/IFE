var canvas=document.getElementById("my_canvas");
canvas.width="600";
canvas.height="600";
var c=canvas.getContext("2d");

//定义一些绘制属性
c.font="bold 60pt sans-serif";			//大号字体
c.lineWidth=2;							//窄线段
c.strokeStyle="#000";					//黑色线段

//勾勒矩形轮廓和文本轮廓
c.strokeRect(175,25,50,325);			//中间竖直长条
c.strokeText("<canvas>",15,330);		//线框字体

//在外部定义一条包含内部的复杂路径
// c.beginPath();
polygon(c,3,200,225,200);				//大三角形
polygon(c,3,200,225,100,0,true);		//小三角形

//将该路径定义为裁剪区域
c.clip();

//用5个像素宽的线段来勾勒路径,完全在裁剪区域内
c.lineWidth=10;							//另外5个像素被裁剪
c.stroke();

//填充裁剪区域
c.fillStyle="#aaa";						//anhongse
c.fillRect(175,25,50,325);				//填充竖直矩形
c.fillStyle="#888";					//深红色
c.fillText("<canvas>",15,330);

function polygon(c,n,x,y,r,angle,counterclockwise) {
	angle=angle||0;
	counterclockwise=counterclockwise||false;
	c.moveTo(x+r*Math.sin(angle),y-r*Math.cos(angle));		//从第一个顶点开始一条新路径
	var delta=2*Math.PI/n;									//两个顶角间的夹角
	for(var i=1;i<n;i++) {
		angle+=counterclockwise?-delta:delta;				//下一个角
		c.lineTo(x+r*Math.sin(angle),y-r*Math.cos(angle));	//连接相邻顶点
	}
	c.closePath();
}