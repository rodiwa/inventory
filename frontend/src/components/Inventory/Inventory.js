import React from 'react';
import * as Services from '../../service/service';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false,
      items: []
    }
    this.addItemInputRef = React.createRef();
  }

  async componentDidMount() {
    const data = await Services.getAllItems();
    data && this.setState({
      items: data
    });
  }

  resetForm = () => {
    this.setState({
      addNew: false
    })
  }

  renderAddedItems = (items) => {
    return items.map((item, idx) => {
      return(
        <div key={idx} className="item">
          <span> { item.name } </span>
        </div>
      );
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
  }
  
  render() {
    return (
      <div>
        <h3>Inventory</h3>
        { !!this.state.items.length &&
          this.renderAddedItems(this.state.items)
        }

        { !this.state.items.length &&
          <div><span>No Items So Far</span></div>
        }

        { this.state.addNew &&
          <form onSubmit={(e) => this.handleAddNewSubmit(e)}>
            <div><input ref={this.addItemInputRef} type="text" placeholder="Item name"></input></div>
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
