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
import { loginUser } from "../redux/actions/userActions";

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
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
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
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="standard-basic"
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
              id="standard-basic"
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small className={classes.sign}>
              Not a member yet? signup <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
