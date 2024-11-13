import React from "react";
import { connect } from "react-redux";
import history from "../history";
import { useEffect } from "react";

const HomePage = (props) => {
  useEffect(() => {
    if (props.isSignedIn) {
      history.push("/citebook");
    }
  });
  return (
    <img
      alt=""
      style={{ width: "100%", display: "flex" }}
      src="http://localhost:8000/posts_pdf/bookswall.jpg"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {})(HomePage);
