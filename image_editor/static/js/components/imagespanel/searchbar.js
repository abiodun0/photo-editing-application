import React from 'react';

class SearchBar extends React.Component{


    handleChange(){
            this.props.onUserInput(
            this.refs.filter.value
        )

    }
    render(){
        return (
            <form className="form">
              <div className="form-group">
                <div className="input-group">
                
                  <input type="text" className="form-control" 
                    placeholder="Search your pictures..." 
                    ref="filter"
                    value= {this.props.filterText}
                    onChange= {this.handleChange.bind(this)}
                    />
                  <div className="input-group-addon"><i className="mdi mdi-magnify"></i></div>
                </div>
              </div>
            </form>
            );
    }
}

export default SearchBar