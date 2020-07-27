import React, { useEffect } from 'react';
import './App.css';
// import Inventory from '../Inventory/Inventory';
import AppRouter from '../AppRouter/AppRouter';
import GuestUser from '../Guest/Guest';
import { useStoreState, useStoreActions } from 'easy-peasy';

function App() {
  // const isUserLoggedIn = useStoreState(state => state.auth.isLoggedIn);
  // const getUserLogInAction = useStoreActions(actions => actions.auth.getUserLogInAction);
  // const setAuthChangeListener = useStoreActions(actions => actions.auth.setAuthChangeListener);

  // useEffect(() => {
  //   (async () => {
  //     await getUserLogInAction();
  //   })();
  // }, [isUserLoggedIn]);

  useEffect(() => {
    (() => {
      // setAuthChangeListener();
    })();
  }, []);

  return (
    <div className="App">
      {/* TODO: use this to use with login */}
      {/* { isUserLoggedIn ? <CategoryList /> : <GuestUser /> } */}
      <AppRouter />
    </div>
  );
}

export default App;
