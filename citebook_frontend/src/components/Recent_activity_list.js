import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Card, Feed } from "semantic-ui-react";
import { useEffect } from "react";
import { recent_likes, get_picture_url } from "../actions";
import moment from "moment";
import Recent_activity from "./Recent_activity";
export const Recent_activity_list = (props) => {
  const [notifications, setNotifications] = useState();
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  const check_noti = async () => {
    const response = await dispatch(recent_likes(props.userId));
    setNotifications(response);
    response.map((re) => setDate(moment(re.created_at).format("DD-MMM-YYYY")));
  };

  useEffect(() => {
    check_noti();
  }, [props.info.clicked_value == "citebook"]);
  return (
    <Card>
      <Card.Content>
        <Card.Header>Recent Activity</Card.Header>
      </Card.Content>
      {notifications &&
        notifications
          .slice(0, 3)
          .map((notification, index) => (
            <Recent_activity
              key={index}
              noti={notification}
              date={moment(notification.created_at).format("DD-MMM-YYYY")}
            />
          ))}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    post_list: state.post.new_posts,
    info: state.info,
  };
};

export default connect(mapStateToProps, {})(Recent_activity_list);
