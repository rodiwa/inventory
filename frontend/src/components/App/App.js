import React, { useEffect } from 'react';
import './App.css';
// import Inventory from '../Inventory/Inventory';
import AppRouter from '../AppRouter/AppRouter';
import GuestUser from '../Guest/Guest';
import { useStoreState, useStoreActions } from 'easy-peasy';

function App() {
  const isUserLoggedIn = useStoreState(state => state.auth.isLoggedIn);
  const setAuthChangeListener = useStoreActions(actions => actions.auth.setAuthChangeListener);

  useEffect(() => {
    (() => {
      setAuthChangeListener();
    })();
  }, []);

  return (
    <div className="App">
      {/* TODO: use this to use with login */}
      { isUserLoggedIn ? <AppRouter /> : <GuestUser /> }
      {/* <AppRouter /> */}
    </div>
  );
}

export default App;
