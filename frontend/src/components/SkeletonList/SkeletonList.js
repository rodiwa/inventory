import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  skeletonList: {
    margin: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
}));

const SkeletonList = () => {
  const classes = useStyles();

  return Array.from([1, 2, 3]).map((item, idx) => {
    return (
      <div className={classes.skeletonList} key={idx}>
        <Skeleton height={45} width={45} variant="circle" />
        <Skeleton height={30} width="80%" />
      </div>
    );
  });
};

export default SkeletonList;
