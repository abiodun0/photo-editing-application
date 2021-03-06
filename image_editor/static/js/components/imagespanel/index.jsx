import React from 'react';
import SearchBar from './searchbar.jsx';
import ImagesContainer from './imagescontainer.jsx';

class ImagesPanel extends React.Component {
    /**
    * Sets initial value of this.state.filterText to ''
    */
    constructor() {
      super();
      this.state = {filterText: ''};
    }
    /**
    * Handles filtering of the image by the input filterText
    *@param {string} filterText Sets the filterText state of the component
    */
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    }
    /**
    * render the ImagesPanel component
    *@return {string} div component
    */
    render() {
      return (
        <div className="upload-div">
            <SearchBar/>
            <ImagesContainer />
            </div>

            );
    }
}

export default ImagesPanel;
