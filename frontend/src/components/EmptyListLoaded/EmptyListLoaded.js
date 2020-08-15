import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  emptyList: {}
}));

const EmptyListLoaded = () => {
  const classes = useStyles();

  return (
    <div className={classes.emptyList}>
      <p>Nothing to show here</p>
    </div>
  );
};

export default EmptyListLoaded;
