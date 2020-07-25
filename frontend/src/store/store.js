import { createStore, action } from 'easy-peasy';
import { logger } from 'redux-logger';

import authState from './auth/auth.state';
import dbState from './db/db.state';

const model = {
  auth: authState,
  db: dbState
};

const config = {
  middleware: [logger]
};

export const store = createStore(model, config);
