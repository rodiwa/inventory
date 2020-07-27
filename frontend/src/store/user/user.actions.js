/**
 * TODO: we are currently bypassing this since we do not know how to call state.db actions from state.auth action
 */
import { action, thunk } from "easy-peasy";
import * as DB from '../../service/db';

const userActions = {
  createNewUserAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const response = await DB.createNewUser({ id: payload.id });
        return response; // TODO: actions dont return values usually; they update state
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  isUserExistingAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const response = await DB.isUserExisting({ id: payload.id });
        return response; // TODO: actions dont return values usually; they update state
      } catch(error) {
        console.error(error);
      }
    })();
  }),

  deleteUserAction: thunk((actions, payload) => {
    return (async () => {
      try {
        const response = await DB.deleteUser({ id: payload.id });
        return response; // TODO: actions dont return values usually; they update state
      } catch(error) {
        console.error(error);
      }
    })();
  })
}

export default userActions;
