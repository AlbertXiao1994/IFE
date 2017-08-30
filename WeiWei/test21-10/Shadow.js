var canvas=document.getElementById("my_canvas");
canvas.width="600";
canvas.height="600";
var c=canvas.getContext("2d");

//定义一种不明显的阴影
c.shadowColor="rgba(100,100,100,.4)";			//半透明灰色
c.shadowOffsetX=c.shadowOffsetY=3;
c.shadowBlur=5;									//柔化边缘

//使用阴影在一个蓝色的方框中绘制一些文本
c.lineWidth=10;
c.strokeStyle="blue";
c.strokeRect(100,100,300,200);
c.font="bold 36pt Helvetica";
c.fillText("Hello World",115,225);				//绘制一些文本

//定义一些模糊点的阴影，较大的偏移量使阴影浮得很高
c.shadowOffsetX=c.shadowOffsetY=20;
c.shadowBlur=10;
c.fillStyle="red";
c.fillRect(50,25,200,65);