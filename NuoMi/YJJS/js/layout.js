window.onload=function() {
	var elt_topBar=document.getElementById("topBar");//顶栏
	var elt_drt=document.getElementById("direction");//使用说明页
	var elt_palace=document.getElementById("palace");//宫殿展示页
	var elt_co=document.getElementById("cooperateion");//合作页

	//设置首页背景图高度等于视口高度
	var h=getViewportSize(window).h;//获取视口高度
	elt_topBar.style.height=h+"px";//设置高度
	elt_drt.style.height=h+"px";//设置高度
	elt_palace.style.height=h+"px";//设置高度
	elt_co.style.height=h+"px";//设置高度
};