window.onload=function() {
	var btn_active=document.getElementById("active");//打开浮出层按钮
	var btn_yes=document.getElementById("yes");//浮出层确定按钮
	var btn_no=document.getElementById("no");//浮出层取消按钮
	var shadow=document.getElementById("shadow");//遮罩层
	var win=document.getElementById("win");//弹窗

	btn_active.onclick=horizonActive;
	btn_yes.onclick=horizonClose;
	btn_no.onclick=horizonClose;
	shadow.onclick=horizonClose;

	//打开浮出层
	function horizonActive() {
		shadow.style.display="block";
		win.style.display="block";
	}

	//关闭浮出层
	function horizonClose() {
		shadow.style.display="none";
		win.style.display="none";
	}
}

