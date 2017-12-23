function Main() {
    var URLS = document.getElementById("SpotifyURLS").value;
    var URLList = URLS.split(" ");
    for (i = 0; i < URLList.length; i++) {
        URLList[i] = URLList[i].substring(14, URLList[i].length);
    }
    var track_list = generateTrackList(URLList, []);
    track_list = track_list.split(",");
    var screenWidth = screen.width/4;
    var html = "<table><tr><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Artists</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Songs</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Sample Music</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Art</font></u></b></td></tr></table><br>";
    var k = 1;
    for (i = 3; i < track_list.length; i = i + 4) {
            html += "<table><tr><td width=\""+screenWidth+"\">" + k + ". " + track_list[i-3] + "</td><td width=\""+screenWidth+"\">" + track_list[i-2] + "</td><td width=\""+screenWidth+"\">" + track_list[i-1] + "</td><td width=\""+screenWidth+"\">" + track_list[i] + "</td></tr></table><br>";
            k = k + 1;
    }
    document.getElementById("testing").innerHTML = html;
}

function generateTrackList(songs,trackList) {
    songtxt = '';
    token = String(window.location).substring(53,196);
    if (songs.length > 50) {
        for (i = 0; i < 50; i++) {
            songtxt += songs[i] + ',';
        }
        songtxt = songtxt.substring(0,songtxt.length - 1);
        url = urlBuild(songtxt);
        jasonText = urlLoad(url, token);
        trackList += printJason(jasonText);
        return generateTrackList(songs.slice(50,songs.length+1), trackList);
    } else {
        for (i = 0; i < songs.length; i++) {
            songtxt += songs[i] + ',';
        }
        songtxt = songtxt.substring(0,songtxt.length - 1);
        url = urlBuild(songtxt);
        jasonText = urlLoad(url, token);
        trackList += printJason(jasonText);
        return trackList;
    }
}

function urlBuild(songtxt) {
    url = 'https://api.spotify.com/v1/tracks?ids=' + songtxt;
    return url;
}

function urlAuthBuild() {
    baseURL = "https://accounts.spotify.com/authorize?";
    clientID = "client_id=d82d1ee7fe604b56ac800a4e9f8477e0&";
    responseType = "response_type=token&";
    redirectURI = "redirect_uri=https://neelnarvekar.github.io/Spotify/";
    authURL = baseURL+clientID+responseType+redirectURI;
    window.location = authURL;
}

function urlLoad(url, token){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function printJason(jasonText){
    totalTrackElements = [];
    var totalJason = JSON.parse(jasonText);
    var totalTracks = totalJason.tracks;
    for (i = 0; i < totalTracks.length; i++){
        elements = [];
        var thisTrack = totalTracks[i];
        var thisAlbum = thisTrack.album;
        var thisAlbumCover = thisAlbum.images;
        var imageSize = thisAlbumCover[1];
        var imageURL = imageSize.url
        var artist = thisTrack.artists[0];
        var artistName = artist.name;
        var trackName = thisTrack.name;
        var previewURL = thisTrack.preview_url;
        // alert(artistName);
        // alert(trackName);
        // alert(imageURL);
        // alert(previewURL);
        if (artistName == null) {
            artistName = "N/a";
        }
        if (trackName == null) {
            trackName = "N/a";
        }
        if (imageURL == null) {
            imageURL = "N/a";
        }
        if (previewURL == null) {
            previewURL = "N/a";
        }
        elements.push(artistName); 
        elements.push(trackName);
        elements.push(imageURL);
        elements.push(previewURL);
        
        totalTrackElements.push(elements);
    }


//     var x = new Array(10);
// for (var i = 0; i < 10; i++) {
//   x[i] = new Array(20);
// }
// x[5][12] = 3.0;
// <<<<<<< HEAD
//     //trackList = String(trackList);
//     // trackList = trackList.join('<br>');
// =======
//     // trackList = trackList.join('<br>');
// >>>>>>> e26d6b0f0773d34db7d67a0c12e383e0e034aaa7
    console.log(totalTrackElements)
    return totalTrackElements;
}

    
