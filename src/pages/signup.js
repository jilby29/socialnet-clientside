import React, { Component } from "react";
import PropTypes from "prop-types";
import Appicon from "../images/icon.jpg";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { signupuser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  pagetitle: {
    padding: 10,
    fontSize: "25px",
  },
  textfield: {
    padding: "2px",
  },
  button: {
    margin: "20px",
    postion: "relative",
  },
  generalerror: {
    color: "red",
  },

  progress: {
    postion: "absolute",
  },

  sign: {
    fontSize: "15px",
  },
};
class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      signupuser: "",

      errors: {},
    };
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors) {
      this.setState({ errors: nextprops.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const signupData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      signupuser: this.state.signupuser,
    };
    this.props.signupuser(signupData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Appicon} className={classes.image} alt="icon" />
          <Typography className={classes.pagetitle} color="primary">
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              className={classes.textfield}
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            ></TextField>
            <br />
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              className={classes.textfield}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            ></TextField>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              className={classes.textfield}
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
            ></TextField>
            <TextField
              id="signupuser"
              label="User"
              className={classes.textfield}
              name="signupuser"
              type="text"
              value={this.state.signupuser}
              onChange={this.handleChange}
              helperText={errors.signupuser}
              error={errors.signupuser ? true : false}
              fullWidth
            ></TextField>
            <br />

            {errors.general && (
              <Typography variant="body2" className={classes.generalerror}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small className={classes.sign}>
              Already a member? Login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupuser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps, { signupuser })(
  withStyles(styles)(signup)
);
