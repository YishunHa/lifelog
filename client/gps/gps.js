import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { read } from "./../user/api-user";
import { Redirect, Link, withRouter } from "react-router-dom";
import auth from "./../auth/auth-helper";
import GridList from "material-ui/GridList";
import Grid from "material-ui/Grid";
import GridListTile from "material-ui/GridList/GridListTile";
import GridListTileBar from "material-ui/GridList/GridListTileBar";
import ListSubheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "material-ui-icons/DeleteForever";
import Sidebar from "./../media/Sidebar";
import Paper from "material-ui/Paper";
import { listByUser2 } from "./api-gps";
import { listByUser } from "./../media/api-media";
import iconMarker from "material-ui-icons/LocationOn";
import iconMarkerHover from "material-ui-icons/LocationOn";
import homeimg from "./../assets/images/1535542312193.png";
import { create } from "domain";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 600
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  Paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  map: {
    height: 500
  }
});
class Gps extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      following: false,
      GPS: [],
      Media: []
    };
    this.match = match;
  }

  init = () => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: jwt.user._id
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data }, this.loadGPS(data));
      }
    });
  };

  loadMedias = user => {
    const jwt = auth.isAuthenticated();
    listByUser(
      {
        userId: user._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ Media: data }, this.Loadmap(data));
      }
    });
  };

  loadGPS = user => {
    const jwt = auth.isAuthenticated();
    listByUser2(
      {
        userId: user._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ GPS: data }, this.loadMedias(this.state.user));
        //this.Loadmap(data);
      }
    });
  };

  Loadmap = ddd => {
    let latitude = 55.706138;
    let longitude = -3.913987;
    let map;
    let GPS = this.state.GPS;
    let media = ddd;
    let countnum = 0;
    let countnum2 = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getpostition, doesntwork);
    }

    function doesntwork() {
      alert("Please give location permission and retart!");
      console.log("There is an error when try to get the location!");
    }

    function getpostition(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log();
      console.log(
        "your loacation:" +
          "latitude: " +
          latitude +
          "  longitude: " +
          longitude
      );
      initMap();
    }

    var infowindow = new google.maps.InfoWindow();
    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 13
      });
      callback();
      // var service = new google.maps.places.PlacesService(map);
      // service.nearbySearch(
      //   {
      //     location: { lat: latitude, lng: longitude },
      //     radius: 5000,
      //     types: ["movie_theater"]
      //   },
      //   callback
      // );
    }

    function callback() {
      // var marker2 = new google.maps.Marker({
      //   position: { lat: latitude, lng: longitude },
      //   animation: google.maps.Animation.DROP,
      //   map: map,
      //   title: "Current location"
      // });
      // google.maps.event.addListener(marker2, "click", function() {
      //   infowindow.setContent("You are here");
      //   infowindow.open(map, this);
      // });

      for (var i = 0; i < media.length; i++) {
        createMarker2(media[i]);
        countnum2++;
      }
      console.log(countnum2);

      for (var a = 0; a < GPS.length; a++) {
        createMarker(GPS[a]);
        countnum++;
      }
      count();
    }

    const createMarker2 = place => {
      var po = { lat: place.latitude, lng: place.longitude };
      var marker = new google.maps.Marker({
        map: map,
        position: po,
        animation: google.maps.Animation.BOUNCE
      });
      var date = new Date(place.taken).toDateString();
      var contentString =
        '<div id="content" height="200px" width="200px">' +
        '<div">' +
        '<img src="/api/medias/photo/' +
        place._id +
        '"' +
        " " +
        'height="80px" width="80px"' +
        ">" +
        '<p><a href="/api/medias/photo/' +
        place._id +
        '"' +
        " " +
        "target='view_window'" +
        ">" +
        "Click here to view the img</a> " +
        "</p>" +
        "<p>" +
        place.text +
        "</p>" +
        "<p>taken on" +
        " " +
        date +
        "</p>" +
        "</div>" +
        "</div>";
      google.maps.event.addListener(marker, "click", function() {
        var infowindow2 = new google.maps.InfoWindow({
          content: contentString
        });
        infowindow2.open(map, this);
      });
    };

    const createMarker = place => {
      if (place.NS === "S") {
        place.LATITUDE = -place.LATITUDE;
      }
      if (place.EW === "W") {
        place.LONGITUDE = -place.LONGITUDE;
      }
      var po = { lat: place.LATITUDE, lng: place.LONGITUDE };
      var marker3 = new google.maps.Marker({
        map: map,
        position: po
        //animation: google.maps.Animation.DROP
      });
      console.log("okk");
      google.maps.event.addListener(marker3, "click", function() {
        infowindow.setContent(place.UTC_DATE);
        infowindow.open(map, this);
      });
    };
    function count() {
      console.log("There are " + countnum + "points are loaded");
    }
  };

  componentWillReceiveProps = props => {
    this.init();

    //this.init(props.match.params.userId);
  };
  componentDidMount = () => {
    // this.setState({ user: auth.isAuthenticated().user }, () => {
    //   console.log(this.state.user);
    //   this.init(this.state.user);
    // });
    this.init();

    //this.initMap();
  };

  render() {
    const { classes } = this.props;
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className={classes.root} style={{ height: "auto" }}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.Paper} elevation={1}>
              <div id="map" style={{ width: "600px", height: "600px" }}>
                <img
                  src={homeimg}
                  style={{ width: "600px", height: "600px" }}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      //   <div style={{ marginTop: "24px" }}>
      //     {this.state.medias.map((item, i) => {
      //       return <Media media={item} key={i} onRemove={this.removeMedia} />;
      //     })}
      //   </div>
    );
  }
}
Gps.propTypes = {
  classes: PropTypes.object.isRequired
  //medias: PropTypes.array.isRequired,
  //removeUpdate: PropTypes.func.isRequired
};
export default withStyles(styles)(Gps);
