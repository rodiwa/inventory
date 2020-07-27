import { createStore, action } from 'easy-peasy';
import { logger } from 'redux-logger';

import authState from './auth/auth.state';
import dbState from './db/db.state';
import userState from './user/user.state';
import appState from './app/app.state';

const model = {
  auth: authState,
  db: dbState,
  user: userState,
  app: appState
};

const config = {
  middleware: [logger]
};

export const store = createStore(model, config);
