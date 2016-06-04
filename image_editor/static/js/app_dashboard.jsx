import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import {getAllImages} from './actions'
import AppEditor from './components/appEditor';

// Renders the predefined react components
store.dispatch(getAllImages());
ReactDOM.render(
  <Provider store={store}>
  < AppEditor / >
  </Provider>, document.getElementById('appeditor')
);
