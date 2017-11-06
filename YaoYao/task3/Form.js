init();

function init() {
	var radio_std=document.getElementsByName("identity");//单选按钮
	var div_yes=document.getElementById("yesStudent");//学校块
	var div_no=document.getElementById("noStudent");//就业单位块
	var city=document.getElementById("city");//城市
	var school=document.getElementById("school");//学校

	var university=[["北京大学","清华大学","中国科学院大学"],
					["复旦大学","上海交通大学","同济大学"],
					["浙江大学","杭州师范大学","浙江工业大学","中国美术学院"]];

	radio_std[0].onchange=function(){
		if (this.checked=true) {
			div_yes.style.display="block";
			div_no.style.display="none";
		}
	}

	radio_std[1].onchange=function() {
		if (this.checked=true) {
			div_yes.style.display="none";
			div_no.style.display="block";
		}
	}

	city.onchange=function() {
		school.innerHTML="";
		var v=city.value;//城市索引值
		var len=university[v].length;//学校数量
		for(var i=0;i<len;i++){
			var opt=document.createElement("option");
			opt.appendChild(document.createTextNode(university[v][i]));
			school.appendChild(opt);
		}
	}
}

