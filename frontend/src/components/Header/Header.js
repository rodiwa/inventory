import React from "react";
import { useStoreState } from "easy-peasy";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

const Header = () => {
  const pageInfo = useStoreState(state => state.app.link);
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="primary">
            <Link to="/">
              <HomeIcon color="primary" />
            </Link>
          </IconButton>
          <Typography>{pageInfo.title}</Typography>
          <div className={classes.grow} />
          <IconButton edge="end" color="primary">
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
