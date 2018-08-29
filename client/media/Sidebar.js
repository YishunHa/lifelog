import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ListItemIcon from "material-ui/List/ListItemIcon";
import ListItemText from "material-ui/List/ListItemText";
import Divider from "material-ui/Divider";
import InboxIcon from "material-ui-icons/FindInPage";
import DraftsIcon from "material-ui-icons/Drafts";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  }
});

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

function Sidebar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Find" />
        </ListItem>
        <ListItem>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="From"
              type="date"
              defaultValue={getNowFormatDate()}
              className={classes.textField}
              //   InputLabelProps={{
              //     shrink: true
              //   }}
            />
          </form>
        </ListItem>
        <ListItem>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="to"
              type="date"
              defaultValue={getNowFormatDate()}
              className={classes.textField}
              //   InputLabelProps={{
              //     shrink: true
              //   }}
            />
          </form>
        </ListItem>
        <ListItem>
          <Button color="primary" variant="raised">
            Submit
          </Button>
        </ListItem>
      </List>

      <Divider />
      <List component="nav">
        <ListItem button onClick={() => props.setcol(1, 300)}>
          <ListItemText primary="Days" />
        </ListItem>
        <ListItem button onClick={() => props.setcol(2, 180)}>
          <ListItemText primary="Weeks" />
        </ListItem>
        <ListItem button onClick={() => props.setcol(3, 150)}>
          <ListItemText primary="Months" />
        </ListItem>
        <ListItem button onClick={() => props.setcol(4, 150)}>
          <ListItemText primary="Years" />
        </ListItem>
      </List>
    </div>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  setcol: PropTypes.func.isRequired
};

export default withStyles(styles)(Sidebar);
