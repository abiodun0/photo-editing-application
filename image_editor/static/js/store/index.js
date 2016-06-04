import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import imageApp from '../reducers/reducers';

let store = createStore(imageApp, applyMiddleware(thunk));
export default store;

