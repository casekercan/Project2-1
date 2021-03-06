//LEARN MORE BUTTON
$(".button-learn").on("click", function(event) {
  event.preventDefault();
  var id = $(this).val();
  var url = "/post/" + id;
  window.location = url;
});

//LOGIN BUTTON
$("#login-btn").on("click", function(event) {
  event.preventDefault();
  window.location = "/login";
});

//VIEW ALL BUTTON
$("#view-all").on("click", function(event) {
  event.preventDefault();
  window.location = "/all";
});

//SIGNUP BUTTON
$(".signup").on("click", function(event) {
  event.preventDefault();
  window.location = "/signup";
});

//SEARCH BUTTON
$("#search").submit(function(event) {
  event.preventDefault();
  var zipState = false;
  var cityState = false;
  var searchParam = $("#search_text").val();

  if ($("#zip").is(":checked")) {
    zipState = true;
  }

  if ($("#city").is(":checked")) {
    cityState = true;
  }

  if (searchParam == "") {
    console.log("empty");
    alert("Please insert a City/Zip Code to search.");
    return;
  } else {
    checkSearch(zipState, cityState, searchParam);
  }
});

function checkSearch(zipState, cityState, searchParam) {
  console.log("zipState = " + zipState);
  console.log("cityState = " + cityState);
  console.log("searchParam = " + searchParam);

  if (zipState === true && cityState === true) {
    alert("Please only search by the Zip Code OR City.");
    console.log("both true");
  } else if (zipState === false && cityState === false) {
    alert("Please check either Zip Code or City to search.");
    console.log("both false");
  } else if (zipState === true) {
    var url = "/zip_search/" + searchParam;
    window.location = url;
  } else if (cityState === true) {
    var url = "/city_search/" + searchParam;
    window.location = url;
  } else {
    console.log("nothing worked");
  }
}

//DELETE COMMENT
$(".delete-com").on("click", function(event) {
  var id = $(this).data("id");
  console.log("deleting");

  $.ajax("/api/comments/" + id, {
    type: "DELETE"
  }).then(function() {
    console.log("deleted comment = ", id);
    // Reload the page to get the updated list
    location.reload();
  });
});

//ADD REVIEW (photo upload sent through /uploadcomment api call seperately)
$("#add-comm").submit(function(event) {
  event.preventDefault();

  var postID = Number($(this).attr("name"));
  var rating = 0;
  //Calculate rating
  if ($("#rate1").is(":checked")) {
    rating = 1;
  }
  if ($("#rate2").is(":checked")) {
    rating = 2;
  }
  if ($("#rate3").is(":checked")) {
    rating = 3;
  }
  if ($("#rate4").is(":checked")) {
    rating = 4;
  }
  if ($("#rate5").is(":checked")) {
    rating = 5;
  }

  var photo;

  if (document.getElementById("inputCommentPhoto").files[0] == undefined) {
    photo = "";
  } else {
    var file = document.getElementById("inputCommentPhoto").files[0];
    photo =
      "https://bucketeer-45d5c43b-2ff6-4a16-beaa-63888ef7bd29.s3.amazonaws.com/public/" +
      file.name;
  }

  //set up object ///need to change user id for future!
  var newComment = {
    PostID: postID,
    UserID: 1,
    CommentText: $("#com")
      .val()
      .trim(),
    CommentRating: rating,
    comment_image: photo
  };

  validateFormComment(newComment);
});

function validateFormComment(newComment) {
  var a = newComment.PostID;
  var b = newComment.UserID;
  var c = newComment.CommentText;
  var d = newComment.CommentRating;
  var e = newComment.comment_image;

  if (a == "" || b == "" || c == "" || d == "" || e == "") {
    alert("Please fill out the whole form!");
  } else {
    //Send the POST request.
    $.ajax("/api/comments/" + newComment.PostID, {
      type: "POST",
      data: newComment
    }).then(function() {
      console.log("posted new comment");
      // Reload the page
      location.reload();
    });
  }
}

//UPDATE Comment Form
$(".update-form").on("submit", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  var updatedComment = {
    CommentRating: $("#ratings")
      .val()
      .trim(),
    CommentText: $("#com")
      .val()
      .trim()
  };

  var id = $(this).data("id");

  // Send the POST request.
  $.ajax("/api/comments/" + id, {
    type: "PUT",
    data: updatedComment
  }).then(function() {
    console.log("updated comment");
    // Reload the page to get the updated list
    location.assign("/");
  });
});

//ADD POST (photo upload sent through /upload api call seperately)
$("#add").submit(function(event) {
  event.preventDefault();
  //determines rating
  var rating = 0;
  if ($("#rate1").is(":checked")) {
    rating = 1;
  }
  if ($("#rate2").is(":checked")) {
    rating = 2;
  }
  if ($("#rate3").is(":checked")) {
    rating = 3;
  }
  if ($("#rate4").is(":checked")) {
    rating = 4;
  }
  if ($("#rate5").is(":checked")) {
    rating = 5;
  }

  var zipNum = Number(
    $("#inputZip")
      .val()
      .trim()
  );

  var photo;

  if (document.getElementById("inputPhoto").files[0] == undefined) {
    photo = "";
  } else {
    var file = document.getElementById("inputPhoto").files[0];
    photo =
      "https://bucketeer-45d5c43b-2ff6-4a16-beaa-63888ef7bd29.s3.amazonaws.com/public/" +
      file.name;
  }
  //set up object ///need to change user id for future!
  var newLocation = {
    UserID: 1,
    LocationName: $("#inputLocation")
      .val()
      .trim(),
    LocAddr: $("#inputAddress")
      .val()
      .trim(),
    City: $("#inputCity")
      .val()
      .trim(),
    State: $("#inputState")
      .val()
      .trim(),
    Zip: zipNum,
    PostText: $("#inputDescription")
      .val()
      .trim(),
    PostRating: rating,
    post_image: photo
  };

  validateForm(newLocation);
});

function validateForm(newLocation) {
  var a = newLocation.UserId;
  var b = newLocation.LocationName;
  var c = newLocation.LocAddr;
  var d = newLocation.City;
  var e = newLocation.State;
  var f = newLocation.Zip;
  var g = newLocation.PostText;
  var h = newLocation.PostRating;
  var i = newLocation.post_image;

  if (
    a == "" ||
    b == "" ||
    c == "" ||
    d == "" ||
    e == "" ||
    f == "" ||
    g == "" ||
    h == "" ||
    i == ""
  ) {
    alert("Please fill out the whole form!");
  } else {
    //Send the POST request.
    $.ajax("/newlocation", {
      type: "POST",
      data: newLocation
    }).then(function() {
      console.log("posted new location");
      // Reload the page
      location.reload();
    });
  }
}

// MAP SCRIPT
function initMap() {
  var lonetoilet = { lat: 38.1569651, lng: -122.4089516 };
  var ucde = { lat: 38.5727318, lng: -121.4679379 };
  var sfpt = { lat: 37.8085972, lng: -122.4133604 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: lonetoilet
  });

  var contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">The Lone Toilet - Sonoma, CA</h1>' +
    '<div id="bodyContent">' +
    "<p><b>The Lone Toilet</b> - In the middle of nowhere in Sonoma, there is this outhouse with a very clean toilet. It is not near any kind of facility, camping ground, or anything else.</p>" +
    '<a href="/post/1"><button class="btn btn-sm button-learn">Learn More</button></a>' +
    "</div>" +
    "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: lonetoilet,
    map: map,
    title: "The Lone Toilet - Sonoma, CA"
  });

  marker.addListener("click", function() {
    infowindow.open(map, marker);
  });

  var contentString2 =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">UCDavis Extension Toilet</h1>' +
    '<div id="bodyContent">' +
    "<p><b>UCDavis Extension Toilet</b> - UC Davis Extension connects working professionals, businesses and students from around the world to the knowledge and resources of UC Davis. Inside the Extension is a private lavatory that requires a Secret Code to get in.</p>" +
    '<a href="/post/4"><button class="btn btn-sm button-learn">Learn More</button></a>' +
    "</div>" +
    "</div>";

  var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  var marker2 = new google.maps.Marker({
    position: ucde,
    map: map,
    title: "UCDavis Extension Toilet"
  });

  marker2.addListener("click", function() {
    infowindow2.open(map, marker2);
  });

  var contentString3 =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">SF Automatic Public Toilet</h1>' +
    '<div id="bodyContent">' +
    "<p><b>The Automatic Public Toilet Program</b> was developed because of a growing civic concern about the lack of sufficient public toilet facilities in the City. The toilets automatically clean themselves after each use, and are fully accessible to people with disabilities.</p>" +
    '<a href="/all"><button class="btn btn-sm button-learn">Learn More</button></a>' +
    "</div>" +
    "</div>";

  var infowindow3 = new google.maps.InfoWindow({
    content: contentString3
  });

  var marker3 = new google.maps.Marker({
    position: sfpt,
    map: map,
    title: "SF Automatic Public Toilet"
  });

  marker3.addListener("click", function() {
    infowindow3.open(map, marker3);
  });

  // FIND LOCATION
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location Found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationERROR(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationERROR(false, infoWindow, map.getCenter());
  }
}

window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
};

function handleLocationERROR(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "ERROR: The Geolocation service failed."
      : "ERROR: Your browser doesn'T support geolocation."
  );
  infoWindow.open(map);
}
