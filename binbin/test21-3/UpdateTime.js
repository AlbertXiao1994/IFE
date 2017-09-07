//更新svg时钟显示时间
function updateTime() {
	var now=new Date();							//当前时间
	var min=now.getMinutes();					//分钟
	var hour=(now.getHours()%12)+min/60;		//小时
	var minangle=min*6;							//每6度表示一分钟
	var hourangle=hour*30;						//每30度表示一小时

	//获取表示时针和分针的svg元素
	var minhand=document.getElementById("minhand");
	var hourhand=document.getElementById("hourhand");

	//设置这些元素的svg属性，把它们移到钟面上
	minhand.setAttribute("transform","rotate("+minangle+",50,50)");
	hourhand.setAttribute("transform","rotate("+hourangle+",50,50)");

	//每一分钟更新一次时钟显示时间
	setTimeout(UpdateTime,60000);
}