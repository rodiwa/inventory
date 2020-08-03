import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const AuthButton = () => {
  const history = useHistory();
  const isLoggedIn = useStoreState(state => state.auth.isLoggedIn);
  const onLogoutAction = useStoreActions(actions => actions.auth.onLogoutAction);

  const onLogout = async () => {
    history.push('/logout');
    await onLogoutAction();
  }
  
  return (
    <div>
      {/* {!isLoggedIn && <input type="button" onClick={() => onLoginAction()} value="Login"/>} */}
      {isLoggedIn && <input type="button" onClick={onLogout} value="Logout"/>}
    </div>
  );
}

export default AuthButton;