import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as EmailValidator from "email-validator";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import collabIcon from "../../assets/collab2.svg";
import deleteIcon from "../../assets/delete.svg";
import Button from "@material-ui/core/Button";

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
  },
  inputForm: {
    padding: "1em"
  }
}));

const ItemsMoreSettings = props => {
  const { categoryId } = props.match.params;
  const userId = useStoreState(state => state.auth.user.uid);
  const loggedInEmailId = useStoreState(state => state.auth.user.email);
  const shareCategoryRef = React.useRef();
  const share = useStoreState(state => state.db.share);
  const getAllCategoryShareAction = useStoreActions(
    actions => actions.db.getAllCategoryShareAction
  );
  const removeShareCategoryAction = useStoreActions(
    actions => actions.db.removeShareCategoryAction
  );
  const shareCategoryAction = useStoreActions(
    actions => actions.db.shareCategoryAction
  );
  const deleteCategoryAction = useStoreActions(
    actions => actions.db.deleteCategoryAction
  );
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await getAllCategoryShareAction({ categoryId, userId });
    })();
  }, []);

  const onRemoveCategoryShare = async collab => {
    if (window.confirm("Are you sure?")) {
      const { userId } = collab;
      await removeShareCategoryAction({ categoryId, userId });
    }
  };

  const onShareCategory = async e => {
    e.preventDefault();
    const emailId = shareCategoryRef.current.value;
    if (!EmailValidator.validate(emailId)) {
      // TODO: add alert toaster here
      return console.error("Enter valid email only");
    }
    if (emailId === loggedInEmailId) {
      return console.error("Cannot add your own email id");
    }
    await shareCategoryAction({ categoryId, emailId });
    shareCategoryRef.current.value = "";
  };

  const onDeleteCategory = async () => {
    const isConfirm = window.confirm(
      "Sure you wanna delete this category? This cannot be undone!"
    );
    if (isConfirm) {
      await deleteCategoryAction({ categoryId });
      history.push("/");
    }
  };

  const ShareDetails = () => {
    return (
      <React.Fragment>
        <List component="nav">
          {share.map((shareItem, idx) => {
            return (
              <React.Fragment key={idx}>
                <ListItem button>
                  <ListItemText primary={shareItem.emailId} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => onRemoveCategoryShare(shareItem)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </React.Fragment>
    );
  };

  const NoCollabAdded = () => {
    return (
      <React.Fragment>
        <img src={collabIcon} className={classes.image} />
        <p>
          Add you friends email so you can work together. Make sure they use
          this email id for this app.
        </p>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.container}>
      <h3>Category Settings</h3>

      <Paper variant="outlined" className={classes.paper}>
        <h4>Collaboration</h4>
        {share && share.length === 0 && <NoCollabAdded />}
        {share && share.length > 0 && <ShareDetails />}
        <form onSubmit={onShareCategory} className={classes.inputForm}>
          <TextField
            inputRef={shareCategoryRef}
            label="Add Email Id To Share"
            onChange={e => console.log(e)}
          />
        </form>
      </Paper>

      <Paper variant="outlined" className={classes.paper}>
        <h4>Delete This Category</h4>
        <img src={deleteIcon} className={classes.image} />
        <p>
          You cannot undo this. This will remove for all other collaborators
          too.
        </p>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDeleteCategory}
        >
          Delete
        </Button>
      </Paper>
    </div>
  );
};

export default ItemsMoreSettings;
