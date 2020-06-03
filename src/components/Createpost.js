import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import { createpost, clearErrors } from "../redux/actions/dataActions";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  button: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },

  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },

  textfield: {
    padding: 2,
  },

  dialogcontent: {
    padding: 20,
    display: "block",
  },
};
class Createpost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createpost({ body: this.state.body });
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
      <Fragment>
        <Tooltip title="add post" placement="top">
          <IconButton onClick={this.handleOpen}>
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip tip="close" placement="top">
            <IconButton
              onClick={this.handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <DialogTitle>Add a post</DialogTitle>
          <DialogContent className={classes.dialogcontent}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                id="body"
                label="Add post"
                placeholder="Write something here.."
                onChange={this.handleChange}
                helperText={errors.body}
                error={errors.body ? true : false}
                multiline
                rows="3"
                fullWidth
                className="textfield"
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Createpost.propTypes = {
  UI: PropTypes.object.isRequired,
  createpost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,

  clearErrors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});
export default connect(mapStateToProps, { createpost, clearErrors })(
  withStyles(styles)(Createpost)
);
