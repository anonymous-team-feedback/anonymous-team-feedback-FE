import React from "react";
import { connect } from "react-redux";

import ListFeedback from "../ListFeedback/ListFeedback.js";
import PostFeedback from "../PostFeedback/PostFeedback.js";

const Dashboard = props => {
  return (
    <div className="Dashboard">
      <h1>Dashboard component🚗</h1>
      <ListFeedback />
      <PostFeedback />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
