init();

function init() {
	var btn_add=document.getElementById("btn_add");//地址验证按钮
	var btn_ch=document.getElementById("btn_ch");//中文名验证按钮
	var btn_en=document.getElementById("btn_en");//英文名验证按钮

	var input_add=document.getElementById("address");//地址输入框
	var input_ch=document.getElementById("chName");//中文名输入框
	var input_en=document.getElementById("enName");//英文名输入框

	//地址验证事件处理程序
	btn_add.onclick=function() {
		var v=input_add.value;
		var p=document.getElementById("p_address");

		if(v==""||v==null||v.length<4||v.length>16) {
			p.innerHTML="必填，长度为4~16位字符";
		}
		else {
			p.innerHTML="地址格式正确";
		}
	}

	//中文名验证事件处理程序
	btn_ch.onclick=function() {
		var v=input_ch.value;
		var p=document.getElementById("p_chName");

		var reg=/^[\u4e00-\u9fa5]+$/;//连续多个中文

		if(v==""||v==null) {
			p.innerHTML="中文名不能为空";
		}
		else if(!reg.test(v)) {
			p.innerHTML="中文名中不能含有非中文";
		}
		else {
			p.innerHTML="中文名格式正确";
		}

	}

	//英文名验证事件处理程序
	btn_en.onclick=function() {
		var v=input_en.value;
		var p=document.getElementById("p_enName");

		var reg=/^[\w\d]+$/;;//英文或数字

		if(v==""||v==null) {
			p.innerHTML="英文名不能为空";
		}
		else if(!reg.test(v)) {
			p.innerHTML="英文名中只能含有英文字母或数字";
		}
		else {
			p.innerHTML="英文名格式正确";
		}
	}
}