import { action, thunk } from "easy-peasy";

const appActions = {
  setCurrentCategoryAction: action((state, payload) => {
    state.category = payload;
  })
}

export default appActions;
