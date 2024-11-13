import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Icon,
  Header,
  Image,
  Container,
  Segment,
  Form,
  TextArea,
  Checkbox,
  Label,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./css/Posts.css";
import moment from "moment";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  like_post,
  if_liked,
  delete_post,
  my_post,
  get_picture_url,
  file_flag,
  edit_post,
  user_viewed_post,
} from "../actions";
import history from "../history";

const Post = (props) => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const [pdf_flag, setPdf_flag] = useState(false);
  const [description, setDescription] = useState(props.post_prop.description);
  const [title, setTitle] = useState(props.post_prop.title);
  const [authors, setAuthors] = useState(props.post_prop.authors);
  const [viewable, setViewable] = useState();
  const [picture_url, setPicture_url] = useState(
    "http://localhost:8000/posts_pdf/profile_pic.jpg"
  );
  const [filename, setFileName] = useState("");
  const [pdf, setPdf] = useState();
  const inputRef = useRef(null);
  const [keywords, setKeywords] = useState(props.post_prop.keywords);
  const [hasSeen, setHasSeen] = useState(false);

  /* Submit post for post details*/

  const submit_post = async () => {
    if (pdf != null) {
      formData.append("file", pdf);
    }
    formData.append("description", description);
    formData.append("authors", authors);
    if (viewable) {
      formData.append("viewable", 1);
    } else {
      formData.append("viewable", 0);
    }
    formData.append("post_id", props.post_prop.id);
    formData.append("title", title);
    formData.append("keywords", keywords);

    const response = await dispatch(edit_post(formData));
    if (response !== 0) {
      if (pdf != null) {
        setPdf_flag(false);
      }
      Swal.fire({
        icon: "success",
        title: "You edited your post",
      });
    }

    setOpen3(false);
    const response2 = await dispatch(my_post(props.userId));
  };

  const handleClick2 = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = null;
    setFileName(fileObj.name);
    setPdf(fileObj);
    //  formData.append('file',fileObj);
  };

  useEffect(() => {
    let formvalues = {
      user_id: props.userId,
      post_id: props.post_prop.id,
    };

    if (props.info.clicked_value != "info") {
      check_if_likes(formvalues);
      get_prof_pictures();
      check_file();
    }
    if (props.post_prop.view == 1) {
      setViewable(true);
    } else setViewable(false);
    //na checkari an en dika m na kamo true flag
  }, [pdf_flag]);

  const check_file = async () => {
    const response = await dispatch(file_flag(props.post_prop.id));
    if (response == 0) {
      setPdf_flag(true);
    }
  };
  const get_prof_pictures = async () => {
    const response = await dispatch(get_picture_url(props.post_prop.users_id));
    if (response.file_path != "posts_pdf/profile_pic.jpg") {
      setPicture_url("http://localhost:8000/" + response.file_path);
    }
  };

  useEffect(() => {
    const markAsSeen = async () => {
      try {
        let formValues = {
          user_id: props.userId,
          post_id: props.post_prop.id,
        };
        const response = await dispatch(user_viewed_post(formValues));
      } catch (error) {
        console.error("Error marking post as seen:", error);
      }
    };
    markAsSeen();
  }, [props.post_prop.id, props.userId]);

  const check_if_likes = async (formvalues) => {
    const response = await dispatch(if_liked(formvalues));
    if (response == 1) {
      setActive(true);
    } else if (response == 0) {
      setActive(false);
    }
  };

  const [active, setActive] = useState(false);
  let url_file = `http://localhost:8000/api/get_file/${props.post_prop.id}`;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const date = moment(props.post_prop.created_at).format("DD-MMM-YYYY");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleClick = () => {
    if (active === false) {
      setActive(true);
      props.post_prop.likes += 1;
    } else {
      setActive(false);
      props.post_prop.likes -= 1;
    }

    like_Post();
  };

  const like_Post = async () => {
    let formValues = {
      user_id: props.userId,
      post_id: props.post_prop.id,
    };

    const response = await dispatch(like_post(formValues));
  };

  const delete_Post = async () => {
    let formvalues = {
      post_id: props.post_prop.id,
      user_ud: props.userId,
    };
    const response = await dispatch(delete_post(formvalues));
    const respone2 = await dispatch(my_post(props.userId));
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <Segment raised>
        <div className="post">
          <div className="image_header">
            <Image src={picture_url} circular floated="left" />
            {props.post_prop.users_id === props.userId && (
              <Modal
                className="delete"
                basic
                onClose={() => setOpen2(false)}
                onOpen={() => setOpen2(true)}
                open={open2}
                size="small"
                trigger={
                  <Icon
                    style={{ position: "absolute", right: "20px", top: "20px" }}
                    className="trash1"
                    name="trash"
                  />
                }
              >
                <Header icon>
                  <Icon name="trash" />
                  Delete your post
                </Header>
                <Modal.Content>
                  <h3 style={{ textAlign: "center" }}>
                    Are you sure you want to delete your post: "
                    {props.post_prop.title}"?
                  </h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    basic
                    color="green"
                    inverted
                    onClick={() => setOpen2(false)}
                  >
                    <Icon name="remove" /> No
                  </Button>
                  <Button
                    color="red"
                    inverted
                    onClick={() => {
                      setOpen2(false);
                      delete_Post();
                    }}
                  >
                    <Icon name="checkmark" /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
            {props.post_prop.users_id === props.userId && (
              <Modal
                size="large"
                onClose={() => setOpen3(false)}
                onOpen={() => setOpen3(true)}
                open={open3}
                trigger={
                  <Icon
                    style={{ position: "absolute", right: "60px", top: "20px" }}
                    className="edit"
                    name="edit"
                  />
                }
              >
                <Modal.Header>Edit Post</Modal.Header>

                <Modal.Content>
                  <Modal.Description>
                    <Form>
                      <Form.Field>
                        <label>Title:</label>
                        <Form.Input
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Authors:</label>
                        <Form.Input
                          placeholder="Authors"
                          value={authors}
                          onChange={(e) => setAuthors(e.target.value)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Abstract:</label>
                        <TextArea
                          placeholder="Abstract"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Field>
                      <Form.Group>
                        <Form.Field width="15">
                          <label>Keywords:</label>
                          <Form.Input
                            style={{ marginTop: "10px" }}
                            placeholder="Keywords"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                          />
                        </Form.Field>
                        <Form.Field style={{ marginTop: "42px" }}>
                          <Checkbox
                            label="Viewable"
                            checked={viewable}
                            onChange={(e) => setViewable(!viewable)}
                          />
                        </Form.Field>
                      </Form.Group>
                      {pdf_flag && (
                        <div className="upload_pdf_edit">
                          <Header
                            as="h4"
                            style={{ marginBottom: "0px" }}
                            floated="left"
                          >
                            Upload pdf:
                          </Header>
                          <a>{filename} </a>
                          <br />
                          <Button
                            animated
                            style={{ width: "20%", marginRight: "10px" }}
                            onClick={handleClick2}
                          >
                            <Button.Content visible>
                              <Icon name="file pdf" />
                            </Button.Content>
                            <Button.Content hidden>
                              <Icon name="upload" />
                            </Button.Content>
                          </Button>
                          <input
                            style={{ display: "none" }}
                            ref={inputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                          />
                        </div>
                      )}
                    </Form>
                  </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                  <Button color="red" onClick={() => setOpen3(false)}>
                    Cancel
                  </Button>

                  <Button
                    icon
                    className="d"
                    type="submit"
                    onClick={submit_post}
                  >
                    <Icon name="check" color="black" />
                    Submit
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
            <div className="info">
              <span>
                <Link to={`/citebook/profile/${props.post_prop.users_id}`}>
                  {props.post_prop.fname} {props.post_prop.lname}
                </Link>{" "}
              </span>
              <br />
              <span>Published: {date}</span>
              <span>, Authors: {props.post_prop.authors}</span>
              <br />{" "}
              {!props.post_prop.google_scholar && (
                <span>#{props.post_prop.keywords}</span>
              )}
              {props.post_prop.google_scholar && (
                <a href={props.post_prop.keywords}>
                  {props.post_prop.keywords}
                </a>
              )}
            </div>
          </div>

          <div className="description">
            <h3>{props.post_prop.title}</h3>
            <Container fluid>{props.post_prop.description}</Container>
          </div>
          <div className="buttons_bottom_post">
            <Button
              toggle
              active={active}
              className="like"
              content="Like"
              icon="heart"
              size="mini"
              label={{
                basic: true,
                pointing: "left",
                content: `${props.post_prop.likes}`,
              }}
              onClick={handleClick}
            />

            <Modal
              className="pdf_viewer"
              size="large"
              closeIcon
              open={open}
              trigger={
                <Button disabled={pdf_flag} icon className="paper" size="small">
                  <Icon name="file pdf" color="black" />
                  Tap to read..
                </Button>
              }
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header icon="file pdf" content={props.post_prop.title} />
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "750px",
                }}
              >
                <Modal.Content scrolling>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={url_file}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </Modal.Content>
              </div>
            </Modal>
          </div>
        </div>
      </Segment>
    </div>
  );
};
const mapStateToProps = (state, ownprops) => {
  return {
    userId: state.auth.userId,
    info: state.info,
  };
};
export default connect(mapStateToProps, { like_post, delete_post })(Post);
