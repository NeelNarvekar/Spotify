function Main() {
    var URLS = document.getElementById("SpotifyURLS").value;
    var URLList = URLS.split(" ");
    for (i = 0; i < URLList.length; i++) {
        URLList[i] = URLList[i].substring(14, URLList[i].length);
    }
    track_list = generateTrackList(URLList, []);
    document.getElementById("Songs").innerHTML = "<br> Here are your songs: <br> <br>" + track_list;
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
    //xmlhttp.setRequestHeader("Accept", "application/json");
    //xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
    xmlhttp.send();
    alert(xmlhttp.responseText);
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
        trackList.push(artistName + ' - ' + trackName);
    }
    trackList = trackList.join('<br>');
    return trackList;
}

    
