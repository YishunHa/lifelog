import React, { Component } from "react";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { create } from "./api-media";
import { create2 } from "./../gps/api-gps";
import { geo, getlocation } from "./api-media";
import auth from "./../auth/auth-helper";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import PhotoCamera from "material-ui-icons/PhotoCamera";
import Locationicon from "material-ui-icons/LocationOn";
import EXIF from "exif-js";
import Moment from "moment";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing.unit * 3}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none"
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "90%"
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  filename: {
    verticalAlign: "super"
  },
  Paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class CreateMedia extends Component {
  state = {
    text: "",
    photo: "",
    file: "",
    taken: "",
    error: "",
    user: {},
    filecount: 0
  };

  componentDidMount = () => {
    this.mediaData = new FormData();
    this.fileData = new FormData();
    this.setState({ user: auth.isAuthenticated().user });
  };

  upExif(e) {
    let test;

    EXIF.getData(e.target.files[0], function() {
      var datetime = EXIF.getTag(this, "DateTimeDigitized");
      var latitude = 0;
      var longitude = 0;
      var date = datecovert(datetime);
      document.getElementById("taken").value = date;
      test = date;
      latitude = EXIF.getTag(this, "GPSLatitude");
      if (latitude !== 0) {
        latitude = latitude.toString();
        longitude = EXIF.getTag(this, "GPSLongitude").toString();
        var longittuderef = EXIF.getTag(this, "GPSLongitudeRef");
        var latituderef = EXIF.getTag(this, "GPSLatitudeRef");
        longitude = longcovert(longitude);
        latitude = latcovert(latitude);
        getlocation(latitude, longitude);

        console.log(` ${longitude}+${latitude}`);
        document.getElementById("lat").value = latitude;
        document.getElementById("lon").value = longitude;
      } else {
        document.getElementById("lat").value = "null";
        document.getElementById("lon").value = "null";
      }

      function longcovert(long) {
        long = long.replace(/,/, ".");
        long = long.replace(/,/, "");
        if (longittuderef === "W") {
          long = "-" + long;
        }
        long = parseFloat(long);
        return long;
      }

      function latcovert(lat) {
        lat = lat.replace(/,/, ".");
        lat = lat.replace(/,/, "");
        if (latituderef === "S") {
          lat = "-" + lat;
        }
        lat = parseFloat(lat);
        return lat;
      }

      // function geolist(lat, lon) {
      //   geo(lat, lon).then(data => {
      //     if (data.error) {
      //       console.log(data.error);
      //     } else {
      //       console.log(data.formatted_address);
      //     }
      //   });
      // }

      //console.log(latitude);

      function datecovert(input) {
        for (let i = 0; i < 2; i++) {
          input = input.replace(/:/, "/");
        }
        input = new Date(input);
        input = input.toISOString();
        return input;
      }

      //geolist(latitude, longitude);
    });

    //this.setState({ taken: document.getElementById("taken").value });
    //this.mediaData.set("latitude", document.getElementById("taken").value);
  }

  clickPost = () => {
    const jwt = auth.isAuthenticated();
    this.mediaData.set("taken", document.getElementById("taken").value),
      this.mediaData.set("latitude", document.getElementById("lat").value),
      this.mediaData.set("longitude", document.getElementById("lon").value),
      this.mediaData.set("text", document.getElementById("takenplace").value),
      create(
        {
          userId: jwt.user._id
        },
        {
          t: jwt.token
        },

        this.mediaData
      ).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            text: "",
            photo: "",
            taken: "",
            error: "",
            file: ""
          });
          this.Resetpage();
          alert("success");
        }
      });
  };
  UploadFile = () => {
    const jwt = auth.isAuthenticated();
    create2(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },

      this.fileData
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ text: "", photo: "", taken: "", file: "", error: "" });
        this.Resetpage();
        alert("gps success");
      }
    });
  };

  Resetpage = () => {
    document.getElementById("taken").value = "";
    document.getElementById("lat").value = "";
    document.getElementById("lon").value = "";
    document.getElementById("takenplace").value = "";
    this.mediaData.set("lon", "");
    this.mediaData.set("lat", "");
    this.mediaData.set("text", "");
    this.mediaData.set("takenplace", "");
  };

  handleChangeforimg = name => event => {
    const value = event.target.files[0];
    let length = event.target.files.length;
    this.setState({ filecount: length }, console.log(this.state.filecount));
    this.setState({ [name]: value });
    this.mediaData.set(name, value);
    this.upExif(event);
  };
  handleChangeforfile = name => event => {
    const value = event.target.files[0];
    this.fileData.set(name, value);
    this.setState({ [name]: value });
    console.log(this.fileData);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Paper className={classes.Paper} elevation={1}>
            <CardHeader
              avatar={<Avatar src={"/api/users/defaultphoto"} />}
              title={this.state.user.name + " ready to upload Pic"}
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <TextField
                placeholder="img taken place"
                multiline
                rows="2"
                id="takenplace"
                //value={this.state.text}
                //onChange={this.handleChangefortext("text")}
                className={classes.textField}
                margin="normal"
              />
              <br />
              <TextField
                placeholder="Photo taken date"
                multiline
                id="taken"
                rows="1"
                //value={this.state.taken}
                //onChange={this.handleChangefortext2("taken")}
                className={classes.textField}
                margin="normal"
              />
              <Grid container spacing={10}>
                <Grid item xs={4}>
                  <TextField
                    placeholder="latitude"
                    multiline
                    id="lat"
                    rows="1"
                    //value={this.state.taken}
                    //onChange={this.handleChangefortext2("taken")}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="longitude"
                    multiline
                    id="lon"
                    rows="1"
                    //value={this.state.taken}
                    //onChange={this.handleChangefortext2("taken")}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <input
                accept="image/*"
                onChange={this.handleChangeforimg("photo")}
                className={classes.input}
                multiple="multiple"
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="secondary"
                  className={classes.photoButton}
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>{" "}
              <span className={classes.filename}>
                {this.state.photo
                  ? this.state.photo.name
                  : "click the icon to selet"}
              </span>
              {this.state.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {this.state.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="raised"
                id="postbtn"
                onClick={this.clickPost}
                className={classes.submit}
              >
                Upload
              </Button>
            </CardActions>
          </Paper>
        </Card>
        <Card className={classes.card}>
          <Paper className={classes.Paper} elevation={1}>
            <CardHeader
              avatar={<Avatar src={"/api/users/defaultphoto"} />}
              title={this.state.user.name + " ready to upload GPS info"}
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <input
                accept="text/csv"
                onChange={this.handleChangeforfile("file")}
                className={classes.input}
                id="icon-button-file2"
                type="file"
              />
              <label htmlFor="icon-button-file2">
                <IconButton
                  color="secondary"
                  className={classes.photoButton}
                  component="span"
                >
                  <Locationicon />
                </IconButton>
              </label>{" "}
              <span className={classes.filename}>
                {this.state.file
                  ? this.state.file.name
                  : "click the icon to selet"}
              </span>
              {this.state.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {this.state.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="raised"
                id="postbtn"
                onClick={this.UploadFile}
                className={classes.submit}
              >
                Upload
              </Button>
            </CardActions>
          </Paper>
        </Card>
      </div>
    );
  }
}

CreateMedia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateMedia);
