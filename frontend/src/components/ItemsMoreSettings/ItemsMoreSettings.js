import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthButton from "../AuthButtons/AuthButtons";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const ItemsMoreSettings = props => {
  const { itemId } = props.match.params;
  const categoryId = useStoreState(state => state.app.category);
  const deleteItemAction = useStoreActions(
    actions => actions.db.deleteItemAction
  );

  // FIXME: this is not working
  const onDeleteItem = (e, itemId) => {
    e.preventDefault();
    if (window.confirm("Delete Item?")) {
      // deleteItemAction({ categoryId, itemId });
    }
  };

  return (
    <div>
      <h3>Item Settings</h3>

      <h4>Delete This Item</h4>
      <p>THIS IS NOT WORKING RIGHT NOW</p>
      <IconButton edge="end" onClick={onDeleteItem}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default ItemsMoreSettings;
