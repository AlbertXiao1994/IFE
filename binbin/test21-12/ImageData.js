var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var img=document.getElementById("tulip");
ctx.drawImage(img,10,10);

smear(ctx,5,0,0,300,250);

function smear(c,n,x,y,w,h) {
	//获取表示矩形区域内像素的ImageData对象实现涂抹
	var pixels=c.getImageData(x,y,w,h);

	//如果需要输出缓冲区，通过以下方式创建一个新的同样尺寸的ImageData对象
	var output_pixels=c.createImageData(pixels);

	//获取CSS像素，每个CSS像素可能对应多个设备像素
	var width=pixels.width,height=pixels.height;

	//每个像素按照R、G、B、A的顺序占据四个字节
	var data=pixels.data;
	//每行第一个元素之后的像素都替换成其色素值的1/n+原色素值的m/n
	var m=n-1;
	for(var row=0;row<height;row++) {
		var i=row*width*4+4;
		for(var col=1;col<width;col++,i+=4) {
			data[i]=(data[i]+data[i-4]*m)/n;		//红色
			data[i+1]=(data[i+1]+data[i-3]*m)/n;	//绿色
			data[i+2]=(data[i+2]+data[i-2]*m)/n;	//蓝色
			data[i+3]=(data[i+3]+data[i-1]*m)/n;	///透明
		}
	}

	//现在将涂抹过的图片数据复制会画布相同位置
	c.putImageData(pixels,x,y);
}