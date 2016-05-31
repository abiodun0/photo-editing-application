import React from 'react';
import ReactDOM from 'react-dom';
import AppEditor from './components/appEditor';
import { Provider } from 'react-redux';

// Renders the predefined react components
var objecta = {
  name: "abidun"
}
ReactDOM.render(
  <Provider store={objecta}>
  < AppEditor / >
  </Provider>, document.getElementById('appeditor'));
