import React from 'react';
import ReactDOM from 'react-dom';
import SearchableImage from './components/SearchableImage'
import {data} from './components/data';

ReactDOM.render(<SearchableImage data={data}/>, document.getElementById('upload'));
//require('./modules.js')

