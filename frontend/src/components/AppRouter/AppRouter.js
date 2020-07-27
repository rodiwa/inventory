import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import CategoryList from '../CategoryList/CategoryList';
import ItemList from '../ItemList/ItemList';
import PageNotFound from '../PageNotFound/PageNotFound';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CategoryList}></Route>
        <Route exact path="/items/:id" component={ItemList}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
