var canvas=document.getElementById("my_canvas");
canvas.width="600";
canvas.height="600";
var c=canvas.getContext("2d");

//在左上方绘制一条线段
c.moveTo(5,5);
c.lineTo(45,45);
c.lineWidth=8;
c.lineCap="round";
c.stroke();

//定义一个变换
c.translate(50,100);
c.rotate(-45*Math.PI/180);			//逆时针旋转45度
c.scale(10,10);

//使用drawImage()复制该线段
c.drawImage(c.canvas,
			0,0,50,50,//源矩形区域
			0,0,50,50);//目标矩形区域