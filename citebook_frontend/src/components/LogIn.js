import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Checkbox,
  Container,
} from "semantic-ui-react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import history from "../history";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { REMEMBER_ME, FORGET_ME } from "../actions/types";
import { Link } from "react-router-dom";

const LogIn = (props) => {
  const [email, setEmail] = useState(props.rememberme.email);
  const [password, setPassword] = useState(props.rememberme.password);
  const [forgotpass, setForgotPass] = useState(false);
  const [error, setErrors] = useState(false);
  const [errormsg, setErrorMsg] = useState("");
  const [rememberpass, setRememberpass] = useState(props.rememberme.flag);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isSignedIn) {
      props.info.clicked_value = "citebook";
      history.push("/citebook");
    }
  });
  const signInClick = async () => {
    //get request to check validation je meta dispatch sign in

    let formvalues = {
      email,
      password,
      rememberpass,
    };
    const response = await dispatch(signIn(formvalues));
    if (rememberpass) {
      dispatch({
        type: REMEMBER_ME,
        payload: formvalues,
      });
    } else {
      dispatch({
        type: FORGET_ME,
      });
    }
    if (response) {
      setErrors(true);
      setErrorMsg(response);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response}`,
      });
    } else {
      setErrors(false);
      setErrorMsg("");
      props.info.clicked_value = "citebook";
      history.push("/citebook");
    }
  };
  return (
    <div id="back">
      <img
        alt=""
        style={{ width: "100%", position: "absolute" }}
        src="http://localhost:8000/posts_pdf/bookswall.jpg"
      />
      <Grid
        textAlign="center"
        container
        columns={1}
        style={{ margin: 0 }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450, top: 300 }}>
          <Header as="h2" block color="teal" textAlign="center">
            <Image src="http://localhost:8000/posts_pdf/logo.png" /> Log-in to
            your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                required={true}
                error={error}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                required={true}
                error={error}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Input style={{ margin: "0px !important" }}>
                <Checkbox
                  label="Remember me"
                  checked={rememberpass}
                  onChange={(e) => setRememberpass(!rememberpass)}
                />
              </Form.Input>

              <Button
                fluid
                onClick={signInClick}
                color="teal"
                size="large"
                type="submit"
              >
                Login
              </Button>
              <Form.Input>
                <p className="forgot-password text-left">
                  <Link to={"/reset"}> Forgot password?</Link>
                </p>
              </Form.Input>
            </Segment>
          </Form>

          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    info: state.info,
    rememberme: state.rememberme,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(LogIn);
