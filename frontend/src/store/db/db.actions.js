import { action, thunk } from "easy-peasy";
import * as DB from '../../service/db';

// TODO: special case for getting firestore reference directly into actions
import Auth from '../../service/auth';

const dbActions = {
  getAllCategoryAction: thunk((action, payload) => {
    return (async () => {
      try {
        const { userId } = payload;
        const response = await DB.getAllCategoryAndItems({ userId });
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
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  deleteCategoryAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId } = payload;
        await DB.deleteCategory({ categoryId });
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
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  // TODO: we need one with realtime update; this is for one time fetch only
  // getItemsInCategoryAction: thunk((actions, payload) => {
  //   return (async () => {
  //     try {
  //       const { categoryId } = payload;
  //       const response = await DB.getItemsInCategory({ categoryId });
  //       actions.setItemsInCategoryAction(response)
  //     } catch(error) {
  //       console.error(error);
  //     }
  //   })();
  // }),

  // get items in category, with realtime update
  getItemsInCategoryAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId } = payload;
        let result = [];
        const db = Auth.getCloudStoreReference();
        const itemInCategoryQuery = db.collection('category').doc(categoryId).collection('items');
        itemInCategoryQuery.onSnapshot(snapshot => {
          result = [];
          snapshot.forEach(item => {
            result.push(item.data());
          })
          actions.setItemsInCategoryAction(result)
        });
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

  shareCategoryAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId, emailId } = payload;
        await DB.shareCategory({ categoryId, emailId });
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  removeShareCategoryAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const { categoryId, userId } = payload;
        await DB.shareCategory({ categoryId, userId });
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
