import { connect } from "react-redux";
import React, { Component } from "react";
import { Menu, Icon, Dropdown, Grid, MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Text } from "react-native";
import { signIn, signOut } from "../actions";
import "./css/Header.css";
import history from "../history";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { get_Info, click_left_sidebar } from "../actions";
class Header extends Component {
  render() {
    const username = this.props.userEmail;
    
    //sign out action creator

    const handleDropDownSelect = (event, data) => {
      if (data.value === "sign_out") {
        this.props.signOut();
        history.push("/");
      } else if (data.value === "log_in") {
        history.push("/login");
      } else if (data.value === "register") {
        history.push("/register");
      } else if (data.value === "info") {
        history.push("/citebook/edit_info");
        this.props.click_left_sidebar("info");
      } else if (data.value === "profile") {
        history.push(`/citebook/profile/${this.props.auth.userId}`);
        this.props.click_left_sidebar("profile");
      }
    };
    const trigger_in = (
      <span>
        <Icon name="user" /> Hello {this.props.auth.fname}
      </span>
    );

    const trigger_out = (
      <span>
        <Icon name="user" />
      </span>
    );
    const options_out = [
      { key: "register", text: "Register", value: "register" },
      { key: "log_in", text: "Log In", value: "log_in" },
    ];
    const options_in = [
      {
        key: "user",
        text: (
          <span>
            Signed in as <strong>{username}</strong>
          </span>
        ),
        disabled: true,
      },
      { key: "profile", text: "Profile", value: "profile" },
      { key: "info", text: "Edit info", value: "info" },
      { key: "sign_out", text: "Sign Out", value: "sign_out" },
    ];

    const style_a = {
      padding: "5px",
      color: "black",
    };

    return (
      <div>
        <Menu style={{ margin: "0px" }} fluid borderless>
          <Menu.Item>
            <Link
              to="/citebook"
              onClick={() => {
                if (this.props.isSignedIn) {
                  this.props.info.clicked_value = "citebook";
                }
              }}
              className="item"
            >
              <img alt="" src="http://localhost:8000/posts_pdf/logo.png" />
              <Text style={style_a}> Citebook</Text>
            </Link>
          </Menu.Item>
          <Menu.Item position="right">
            {!this.props.isSignedIn && (
              <Dropdown
                onChange={handleDropDownSelect}
                trigger={trigger_out}
                options={options_out}
                value={null}
                direction={"left"}
              />
            )}
            {this.props.isSignedIn && (
              <Dropdown
                direction={"left"}
                onChange={handleDropDownSelect}
                trigger={trigger_in}
                options={options_in}
                value={null}
              />
            )}
          </Menu.Item>
        </Menu>
        {this.props.isSignedIn && 
          <Menu
            style={{ margin: "0px", backgroundColor: "#F5F5F5" }}
            fluid
            borderless
          >
            <MenuItem></MenuItem>
            <MenuItem>
              <Link
                to="/citebook"
                onClick={() => {
                  if (this.props.isSignedIn) {
                    this.props.click_left_sidebar("citebook");
                  }
                }}
                className="menu-item"
                style={{
                  fontWeight: "bold",
                  backgroundColor:
                    this.props.info.clicked_value === "citebook" ? "#00b5ad" : "transparent",
                  color: this.props.info.clicked_value === "citebook" ? "white" : "inherit",
                  borderRadius: "20px",
                  padding: "8px 16px",
                }}
              >
                <Text>Home</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/citebook/upload"
                onClick={() => {
                  if (this.props.isSignedIn) {
                    this.props.click_left_sidebar("upload");
                  }
                }}
                className="menu-item"
                style={{
                  fontWeight: "bold",
                  backgroundColor:
                    this.props.info.clicked_value === "upload"
                      ? "#00b5ad"
                      : "transparent",
                  color:
                    this.props.info.clicked_value === "upload"
                      ? "white"
                      : "inherit",
                  borderRadius: "20px",
                  padding: "8px 16px",
                }}
              >
                <Text>Upload a paper</Text>
              </Link>
            </MenuItem>
          </Menu>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userEmail: state.auth.userEmail,
    auth: state.auth,
    info: state.info,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  click_left_sidebar,
})(Header);
