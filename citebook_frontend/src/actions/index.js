import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
  CREATE_POST,
  FEED_POST,
  LIKE_POST,
  VIEW_POST,
  GET_INFO,
  SET_CLICKED_VALUE,
  UPLOAD_PROFILE,
  USER_LIST,
  EDIT_ACCOUNT,
  RANDOM_POST,
} from "./types";
import user from "../apis/user";
import Swal from "sweetalert2";
import google_scholar from "../apis/google_scholar";
import Edit_info from "../components/Edit_info";
import setgs_error from "../components/Edit_info";

export const signIn = (formValues) => async (dispatch, getState) => {
  const response = await user.post("/login", formValues);
  if (response.data.error) {
    return response.data.error;
  }
  dispatch({
    type: SIGN_IN,
    payload: response.data,
  });
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const register_ac = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("register", formValues);
    if (response.data.status != 200) {
      //response.data.errors.forEach(element=>console.log(element))
      let a = "";
      if (response.data.errors.email) {
        a = a.concat(response.data.errors.email);
      }
      if (response.data.errors.fname) {
        a = a.concat(response.data.errors.fname);
      }
      if (response.data.errors.lname) {
        a = a.concat(response.data.errors.lname);
      }
      if (response.data.errors.interests) {
        a = a.concat(response.data.errors.interests);
      }
      if (response.data.errors.passwords) {
        a = a.concat(response.data.errors.passwords);
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${a}`,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Verify your email to log in",
      });
      dispatch({ type: REGISTER, payload: response.data });
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const add_post = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("/addpost", formValues);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
      return 0;
    } else {
      dispatch({
        type: CREATE_POST,
        payload: null,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
    return 0;
  }
};
export const edit_post = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("/edit_post", formValues);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
      return 0;
    } else {
      dispatch({
        type: CREATE_POST,
        payload: response.data,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
    return 0;
  }
};

export const feed_post = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/feed_posts/${formValues}`);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
      return 0;
    } else {
      dispatch({
        type: FEED_POST,
        payload: response.data,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
    return 0;
  }
};

export const get_posts = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`get_all_posts/${formValues}`);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
      return 0;
    } else {
      dispatch({
        type: RANDOM_POST,
        payload: response.data,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
    return 0;
  }
};

/* Request post to get data from form */

export const my_post = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/my_posts/${formValues}`);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
      return 0;
    } else {
      dispatch({
        type: FEED_POST,
        payload: response.data,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
    return 0;
  }
};

export const personalized_posts =
  (formValues) => async (dispatch, getState) => {
    try {
      const response = await user.get(`/personalized_feed/${formValues}`);
      if (response.data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response.data.error}`,
        });
        return 0;
      } else {
        dispatch({
          type: FEED_POST,
          payload: response.data,
        });
        return response;
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
      return 0;
    }
  };

export const profile_posts = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/profile_posts/${formValues}`);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
      return 0;
    } else {
      dispatch({
        type: FEED_POST,
        payload: response.data,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
    return 0;
  }
};

export const like_post = (formValues) => async (dispatch, getState) => {
  try {
    const response2 = await user.post("/like_post", formValues);
    dispatch({
      type: LIKE_POST,
      payload: response2,
    });
    return response2;
  } catch (err) {
    console.log(err);
  }
};

export const user_viewed_post = (formValues) => async (dispatch, getState) => {
  try {
    const response2 = await user.post("/user_viewed_post", formValues);
    dispatch({
      type: VIEW_POST,
      payload: response2,
    });
    return response2;
  } catch (err) {
    console.log(err);
  }
};

export const user_interactions_matrix = () => async (dispatch, getState) => {
  try {
    const response = await user.get("/user-interactions-matrix");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const if_liked = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(
      `/its_liked/${formValues.user_id}/${formValues.post_id}`
    );
    return response.data;
  } catch (err) {
    console.log("error: if_liked");
  }
};

export const search_feed = (posts) => {
  return {
    type: FEED_POST,
    payload: posts,
  };
};

export const get_Info = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/user_info/${formValues}`);
    dispatch({
      type: GET_INFO,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    console.log("error: if_liked");
  }
};
export const get_user_profile = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/user_profile/${formValues}`);
    return response.data;
  } catch (err) {
    console.log("error: user_profile");
  }
};

export const click_left_sidebar = (clicked_value) => {
  return {
    type: SET_CLICKED_VALUE,
    payload: clicked_value,
  };
};

export const delete_post = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.delete(`/delete_post/${formValues.post_id}`);
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${err}`,
    });
  }
};

export const recent_likes = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/recent_likes/${formValues}`);
    return response.data;
  } catch (err) {
    console.log("error: recent_likes");
  }
};

export const upload_Picture = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("/upload_picture", formValues);
    dispatch({
      type: UPLOAD_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    console.log("error: upload_picture");
  }
};
export const get_picture_url = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/picture_url/${formValues}`);
    return response.data[0];
  } catch (err) {
    console.log("error: get_picture url");
  }
};
export const get_usernames = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/usernames/${formValues}`);
    dispatch({
      type: USER_LIST,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    console.log("error: get_picture url");
  }
};
export const get_Info_follow = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/user_info/${formValues}`);
    return response.data;
  } catch (err) {
    console.log("error: if_liked");
  }
};
export const get_users = (users) => {
  return {
    type: USER_LIST,
    payload: users,
  };
};
export const follow_User = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("/follow_user", formValues);
    return response.data;
  } catch (err) {
    console.log("error: get_picture url");
  }
};
export const Unfollow_User = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.delete(
      `/unfollow_user/${formValues.user_id}/${formValues.follow_id}`,
      formValues
    );

    return response.data;
  } catch (err) {
    console.log("error: get_picture url");
  }
};
export const file_flag = (post_id) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/check_file/${post_id}`);

    return response.data;
  } catch (err) {
    console.log("error: file_flag");
  }
};
export const edit_acc_info = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("/edit_account", formValues);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
    } else {
      dispatch({
        type: EDIT_ACCOUNT,
        payload: formValues,
      });
      Swal.fire({
        icon: "success",
        title: "Info Changed",
      });
      return response.data;
    }
    return response;
  } catch (err) {
    console.log("error: file_flag");
  }
};
export const change_password = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("/change_password", formValues);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.error}`,
      });
    } else {
      if (response.data == "wrong password") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Password",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Password Changed",
        });
        return response.data;
      }
    }
    return response;
  } catch (err) {
    console.log("error: passs change");
  }
};
export const get_followers = (user_id) => async (dispatch, getState) => {
  try {
    const response = await user.get(`/get_followers/${user_id}`);

    return response.data;
  } catch (err) {
    console.log("error: follower_list");
  }
};
export const reset_pass = (email) => async (dispatch, getState) => {
  try {
    const response = await user.post("reset_pass", email);
    if (response.data.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.message}`,
      });
      return response;
    } else {
      Swal.fire({
        icon: "success",
        title: "Check your email",
      });
      return "sucesss";
    }
  } catch (err) {
    console.log("error: reset pass");
  }
};
export const reset_pass2 = (formvalues) => async (dispatch, getState) => {
  try {
    const response = await user.post("reset_pass2", formvalues);
    if (response.data.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response.data.message}`,
      });
      return "error";
    } else {
      Swal.fire({
        icon: "success",
        title: "New password set",
      });
      return "success";
    }
  } catch (err) {
    console.log("error: reset pass2");
  }
};

export const google_scholar_get =
  (formValues) => async (dispatch, getState) => {
    try {
      //https://serpapi.com/search.json?engine=google_scholar_author&author_id=-xDtoxYAAAAJ&hl&start=0&api_key=05f4198376581658c9964c45c3ee3cf56fb89d3284a0e4f8a7dc45dac9b6997d
      //const response= await google_scholar.get(`-xDtoxYAAAAJ&hl&start=0&api_key=05f4198376581658c9964c45c3ee3cf56fb89d3284a0e4f8a7dc45dac9b6997d`);
      //const response = await google_scholar.get('https://serpapi.com/search.json?engine=google_scholar_author&author_id=`${formValues.author_id}`&hl&start=`${formValues.offset}`&api_key=`${formValues.api_key}`')
      //,{headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'}}
      const response = await google_scholar.get(
        `search.json?engine=google_scholar_author&author_id=${formValues.author_id}&hl&start=${formValues.offset}&api_key=${formValues.api_key}`
      );

      if (!response.data.articles) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response.data.error}`,
        });
        return 0;
      } else {
        return response.data.articles;
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
      return 0;
    }
  };

export const add_post_scholar = (formValues) => async (dispatch, getState) => {
  try {
    const response = await user.post("add_post_scholar", formValues);
    //const response= await user.post("/add_post_scholar",formValues);
    if (!response) {
      return 0;
    }
    dispatch({
      type: CREATE_POST,
      payload: null,
    });
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
