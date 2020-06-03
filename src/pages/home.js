import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Post from "../components/Post";
import Profile from "../components/profile";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPosts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentpost = !loading ? (
      posts.map((post) => <Post key={post.postid} post={post} />)
    ) : (
      <p>Loading....</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item xs={12} sm={4}>
          <Profile />
        </Grid>
        <Grid item xs={12} sm={8}>
          {recentpost}
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getAllPosts })(home);
