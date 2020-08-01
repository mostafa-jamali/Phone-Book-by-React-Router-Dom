import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Wellcome from './views/Wellcome/Wellcome';
import PhoneBookList from './views/PhoneBookList/PhoneBookList';
import NewContact from './views/NewContact/NewContact'
import EditContact from './views/EditContact/EditContact'
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/phone-book-list/add-contact" component={NewContact} />
          <Route exact path="/phone-book-list/edit-contact" component={EditContact} />
          <Route exact path="/phone-book-list" component={PhoneBookList} />
          <Route path="/" component={Wellcome} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
