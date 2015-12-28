import React from 'react';
import ReactDOM from 'react-dom';
import SearchableImage from './components/SearchableImage';
import EditableDiv from './components/editableDiv';
import AppEditor from './components/appEditor'
import {data} from './components/data';


ReactDOM.render(<AppEditor data={data} />, document.getElementById('appeditor'))

$(document).ready(function(e){
    console.log("ready");
});
//


