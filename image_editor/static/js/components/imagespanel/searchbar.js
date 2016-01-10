import React from 'react';

class SearchBar extends React.Component {
  /**
  * Handles the change in user input and anchor it to filtering
  * The supplied image datat in the imagePanel
  */
  handleChange() {
    this.props.onUserInput(this.refs.filter.value);
  }
  /**
  * render the SearchBar component
  *@return {string} div component
  */
  render() {
    return (
            <form className="form">
              <div className="form-group">
                <div className="input-group">
                <input type="text" className="form-control"
                    placeholder="Search your pictures..."
                    ref="filter"
                    value= {this.props.filterText}
                    onChange= {this.handleChange.bind(this)}/>
                  <div className="input-group-addon">
                  <i className="mdi mdi-magnify"></i></div>
                </div>
              </div>
            </form>
            );
  }
}

// Sets the required propTypes from the parent and give warnings if ts not present
SearchBar.propTypes = {
  onUserInput: React.PropTypes.func.isRequired,
  filterText: React.PropTypes.string.isRequired
};

export default SearchBar;
