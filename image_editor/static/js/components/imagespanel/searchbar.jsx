import React from 'react';
import {connect} from 'react-redux';
import {filterFromTitles} from '../../actions'

const SearchBar =  (props) => {

  /**
  * render the SearchBar component
  *@return {string} div component
  */
    return (
            <form className="form">
              <div className="form-group">
                <div className="input-group">
                <input type="text" className="form-control"
                    placeholder="Search your pictures..."
                    onChange={props.filterFromTitle}
                    />
                  <div className="input-group-addon">
                  <i className="mdi mdi-magnify"></i></div>
                </div>
              </div>
            </form>
            );
}

const filterFromTitle = (e) => (dispatch) => {
   return dispatch(filterFromTitles(e.target.value))
}

export default connect(null, {filterFromTitle})(SearchBar);
