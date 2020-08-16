import React from "react";
import { useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Button from "@material-ui/core/Button";

const AuthButton = () => {
  const history = useHistory();
  const isLoggedIn = useStoreState(state => state.auth.isLoggedIn);
  const onLogoutAction = useStoreActions(
    actions => actions.auth.onLogoutAction
  );

  const onLogout = async () => {
    history.push("/logout");
    await onLogoutAction();
  };

  return (
    <div>
      {/* {!isLoggedIn && <input type="button" onClick={() => onLoginAction()} value="Login"/>} */}
      {isLoggedIn && (
        <Button variant="contained" color="secondary" onClick={onLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
