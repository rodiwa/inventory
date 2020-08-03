import { action, thunk } from "easy-peasy";
import Auth from '../../service/auth';
import * as DB from '../../service/db';

const authActions = {
  setLoginUserDetails: action((state, payload) => {
    state.user = payload;
  }),
  setLoginStatus: action((state, status) => state.isLoggedIn = status),
  onLogoutAction: thunk(actions => {
    (async () => {
      await Auth.getAuthReference().signOut().then(() => { console.log('sign out success') });
    })();
  }),
  setGoogleLoginUI: thunk(actions => {
    (() => {
      Auth.renderFirebaseUiAuth();
    })();
  }),
  setAuthChangeListener: thunk(actions => {
    (async () => {
      await Auth.getAuthReference().onAuthStateChanged(async (user) => {
        if (user) {
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
  
          const userDetails = {
            displayName,
            email,
            emailVerified,
            photoURL,
            isAnonymous,
            uid,
            providerData
          }

          const isUserExisting = await DB.isUserExisting({ id: uid });

          if (isUserExisting === 'false') {
            await DB.createNewUser({ id: uid });
          }

          actions.setLoginUserDetails(userDetails);
          actions.setLoginStatus(true);
        } else {
          actions.setLoginUserDetails(null);
          actions.setLoginStatus(false);
        }
      });
    })();
  })
}

export default authActions;
