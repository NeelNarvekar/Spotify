function Main() {
    var URLS = document.getElementById("SpotifyURLS").value;
    var URLList = URLS.split(" ");
    for (i = 0; i < URLList.length; i++) {
        URLList[i] = URLList[i].substring(14, URLList[i].length);
    }
    var screenWidth = screen.width/4;
    var k = 1;
    var html = "<table><tr><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Artists</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Songs</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Sample Music</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Album Art</font></u></b></td></tr></table><br><br>";
    generateTrackList(URLList, [], html, k);
    document.getElementById("testing").innerHTML = html;
}

function generateTrackList(songs,trackList, html, k) {
    songtxt = '';
    token = String(window.location).substring(53,196);
    if (songs.length > 50) {
        for (i = 0; i < 50; i++) {
            songtxt += songs[i] + ',';
        }
        songtxt = songtxt.substring(0,songtxt.length - 1);
        url = urlBuild(songtxt);
        jasonText = urlLoad(url, token);
        trackList += printJason(jasonText, html);
        return generateTrackList(songs.slice(50,songs.length+1), trackList);
    } else {
        for (i = 0; i < songs.length; i++) {
            songtxt += songs[i] + ',';
        }
        songtxt = songtxt.substring(0,songtxt.length - 1);
        url = urlBuild(songtxt);
        jasonText = urlLoad(url, token);
        trackList += printJason(jasonText, html);
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

function printJason(jasonText, html, k){
    var totalTrackElements = [];
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
        //alert(typeof artistName) 
        elements.push(trackName);
        //alert(typeof trackName);
        elements.push(imageURL);
        //alert(typeof imageURL);
        elements.push(previewURL);
        //alert(typeof previewURL);
        //alert(typeof elements);
        
        totalTrackElements.push(elements);
        //alert(typeof totalTrackElements);
    }
    //alert(typeof track_list);
    // track_list = track_list.split(",");
    var screenWidth = screen.width/4;
    for (i = 0; i < totalTrackElements.length; i++) {
            html += "<table><tr><td width=\""+screenWidth+"\">" + k + ". " + totalTrackElements[i][0] + "</td><td width=\""+screenWidth+"\">" + totalTrackElements[i][1] + "</td><td width=\""+screenWidth+"\">" + "<audio controls><source src=\"" + totalTrackElements[i][3] + "\"/></audio></td><td width=\""+screenWidth+"\">" + "<img src=\"" + totalTrackElements[i][2] + "\"style=\"width:150px;height:150px;\"></td></tr></table><br><br>";
            k = k + 1;
    }
    return k;
    return html;
}



    
