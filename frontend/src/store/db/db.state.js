import dbModel from './db.model';
import dbActions from './db.actions';

const dbState = {
  ...dbModel,
  ...dbActions
}

export default dbState;
