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
import auth from "./../auth/auth-helper";
import IconButton from "material-ui/IconButton";
import PhotoCamera from "material-ui-icons/PhotoCamera";
import EXIF from "exif-js";

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
  }
});

class CreateMedia extends Component {
  state = {
    text: "",
    photo: "",
    date: "",
    error: "",
    user: {}
  };

  componentDidMount = () => {
    this.mediaData = new FormData();
    this.setState({ user: auth.isAuthenticated().user });
  };

  upExif(e) {
    EXIF.getData(e.target.files[0], function() {
      var datetime = EXIF.getTag(this, "DateTimeDigitized");
      for (var i = 0; i < 2; i++) {
        datetime = datetime.replace(/:/, "/");
      }
      var date = new Date(datetime);
      console.log(date);
      return date;
    });
  }

  clickPost = () => {
    const jwt = auth.isAuthenticated();
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
        this.setState({ text: "", photo: "" });
        alert("success");
      }
    });
  };
  handleChangeforimg = name => event => {
    const value = event.target.files[0];
    const date = this.upExif(event);
    const datestring = date.toLocaleString();
    this.mediaData.set(name, value);
    this.setState({ [name]: value });
    this.setState({ text: datestring });
  };

  handleChangefortext = name => event => {
    const value = event.target.value;
    this.mediaData.set(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar src={"/api/users/defaultphoto"} />}
            title={this.state.user.name + " ready to upload Pic"}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <TextField
              placeholder="Upload your picture here"
              multiline
              rows="3"
              value={this.state.text}
              onChange={this.handleChangefortext("text")}
              className={classes.textField}
              margin="normal"
            />
            <input
              accept="image/*"
              onChange={this.handleChangeforimg("photo")}
              className={classes.input}
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
              disabled={this.state.text === ""}
              onClick={this.clickPost}
              className={classes.submit}
            >
              Upload
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CreateMedia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateMedia);
