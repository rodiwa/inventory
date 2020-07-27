import appModel from './app.model';
import appActions from './app.actions';

const appState = {
  ...appModel,
  ...appActions
}

export default appState;
