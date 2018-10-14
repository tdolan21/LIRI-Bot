require("dotenv").config();
//requires all packages needed
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//storing the CLI arguments
var firstArg = process.argv[2];
var secondArg = process.argv[3];

var arguments = "";
console.log(spotify)
//attaches multiple word arguments
for (var i = 3; i < firstArg.length; i++) {
  if (i > 3 && i < firstArg.length) {
    arguments = arguments + "+" + firstArg[i];
  } else {
    arguments = arguments + firstArg[i];
  }
}
//switch cases
switch (command) {
  case "spotify-this-song":
    if (arguments) {
      spotifySong(arguments);
    } else {
      spotifySong("Dani California");
    }
    break;

  case "movie-this":
    if (arguments) {
      omdbData(arguments);
    } else {
      omdbData("March of the Penguins");
    }
    break;

    case "do-what-it-says":
    doThing();
    break;

    default:
      console.log("{Please enter a command:  spotify-this-song, movie-this, do-what-it-says}");
    break;
}

//functions for each API
function spotifySong(song) {
  spotify.search({ type: "track", query: "song" }, function(error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.item.length; i++) {
        var songData = data.tracks.items[i];
        //showing artist
        console.log("Artist: " + songData.artists[0].name);
        //searched song
        console.log("song: " + songData.name);
        //spotify link
        console.log("preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("\n---------------\n");
      }
    } else {
      console.log("error occured");
    }
  });
}
function omdbData(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
  
    request(omdbURL, function (error, response, body){
      if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
  
        //adds text to log.txt
        fs.appendFile('log.txt', "Title: " + body.Title);
        fs.appendFile('log.txt', "Release Year: " + body.Year);
        fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
        fs.appendFile('log.txt', "Country: " + body.Country);
        fs.appendFile('log.txt', "Language: " + body.Language);
        fs.appendFile('log.txt', "Plot: " + body.Plot);
        fs.appendFile('log.txt', "Actors: " + body.Actors);
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
  
      } else{
        console.log('Error occurred.')
      }
      if(movie === "March of the Penguins"){
        console.log("-----------------------");
        console.log("If you haven't watched 'March of the Penguins,' then you should: https://www.imdb.com/title/tt0428803/");
        
  
      }
    });
  
  }
