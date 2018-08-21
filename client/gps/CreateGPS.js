import React, { Component } from "react";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import auth from "./../auth/auth-helper";
import IconButton from "material-ui/IconButton";
import Fileicon from "material-ui-icons/Description";

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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      persons: []
    };
  }
  render() {
    const { name, age, persons } = this.state;
    return (
      <div>
        <span>姓名:</span>
        <input
          value={name}
          name="name"
          onChange={this._handleChange.bind(this)}
        />
        <span>年龄:</span>
        <input
          value={age}
          name="age"
          onChange={this._handleChange.bind(this)}
        />
        <input
          type="button"
          onClick={this._handleClick.bind(this)}
          value="确认"
        />
        {persons.map((person, index) => (
          <Person key={index} name={person.name} age={person.age} />
        ))}
      </div>
    );
  }
  _handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  _handleClick() {
    const { name, age } = this.state;
    this.setState({
      name: "",
      age: "",
      persons: this.state.persons.concat([{ name: name, age: age }])
    });
  }
}

class Person extends Component {
  componentWillReceiveProps(newProps) {
    console.log(
      `我新的props的name是${newProps.name}，age是${
        newProps.age
      }。我以前的props的name是${this.props.name}，age是${
        this.props.age
      }是我要re-render了`
    );
  }
  render() {
    const { name, age } = this.props;

    return (
      <div>
        <span>姓名:</span>
        <span>{name}</span>
        <span> age:</span>
        <span>{age}</span>
      </div>
    );
  }
}
