var canvas=document.getElementById("my_canvas");
canvas.width="1200";
canvas.height="500";
var c=canvas.getContext("2d");
var deg=Math.PI/180;

function snowflake(c,n,x,y,len) {
	c.save();				//保存当前变换
	c.translate(x,y);		//变换原点到起始点
	c.moveTo(0,0);			//从新原点开始一条子路径
	leg(n);					//绘制雪花的一条边
	c.rotate(-120*deg)		//逆时针旋转120度
	leg(n);					//第二条边
	c.rotate(-120*deg)		//逆时针旋转120度
	leg(n);					//第三条边
	c.closePath();			//闭合子路径
	c.restore();			//恢复初始变换

	//绘制科勒雪花的一条边
	function leg(n) {
		c.save();
		if(n==0) {				//不需要递归情况下
			c.lineTo(len,0);
		}
		else {					//递归情况下，绘制四条子边，类似于-\/-
			c.scale(1/3,1/3);	//子边长度为原来的1/3
			leg(n-1)
			c.rotate(60*deg);	//顺时针60度
			leg(n-1);
			c.rotate(-120*deg)	//逆时针120度
			leg(n-1);
			c.rotate(60*deg);	//顺时针60度
			leg(n-1);
		}
		c.restore();			//恢复初始变换
		c.translate(len,0);		//终点作为新的原点
	}
}

snowflake(c,0,5,115,125);		//0级科勒雪花
snowflake(c,1,145,115,125);		//1级科勒雪花
snowflake(c,2,285,115,125);		//2级科勒雪花
snowflake(c,3,425,115,125);		//3级科勒雪花
snowflake(c,4,565,115,125);		//4级科勒雪花
c.stroke();						//勾勒当前复杂路径