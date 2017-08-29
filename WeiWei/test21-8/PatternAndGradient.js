var canvas=document.getElementById("my_canvas");
canvas.width="600";
canvas.height="600";
var c=canvas.getContext("2d");

//定义填充图案
var offscreen=document.createElement("canvas");				//屏幕外画布
offscreen.width=offscreen.height=10;
offscreen.getContext("2d").strokeRect(0,0,6,6);
var pattern=c.createPattern(offscreen,"repeat");

//线性渐变
var bgfade=c.createLinearGradient(0,0,canvas.width,canvas.height);
bgfade.addColorStop(0.0,"#88f");							//亮蓝色
bgfade.addColorStop(1.0,"#fff");							//白色

//放射状渐变
var peerhole=c.createRadialGradient(300,300,100,300,300,300);//两个同心圆
peerhole.addColorStop(0.0,"transparent");						//透明
peerhole.addColorStop(0.7,"rgba(100,100,100,.9)");			//透明
peerhole.addColorStop(1.0,"transparent");						//透明

//定义图形属性
c.fillStyle=bgfade;											//先线性渐变
c.fillRect(0,0,600,600);
c.strokeStyle=pattern;										//图案填充
c.lineWidth=100;
c.strokeRect(100,100,400,400);
c.fillStyle=peerhole;										//辐射渐变
c.fillRect(0,0,600,600);