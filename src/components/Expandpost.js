import React, { Component, Fragment } from "react";

//import link from "react-router-dom/Link";

//material ui
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { expandpost, clearErrors } from "../redux/actions/dataActions";
import CommentForm from "../components/CommentForm";

//icon
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import Comments from "./Comments";

import ChatIcon from "@material-ui/icons/Chat";

const style = {
  expandicon: {
    position: "absolute",
    left: "200%",
  },
  horizontalbar: {
    display: "none",
    margin: 4,
  },

  profileimage: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover",
  },
  closebutton: {
    position: "absolute",
    left: "100%",
    top: "200%",
  },

  dialogcontent: {
    padding: 30,
  },

  circular: {
    textAlign: "center",

    marginTop: 50,
    marginBottom: 50,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
};
class Expandpost extends Component {
  state = {
    open: false,
    oldpath: "",
    newpath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      console.log(this.props.openDialog);
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldpath = window.location.pathname;
    const { userHandle, postid } = this.props;

    const newpath = `/user/${userHandle}/post/${postid}`;

    if (oldpath === newpath) oldpath = `/user/${userHandle}`;

    window.history.pushState(null, null, newpath);

    this.setState({ open: true, oldpath, newpath });
    this.props.expandpost(this.props.postid);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldpath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      post: {
        createdAt,
        userHandle,
        body,
        ImageUrl,
        commentCount,
        likeCount,
        comments,
        postid,
      },
      UI: { loading },
    } = this.props;

    //const opendialog = this.props.openDialog ? this.handleOpen() : null;

    const dialogMarkup = loading ? (
      <div className={classes.circular}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={4}>
          <img src={ImageUrl} alt="Profile" className={classes.profileimage} />
        </Grid>
        <Grid item sm={6}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="secondary"
          >
            @{userHandle}
          </Typography>
          <hr className={classes.horizontalbar} />
          <Typography variant="body1">{body}</Typography>
          <hr className={classes.horizontalbar} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>

          <span>{likeCount}Likes</span>
          <Tooltip title="comments" placement="top">
            <IconButton>
              <ChatIcon color="primary" />
            </IconButton>
          </Tooltip>
          <span>{commentCount} comments</span>
        </Grid>

        <hr className={classes.visibleSeparator} />
        <CommentForm postid={postid} />

        <Comments comments={comments} />
        <hr className={classes.visibleSeparator} />
      </Grid>
    );

    return (
      <Fragment>
        <Tooltip title="Expandpost" placement="top">
          <IconButton>
            <ExpandMoreIcon
              color="primary"
              onClick={this.handleOpen}
              className={classes.expandicon}
            />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip title="close" placement="top">
            <IconButton
              onClick={this.handleClose}
              className={classes.closebutton}
            >
              <CloseIcon color="primary" />
            </IconButton>
          </Tooltip>

          <DialogContent className={classes.dialogcontent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Expandpost.propTypes = {
  UI: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
  expandpost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  userHandle: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  post: state.data.post,
});
const mapActionsToProps = {
  expandpost,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(style)(Expandpost));
