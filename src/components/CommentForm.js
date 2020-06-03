import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import { postcomment, clearErrors } from "../redux/actions/dataActions";
import { TextField } from "@material-ui/core";

const style = {
  button: {
    float: "right",
    marginTop: 10,
  },
};
class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors) {
      this.setState({ errors: nextprops.UI.errors });
    }

    if (!nextprops.UI.errors && !nextprops.UI.loading) {
      this.setState({ body: "" });
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postcomment(this.props.postid, { body: this.state.body });
  };
  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentMarkup = authenticated ? (
      <Grid item sm={12}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            id="body"
            label="Post a Comment"
            placeholder="Comment"
            value={this.state.body}
            onChange={this.handleChange}
            helperText={errors.comment}
            error={errors.comment ? true : false}
            multiline
            rows="3"
            fullWidth
            className={classes.textfield}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentMarkup;
  }
}

CommentForm.propTypes = {
  UI: PropTypes.object.isRequired,
  postcomment: PropTypes.func.isRequired,

  postid: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapActionstoProps = {
  postcomment,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(
  mapStateToProps,
  mapActionstoProps
)(withStyles(style)(CommentForm));
