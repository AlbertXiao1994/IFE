var songs=[];//歌曲列表信息
//当前歌曲
var currentSong={
	"index": "0",
	"name": "人海",
    "musician": "燕池",
    "album": "燕歌行",
    "img": "images/1.jpg",
    "url": "music/0.mp3"
};
//播放/暂停标志
var playFlag=false;//ture:播放，false:暂停

//静音标志
var volumeFlag=false;//true:有声，false:静音
var cutSongMode=0;//0:顺序播放，1:随机播放

//初始化
$(function() {
	$.ajaxSetup({async:true});//设置为异步
	//获取歌曲信息
	$.getJSON("./data/music.json",function(data) {
		songs=data;
	});

	//显示歌曲信息
	displayInfo();

	//点击歌曲列表
	$("tr").click(selectSong);
	//播放按钮
	$("#play").click(playControl);
	//下一首
	$("#next").click(stepForward);
	//上一首
	$("#prev").click(stepBackward);
	//声音按钮
	$("#volume").click(volumeControl);
	//切歌模式按钮
	$("#mode").click(modeControl);
})

//显示歌曲信息
function displayInfo() {
	//封面部分
	$("#musicImg").attr("src",currentSong.img);//图片
	$("#musicName").text(currentSong.name);//歌名
	$("#musician").text(currentSong.musician);//歌手
	$("#album").text(currentSong.album);//专辑

	//进度条部分
	$(".progress-name").text(currentSong.name);//歌名

	//audio
	$("#audio").attr("src",currentSong.url);
	getTime();//获取时间

	var tbody=$("tbody");
	var tr=tbody[0].children[currentSong.index];
	//删除所有有tr-hover类的tr
	$("tr").removeClass("tr-hover");
	//添加当前行悬浮效果
	$(tr).addClass("tr-hover");

	//更换背景
	$("html").css("background-image",'url("./'+currentSong.img+'")');
}

//更新歌曲信息
function updateInfo(index) {
	currentSong.index=index;
	currentSong.name=songs[index].name;
	currentSong.musician=songs[index].musician;
	currentSong.album=songs[index].album;
	currentSong.img=songs[index].img;
	currentSong.url=songs[index].url;
}

//选择播放的歌曲
function selectSong() {
	var p=event.target.parentNode;//获取当前行
	var index=p.rowIndex;//行标
	updateInfo(index);//更新歌曲信息
	displayInfo();//播放歌曲
	playFlag=false;
	playControl();//播放
	volumeFlag=false;
	volumeControl();//有声
}

//获取音乐时间信息
function getTime() {
	setInterval(function() {
		var $a=$("#audio")[0];
		if(isNaN($a.duration)) {
			getTime();
		}
		else {
			var currentTime=standardTime($a.currentTime);//当前时间
			var duration=standardTime($a.duration);//总时间
			$("#curentTime").text( currentTime );//当前时间
			$("#totalTime").text( duration );//总时间

			//更新进度条
			var percent;//百分比
			if (!isFinite($a.duration))
				var percent=Math.floor($a.currentTime/261*100)+"%";
			else
				percent=Math.floor($a.currentTime/$a.duration*100)+"%";
			$(".progress-bar").css("width",percent);

			//播放下一首
			if($a.currentTime==$a.duration)
			{
				if(cutSongMode==0)
				{
					var index=currentSong.index;//当前索引
					//更新数据
					index=parseInt(index)+1;
					if(index<songs.length) {
					updateInfo(index);
					//显示
					displayInfo();
				}
				}
				else {	//随机播放
					var index=Math.floor(Math.random()*15);
					updateInfo(index);//更新歌曲信息
					displayInfo();//播放歌曲
				}
			}

		}
	},300);
}

//控制播放暂停
function playControl() {
	if(playFlag) {//当前为播放
		$("#audio")[0].pause();
		$("#play").removeClass("glyphicon-play");
		$("#play").removeClass("glyphicon-pause");
		$("#play").addClass("glyphicon-play");
		playFlag=false;
	}
	else { //当前为暂停
		$("#audio")[0].play();
		$("#play").removeClass("glyphicon-play");
		$("#play").removeClass("glyphicon-pause");
		$("#play").addClass("glyphicon-pause");
		playFlag=true;
	}
}

//声音控制
function volumeControl() {
	if(volumeFlag) {//当前有声
		$("#audio")[0].volume=0.0;
		$("#volume").removeClass("glyphicon-volume-up");
		$("#volume").removeClass("glyphicon-volume-off");
		$("#volume").addClass("glyphicon-volume-off");
		volumeFlag=false;
	}
	else { //当前为静音
		$("#audio")[0].volume=1.0;
		$("#volume").removeClass("glyphicon-volume-up");
		$("#volume").removeClass("glyphicon-volume-off");
		$("#volume").addClass("glyphicon-volume-up");
		volumeFlag=true;
	}
}

//切歌模式
function modeControl() {
	if(cutSongMode==1) { //随机到顺序
		$("#mode").removeClass("glyphicon-random");
		$("#mode").removeClass("glyphicon-retweet");
		$("#mode").addClass("glyphicon-retweet");
		cutSongMode=0;
	}
	else { //顺序到随机
		$("#mode").removeClass("glyphicon-random");
		$("#mode").removeClass("glyphicon-retweet");
		$("#mode").addClass("glyphicon-random");
		cutSongMode=1;
	}
}

//下一首
function stepForward() {
	if(cutSongMode==0)
	{
		var index=currentSong.index;//当前索引
		//更新数据
		index=parseInt(index)+1;
		if(index<songs.length) {
			updateInfo(index);
			//显示
			displayInfo();
		}
	}
	else {	//随机播放
		var index=Math.floor(Math.random()*15);
		updateInfo(index);//更新歌曲信息
		displayInfo();//播放歌曲
	}
}

//上一首
function stepBackward() {
	if(cutSongMode==0)
	{
		var index=currentSong.index;//当前索引
		//更新数据
		index=parseInt(index)-1;
		if(index>=0) {
			updateInfo(index);
			//显示
			displayInfo();
		}
	}
	else {	//随机播放
		var index=Math.floor(Math.random()*15);
		updateInfo(index);//更新歌曲信息
		displayInfo();//播放歌曲
	}
}

//标准化时间
function standardTime(t) {
	if(!isFinite(t))
	{
		return "4:21";
	}
	else {
		t=Math.floor(t);
		var min=Math.floor(t/60);
		var sec=t%60;
		var time;
		if(sec<10)
			time=min+":0"+sec;
		else
			time=min+":"+sec;
		return time;
	}
}		

