function Main() {
    var URLS = document.getElementById("SpotifyURLS").value;
    var URLList = URLS.split(" ");
    for (i = 0; i < URLList.length; i++) {
        URLList[i] = URLList[i].substring(14, URLList[i].length);
    }
    track_list = generateTrackList(URLList, []);
}


function generateTrackList(songs,trackList) {
    songtxt = '';
    if (songs.length > 50) {
        for (i = 0; i < 50; i++) {
            songtxt += songs[i] + ',';
        }
        songtxt = songtxt.substring(0,songtxt.length - 1);
        url = urlBuild(songtxt);
        jasonText = urlLoad(url);
        //trackList += printJason(jasonText);
        //return generateTrackList(songs.substring(51,songs.length), trackList);
    } else {
        for (i = 0; i < songs.length; i++) {
            songtxt += songs[i] + ',';
        }
        songtxt = songtxt.substring(0,songtxt.length - 1);
        url = urlBuild(songtxt);
        jasonText = urlLoad(url);
        //trackList += printJason(jasonText);
        //return trackList;
    }
}


function urlBuild(songtxt) {
    url = 'https://api.spotify.com/v1/tracks?ids=' + songtxt;
    return url;
}

function urlLoad(url) {
    var xmlhttp = new XMLHttpRequest();
    var tokenURL = "https://accounts.spotify.com/api/token"
    xmlhttp.open("POST", tokenURL, true);

    var client_id = 'd82d1ee7fe604b56ac800a4e9f8477e0';
    var client_secret = '79689b652261464f8c718b4613369ab2';
    alert(client_secret);
    var auth_req64 = window.btoa(client_id + ":"+ client_secret);
    xmlhttp.setRequestHeader("Authorization", "Basic ZDgyZDFlZTdmZTYwNGI1NmFjODAwYTRlOWY4NDc3ZTA6Nzk2ODliNjUyMjYxNDY0ZjhjNzE4YjQ2MTMzNjlhYjI=");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("grant_type=client_credentials");
}
//     var data = xmlhttp.responseText;
//     token  = JSON.parse(data).access_token;
//     alert(token);
// }




//     auth_req64 = base64.b64encode((client_id + ':' + client_secret).encode('UTF-8'))
//     auth_req_url = 'https://accounts.spotify.com/api/token'
//     data_encoded = urllib.parse.urlencode({'grant_type':'client_credentials'}).encode('UTF-8')
//     token_header = {'Authorization':'Basic '+auth_req64.decode()}

//     //request_response = urllib.request.Request(auth_req_url, data_encoded, token_header)
//     response = urllib.request.urlopen(request_response)
//     access_token = json.load(response)['access_token']
//     song_header = {'Authorization':'Bearer '+ access_token}

//     request_response = urllib.request.Request(url, None, song_header)
//     response = urllib.request.urlopen(request_response)
//     jason_text = json.load(response)
//     return jason_text
// }

//

// function main() {
//     //try:

//     //except FileNotFoundError:
//         //print('please have a valid songs.txt file')
// }

// function createSongList() {
//         //try:
//         //file = None
//         // CHANGE TO INPUT GIVEN BY USER file = open('songs.txt', 'r')

// function updateOutputFile() {

// }

// function createOutputFile() {

// }

// import api_interact

// def create_song_list():


// def update_output_file(track_list, output_file):
//     for track in track_list:
//         try:
//             if track == ', ':
//                 pass
//             else:
//                 output_file.write(track)
//                 output_file.write('\n')
//         except UnicodeEncodeError:
//             pass

// def create_output_file():
//     try:
//         output_file = open('output.txt', 'r')
//         output_file = open('output.txt', 'w')
//         print('output.txt found')
//         return output_file
//     except FileNotFoundError:
//         print('output.txt not found')
//         print('creating output.txt...')
//         output_file = open('output.txt', 'w')
//         return output_file
