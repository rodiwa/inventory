import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import CategoryList from '../CategoryList/CategoryList';
import ItemList from '../ItemList/ItemList';
import PageNotFound from '../PageNotFound/PageNotFound';
import AboutApp from '../AboutApp/AboutApp';
import Header from '../Header/Header';
import Guest from '../Guest/Guest'

const AppRouter = () => {
  return (
    <Router>
        <Header />
      <Switch>
        <Route exact path="/" component={CategoryList}></Route>
        <Route exact path="/items/:categoryId" component={ItemList}></Route>
        <Route exact path="/about" component={AboutApp}></Route>
        <Route exact path="/logout" component={Guest}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
