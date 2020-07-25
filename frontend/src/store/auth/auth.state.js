import authModel from './auth.model';
import authActions from './auth.actions';

const authState = {
  ...authModel,
  ...authActions
}

export default authState;