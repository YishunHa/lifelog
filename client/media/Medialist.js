import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { read } from "./../user/api-user";
import { Redirect, Link, withRouter } from "react-router-dom";
import { listByUser } from "./api-media";
import auth from "./../auth/auth-helper";
import { remove, like, unlike } from "./api-media";
import GridList from "material-ui/GridList";
import Grid from "material-ui/Grid";
import GridListTile from "material-ui/GridList/GridListTile";
import GridListTileBar from "material-ui/GridList/GridListTileBar";
import ListSubheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "material-ui-icons/DeleteForever";
import Staricon from "material-ui-icons/Star";
import Sidebar from "./Sidebar";

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
  }
});

class Medialist extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      following: false,
      medias: [],
      col: 2,
      colheight: 180
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
        this.loadMedias(data);
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
        this.setState({ medias: data });
      }
    });
  };

  deleteMedia = media => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        mediaId: media._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.removeMedia(media);
      }
    });
  };

  setCol = (num, height) => {
    this.setState({ col: num });
    this.setState({ colheight: height });
  };

  removeMedia = media => {
    const updatedMedias = this.state.medias;
    const index = updatedMedias.indexOf(media);
    updatedMedias.splice(index, 1);
    this.setState({ medias: updatedMedias });
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
            <Sidebar setcol={this.setCol} />
          </Grid>
          <Grid item xs={21}>
            <GridList
              cellHeight={this.state.colheight}
              className={classes.gridList}
              cols={this.state.col}
            >
              <GridListTile
                key="Subheader"
                cols={this.state.col}
                style={{ height: "auto" }}
              >
                <ListSubheader component="div">Aug</ListSubheader>
              </GridListTile>
              {this.state.medias.map(tile => (
                <GridListTile key={"/api/medias/photo/" + tile._id}>
                  <img src={"/api/medias/photo/" + tile._id} alt={tile.text} />
                  actionIcon=
                  {
                    <IconButton
                      className={classes.icon}
                      onClick={() => this.deleteMedia(tile)}
                    >
                      <Staricon />
                    </IconButton>
                  }
                  <GridListTileBar
                    title={tile.text}
                    subtitle={
                      <span>{new Date(tile.taken).toDateString()}</span>
                    }
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        onClick={() => this.deleteMedia(tile)}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
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
Medialist.propTypes = {
  classes: PropTypes.object.isRequired
  //medias: PropTypes.array.isRequired,
  //removeUpdate: PropTypes.func.isRequired
};
export default withStyles(styles)(Medialist);
