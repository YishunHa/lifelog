import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Icon from "material-ui-icons/Https";
import { grey } from "material-ui/colors";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  footer: {
    backgroundColor: grey,
    padding: theme.spacing.unit * 9
  }
});

class Mainfooter extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <hr />
        <Typography variant="title" align="center" gutterBottom>
          2018
        </Typography>
        <Typography
          variant="subheading"
          align="center"
          color="textSecondary"
          component="p"
        >
          <Icon />
        </Typography>
      </footer>
    );
  }
}

Mainfooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Mainfooter);
