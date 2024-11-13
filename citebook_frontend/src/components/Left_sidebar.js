import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Label, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { get_Info, click_left_sidebar, get_posts } from "../actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import history from "../history";
import Random_post from "./Random_post";
const Left_sidebar = (props) => {
  const [picture_url, setPicture_url] = useState(
    "http://localhost:8000/posts_pdf/profile_pic.jpg"
  );
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("");
  const handleItemClick = async (e, { name }) => {
    setActiveItem(name);

    await dispatch(click_left_sidebar(name));
    history.push(`/citebook/upload/${name}`);
  };

  const get_info = async () => {
    const response = await dispatch(get_Info(props.userId));
    // await dispatch(click_left_sidebar(null));
    const response2 = await dispatch(get_posts(props.userId));
  };
  useEffect(() => {
    get_info();
    setPicture_url("http://localhost:8000/posts_pdf/profile_pic.jpg");
    if (props.picture != "posts_pdf/profile_pic.jpg") {
      setPicture_url(`http://localhost:8000/${props.picture}`);
    }
  }, [props.posts, props.info.clicked_value]);

  return (
    <div style={{ marginRight: "10px ", marginLeft: "15px" }}>
      <Menu vertical size="large">
        <Link to="/" className="item">
          <img alt="" style={{ width: "100%" }} src={picture_url} />
        </Link>
        <Menu.Item
          name="followers"
          active={activeItem === "followers"}
          onClick={handleItemClick}
        >
          <Label color="teal">{props.info.followers}</Label>
          Followers
        </Menu.Item>
        <Menu.Item
          name="papers"
          active={activeItem === "papers"}
          onClick={handleItemClick}
        >
          <Label>{props.info.papers}</Label>
          Papers
        </Menu.Item>
      </Menu>
      {props.random_posts &&
        props.random_posts
          .slice(0, 2)
          .map((post, index) => <Random_post key={index} post={post} />)}
    </div>
  );
};
const mapStateToProps = (state, ownprops) => {
  return {
    userId: state.auth.userId,
    picture: state.auth.file_path,
    info: state.info,
    posts: state.post.new_posts,
    random_posts: state.post.random_posts,
  };
};
export default connect(mapStateToProps, {
  get_Info,
  click_left_sidebar,
  get_posts,
})(Left_sidebar);
