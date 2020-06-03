import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/Post";
import { connect } from "react-redux";
import { getUserDetails } from "../redux/actions/dataActions";

import Staticprofile from "../components/Staticprofile";

import Grid from "@material-ui/core/Grid";

class user extends Component {
  state = {
    profile: null,
    postidParam: null,
  };
  componentDidMount() {
    const signupuser = this.props.match.params.signupuser;
    const postid = this.props.match.params.postid;
    if (postid) this.setState({ postidParam: postid });

    this.props.getUserDetails(signupuser);
    axios
      .get(`/user/${signupuser}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postidParam } = this.state;
    const open = true;

    const postMarkup = loading ? (
      <p>Loading data...</p>
    ) : posts === null ? (
      <p>No post found</p>
    ) : !postidParam ? (
      posts.map((post) => <Post key={post.postid} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postid !== postidParam) {
          return <Post key={post.postid} post={post} />;
        } else {
          return <Post key={post.postid} post={post} open />;
        }
      })
    );
    return (
      <Grid container spacing={10}>
        <Grid item xs={12} sm={4}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <Staticprofile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          {postMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  //openDialog: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserDetails })(user);
