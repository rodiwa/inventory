import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import logo from "../../assets/add.svg";

const MESSAGES = {
  CATEGORY: "You can create a Category and add items in it!",
  ITEMS: "You have not added any items yet!"
};

const useStyles = makeStyles(theme => ({
  emptyList: {},
  image: {
    width: "30%"
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const getMessage = (type = "category") => MESSAGES[type.toUpperCase()];

const EmptyListLoaded = props => {
  const { type } = props;
  const classes = useStyles();

  return (
    <div className={classes.emptyList}>
      <img src={logo} className={classes.image} />
      <p className={classes.text}>{getMessage(type)}</p>
      <p className={classes.text}>
        Click on the {<AddIcon />} icon to get started
      </p>
    </div>
  );
};

export default EmptyListLoaded;
