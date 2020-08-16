import React, { Fragment, useEffect, useRef } from "react";
import { useStoreActions } from "easy-peasy";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import GithubIcon from "@material-ui/icons/GitHub";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import IntroLogo from "../../assets/intro.svg";
import WhenLogo from "../../assets/when.svg";
import FaqLogo from "../../assets/faq.svg";
import LoginLogo from "../../assets/login.svg";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    padding: "1em"
  },
  appbar: {
    backgroundColor: "rgba(0, 0, 128, 0.8)"
  },
  image: {
    width: "50%",
    maxWidth: 480
  },
  section: {
    marginBottom: "5em",
    padding: "1em"
  },
  toolbar: {
    justifyContent: "flex-end"
  },
  footer: {
    padding: "3em 2em 2em 2em",
    backgroundColor: "rgba(0, 0, 128, 0.8)",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0.8em",
    fontFamily: "roboto"
  }
});

function GuestUser() {
  const classes = useStyles();
  const loginSection = useRef();
  const setGoogleLoginUI = useStoreActions(
    actions => actions.auth.setGoogleLoginUI
  );

  useEffect(() => {
    (() => {
      setGoogleLoginUI();
    })();
  }, []);

  return (
    <div>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="end" color="primary">
            <Button
              size="small"
              variant="contained"
              disableElevation
              onClick={() =>
                loginSection.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "end"
                })
              }
            >
              Login
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <div className={classes.section}>
          <div>
            <img src={IntroLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h1>What Is This?</h1>
            <p>An app that keeps track of common household items for you</p>
          </div>
        </div>
        <div className={classes.section}>
          <div>
            <img src={WhenLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h1>When/ Where Can I Use It?</h1>
            <p>
              It started off as a way to have a list of things you need before
              the next lockdown
            </p>
          </div>
        </div>
        <div className={classes.section}>
          <div>
            <img src={FaqLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h1>I have more questions</h1>
            <p>Read our FAQ</p>
          </div>
        </div>
        <div ref={loginSection} className={classes.section}>
          <div>
            <img src={LoginLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h1>Login</h1>
            <span>You. Are. Guest! Why. Are. You. Guest?</span>
          </div>
          <div>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <Box component="div" display="inline">
          This project created by rodiwa
        </Box>
        <Box>
          <IconButton>
            <GithubIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Box>
      </div>
    </div>
  );
}

export default GuestUser;
