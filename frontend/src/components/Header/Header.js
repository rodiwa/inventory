import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "rgba(0, 0, 128, 0.8)",
    color: "white"
  },
  navIcon: {
    color: "white"
  }
}));

const Title = () => {
  const [title, setTitle] = useState("");
  const location = useLocation();
  const classes = useStyles();

  const getHeaderTitle = pathName => {
    if (pathName === "/") {
      return "";
    }
    if (pathName.match(/category\/meta/g)) {
      return "All Items";
    }
    if (pathName.match(/items\/meta/g)) {
      return "All Items";
    }
    if (pathName.match(/items/g)) {
      return "All Categories";
    }
    if (pathName.match(/settings/g)) {
      return "Home";
    }
  };

  useEffect(() => {
    const { pathname } = location;
    setTitle(getHeaderTitle(pathname));
  }, [location]);

  return <Typography>{title}</Typography>;
};

const HeaderNavLink = () => {
  const categoryId = useStoreState(state => state.app.category);
  const [navLink, setNavLink] = useState("/");
  const [navLinkIcon, setNavLinkIcon] = useState(null);
  const location = useLocation();
  const classes = useStyles();

  const getHeaderNavLink = pathName => {
    if (pathName === "/") {
      return "/";
    }
    if (pathName.match(/category\/meta/g)) {
      if (typeof categoryId !== "string") {
        // is category id not found (reload scenario), goto home
        return "/";
      }
      return `/items/${categoryId}`;
    }
    if (pathName.match(/items\/meta/g)) {
      if (typeof categoryId !== "string") {
        // is category id not found (reload scenario), goto home
        return "/";
      }
      console.log(categoryId);
      return `/items/${categoryId}`;
    }
    if (pathName.match(/items/g)) {
      return "/";
    }
    if (pathName.match(/settings/g)) {
      return "/";
    }
  };

  const getHeaderNavLinkIcon = pathName => {
    if (pathName === "/") {
      return null;
    }
    if (pathName.match(/settings/g)) {
      return <HomeIcon className={classes.navIcon} />;
    }
    return <ArrowBack className={classes.navIcon} />;
  };

  useEffect(() => {
    const { pathname } = location;
    setNavLink(getHeaderNavLink(pathname));
    setNavLinkIcon(getHeaderNavLinkIcon(pathname));
  }, [location]);

  return <Link to={navLink}>{navLinkIcon}</Link>;
};

const Header = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="transparent"
        className={classes.appBar}
        elevation={1}
      >
        <Toolbar>
          <IconButton edge="start" color="primary">
            <HeaderNavLink />
          </IconButton>
          <Title />
          <div className={classes.grow} />
          <IconButton edge="end" color="primary">
            <Link to="/settings">
              <SettingsIcon className={classes.navIcon} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
