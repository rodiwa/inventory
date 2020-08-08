import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from "uuid";

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
  const [isAddingCategory, setIsAddingCategory] = useState(false);
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
  const classes = useStyles();

  useEffect(() => {
    setCurrentCategoryAction(null);
    setItemsInCategoryAction([]);
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

  const onToggleAddCategory = () => {
    setIsAddingCategory(!isAddingCategory);
  };

  // CHILD COMPONENTS
  const ListCategoryItems = props => {
    const { categoryItems } = props;

    if (!categoryItems.length) {
      return <div>Nothing to show yet</div>;
    } else {
      return (
        <List component="nav" aria-label="main mailbox folders">
          {categoryItems.map((category, idx) => {
            return (
              <React.Fragment>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    onClick={() => onItemClick(category.id)}
                  />
                </ListItem>
                {/* <Divider /> */}
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
      {isAddingCategory && (
        <form
          onSubmit={onAddNewCategory}
          className={classes.addCategoryInputText}
        >
          <TextField
            inputRef={addNewCategoryRef}
            label="Add New Category"
            onChange={e => console.log(e)}
          />
          {/* <Button
            variant="contained"
            color="primary"
            onClick={onToggleAddCategory}
          >
            Cancel
          </Button> */}
        </form>
      )}
      {!isAddingCategory && (
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon onClick={onToggleAddCategory} />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default CategoryList;
