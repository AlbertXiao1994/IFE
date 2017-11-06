var input_name=document.getElementById("name");//名称输入框
var input_psw=document.getElementById("password");//密码名输入框
var input_con=document.getElementById("confirm");//确认密码输入框
var input_email=document.getElementById("email");//确认密码输入框
var input_phone=document.getElementById("phone");//确认密码输入框

init();


function init() {

	var submit=document.getElementById("submit");//提交输入框

	//名称获得焦点事件处理程序
	input_name.onfocus=function() {
		var p=document.getElementById("p_name");
		p.style.color="#CACACA";
		p.innerHTML="必填，长度为4~16位字符";
	}

	//名称失去焦点事件处理程序
	input_name.onblur=validate_name;

	//密码获得焦点事件处理程序
	input_psw.onfocus=function() {
		var p=document.getElementById("p_psw");
		p.style.color="#CACACA";
		p.innerHTML="密码为6~16位英文或数字";
	}

	//密码失去焦点事件处理程序
	input_psw.onblur=validate_psw;

	//确认密码获得焦点事件处理程序
	input_con.onfocus=function() {
		var p=document.getElementById("p_confirm");
		p.style.color="#CACACA";
		p.innerHTML="再次输入相同的密码";
	}

	//确认密码失去焦点事件处理程序
	input_con.onblur=validate_con;

	//邮件获得焦点事件处理程序
	input_email.onfocus=function() {
		var p=document.getElementById("p_email");
		p.style.color="#CACACA";
		p.innerHTML="请输入正确的邮件格式，如username@126.com";
	}

	//邮件失去焦点事件处理程序
	input_email.onblur=validate_email;

	//手机获得焦点事件处理程序
	input_phone.onfocus=function() {
		var p=document.getElementById("p_phone");
		p.style.color="#CACACA";
		p.innerHTML="请输入正确的手机号，为11位数字";
	}

	//手机失去焦点事件处理程序
	input_phone.onblur=validate_phone;

	//全局检查
	submit.onclick=function() {
		//全局验证
		validate_name();
		validate_psw();
		validate_con();
		validate_email();
		validate_phone();

		var ps=document.getElementsByTagName("p");
		for(var i=0;i<ps.length;i++) {
			if(ps[i].style.color!="#63E96E") {
				alert("提交失败");
				return;
			}
		}
		alert("提交成功")
	}
}

function validate_name() {
	var p=document.getElementById("p_name");//获取提示元素
		var v=input_name.value;//获取输入文本

		if(v==""||v==null) {
			p.style.color="#F16565";
			p.innerHTML="名称不能为空";
		}
		else if(v.length<4||v.length>16) {
			p.style.color="#F16565";
			p.innerHTML="名称长度不符合，请填入4~16位字符";
		}
		else {
			p.style.color="#63E96E";
			p.innerHTML="名称格式正确";
		}
}

function validate_psw() {
		var p=document.getElementById("p_psw");//获取提示元素
		var v=input_psw.value;//获取输入文本
		var reg=/^[\w\d]+$/;

		if(v==""||v==null) {
			p.style.color="#F16565";
			p.innerHTML="密码不能为空";
		}
		else if(v.length<6||v.length>16) {
			p.style.color="#F16565";
			p.innerHTML="密码长度不符合，请填入6~16位英文或数字";
		}
		else if(!reg.test(v)) {
			p.style.color="#F16565";
			p.innerHTML="输入的密码中含有非法字符";
		}
		else {
			p.style.color="#63E96E";
			p.innerHTML="密码格式正确";
		}
}

function validate_con() {
		var p=document.getElementById("p_confirm");//获取提示元素
		var v_con=input_con.value;//获取确认密码输入文本
		var v_psw=input_psw.value;//获取密码输入文本
		var reg=/^[\w\d]+$/;
        
        if(v_con==""||v_con==null) {
        	p.style.color="#CACACA";
			p.innerHTML="";
        }
		else if(v_con!=v_psw) {
			p.style.color="#F16565";
			p.innerHTML="前后输入的密码不一致";
		}
		else {
			p.style.color="#63E96E";
			p.innerHTML="密码输入一致";
		}
}

function validate_email() {
		var p=document.getElementById("p_email");//获取提示元素
		var v=input_email.value;//获取输入文本

		var apos=v.indexOf("@");//@的位置
		dotpos=v.lastIndexOf(".");//.的位置

		if(v==""||v==null) {
			p.style.color="#F16565";
			p.innerHTML="邮件不能为空";
		}
		else if (apos<1||dotpos-apos<2) {
			p.style.color="#F16565";
			p.innerHTML="邮件格式不正确";
		}
		else {
			p.style.color="#63E96E";
			p.innerHTML="邮件格式正确";
		}
}

function validate_phone() {
		var p=document.getElementById("p_phone");//获取提示元素
		var v=input_phone.value;//获取输入文本
		var reg=/^[\d]+$/;

		if(v==""||v==null) {
			p.style.color="#F16565";
			p.innerHTML="手机号不能为空";
		}
		else if(v.length!=11) {
			p.style.color="#F16565";
			p.innerHTML="手机号为11位数字";
		}
		else if(!reg.test(v)) {
			p.style.color="#F16565";
			p.innerHTML="输入的手机号中含有非法字符";
		}
		else {
			p.style.color="#63E96E";
			p.innerHTML="密码格式正确";
		}
	}
