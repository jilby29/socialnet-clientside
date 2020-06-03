import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import Deletepost from "./Deletepost";

//icon
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";

import Expandpost from "./Expandpost";

var relativeTime = require("dayjs/plugin/relativeTime");

const styles = {
  card: {
    display: "flex",
    width: 700,
    height: 180,
    marginBottom: 10,
    color: "gray",
  },
  media: {
    minWidth: 200,
  },
  content: {
    padding: 10,
    objectFit: "cover",
  },
};
class Post extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      post: {
        body,
        createdAt,
        ImageUrl,
        userHandle,
        likeCount,
        commentCount,
        postid,
      },
      user: {
        authenticated,
        credentials: { signupuser },
      },
      open,
    } = this.props;

    const deletebutton =
      authenticated && userHandle === signupuser ? (
        <Deletepost postid={postid} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={ImageUrl}
          title="Profile Image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="secondary"
          >
            {userHandle}
          </Typography>

          <Expandpost
            postid={postid}
            userHandle={userHandle}
            openDialog={this.props.open}
          />
          <Typography variant="body1">{body}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <LikeButton postid={postid} />
          <span>{likeCount}Likes</span>
          <Tooltip title="comments" placement="top">
            <IconButton>
              <ChatIcon color="primary" />
            </IconButton>
          </Tooltip>
          <span>{commentCount} comments</span>
          {deletebutton}
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  openDialog: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(styles)(Post));
