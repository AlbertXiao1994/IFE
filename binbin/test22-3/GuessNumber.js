window.onload=newgame;//页面载入时开始一个新游戏
window.onpopstate=popState;//处理历史记录相关事件
var state,ui;//声明全局变量，在newgame中初始化

//开始新游戏
function newgame(playagin) {
	//初始化一个包含需要的文档元素的对象
	ui={
		heading:null,//文档最上面的<h1>元素
		prompt:null,//要求用户输入一个猜测数字
		input:null,//用户输入猜测数字的地方
		low:null,//可视化的三个表格单元
		mid:null,//猜测数字的范围
		high:null
	};

	//查询这些元素的id
	for(var id in ui)
		ui[id]=document.getElementById(id);

	//给input字段定义一个事件处理程序
	ui.input.onchange=handleGuess;

	//生成一个随机的数字并初始化游戏状态
	state={
		n:Math.floor(99*Math.random())+1,//生成一个0到99的整数
		low:0,//可猜测的下限
		high:100,//可猜测的上限
		guessnum:0,//猜测的次数
		guess:undefined//最后一次猜测
	};

	//修改文档内容来显示该初始化
	display(state);

	if(playagin==true)
		save(state);
}

//如果支持，则使用pushState()方法将游戏状态保存到浏览器历史记录中
function save(state) {
	if(!history.pushState)
		return;//如果pushState()方法没有定义，则什么也不做

	//将保存状态和URL关联起来
	//该URL显示猜测的数字，但不对游戏状态进行编码
	//因此，这对书签是没有用的
	//不能简单地将游戏状态写到URL中，这会将游戏的一些机密数字暴露在地址栏中
	var url="#guess"+state.guessnum;
	history.pushState(state,//要保存的状态
					  "",//状态标题，当前浏览器会忽略它
					  url);//状态URL，对书签是没有用的
}

//这是onpopState事件处理程序。用于恢复该状态
function popState(event) {
	if(event.state) {//如果事件有一个状态对象，则恢复该状态
		//event.state是一个深拷贝，无需改变保存的值，就可以修改该对象
		state=event.state;//恢复历史状态
		display(state);
	}
	else {
		//当第一次载入页面时，会触发一个没有状态的popState事件
		//用真实的状态将null状态替换掉
		//这里不需要调用display方法
		history.replaceState(state,"","guess"+state.guessnum);
	}
};

//每次用户猜测一个数字的时候，都会调用函数
//更新、保存、显示游戏状态
function handleGuess() {
	//从input字段中获取用户猜测的数字
	var g=parseInt(this.value);
	//如果该值为限定范围内的数字
	if((g>state.low)&&(g<state.high)) {
		//对应更新状态对象
		if(g<state.n)
			state.low=g;
		else if(g>state.n)
				state.high=g;
		state.guess=g;
		state.guessnum++;
		//在浏览器历史记录中保存最新状态
		save(state);
		//根据用户的猜测来修改文档
		display(state);
	}
	else {
		//无效的猜测：不保存状态
		alert("Please enter a numbei greater than "+state.low+" and less than "+state.high);
	}
}

//修改文档来显示游戏当前状态
function display(state) {
	//显示文档导航
	ui.heading.innerHTML="I'm thinking of a number between "+state.low+" and "+state.high+".";

	//使用表格来显示数字取值范围
	ui.low.style.width=state.low+"%";
	ui.mid.style.width=(state.high-state.low)+"%";
	ui.high.style.width=(100-state.high)+"%";

	//确保input字段是可见的，空的，聚焦的
	ui.input.style.visibility="visible";
	ui.input.value="";
	ui.input.focus();

	//根据用户的最近猜测，设置提示
	if(state.guess==undefined)
		ui.prompt.innerHTML="Type your guess and hit Enter";
	else if(state.guess<state.n)
			ui.prompt.innerHTML=state.guess+" is too low.Guess angin: ";
	else if(state.guess>state.n)
			ui.prompt.innerHTML=state.guess+" is too high.Guess angin: ";
	else {
		//猜对了,隐藏input字段，并显示在玩一次
		ui.input.style.visibility="hidden";
		ui.heading.innerHTML=state.guess+" is correct! ";
		ui.prompt.innerHTML="Your Win! <button onclick='newgame(true)'>Play angin</button>";
	}
}