import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

//icon
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//Dialog

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { editUserDetails } from "../redux/actions/userActions";

const styles = {
  editbutton: {
    float: "right",
  },

  textfield: {
    padding: "2px",
  },
};
class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };
  mapEditDetails = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      website: credentials.website ? credentials.website : "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleopen = () => {
    this.setState({ open: true });
    this.mapEditDetails(this.props.credentials);
  };

  handleclose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapEditDetails(credentials);
  }

  handlesubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleclose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="edit" placement="top">
          <IconButton onClick={this.handleopen}>
            <EditIcon color="primary" className="editbutton" />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleclose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="edit_details">Edit profile details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                type="text"
                multiline
                rows="3"
                onChange={this.handleChange}
                value={this.state.bio}
                placeholder="Short details about yourself"
                className="textfield"
                fullWidth
              />
              <TextField
                id="location"
                name="location"
                label="Location"
                type="text"
                onChange={this.handleChange}
                placeholder="Where do you live?"
                value={this.state.location}
                className="textfield"
                fullWidth
              />
              <TextField
                id="website"
                name="website"
                label="Website"
                type="text"
                onChange={this.handleChange}
                value={this.state.website}
                placeholder="professional/personal details"
                className="textfield"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleclose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlesubmit} color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
