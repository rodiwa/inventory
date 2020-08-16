import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthButton from "../AuthButtons/AuthButtons";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import deleteIcon from "../../assets/delete.svg";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "1.5em"
  },
  paper: {
    padding: "0 1em 1em 1em",
    marginBottom: "2em"
  },
  image: {
    width: "60%"
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2>Settings</h2>

      <Paper variant="outlined" className={classes.paper}>
        <h4>Logout</h4>
        <img src={deleteIcon} className={classes.image} />
        <p>Need a break? Go on.</p>
        <AuthButton />
      </Paper>
    </div>
  );
};

export default Settings;
