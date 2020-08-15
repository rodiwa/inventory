import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from "uuid";
import SkeletonList from "../SkeletonList/SkeletonList";
import EmptyListLoaded from "../EmptyListLoaded/EmptyListLoaded";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  addCategoryInputText: {
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

const CategoryList = () => {
  const history = useHistory();
  const addNewCategoryRef = React.useRef();
  const [isAdding, setIsAdding] = useState(false);
  const categoryList = useStoreState(state => state.db.category);
  const userId = useStoreState(state => state.auth.user.uid);
  const emailId = useStoreState(state => state.auth.user.email);
  const getAllCategoryAction = useStoreActions(
    actions => actions.db.getAllCategoryAction
  );
  const createNewCategoryAction = useStoreActions(
    actions => actions.db.createNewCategoryAction
  );
  const setCurrentCategoryAction = useStoreActions(
    actions => actions.app.setCurrentCategoryAction
  );
  const setItemsInCategoryAction = useStoreActions(
    actions => actions.db.setItemsInCategoryAction
  );
  const setShareInCategoryAction = useStoreActions(
    actions => actions.db.setShareInCategoryAction
  );
  const classes = useStyles();

  useEffect(() => {
    setCurrentCategoryAction(null);
    setItemsInCategoryAction(null);
    setShareInCategoryAction([]);
  }, []);

  useEffect(() => {
    (async () => {
      await getAllCategoryAction({ userId });
    })();
  }, [userId]);

  // EVENT HANDLERS
  const onAddNewCategory = async e => {
    e.preventDefault();
    const categoryName = addNewCategoryRef.current.value;
    if (!categoryName) {
      console.error("category name cannot be empty");
      return;
    }
    const categoryId = uuid();
    await createNewCategoryAction({
      categoryName,
      categoryId,
      userId,
      emailId
    });
    addNewCategoryRef.current.value = "";
    setCurrentCategoryAction(categoryId);
    history.push(`/items/${categoryId}`);
  };

  const onItemClick = categoryId => {
    setCurrentCategoryAction(categoryId);
    history.push(`/items/${categoryId}`);
  };

  const onToggleAdd = () => {
    setIsAdding(!isAdding);
  };

  // CHILD COMPONENTS
  const ListCategoryItems = props => {
    const { categoryItems } = props;

    if (categoryItems === null) {
      return <SkeletonList />;
    }
    if (categoryItems && categoryItems.length === 0) {
      return <EmptyListLoaded />;
    }
    if (categoryItems && categoryItems.length > 0) {
      return (
        <List component="nav" aria-label="main mailbox folders">
          {categoryItems.map((category, idx) => {
            return (
              <React.Fragment key={idx}>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    onClick={() => onItemClick(category.id)}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      );
    }
  };

  return (
    <React.Fragment>
      <ListCategoryItems categoryItems={categoryList} />
      {isAdding && (
        <form
          onSubmit={onAddNewCategory}
          className={classes.addCategoryInputText}
        >
          <TextField
            inputRef={addNewCategoryRef}
            autoFocus
            label="Add Category"
            onChange={e => console.log(e)}
          />
        </form>
      )}
      {!isAdding && (
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon onClick={onToggleAdd} />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default CategoryList;
