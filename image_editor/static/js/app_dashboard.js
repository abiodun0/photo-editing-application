import React from 'react';
import ReactDOM from 'react-dom';
import SearchableImage from './components/SearchableImage';
import EditableDiv from './components/editableDiv';
import AppEditor from './components/appEditor';


ReactDOM.render(<AppEditor />, document.getElementById('appeditor'))

$(document).ready(function(e){
    console.log("ready");
});
//


