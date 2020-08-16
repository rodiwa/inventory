import React, { Fragment, useEffect, useRef } from "react";
import { useStoreActions } from "easy-peasy";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import IntroLogo from "../../assets/intro.svg";
import WhenLogo from "../../assets/when.svg";
import FaqLogo from "../../assets/faq.svg";
import LoginLogo from "../../assets/login.svg";

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
    borderTop: "2px dashed cornflowerblue",
    padding: 15
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
            <h3>What Is This?</h3>
            <p>
              Simple tool to help you remember things next time you need to dash
              2 days before your loackdown
            </p>
          </div>
        </div>
        <div className={classes.section}>
          <div>
            <img src={WhenLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h3>When/ Where Can I Use It?</h3>
            <p>Anywhere you make a list of things to buy</p>
          </div>
        </div>
        <div className={classes.section}>
          <div>
            <img src={FaqLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h3>I have more questions</h3>
            <p>Read our FAQ</p>
          </div>
        </div>
        <div ref={loginSection} className={classes.section}>
          <div>
            <img src={LoginLogo} className={classes.image} alt="intro image" />
          </div>
          <div>
            <h3>Login</h3>
            <span>You. Are. Guest! Why. Are. You. Guest?</span>
          </div>
          <div>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>This is me</div>
    </div>
  );
}

export default GuestUser;
