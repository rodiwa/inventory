import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as EmailValidator from 'email-validator';

const ItemList = (props) => {
  const addNewItemRef = React.useRef();
  const shareCategoryRef = React.useRef();
  const createNewItemAction = useStoreActions(actions => actions.db.createNewItemAction);
  // const categoryId = useStoreState(state => state.app.category); // TODO: state resets on refresh, hence issue
  const { categoryId } = props.match.params; 
  const itemList = useStoreState(state => state.db.items);
  const getItemsInCategoryAction = useStoreActions(actions => actions.db.getItemsInCategoryAction);
  const deleteItemAction = useStoreActions(actions => actions.db.deleteItemAction);
  const updateItemCountAction = useStoreActions(actions => actions.db.updateItemCountAction);
  const deleteCategoryAction = useStoreActions(actions => actions.db.deleteCategoryAction);
  const shareCategoryAction = useStoreActions(actions => actions.db.shareCategoryAction);
  const removeShareCategoryAction = useStoreActions(actions => actions.db.removeShareCategoryAction);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      addNewItemRef.current.focus();
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

  const onShareCategory = async (e) => {
    e.preventDefault();
    const emailId = shareCategoryRef.current.value;
    if (!EmailValidator.validate(emailId)) {
      // TODO: add alert toaster here
      return console.error('Enter valid email only');
    }
    await shareCategoryAction({ categoryId, emailId });
    shareCategoryRef.current.value = "";
  }

  const onDeleteCategory = async () => {
    const isConfirm = window.confirm("Sure you wanna delete this category? This cannot be undone!");
    if (isConfirm) {
      await deleteCategoryAction({ categoryId });
      history.push('/');
    }
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
                  <input onClick={(e) => onUpdateCount(e, item.id, -1)} defaultValue="-" disabled={item.count < 1} />
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
        <input type="text" onClick={onDeleteCategory} defaultValue="Delete this category" />
      </div>

      <form onSubmit={onShareCategory}>
        <input type="text" ref={shareCategoryRef} placeholder="Add Email Id To Share With" />
      </form>

      <div>
        <Link to={`/`}><span>Home</span></Link>
      </div>

    </div>
  );
};

export default ItemList;
