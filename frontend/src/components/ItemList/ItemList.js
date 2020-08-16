import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import SkeletonList from "../SkeletonList/SkeletonList";
import EmptyListLoaded from "../EmptyListLoaded/EmptyListLoaded";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 2em",
    alignItems: "center"
  },
  addItemInputText: {
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  avatar: {
    fontSize: "1em"
  }
}));

const ItemList = props => {
  const addNewItemRef = React.useRef();
  const [isAdding, setIsAdding] = useState(false);
  const createNewItemAction = useStoreActions(
    actions => actions.db.createNewItemAction
  );
  const userId = useStoreState(state => state.auth.user.uid);
  const share = useStoreState(state => state.db.share);
  const { categoryId } = props.match.params;
  const itemList = useStoreState(state => state.db.items);
  const getItemsInCategoryAction = useStoreActions(
    actions => actions.db.getItemsInCategoryAction
  );
  const updateItemCountAction = useStoreActions(
    actions => actions.db.updateItemCountAction
  );
  const getAllCategoryShareAction = useStoreActions(
    actions => actions.db.getAllCategoryShareAction
  );
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      isAdding && addNewItemRef.current.focus();
      await getItemsInCategoryAction({ categoryId });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getAllCategoryShareAction({ categoryId, userId });
    })();
  }, []);

  const onAddNewItem = async e => {
    e.preventDefault();
    const itemName = addNewItemRef.current.value;
    if (!itemName) {
      console.error("item name cannot be empty");
      return;
    }
    const itemId = uuid();
    await createNewItemAction({ categoryId, itemId, itemName });
    addNewItemRef.current.value = "";
  };

  const onUpdateCount = (e, itemId, count) => {
    e.preventDefault();
    updateItemCountAction({ categoryId, itemId, count });
  };

  const onToggleAdd = () => {
    setIsAdding(!isAdding);
    isAdding && addNewItemRef.current.focus();
  };

  const onItemNameClick = (e, itemId) => {
    e.preventDefault();
    history.push(`/items/meta/${itemId}`);
  };

  const onCategoryNameClick = () => {
    history.push(`/category/meta/${categoryId}`);
  };

  return (
    <div>
      <Paper elevation={1} onClick={onCategoryNameClick}>
        <div className={classes.heading}>
          <h4>Category Name</h4>
          {share && share.length > 0 && <SupervisorAccountIcon />}
        </div>
      </Paper>
      {itemList === null && <SkeletonList />}
      {itemList && itemList.length === 0 && <EmptyListLoaded />}
      {itemList && itemList.length > 0 && (
        <List component="nav">
          {itemList.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <ListItem button onClick={e => onItemNameClick(e, item.id)}>
                  <ListItemIcon>
                    <Avatar className={classes.avatar}>{item.count}</Avatar>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={e => onUpdateCount(e, item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      disabled={item.count < 1}
                      onClick={e => onUpdateCount(e, item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {/* <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={e => onDeleteItem(e, item.id)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      )}

      {isAdding && (
        <form onSubmit={onAddNewItem} className={classes.addItemInputText}>
          <TextField
            inputRef={addNewItemRef}
            autoFocus
            label="Add Item"
            onChange={e => console.log(e)}
          />
        </form>
      )}

      {!isAdding && (
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon onClick={onToggleAdd} />
        </Fab>
      )}
    </div>
  );
};

export default ItemList;
