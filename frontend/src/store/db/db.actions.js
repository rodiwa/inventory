import { action, thunk } from "easy-peasy";
import * as DB from '../../service/db';



const dbActions = {
  getAllCategoryAction: thunk((action, payload) => {
    return (async () => {
      try {
        const response = await DB.getAllCategoryAndItems();
        action.setAllCategories(response);
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  createNewCategoryAction: thunk((action, payload) => {
    return (async () => {
      try {
        const { categoryName, categoryId, userId } = payload;
        const response = await DB.createNewCategory({ categoryName, categoryId, userId });
        console.log('createNewCategory actions');
        // action.setAllCategories(response);
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  createNewItemAction: thunk((action, payload) => {
    return (async () => {
      try {
        const { categoryId, itemId, itemName } = payload;
        const response = await DB.createNewItem({ categoryId, itemId, itemName });
        console.log('createNewItemAction actions');
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  getItemsInCategoryAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId } = payload;
        const response = await DB.getItemsInCategory({ categoryId });
        actions.setItemsInCategoryAction(response)
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  deleteItemAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId, itemId } = payload;
        await DB.deleteItem({ categoryId, itemId });
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  updateItemCountAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId, itemId, count } = payload;
        await DB.updateCount({ categoryId, itemId, count });
      } catch(error) {
        console.error(error);
      }
    })();
  }),


  
  /**
   * ACTIONS
   */
  setAllCategories: action((state, payload) => {
    state.category = payload;
  }),
  
  setItemsInCategoryAction: action((state, payload) => {
    state.items = payload;
  }),
  
}

export default dbActions;
