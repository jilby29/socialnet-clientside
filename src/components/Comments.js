import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

const style = {
  horizontalbar: {
    display: "none",
  },

  profileimage: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
    marginLeft: 80,
  },

  commentData: {
    marginLeft: 120,
  },

  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, signupuser, userImage } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="profile"
                      className={classes.profileimage}
                    />
                  </Grid>

                  <Grid item sm={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/user/${signupuser}`}
                        color="secondary"
                      >
                        {signupuser}
                      </Typography>
                      <hr className={classes.horizontalbar} />
                      <Typography variant="body1">{body}</Typography>
                      <hr className={classes.horizontalbar} />
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propType = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(style)(Comments);
