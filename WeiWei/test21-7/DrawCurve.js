var canvas=document.getElementById("my_canvas");
canvas.width="1200";
canvas.height="500";
var c=canvas.getContext("2d");
function rads(x) {
	return Math.PI*x/180;
}

c.beginPath();
c.arc(75,100,50,0,rads(360),false);			//圆心（75,100），半径50

//绘制一个楔
c.moveTo(200,100);
c.arc(200,100,50,rads(-60),rads(0),false);
c.closePath();

//同样的楔，但不同方向
c.moveTo(325,100);
c.arc(325,100,50,rads(-60),rads(0),true);
c.closePath();

//绘制圆角正方向
c.moveTo(450,50);
c.arcTo(500,50,500,150,30);					//顶边右半部分和右上角
c.arcTo(500,150,400,150,20);				//右边和右下角
c.arcTo(400,150,400,50,10);					//底边和左下角
c.arcTo(400,50,500,50,0);					//左边和左上角
c.closePath();

//二次贝赛尔曲线，一个控制点
c.moveTo(75,250);
c.quadraticCurveTo(100,200,175,250);		//控制点(100,200)，终点（175.250
c.fillRect(100-3,200-3,6,6);				//标记控制点

//三次贝赛尔曲线，两个控制点
//二次贝赛尔曲线，一个控制点
c.moveTo(200,250);
c.bezierCurveTo(220,220,280,280,300,250);	//控制点(100,200)，终点（175.250
c.fillRect(220-3,220-3,6,6);				//标记控制点
c.fillRect(280-3,280-3,6,6);				//标记控制点

//定义图形属性，并绘制曲线
c.fillStyle="#aaa";							//灰色
c.lineWidth=5;			
c.fill();
c.stroke();