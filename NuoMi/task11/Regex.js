init();

function init() {
	//获取元素
	var input_cell=document.getElementById("cellphone");
	var input_string=document.getElementById("string");

	//注册事件处理程序
	if(document.addEventListener) { //标准
		input_cell.addEventListener("blur",validate_cell,false);
		input_string.addEventListener("blur",validate_string,false);
	}
	else if(document.attachEvent) { //IE
		input_cell.attachEvent("onblur",validate_cell);
		input_string.attachEvent("onblur",validate_string);
	}

	//手机号输入检测
	function validate_cell() {
		var v=input_cell.value;
		var s=document.getElementById("tip_cell");
		s.innerHTML="";

		var reg_digital=/^[\d]+$/;
		var reg_length=/\d{11}/;
		var reg_correct=/^1((3[0-9])|(4[579])|(5[0-35-9])|(66)|(7[3578])|(8\d)|(9[89]))\d{8}/;

		if(v==""||v==null) {
			s.style.color="#F16565";
			s.innerHTML="手机号不能为空";
		}
		else if(!reg_digital.test(v)) {
			s.style.color="#F16565";
			s.innerHTML="输入的手机号中含有非法字符";
		}
		else if(!reg_length.test(v)) {
			s.style.color="#F16565";
			s.innerHTML="手机号为11位数字";
		}
		else if(reg_correct.test(v)){
			s.style.color="#63E96E";
			s.innerHTML="手机号格式正确";
		}
		else {
			s.style.color="#F16565";
			s.innerHTML="手机号不存在";
		}
	}

	//重复字符串输入检测
	function validate_string() {
		var v=input_string.value;
		var s=document.getElementById("tip_string");

		var reg_word=/([a-zA-Z]+)\b\s*/;
		var reg_repeat=/([a-zA-Z]+)\b\s*\1/;

		s.innerHTML="";//清空

		if(v==""||v==null) {
			s.style.color="#F16565";
			s.innerHTML="字符为空";
		}
		else if(!reg_word.test(v)) {
			s.style.color="#F16565";
			s.innerHTML="输入的字符串中含有非法字符";
		}
		else if(reg_repeat.test(v)){
			s.style.color="#63E96E";
			s.innerHTML="含有重复相邻单词";
		}
		else {
			s.style.color="#F16565";
			s.innerHTML="不含有重复相邻单词";
		}
	}
}