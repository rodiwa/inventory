import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const ItemList = () => {
  const addNewItemRef = React.createRef();
  const createNewItemAction = useStoreActions(actions => actions.db.createNewItemAction);
  const categoryId = useStoreState(state => state.app.category);
  const itemList = useStoreState(state => state.db.items);
  const getItemsInCategoryAction = useStoreActions(actions => actions.db.getItemsInCategoryAction);
  const deleteItemAction = useStoreActions(actions => actions.db.deleteItemAction);
  const updateItemCountAction = useStoreActions(actions => actions.db.updateItemCountAction);

  useEffect(() => {
    (async () => {
      await getItemsInCategoryAction({ categoryId });
    })();
  }, []);

  const onAddNewItem = async (e) => {
    e.preventDefault();
    const itemName = addNewItemRef.current.value;
    if (!itemName) {
      console.error('item name cannot be empty');
      return;
    };
    const itemId = uuid();
    await createNewItemAction({ categoryId, itemId, itemName });
    addNewItemRef.current.value = "";
  }

  const onDeleteItem = (e, itemId) => {
    e.preventDefault();
    deleteItemAction({ categoryId, itemId });
  }

  const onUpdateCount = (e, itemId, count) => {
    e.preventDefault();
    updateItemCountAction({ categoryId, itemId, count });
  }

  // CHILD COMPONENTS
  const List = (props) => {
    const { itemList } = props;
  
    if (!itemList.length) {
      return (
        <div>Nothing to show yet</div>
      );
    } else {
      return (
        <div>
          { itemList.map((item, idx) => {
            return (
              <div key={idx}>
          <div><span>{item.name}</span> - <span>{item.count}</span></div>
                <div>
                  <input onClick={(e) => onUpdateCount(e, item.id, 1)} defaultValue="+" />
                  <input onClick={(e) => onDeleteItem(e, item.id)} defaultValue="D" />
                  <input onClick={(e) => onUpdateCount(e, item.id, -1)} defaultValue="-" />
                </div>
              </div>
            );
          }) }
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Items In This Category</h2>

      <List itemList={itemList} />

      <form onSubmit={onAddNewItem}>
        <input type="text" ref={addNewItemRef} placeholder="Add New Item" />
      </form>

      <div>
        <Link to={`/`}><span>Home</span></Link>
      </div>

    </div>
  );
};

export default ItemList;
