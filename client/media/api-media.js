const create = (params, credentials, media) => {
  return fetch("/api/medias/new/" + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: media
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const googleMapsClient = require("@google/maps/lib/index").createClient({
  key: "AIzaSyCzQNpK8OSEwzED8BFCUenPoMRdfBOKtHY"
});

const getlocation = (lat, lon) => {
  var places;
  googleMapsClient.reverseGeocode(
    {
      latlng: [lat, lon]
    },
    function(err, response) {
      if (!err) {
        //console.log(response.json.results[0]);
        //alert(response.json.results[0].formatted_address);
        places = response.json.results[0].formatted_address;
        //console.log(places);
        document.getElementById("takenplace").value = places;
      }
    }
  );
  return places;
};

const geo = (lat, lon) => {
  return fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      lat +
      "," +
      lon +
      "&key=AIzaSyCzQNpK8OSEwzED8BFCUenPoMRdfBOKtHY",
    {
      method: "GET"
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const listNewsFeed = (params, credentials) => {
  return fetch("/api/posts/feed/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listByUser = (params, credentials) => {
  return fetch("/api/medias/by/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const remove = (params, credentials) => {
  return fetch("/api/medias/" + params.mediaId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const like = (params, credentials, postId) => {
  return fetch("/api/posts/like/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({ userId: params.userId, postId: postId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const unlike = (params, credentials, postId) => {
  return fetch("/api/posts/unlike/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({ userId: params.userId, postId: postId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export {
  create,
  listByUser,
  remove,
  like,
  unlike,
  listNewsFeed,
  geo,
  getlocation
};
