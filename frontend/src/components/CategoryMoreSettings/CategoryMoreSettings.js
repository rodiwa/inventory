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

  return (
    <div>
      <h3>Category Settings</h3>

      <div>
        <h4>Collaboration</h4>
        {share && share.length === 0 && <p>Nothing to show here</p>}
        {share && share.length > 0 && <ShareDetails />}
        <form onSubmit={onShareCategory}>
          <TextField
            inputRef={shareCategoryRef}
            label="Add Email Id To Share"
            onChange={e => console.log(e)}
          />
        </form>
      </div>

      <div>
        <h4>Delete This Category</h4>
        <IconButton edge="end" aria-label="comments" onClick={onDeleteCategory}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default ItemsMoreSettings;
