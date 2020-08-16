import React, { useEffect } from "react";
import "./App.css";
import AppRouter from "../AppRouter/AppRouter";
import GuestUser from "../Guest/Guest";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontSize: 12,
    htmlFontSize: 12,
    body1: {
      fontSize: "1em"
    }
  }
});

function App() {
  const isUserLoggedIn = useStoreState(state => state.auth.isLoggedIn);
  const setAuthChangeListener = useStoreActions(
    actions => actions.auth.setAuthChangeListener
  );

  useEffect(() => {
    (() => {
      setAuthChangeListener();
    })();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {isUserLoggedIn ? <AppRouter /> : <GuestUser />}
      </ThemeProvider>
    </div>
  );
}

export default App;
