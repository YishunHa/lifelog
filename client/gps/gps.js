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
import { withGoogleMap, GoogleMap } from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
//import gpsstyles from "./gps.css";
import iconMarker from "material-ui-icons/LocationOn";
import iconMarkerHover from "material-ui-icons/LocationOn";
import homeimg from "./../assets/images/1535542312193.png";
//import GPSloader from "./GPSloader";

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
const MY_API_KEY = "AIzaSyCzQNpK8OSEwzED8BFCUenPoMRdfBOKtHY";
class Gps extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      following: false,
      medias: []
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
        this.setState({ user: data });
      }
    });
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
          <Grid item xs={21}>
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
