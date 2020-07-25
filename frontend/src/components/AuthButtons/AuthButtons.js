import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const AuthButton = () => {
  const isLoggedIn = useStoreState(state => state.auth.isLoggedIn);
  const onLoginAction = useStoreActions(actions => actions.auth.onLoginAction);
  const onLogoutAction = useStoreActions(actions => actions.auth.onLogoutAction);
  
  return (
    <div>
      {!isLoggedIn && <input type="button" onClick={() => onLoginAction()} value="Login"/>}
      {isLoggedIn && <input type="button" onClick={() => onLogoutAction()} value="Logout"/>}
    </div>
  );
}

export default AuthButton;