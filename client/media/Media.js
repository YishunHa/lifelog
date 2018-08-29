import React, { Component } from "react";
import auth from "../auth/auth-helper";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import FavoriteIcon from "material-ui-icons/Favorite";
import FavoriteBorderIcon from "material-ui-icons/FavoriteBorder";
import CommentIcon from "material-ui-icons/Comment";
import Divider from "material-ui/Divider";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import { remove, like, unlike } from "./api-media";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing.unit * 2}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit * 2
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing.unit
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Media extends Component {
  state = {
    like: false,
    likes: 0,
    comments: []
  };

  componentDidMount = () => {
    this.setState({
      //like: this.checkLike(this.media.likes)
      //likes: this.props.media.likes.length,
      //comments: this.props.media.comments
    });
  };
  componentWillReceiveProps = props => {
    // this.setState({
    //   like: this.checkLike(props.media.likes),
    //   likes: props.media.likes.length,
    //   comments: props.media.comments
    // });
  };

  checkLike = likes => {
    const jwt = auth.isAuthenticated();
    let match = likes.indexOf(jwt.user._id) !== -1;
    return match;
  };

  like = () => {
    let callApi = this.state.like ? unlike : like;
    const jwt = auth.isAuthenticated();
    callApi(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      this.props.media._id
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ like: !this.state.like, likes: data.likes.length });
      }
    });
  };

  deleteMedia = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        mediaId: this.props.media._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.onRemove(this.props.media);
      }
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            this.props.media.mediaedBy._id ===
              auth.isAuthenticated().user._id && (
              <IconButton onClick={this.deleteMedia}>
                <DeleteIcon />
              </IconButton>
            )
          }
          subheader={`taken time ${new Date(
            this.props.media.taken
          ).toDateString()}`}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {this.props.media.text}
          </Typography>
          {this.props.media.photo && (
            <div className={classes.photo}>
              <img
                className={classes.media}
                src={"/api/medias/photo/" + this.props.media._id}
              />
            </div>
          )}
        </CardContent>
        <CardActions>
          {this.state.like ? (
            <IconButton
              onClick={this.like}
              className={classes.button}
              aria-label="Like"
              color="secondary"
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={this.like}
              className={classes.button}
              aria-label="Unlike"
              color="secondary"
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}{" "}
          <span>{this.state.likes}</span>
          {/* <IconButton
            className={classes.button}
            aria-label="Comment"
            color="secondary"
          >
            <CommentIcon />
          </IconButton>{" "}
          <span>{this.state.comments.length}</span> */}
        </CardActions>
        <Divider />
      </Card>
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired,
  media: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default withStyles(styles)(Media);
