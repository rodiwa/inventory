import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const CategoryList = () => {
  const history = useHistory();
  const addNewCategoryRef = React.useRef();
  const categoryList = useStoreState(state => state.db.category);
  const userId = useStoreState(state => state.user.userId);
  const getAllCategoryAction = useStoreActions(actions => actions.db.getAllCategoryAction);
  const createNewCategoryAction = useStoreActions(actions => actions.db.createNewCategoryAction);
  const setCurrentCategoryAction = useStoreActions(actions => actions.app.setCurrentCategoryAction);
  const setItemsInCategoryAction = useStoreActions(actions => actions.db.setItemsInCategoryAction);

  useEffect(() => {
    setCurrentCategoryAction(null);
    setItemsInCategoryAction([]);
  });

  useEffect(() => {
    (async () => {
      const list = await getAllCategoryAction();
    })();
  }, []);

  // EVENT HANDLERS
  const onAddNewCategory = async (e) => {
    e.preventDefault();
    const categoryName = addNewCategoryRef.current.value;
    if (!categoryName) {
      console.error('category name cannot be empty');
      return;
    };
    const categoryId = uuid();
    await createNewCategoryAction({ categoryName, categoryId, userId });
    addNewCategoryRef.current.value = "";
    setCurrentCategoryAction(categoryId);
    history.push(`/items/${categoryId}`);
  }

  const onItemClick = (categoryId) => {
    setCurrentCategoryAction(categoryId);
    history.push(`/items/${categoryId}`);
  }

  // CHILD COMPONENTS
  const List = (props) => {
    const { categoryItems } = props;
  
    if (!categoryItems.length) {
      return (
        <div>Nothing to show yet</div>
      );
    } else {
      return (
        <div>
          { categoryItems.map((category, idx) => {
            return (
              <p key={idx}>
                <a onClick={() => onItemClick(category.id)}>{category.name}</a>
              </p>
            );
          }) }
        </div>
      );
    }
  }

  return (
    <div>
      <h2>CategoryList</h2>
      <List categoryItems={categoryList} />
      <form onSubmit={onAddNewCategory}>
        <input type="text" ref={addNewCategoryRef} placeholder="Add New Category" />
      </form>
    </div>
  );
};

export default CategoryList;
