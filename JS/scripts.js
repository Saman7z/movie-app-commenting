$(document).ready(function () {
  // The base url for all API calls
  //! she could add it to config.js file as well
  var apiBaseURL = "http://api.themoviedb.org/3/";
  // Base URL of image
  var imageBaseUrl = "https://image.tmdb.org/t/p/";

  // you have to add your own apiKey from https://www.themoviedb.org/
  //! const apiKey = "YOUR_API"
  
  const nowPlayingURL = apiBaseURL + "movie/now_playing?api_key=" + apiKey;

  //! every var variable should be exchanged with at least let or in some cases with const
  //! she should have created a external function called showData and call it when needed (DRY)
  //! there should be a back up plan for the case of NO INTERNET connetion

  // Main Rendering Function

  function getNowPlayingData() {
    $.getJSON(nowPlayingURL, function (nowPlayingData) {
      //! destructuring {results} out of nowPlayingData would make it easier to read and more efficient
      //! using map() instead of for loop would have made everything easier, easier to read and no extra variables was needed
      for (let i = 0; i < nowPlayingData.results.length; i++) {
        // mid = movie ID
        //! mid is poor variable naming choice
        var mid = nowPlayingData.results[i].id;
        // creates movie url for every single item in array
        var thisMovieUrl =
          apiBaseURL + "movie/" + mid + "/videos?api_key=" + apiKey;

        $.getJSON(thisMovieUrl, function (movieKey) {
          // image sizing is available from w200 to w500 which pertains to image sizes
          //! in typescript we could have something like:
          //! enum imageSizes {
          //!   extraSmall:"w200",
          //!   small:"w300",
          //!   large:"w400",
          //!   extraLarge:"w500"
          //! }
          var poster =
            imageBaseUrl + "w300" + nowPlayingData.results[i].poster_path;
          var title = nowPlayingData.results[i].original_title;
          var releaseDate = nowPlayingData.results[i].release_date;
          var overview = nowPlayingData.results[i].overview;
          var voteAverage = nowPlayingData.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;

          // Creats nowPlayingHTML variable and appends all the data to it
          //! using <br /> is usually a bad practice
          //! any of these variables could be null or undefiend so we have to check it first
          var nowPlayingHTML = "";
          nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
          nowPlayingHTML +=
            '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' +
            i +
            '" data-whatever="@' +
            i +
            '">' +
            '<img src="' +
            poster +
            '"></button>';
          nowPlayingHTML +=
            '<div class="modal fade" id="exampleModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          nowPlayingHTML += '<div class="modal-dialog" role="document">';
          nowPlayingHTML += '<div class="modal-content col-sm-12">';
          nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
          //! Images do not have expicit height and width attribute
          //! Image quality could have been managed better
          //! Images do not have alt attribute
          nowPlayingHTML +=
            '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          nowPlayingHTML += "</div><br>";
          nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
          nowPlayingHTML += '<div class="movieName">' + title + "</div><br>";
          nowPlayingHTML +=
            '<div class="linkToTrailer"><a href="' +
            youtubeLink +
            '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' +
            "</div><br>";
          nowPlayingHTML +=
            '<div class="release">Release Date: ' + releaseDate + "</div><br>";
          nowPlayingHTML += '<div class="overview">' + overview + "</div><br>";
          nowPlayingHTML +=
            '<div class="rating">Rating: ' + voteAverage + "/10</div><br>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">8:30 AM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">10:00 AM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">12:30 PM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">3:00 PM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">4:10 PM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">5:30 PM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">8:00 PM' + "</div>";
          nowPlayingHTML +=
            '<div class="col-sm-3 btn btn-primary">10:30 PM' + "</div>";
          nowPlayingHTML += "</div>"; //close movieDetails
          nowPlayingHTML += "</div>"; //close modal-content
          nowPlayingHTML += "</div>"; //close modal-dialog
          nowPlayingHTML += "</div>"; //close modal
          nowPlayingHTML += "</div>"; //close off each div

          // appending newly created element to dom
          $("#movie-grid").append(nowPlayingHTML);

          // sets Now Playing to every #movieGenreLabel
          $("#movieGenreLabel").html("Now Playing");
        });
      }
    });
  }
  //==============================================================================
  //====================== Get movies by genre ===================================
  //==============================================================================

  //! BAD practice
  //! we could have something like a enum in ts or in js : and refer to it with genreTyep.action
  //! const genreType = {
  //!   action : 28,
  //!      .
  //!      .
  //!      .
  //! }
  //28 = action
  //12 = adventure
  //16 = animation
  //35 = comedy
  //80 = crime
  //18 = drama
  //10751 = family
  //14 = fantasy
  //36 = history
  //27 = horror
  //10402 = music
  //10749 = romance
  //878 = science fiction
  //53 = thriller

  // renders list of movies for selected genre
  function getMoviesByGenre(genre_id) {
    // creating genre Url
    const getMoviesByGenreURL =
      apiBaseURL +
      "genre/" +
      genre_id +
      "/movies?api_key=" +
      apiKey +
      "&language=en-US&include_adult=false&sort_by=created_at.asc";

    $.getJSON(getMoviesByGenreURL, function (genreData) {
      //! Repeated "code" inefficient and hard to read (!DRY method)
      for (let i = 0; i < genreData.results.length; i++) {
        var mid = genreData.results[i].id;
        // creates detail movie url
        var thisMovieUrl =
          apiBaseURL + "movie/" + mid + "/videos?api_key=" + apiKey;

        $.getJSON(thisMovieUrl, function (movieKey) {
          //! again mentioning w300 without any clear defenition is bad practice
          var poster = imageBaseUrl + "w300" + genreData.results[i].poster_path;
          var title = genreData.results[i].original_title;
          var releaseDate = genreData.results[i].release_date;
          var overview = genreData.results[i].overview;
          var voteAverage = genreData.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;
          var genreHTML = "";
          genreHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
          genreHTML +=
            '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' +
            i +
            '" data-whatever="@' +
            i +
            '">' +
            '<img src="' +
            poster +
            '"></button>';
          genreHTML +=
            '<div class="modal fade" id="exampleModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          genreHTML += '<div class="modal-dialog" role="document">';
          genreHTML += '<div class="modal-content col-sm-12 col-lg-12">';
          genreHTML += '<div class="col-sm-6 moviePosterInModal">';
          genreHTML +=
            '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          genreHTML += "</div><br>";
          genreHTML += '<div class="col-sm-6 movieDetails">';
          genreHTML += '<div class="movieName">' + title + "</div><br>";
          genreHTML +=
            '<div class="linkToTrailer"><a href="' +
            youtubeLink +
            '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' +
            "</div><br>";
          genreHTML +=
            '<div class="release">Release Date: ' + releaseDate + "</div><br>";
          genreHTML += '<div class="overview">' + overview + "</div><br>";
          genreHTML +=
            '<div class="rating">Rating: ' + voteAverage + "/10</div><br>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">8:30 AM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">10:00 AM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">12:30 PM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">3:00 PM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">4:10 PM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">5:30 PM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">8:00 PM' + "</div>";
          genreHTML +=
            '<div class="col-sm-3 btn btn-primary">10:30 PM' + "</div>";
          genreHTML += "</div>"; //close movieDetails
          genreHTML += "</div>"; //close modal-content
          genreHTML += "</div>"; //close modal-dialog
          genreHTML += "</div>"; //close modal
          genreHTML += "</div>"; //close off each div

          // Appends newly created genreHTML element to element with id of movie-grid
          $("#movie-grid").append(genreHTML);
        });
      }
    });
  }
  // call getMoviesByGenre using click function but call getNowPlayingData on default.
  getNowPlayingData();

  //Reset HTML strings to empty to overwrite with new one!
  var nowPlayingHTML = "";
  var genreHTML = "";

  //! we could add a for loop and click event listener to every item with different attributes
  //! (!DRY )
  $(".navbar-brand").click(function () {
    getNowPlayingData();
    $("#movie-grid").html(nowPlayingHTML);
    $("#movieGenreLabel").html("Now Playing");
  });
  $(".nowPlaying").click(function () {
    getNowPlayingData();
    $("#movie-grid").html(nowPlayingHTML);
    $("#movieGenreLabel").html("Now Playing");
  });
  $("#action").click(function () {
    getMoviesByGenre(28);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Action");
  });
  $("#adventure").click(function () {
    getMoviesByGenre(12);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Adventure");
  });
  $("#animation").click(function () {
    getMoviesByGenre(16);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Animation");
  });
  $("#comedy").click(function () {
    getMoviesByGenre(35);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Comedy");
  });
  $("#crime").click(function () {
    getMoviesByGenre(80);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Crime");
  });
  $("#drama").click(function () {
    getMoviesByGenre(18);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Drama");
  });
  $("#family").click(function () {
    getMoviesByGenre(10751);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Family");
  });
  $("#fantasy").click(function () {
    getMoviesByGenre(14);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Fantasy");
  });
  $("#history").click(function () {
    getMoviesByGenre(36);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("History");
  });
  $("#horror").click(function () {
    getMoviesByGenre(27);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Horror");
  });
  $("#music").click(function () {
    getMoviesByGenre(10402);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Music");
  });
  $("#romance").click(function () {
    getMoviesByGenre(10749);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Romance");
  });
  $("#scifi").click(function () {
    getMoviesByGenre(878);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Science Fiction");
  });
  $("#thriller").click(function () {
    getMoviesByGenre(53);
    $("#movie-grid").html(genreHTML);
    $("#movieGenreLabel").html("Thriller");
  });

  //==============================================================================
  //====================== Search Function =======================================
  //==============================================================================

  // adds onSubmit event listener to search box
  var searchTerm = "";
  searchMovies();
  //reference entire search form
  $(".searchForm").submit(function (event) {
    $("#movie-grid").html("");
    event.preventDefault();
    //! GETS THE INPUT DATA WITHOUT CHECKING OR CLEANING IT (Dangerous)
    searchTerm = $(".form-control").val();
    searchMovies();
  });

  function searchMovies() {
    // creates search query
    //! we could use String literal and it would make the code much more intuitive
    const searchMovieURL =
      apiBaseURL +
      "search/movie?api_key=" +
      apiKey +
      "&language=en-US&page=1&include_adult=false&query=" +
      searchTerm;

    $.getJSON(searchMovieURL, function (movieSearchResults) {
      //! Repeated "code" inefficient and hard to read (!DRY method)
      for (let i = 0; i < movieSearchResults.results.length; i++) {
        var mid = movieSearchResults.results[i].id;
        var thisMovieUrl =
          apiBaseURL + "movie/" + mid + "/videos?api_key=" + apiKey;

        $.getJSON(thisMovieUrl, function (movieKey) {
          //! what if movieSearchResults.results[i].poster_path was null ?
          //! we have to check it first and if it was null she could have shown a general poster img
          var poster =
            imageBaseUrl + "w300" + movieSearchResults.results[i].poster_path;
          var title = movieSearchResults.results[i].original_title;
          var releaseDate = movieSearchResults.results[i].release_date;
          var overview = movieSearchResults.results[i].overview;
          var voteAverage = movieSearchResults.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = "https://www.youtube.com/watch?v=" + youtubeKey;
          var searchResultsHTML = "";
          searchResultsHTML +=
            '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
          searchResultsHTML +=
            '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' +
            i +
            '" data-whatever="@' +
            i +
            '">' +
            '<img src="' +
            poster +
            '"></button>';
          searchResultsHTML +=
            '<div class="modal fade" id="exampleModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          searchResultsHTML += '<div class="modal-dialog" role="document">';
          searchResultsHTML +=
            '<div class="modal-content col-sm-12 col-lg-12">';
          searchResultsHTML += '<div class="col-sm-6 moviePosterInModal">';
          searchResultsHTML +=
            '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          searchResultsHTML += "</div><br>";
          searchResultsHTML += '<div class="col-sm-6 movieDetails">';
          searchResultsHTML += '<div class="movieName">' + title + "</div><br>";
          searchResultsHTML +=
            '<div class="linkToTrailer"><a href="' +
            youtubeLink +
            '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' +
            "</div><br>";
          searchResultsHTML +=
            '<div class="release">Release Date: ' + releaseDate + "</div><br>";
          searchResultsHTML +=
            '<div class="overview">' + overview + "</div><br>";
          searchResultsHTML +=
            '<div class="rating">Rating: ' + voteAverage + "/10</div><br>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">8:30 AM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">10:00 AM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">12:30 PM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">3:00 PM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">4:10 PM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">5:30 PM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">8:00 PM' + "</div>";
          searchResultsHTML +=
            '<div class="col-sm-3 btn btn-primary">10:30 PM' + "</div>";
          searchResultsHTML += "</div>"; //close movieDetails
          searchResultsHTML += "</div>"; //close modal-dialog
          searchResultsHTML += "</div>"; //close modal
          searchResultsHTML += "</div>"; //close off each div

          $("#movie-grid").append(searchResultsHTML);

          // Label will be whatever according to user input
          $("#movieGenreLabel").html(searchTerm);
        });
      }
    });
  }
});
