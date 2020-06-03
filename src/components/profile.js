import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import { uploadProfileImage, logoutUser } from "../redux/actions/userActions";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//icon
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

const styles = {
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        marginLeft: 100,
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },

    "& .profile-details": {
      textAlign: "center",
    },
    "& .prodetailsfile-": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },

  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

class profile extends Component {
  profileImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadProfileImage(formData);
  };

  clickbutton = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handlelogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
          ImageUrl,
          signupuser,
          bio,
          createdAt,
          location,
          website,
        },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={ImageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                hidden="hidden"
                id="imageInput"
                onChange={this.profileImageChange}
              />
              <hr />
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={this.clickbutton}>
                  <PhotoCamera color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/user/${signupuser}`}
                color="primary"
                variant="h5"
              >
                @{signupuser}
              </MuiLink>
              <hr />
              {bio && (
                <Fragment>
                  <Typography variant="body2">{bio}</Typography>
                  <hr />
                </Fragment>
              )}
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <hr />
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handlelogout}>
                <KeyboardReturnIcon color="primary" float="left" />
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.profile}>
          <Typography variant="body2" align="center">
            No profile found..please try again!
          </Typography>
          <div className={classes.buttons}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to="/signup"
            >
              SignUp
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading....</p>
    );
    return profileMarkup;
  }
}

profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadProfileImage,
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(profile));
