function Main() {
    var URLS = document.getElementById("SpotifyURLS").value;
    var URLList = URLS.split(" ");
    for (i = 0; i < URLList.length; i++) {
        URLList[i] = URLList[i].substring(14, URLList[i].length);
    }
    var track_list = generateTrackList(URLList, []);
    track_list = track_list.split(",");
    var screenWidth = screen.width/4;
    var html = "<table><tr><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Artists</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Songs</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Sample Music</font></u></b></td><td width=\""+screenWidth+"\"><b><u><font size=\"5\">Art</font></u></b></td></tr></table><br><br>";
    for (i = 1; i < track_list.length; i = i + 2) {
            html += "<table><tr><td width=\""+screenWidth+"\">" + track_list[i-1] + "</td><td width=\""+screenWidth+"\">" + track_list[i] + "</td><td width=\""+screenWidth+"\">" + track_list[i-1] + "</td><td width=\""+screenWidth+"\">" + track_list[i] + "</td></tr></table><br><br>";
    }
    document.getElementById("testing").innerHTML = html;
}

function generateTrackList(songs,trackList) {
    songtxt = '';
    token = generateToken();
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

function generateToken() {
    var xmlhttp = new XMLHttpRequest();
    var tokenURL = "https://accounts.spotify.com/api/token"
    xmlhttp.open("POST", tokenURL, false);

    var client_id = 'd82d1ee7fe604b56ac800a4e9f8477e0';
    var client_secret = '79689b652261464f8c718b4613369ab2';
    var auth_req64 = window.btoa(client_id + ":"+ client_secret);
    xmlhttp.setRequestHeader("Authorization", "Basic " + auth_req64);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("grant_type=client_credentials");
    var data = xmlhttp.responseText;
    var token = JSON.parse(data).access_token;
    return token;
}


function urlLoad(url, token){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function printJason(jasonText){
    trackList = [];
    var totalJason = JSON.parse(jasonText)
    var totalTracks = totalJason.tracks
    for (i = 0; i < totalTracks.length; i++){
        var thisTrack = totalTracks[i]
        var artist = thisTrack.artists[0];
        var artistName = artist.name;
        var trackName = thisTrack.name;
        trackList.push(artistName); 
        trackList.push(trackName);
    }
    //trackList = String(trackList);
    // trackList = trackList.join('<br>');
    return trackList;
}

    
