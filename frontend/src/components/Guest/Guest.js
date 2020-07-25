import React, { Fragment, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import AuthButton from '../AuthButtons/AuthButtons';

function GuestUser() {
  const setGoogleLoginUI = useStoreActions(actions => actions.auth.setGoogleLoginUI);

  useEffect(() => {
    (() => {
      setGoogleLoginUI();
    })();
  }, []);

  return (
    <Fragment>
      <div>
        <span>You. Are. Guest! Why. You. Guest?</span>
      </div>
      <div>
        <div id="firebaseui-auth-container"></div>
      </div>
    </Fragment>
  );
};

export default GuestUser;
