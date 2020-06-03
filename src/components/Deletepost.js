import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import { deletepost } from "../redux/actions/dataActions";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {};

class Deletepost extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handledelete = (postid) => {
    this.props.deletepost(this.props.postid);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Delete post" placement="top">
          <IconButton onClick={this.handleOpen}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="secondary" onClick={this.handledelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

Deletepost.propTypes = {
  deletepost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { deletepost })(
  withStyles(styles)(Deletepost)
);
