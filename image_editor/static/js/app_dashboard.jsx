import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import imageApp from './reducers/reducers';
import {getAllImages} from './actions'
import AppEditor from './components/appEditor';

// Renders the predefined react components
let store = createStore(imageApp, applyMiddleware(thunk));
store.dispatch(getAllImages());
ReactDOM.render(
  <Provider store={store}>
  < AppEditor / >
  </Provider>, document.getElementById('appeditor')
);
