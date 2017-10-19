window.onload=function() {
	var elt_topBar=document.getElementById("topBar");//顶栏
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

	var input_name=document.getElementById("name");//姓名输入框
	var input_phone=document.getElementById("cellphone");//手机输入框
	var input_email=document.getElementById("email");//电子邮件输入框
	var input_psw=document.getElementById("psw_up");//密码输入框
	var input_re=document.getElementById("re_psw");//确认密码输入框

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
	

	var h=getViewportSize(window).h;//获取视口高度
	elt_topBar.style.height=h+"px";//设置高度

	//注册登录按钮相应事件
	open_login.onclick=function() {
		shadow.style.display="block";//遮罩
		loginBar.style.display="block";//登录-注册框
		loginBar.style.height="450px";
		form_in.style.display="block";//显示登录框
		form_up.style.display="none";//隐藏注册框
	};

	//注册注册按钮相应事件
	open_register.onclick=function() {
		shadow.style.display="block";//遮罩
		loginBar.style.display="block";//登录-注册框
		form_in.style.display="none";//隐藏登录框
		loginBar.style.height="600px";
		form_up.style.display="block";//显示注册框
	};

	//切换成注册状态
	sign_up.onchange=function() {
		form_in.style.display="none";//隐藏登录框
		loginBar.style.height="600px";
		form_up.style.display="block";//显示注册框
	};

	//切换成登录状态
	sign_in.onchange=function() {
		form_in.style.display="block";//显示登录框
		loginBar.style.height="450px";
		form_up.style.display="none";//隐藏注册框
	};

	//关闭登录-注册框
	closeLoginBar.onclick=function() {
		loginBar.style.display="none";
		shadow.style.display="none";
	};

	//打开浮出层以及登录-注册框
	function horizonActive() {
		shadow.style.display="block";
		loginBar.style.display="block";
	}

}

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

function validate_name() {
	var s=document.getElementById("s_name");//获取提示元素
	s.style.visibility="visible";
	var v=this.value;//获取输入文本
	this.style.borderColor="#ED1C24";

	if(v==""||v==null) {
		s.innerHTML="!请输入您的姓名";
	}
	else {
		s.style.visibility="hidden";
	}
}

function validate_phone() {
		var v=this.value;
		var s=document.getElementById("s_phone");
		s.style.visibility="visible";
		s.innerHTML="";
		this.style.borderColor="#ED1C24";

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
		}
		else {
			s.innerHTML="！手机号不存在";
		}
}

function validate_email() {
		var s=document.getElementById("s_email");//获取提示元素
		var v=input_email.value;//获取输入文本

		var apos=v.indexOf("@");//@的位置
		dotpos=v.lastIndexOf(".");//.的位置

		if(v!=""&&v!=null) {
			if (apos<1||dotpos-apos<2) {
				s.style.visibility="visible";
				s.innerHTML="邮件格式不正确";
			}
			else {
				s.style.visibility="hidden";
			}
		}
}

function validate_psw() {
		var s=document.getElementById("s_psw");//获取提示元素
		s.style.visibility="visible";
		var v=this.value;//获取输入文本
		this.style.borderColor="#ED1C24";
		var reg=/^[\w\d]+$/;

		if(v==""||v==null) {
			s.innerHTML="！请输入您的密码";
		}
		else if(v.length<6) {
			s.innerHTML="!密码不能少于6个字符";
		}
		else {
			s.style.visibility="hidden";
		}
}

function validate_re() {
		var s=document.getElementById("s_re_psw");//获取提示元素
		s.style.visibility="visible";
		var v_re=this.value;//获取确认密码输入文本
		this.style.borderColor="#ED1C24";
		var v_psw=document.getElementById("psw_up").value;//获取密码输入文本
		var reg=/^[\w\d]+$/;
        
        if(v_re==""||v_re==null) {
			s.innerHTML="！请您确认密码";
        }
		else if(v_re!=v_psw) {
			s.innerHTML="前后输入的密码不一致";
		}
		else {
			s.style.visibility="hidden";
		}
}