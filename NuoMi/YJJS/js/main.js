window.onload=function() {
	var elt_topBar=document.getElementById("topBar");//顶栏
	var elt_drt=document.getElementById("direction");//使用说明页
	var elt_palace=document.getElementById("palace");//宫殿展示页
	var elt_co=document.getElementById("cooperation");//合作页

	var shadow=document.getElementById("shadow");//遮罩层
	var open_login=document.getElementById("open_login");//打开登录框按钮
	var open_register=document.getElementById("open_register");//打开注册框按钮
	var loginBar=document.getElementById("loginBar");//登录-注册框
	var form_in=document.getElementById("form_in");//登录框
	var form_up=document.getElementById("form_up");//注册框
	var shadow=document.getElementById("shadow");//遮罩层
	var closeLoginBar=document.getElementById("closeLoginBar");//关闭按钮
	var sign_up=document.getElementById("sign_up");//注册选将卡
	var sign_in=document.getElementById("check_sign_in");//登录选将卡
	var btn_signup=document.getElementById("btn-sign-up");//注册框中的注册按钮
	var btn_top=document.getElementById("retrunTop");//返回顶部

	//宫殿页
	var palace_left=document.getElementById("palace_left");//宫殿页左翻页按钮
	var palace_right=document.getElementById("palace_right");//宫殿页右翻页按钮
	var palace_indicator=document.getElementById("palace_indicator");//指示栏

	//合作页
	var co_left=document.getElementById("co_left");//合作页左翻页按钮
	var co_right=document.getElementById("co_right");//合作页右翻页按钮
	var co_indicator=document.getElementById("co_indicator");//指示栏

	var input_name=document.getElementById("name");//姓名输入框
	var input_phone=document.getElementById("cellphone");//手机输入框
	var input_email=document.getElementById("email");//电子邮件输入框
	var input_psw=document.getElementById("psw_up");//密码输入框
	var input_re=document.getElementById("re_psw");//确认密码输入框

	//窗口滚动
	window.onscroll=function() {
		//显示/隐藏返回顶部按钮
		if(getScrolloffsets().y>getViewportSize().h)
			btn_top.style.display="block";
		else
			btn_top.style.display="none";
	}

	window.onresize=function() {
		//设置首页背景图高度等于视口高度
		var h=getViewportSize(window).h;//获取视口高度
		elt_topBar.style.height=h+"px";//设置高度
		elt_drt.style.height=h+"px";//设置高度
		elt_palace.style.height=h+"px";//设置高度
		elt_co.style.height=h+"px";//设置高度
	}

	//检验表单输入
	//名称失去焦点事件处理程序
	input_name.onblur=validate_name;
	//手机失去焦点事件处理程序
	input_phone.onblur=validate_phone;
	//邮件失去焦点事件处理程序
	input_email.onblur=validate_email;
	//密码失去焦点事件处理程序
	input_psw.onblur=validate_psw;
	//确认密码失去焦点事件处理程序
	input_re.onblur=validate_re;


	//注册登录按钮相应事件
	open_login.onclick=function() {
		shadow.style.display="block";//遮罩
		loginBar.style.display="block";//登录-注册框
		loginBar.style.height="380px";
		form_in.style.display="block";//显示登录框
		form_up.style.display="none";//隐藏注册框
	};

	//注册注册按钮相应事件
	open_register.onclick=function() {
		shadow.style.display="block";//遮罩
		loginBar.style.display="block";//登录-注册框
		form_in.style.display="none";//隐藏登录框
		loginBar.style.height="560px";
		form_up.style.display="block";//显示注册框
	};

	//切换成注册状态
	sign_up.onchange=function() {
		form_in.style.display="none";//隐藏登录框
		loginBar.style.height="560px";
		form_up.style.display="block";//显示注册框
	};

	//切换成登录状态
	sign_in.onchange=function() {
		form_in.style.display="block";//显示登录框
		loginBar.style.height="380px";
		form_up.style.display="none";//隐藏注册框
	};

	//关闭登录-注册框
	closeLoginBar.onclick=function() {
		loginBar.style.display="none";
		shadow.style.display="none";
	};

	//提交注册表单按钮
	btn_signup.onclick=validate_final;

	//宫殿翻页标签
	var palace_index=0;
	//宫殿页向左翻页
	palace_left.onclick=function() {
		var elt_box=document.getElementById("carousel-box");//轮播框盒子
		var i=document.getElementById("palace_indicator");//指示元素

		//移动位置
		switch(palace_index) {
			case 0:elt_box.style.left="-300%";//第一栏
				   palace_index=3;
				   break;
			case 1:elt_box.style.left="0";//第二栏
				   palace_index=0;
				   break;
			case 2:elt_box.style.left="-100%";//第三栏
				   palace_index=1;
				   break;
			case 3:elt_box.style.left="-200%";//第四栏
				   palace_index=2;
				   break;
		}

		//改变指示
		var c=i.children;
		var elt_i=c[palace_index];//当前选中元素
		if(palace_index!=3)
			c[palace_index+1].classList.remove("selected");
		else
			c[0].classList.remove("selected");
		elt_i.classList.add("selected");
	}

	//宫殿页向右翻页
	palace_right.onclick=function() {
		var elt_box=document.getElementById("carousel-box");//轮播框盒子
		var i=document.getElementById("palace_indicator");//指示元素

		//移动位置
		switch(palace_index) {
			case 0:elt_box.style.left="-100%";//第一栏
				   palace_index=1;
				   break;
			case 1:elt_box.style.left="-200%";//第二栏
				   palace_index=2;
				   break;
			case 2:elt_box.style.left="-300%";//第三栏
				   palace_index=3;
				   break;
			case 3:elt_box.style.left="0";//第四栏
				   palace_index=0;
				   break;
		}

		//改变指示
		var c=i.children;
		var elt_i=c[palace_index];//当前选中元素
		if(palace_index!=0)
			c[palace_index-1].classList.remove("selected");
		else
			c[3].classList.remove("selected");
		elt_i.classList.add("selected");
	}

	//合作翻页标签
	var co_index=0;
	//合作页向左翻页
	co_left.onclick=function() {
		var elt_box=document.getElementById("co_box");//轮播框盒子
		var i=document.getElementById("co_indicator");//指示元素

		//移动位置
		switch(co_index) {
			case 0:elt_box.style.left="-300%";//第一栏
				   co_index=3;
				   break;
			case 1:elt_box.style.left="0";//第二栏
				   co_index=0;
				   break;
			case 2:elt_box.style.left="-100%";//第三栏
				   co_index=1;
				   break;
			case 3:elt_box.style.left="-200%";//第四栏
				   co_index=2;
				   break;
		}

		//改变指示
		var c=i.children;
		var elt_i=c[co_index];//当前选中元素
		if(co_index!=3)
			c[co_index+1].classList.remove("selected");
		else
			c[0].classList.remove("selected");
		elt_i.classList.add("selected");

	}

	//合作页向右翻页
	co_right.onclick=function() {
		var elt_box=document.getElementById("co_box");//轮播框盒子
		var i=document.getElementById("co_indicator");//指示元素

		//移动位置
		switch(co_index) {
			case 0:elt_box.style.left="-100%";//第一栏
				   co_index=1;
				   break;
			case 1:elt_box.style.left="-200%";//第二栏
				   co_index=2;
				   break;
			case 2:elt_box.style.left="-300%";//第三栏
				   co_index=3;
				   break;
			case 3:elt_box.style.left="0";//第四栏
				   co_index=0;
				   break;
		}

		//改变指示
		var c=i.children;
		var elt_i=c[co_index];//当前选中元素
		if(co_index!=0)
			c[co_index-1].classList.remove("selected");
		else
			c[3].classList.remove("selected");
		elt_i.classList.add("selected");
	}

	//返回顶部
	btn_top.onclick=function() {
		window.scrollTo(0.0,0.0);//返回顶部
	}
};

//查询窗口的视口尺寸
function getViewportSize(w) {
	w=w||window;

	//除了IE8及更早的版本以外，其他的浏览器都能用
	if(w.innerWidth!=null)
		return {w:w.innerWidth,h:w.innerHeight};

	//标准模式下的IE或任何其他浏览器
	var d=w.document;
	if(document.compatMode=="CSS1Compat")
		return {w:d.documentElement.clientWidth,
				h:d.documentElement.clientHeight};

	//怪异模式下的浏览器
	return {w:d.body.clientWidth,h:d.body.clientHeight};
}

//查询窗口滚动条的位置
function getScrolloffsets(w) {
	//使用指定窗口，如果不带参数则使用当前窗口
	w=w||window;

	//除IE 8及更早版本，其他浏览器都适用
	if(w.pageXoffset!=null)
		return {x:w.pageXoffset,y:w.pageYoffset};

	//对标准模式下的IE及任何浏览器
	var d=w.document;
	if(document.compatMode=="CSS1Compat")
		return {x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};

	//怪异模式下
	return {x:d.body.scrollLeft,y:d.body.scrollTop};
}

//验证姓名
function validate_name() {
	var s=document.getElementById("s_name");//获取提示元素
	var _this=document.getElementById("name");//姓名输入框
	var v=_this.value;//获取输入文本

	_this.style.borderColor="#ED1C24";
	s.style.visibility="visible";

	if(v==""||v==null) {
		s.innerHTML="!请输入您的姓名";
	}
	else {
		s.style.visibility="hidden";
		_this.style.borderColor="#B3B3B3";
	}
}

//验证手机
function validate_phone() {
		var _this=document.getElementById("cellphone");//手机输入框
		var v=_this.value;
		var s=document.getElementById("s_phone");

		s.style.visibility="visible";
		s.innerHTML="";
		_this.style.borderColor="#ED1C24";

		var reg_digital=/^[\d]+$/;
		var reg_length=/\d{11}/;
		var reg_correct=/^1((3[0-9])|(4[579])|(5[0-35-9])|(66)|(7[3578])|(8\d)|(9[89]))\d{8}/;

		if(v==""||v==null) {
			s.innerHTML="!请输入您的手机号";
		}
		else if(!reg_digital.test(v)) {
			s.innerHTML="！输入的手机号中含有非法字符";
		}
		else if(!reg_length.test(v)) {
			s.innerHTML="！手机号应为11位数字";
		}
		else if(reg_correct.test(v)){
			s.style.visibility="hidden";
			_this.style.borderColor="#B3B3B3";
		}
		else {
			s.innerHTML="！手机号不存在";
		}
}

//验证电子邮件
function validate_email() {
		var _this=document.getElementById("email");//电子邮件输入框
		var s=document.getElementById("s_email");//获取提示元素
		var v=_this.value;//获取输入文本


		var apos=v.indexOf("@");//@的位置
		dotpos=v.lastIndexOf(".");//.的位置

		if(v!=""&&v!=null) {
			if (apos<1||dotpos-apos<2) {
				_this.style.borderColor="#ED1C24";
				s.style.visibility="visible";
				s.innerHTML="邮件格式不正确";
			}
			else {
				s.style.visibility="hidden";
				_this.style.borderColor="#B3B3B3";
			}
		}
}

//验证密码
function validate_psw() {
		var _this=document.getElementById("psw_up");//密码输入框
		var s=document.getElementById("s_psw");//获取提示元素
		var v=_this.value;//获取输入文本
		var reg=/^[\w\d]+$/;

		//初始属性
		s.style.visibility="visible";
		_this.style.borderColor="#ED1C24";

		if(v==""||v==null) {
			s.innerHTML="！请输入您的密码";
		}
		else if(v.length<6) {
			s.innerHTML="!密码不能少于6个字符";
		}
		else {
			s.style.visibility="hidden";
			this.style.borderColor="#B3B3B3";
		}
}

//重复验证密码
function validate_re() {
		var _this=document.getElementById("re_psw");//确认密码输入框
		var s=document.getElementById("s_re_psw");//获取提示元素
		var v_re=_this.value;//获取确认密码输入文本
		var v_psw=document.getElementById("psw_up").value;//获取密码输入文本
		var reg=/^[\w\d]+$/;

		_this.style.borderColor="#ED1C24";
		s.style.visibility="visible";
        
        if(v_re==""||v_re==null) {
			s.innerHTML="！请您确认密码";
        }
		else if(v_re!=v_psw) {
			s.innerHTML="前后输入的密码不一致";
		}
		else {
			s.style.visibility="hidden";
			this.style.borderColor="#B3B3B3";
		}
}

//提交表单前验证注册信息
function validate_final(e) {
	if(!e)
		e=window.event;

	validate_name();
	validate_phone();
	validate_email();
	validate_psw();
	validate_re();

	//阻止事件冒泡
	if(e.stopPropagation)
		e.stopPropagation();//标准模型
	else
		e.cancelBubble=true;//IE模型

	//阻止默认事件
	if(e.preventDefault)
		e.preventDefault();//标准
	else
		e.returnValue=false;//IE
}