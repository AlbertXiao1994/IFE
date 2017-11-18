$.getJSON("../data/music.json",function(data) {
		var songs=data.songs;
		var url=songs["0"].url;
		alert(url)
});