import React from 'react';
import * as Services from '../../service/service';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false,
      loading: true,
      items: []
    }
    this.addItemInputRef = React.createRef();
  }

  async componentDidMount() {
    this.getAllItems();
  }

  resetForm = () => {
    this.setState({
      addNew: false
    })
  }

  async getAllItems() {
    const data = await Services.getAllItems();
    data && this.setState({
      items: data,
      loading: false
    });
  }

  renderAddedItems = (items) => {
    return items.map((item, idx) => {
      const { id, name, count } = item;
      return(
        <div key={idx} className="item">
          <div className='item-left'>
            <span> { name } </span>
            <span> { count } </span>
          </div>
          <div className="item-right">
            <button onClick={() => this.handleDeleteItem({ id })}><span>Delete</span></button>
            <button onClick={() => this.handleIncrementItem({ id })}><span>Inc</span></button>
            <button disabled={count === 0} onClick={() => this.handleDecrementItem({ id })}><span>Dec</span></button>
          </div>          
        </div>
      );
    })
  }

  handleEditItem = () => {
    // await Services.editItem
  }

  handleDeleteItem = async ({ id }) => {
    await Services.deleteItem({ id });
    this.getAllItems();
  }

  // TODO: future refactor; is response fails, discard changes and refetch list
  handleIncrementItem = async ({ id }) => {
    Services.updateCount({ id, type: 'inc' });

    // update count in view
    const idx = this.state.items.findIndex(item => item.id === id);
    let newItemList = [...this.state.items];
    newItemList[idx] = {
      ...newItemList[idx],
      count: ++newItemList[idx].count
    }

    this.setState({
      items: newItemList
    })
  }

  // TODO: future refactor; is response fails, discard changes and refetch list
  handleDecrementItem = async ({ id }) => {
    Services.updateCount({ id, type: 'dec' });

    // update count in view
    const idx = this.state.items.findIndex(item => item.id === id);
    let newItemList = [...this.state.items];
    newItemList[idx] = {
      ...newItemList[idx],
      count: --newItemList[idx].count
    }

    this.setState({
      items: newItemList
    })
  }

  
  handleAddNew = () => {
    this.setState({
      addNew: true
    });
  }

  handleCancelAddNew = () => {
    this.setState({
      addNew: false
    });
  }

  handleAddNewSubmit = async (e) => {
    e.preventDefault();
    const name = this.addItemInputRef.current.value;
    await Services.createNewItem({ name });
    this.resetForm();
    this.getAllItems();
  }
  
  render() {
    return (
      <div>
        <h3>Inventory</h3>
        { !!this.state.items.length &&
          this.renderAddedItems(this.state.items)
        }

        { this.state.loading &&
          <div><span>Fetching your items</span></div>
        }

        { !this.state.items.length && !this.state.loading &&
          <div><span>No Items So Far</span></div>
        }

        { this.state.addNew &&
          <form onSubmit={(e) => this.handleAddNewSubmit(e)}>
            <div><input ref={this.addItemInputRef} type="text" placeholder="Item name" autoFocus></input></div>
            <div><button type="submit">Add Item</button></div>
          </form> }
        { this.state.addNew && 
          <div><button id="btn-add-new" onClick={() =>this.handleCancelAddNew()}>Cancel</button></div> }
        { !this.state.addNew &&  
          <div><button id="btn-add-new" onClick={() =>this.handleAddNew()}>Add New</button></div> }
      </div>
    )
  }
}

export default Inventory;
