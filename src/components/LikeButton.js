import React, { Component } from "react";

import { likePost } from "../redux/actions/dataActions";
import { unlikePost } from "../redux/actions/dataActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postid === this.props.postid)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.postid);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.postid);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <Tooltip title="like" placement="top">
          <IconButton>
            <FavoriteBorder color="primary" />
          </IconButton>
        </Tooltip>
      </Link>
    ) : this.likedPost() ? (
      <Tooltip title="Undo like" placement="top">
        <IconButton onClick={this.unlikePost}>
          <FavoriteIcon color="primary" />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Like" placement="top">
        <IconButton onClick={this.likePost}>
          <FavoriteBorder color="primary" />
        </IconButton>
      </Tooltip>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  likePost,
  unlikePost,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
