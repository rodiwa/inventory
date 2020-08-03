import React from 'react';
import './Inventory.css';
import * as DBServices from '../../service/db';
// import Auth  from '../../auth/auth';
import { v4 as uuidv4 } from 'uuid';
import AuthButton from '../AuthButtons/AuthButtons';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewItem: false,
      addNewCategory: false,
      loading: true,
      allCategoryAndItems: {},
      addNewItemIdx: null
    }
    this.addCategoryNameInputRef = React.createRef();
    this.addCategoryFirstInputRef = React.createRef();
  }

  async componentDidMount() {
    this.getAllCategoryAndItems();
  }

  resetForm = () => {
    this.setState({
      addNewItem: false,
      addNewCategory: false
    })
  }

  async getAllCategoryAndItems() {
    const data = await DBServices.getAllCategoryAndItems();
    data && this.setState({
      allCategoryAndItems: data,
      loading: false
    })
  }

  renderAddedItems = (items, category) => {
    return items.map((item, idx) => {
      const { id, name, count } = item;
      return(
        <div key={idx} className="item">
          <div className='item-left'>
            <span> { name } </span>
            <span> { count } </span>
          </div>
          <div className="item-right">
            <button onClick={() => this.handleDeleteItem({ id, category })}><span>Delete</span></button>
            <button onClick={() => this.handleIncrementItem({ id, category })}><span>Inc</span></button>
            <button disabled={count === 0} onClick={() => this.handleDecrementItem({ id, category })}><span>Dec</span></button>
          </div>          
        </div>
      );
    })
  }

  renderAllCategoryAndItems = (allCategoryAndItems) => {
    return Object.keys(allCategoryAndItems).map((category, idx) => {
      const items = allCategoryAndItems[category];
      return (
        <div key={idx} className={`category category-index-${idx}`}>
          <h3>Category - {category}</h3>
          { this.renderAddedItems(items, category) }
          { this.renderAddItemToCategoryButton(category, idx) }
        </div>
      )
    })
  }

  renderAddItemToCategoryButton(category, idx) {
    return (
      <div>
        { this.state.addNewItem &&
          <form className={`form-add-item ${idx === this.state.addNewItemIdx ? 'show' : 'hide'}`} onSubmit={(e) => this.handleAddNewItemSubmit(e, category, idx)}>
            <div><input ref={input => { this[`addItemInputRef${idx}`] = input }} type="text" placeholder="Item name" autoFocus></input></div>
            <div><button type="submit">Add Item</button></div>
            <div><button id="btn-add-new" onClick={() =>this.handleCancelAddNewItem()}>Cancel</button></div>
          </form> }
        { !this.state.addNewItem &&  
          <div><button id="btn-add-new" onClick={() =>this.handleAddNewItem(idx)}>Add New</button></div> }
      </div>
    );
  }

  handleDeleteItem = async ({ id, category }) => {
    if (this.state.allCategoryAndItems[category].length === 1) {
      // handle edge case; if only item in category, remove the category altogether
      // delete property from object without mutating object
      const categoryListAfterRemovingCategory = Object.keys(this.state.allCategoryAndItems).reduce((object, key) => {
        if (key !== category) {
          object[key] = this.state.allCategoryAndItems[key];
        }
        return object;
      }, {})

      this.setState({
        allCategoryAndItems: categoryListAfterRemovingCategory
      });
      
      // delete item and then collection also
      await DBServices.deleteItem({ id, category });
      // TODO: delete collection
    } else {
      const updateItemListForCategory = this.state.allCategoryAndItems[category].filter(item => {
        return item.id !== id;
      })
      this.setState({
        allCategoryAndItems: {
          ...this.state.allCategoryAndItems,
          [category]: updateItemListForCategory
        }
      });

      // delete item only
      DBServices.deleteItem({ id, category });
    }
  }

  // TODO: future refactor; is response fails, discard changes and refetch list
  handleIncrementItem = async ({ id, category }) => {
    DBServices.updateCount({ id, type: 'inc', category });

    // update count in view
    const idx = this.state.allCategoryAndItems[category].findIndex(item => item.id === id);
    let newItemList = [...this.state.allCategoryAndItems[category]];
    newItemList[idx] = {
      ...newItemList[idx],
      count: ++newItemList[idx].count
    }

    this.setState({
      allCategoryAndItems: {
        ...this.state.allCategoryAndItems,
      }
    })
  }

  // TODO: future refactor; is response fails, discard changes and refetch list
  handleDecrementItem = async ({ id, category }) => {
    DBServices.updateCount({ id, type: 'dec', category });

    // update count in view
    const idx = this.state.allCategoryAndItems[category].findIndex(item => item.id === id);
    let newItemList = [...this.state.allCategoryAndItems[category]];
    newItemList[idx] = {
      ...newItemList[idx],
      count: --newItemList[idx].count
    }

    this.setState({
      allCategoryAndItems: {
        ...this.state.allCategoryAndItems,
      }
    })
  }

  
  handleAddNewItem = (idx) => {
    this.setState({
      addNewItem: true,
      addNewItemIdx: idx
    });
  }

  handleCancelAddNewItem = () => {
    this.setState({
      addNewItem: false,
      addNewItemIdx: null
    });
  }

  handleAddNewCategory = () => {
    this.setState({
      addNewCategory: true
    });
  }

  handleCancelAddNewCategory = () => {
    this.setState({
      addNewCategory: false
    });
  }
  
  handleAddNewCategorySubmit = async (e, category) => {
    e.preventDefault();
    const categoryName = this.addCategoryNameInputRef.current.value;
    const itemName = this.addCategoryFirstInputRef.current.value;

    if (!categoryName || !itemName) {
      console.error('Category name and item name required to create category');
      return;
    }

    // TODO: pick userId from state
    const userId = 'KDn023R9meXOmgW2xkamntudAOq2'; // TODO
    const itemId = uuidv4();
    await DBServices.createNewCategory({ categoryName, itemId, itemName, userId });
    this.resetForm();

    // add new categoy to state to update locally
    const newItemInCategory = [{
      name: itemName,
      id: itemId,
      count: 1
    }]
    this.setState({
      allCategoryAndItems: {
        ...this.state.allCategoryAndItems,
        [categoryName]: newItemInCategory
      }
    });
  }

  handleAddNewItemSubmit = async (e, category, idx) => {
    e.preventDefault();
    this[`addItemInputRef${idx}`].focus();
    const name = this[`addItemInputRef${idx}`].value;
    const id = uuidv4();
    DBServices.createNewItem({ name, id, category });
    this.resetForm();

    // add new item to array
    const updateItemListForCategory = [...this.state.allCategoryAndItems[category], {
      name,
      id,
      count: 1
    }]
    this.setState({
      allCategoryAndItems: {
        ...this.state.allCategoryAndItems,
        [category]: updateItemListForCategory
      }
    });
  }
  
  render() {
    const that = this;
    return (
      <div>
        <AuthButton />
        <h3>Inventory</h3>

        { !this.state.loading && !!Object.keys(that.state.allCategoryAndItems).length &&
          this.renderAllCategoryAndItems(this.state.allCategoryAndItems)
        }

        { this.state.loading &&
          <div><span>Fetching your items</span></div>
        }

        { !Object.keys(that.state.allCategoryAndItems).length && !this.state.loading &&
          <div><span>No Items So Far</span></div>
        }

        { this.state.addNewCategory &&
          <form onSubmit={(e) => this.handleAddNewCategorySubmit(e)}>
            <div><input ref={this.addCategoryNameInputRef} type="text" placeholder="Category name" autoFocus></input></div>
            <div><input ref={this.addCategoryFirstInputRef} type="text" placeholder="First Input"></input></div>
            <div><button type="submit">Add Category</button></div>
          </form> }
        { this.state.addNewCategory && 
          <div><button onClick={() =>this.handleCancelAddNewCategory()}>Cancel</button></div> }
        { !this.state.addNewCategory &&  
          <div><button onClick={() =>this.handleAddNewCategory()}>Add New Caegory</button></div> }
      </div>
    )
  }
}

export default Inventory;
