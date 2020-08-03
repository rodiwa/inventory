import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';

class Auth {
  constructor() {
    this.isUserLoggedIn = false;
    this.firebaseUi = null;
    this.initializeFirebase();
  };

  async initializeFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyByqxp4x7PvkcvcWnuKp2VwvfBTUfuqazA",
      authDomain: "inventory-4fc79.firebaseapp.com",
      databaseURL: "https://inventory-4fc79.firebaseio.com",
      projectId: "inventory-4fc79",
      storageBucket: "inventory-4fc79.appspot.com",
      messagingSenderId: "564463885188",
      appId: "1:564463885188:web:66dac58f853eeadd591bd1",
      measurementId: "G-7EWM8MKY9V"
    };
    firebase.initializeApp(firebaseConfig);
    this.firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
  }

  renderFirebaseUiAuth() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return true;
        }
      },
      signInFlow: 'popup',
      signInSuccessUrl: '',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '<your-tos-url>',
      privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    this.firebaseUi.start('#firebaseui-auth-container', uiConfig);
  };

  isLoggedIn() {
    return firebase.auth().currentUser;
  }

  getAuthReference() {
    return firebase.auth();
  }

  getCloudStoreReference() {
    return firebase.firestore();
  }
  
  onLogout() {
    firebase.auth().signOut().then(function() {
      console.log('Sign-out successful.')
    }).catch(function(error) {
      console.error('An error happened.')
    });
  };

  /** temp methods to emulate login logout */
  // isLoggedInTemp() {
  //   return this.isUserLoggedIn;
  // };

  // onLoginTemp() {
  //   this.isUserLoggedIn = true;
  // };

  // onLogoutTemp() {
  //   this.isUserLoggedIn = false;
  // };
}

export default new Auth();
