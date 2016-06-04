import React from 'react';
import {connect} from 'react-redux';
import ImageDiv from './imagediv';
import FilterDiv from './filterdiv';

const EditableDiv = (props) => {
  return (
            <div className="edit-container">
            <ImageDiv activeImage={props.activeImage}/>
            <FilterDiv activeImage={props.activeImage}/>
            </div>
            );
}

const mapStateToProps = (state) => {
  return {
    activeImage : state.activeImage
  }
}

export default connect(mapStateToProps)(EditableDiv);
