import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import auth from "./../auth/auth-helper";
import homeimg from "./../assets/images/homeimg.png";
import loginimg from "./../assets/images/login.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

class Home extends Component {
  state = {
    defaultPage: true
  };
  init = () => {
    if (auth.isAuthenticated()) {
      this.setState({ defaultPage: false });
    } else {
      this.setState({ defaultPage: true });
    }
  };
  componentWillReceiveProps = () => {
    this.init();
  };
  componentDidMount = () => {
    this.init();
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.defaultPage && (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Typography
                  type="headline"
                  component="h2"
                  className={classes.title}
                >
                  Home Page
                </Typography>
                <CardMedia className={classes.media} image={homeimg} />
                <CardContent>
                  <Typography type="body1" component="p">
                    Welcome to Lifelogging Managment System
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {!this.state.defaultPage && (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={loginimg} />
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
