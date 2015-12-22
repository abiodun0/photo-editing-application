import React from 'react';
import ReactDOM from 'react-dom';
import SearchableImage from './components/SearchableImage';
import EditableDiv from './components/editableDiv';
import {data} from './components/data';

ReactDOM.render(<SearchableImage data={data}/>, document.getElementById('upload'));
ReactDOM.render(<EditableDiv />, document.getElementById('editor'));

$(document).ready(function(e){
    console.log("ready");
})
//


