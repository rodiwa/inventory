import userModel from './user.model';
import userActions from './user.actions';

const userState = {
  ...userModel,
  ...userActions
}

export default userState;
