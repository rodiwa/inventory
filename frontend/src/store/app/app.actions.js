import { action, thunk } from "easy-peasy";

const appActions = {
  setCurrentCategoryAction: action((state, payload) => {
    state.category = payload;
  }),
  setCurrentCategoryNameAction: action((state, payload) => {
    state.categoryName = payload;
  })
};

export default appActions;
