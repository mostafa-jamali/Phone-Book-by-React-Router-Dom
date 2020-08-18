import React from 'react';
import { Provider } from 'react-redux';
import {store} from './Redux/store';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Wellcome from './views/Wellcome/Wellcome';
import PhoneBookList from './views/PhoneBookList/PhoneBookList';
import EditContact from './views/EditContact/EditContact'
import AddForm from './views/Add/AddForm';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/phone-book-list/add-contact">
              <AddForm/>
            </Route>
            <Route exact path="/phone-book-list/edit-contact" component={EditContact} />
            <Route exact path="/phone-book-list" component={PhoneBookList} />
            <Route path="/" component={Wellcome} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
