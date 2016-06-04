import React from 'react';
import {connect} from 'react-redux'


const ProgressBar = (props) => {

    return (
            <div className="progresszone">
            <p>Uploading {props.filename}...</p>
            <div className="row">
            <div className="col-sm-4">
             <img src={props.preview} />
             </div>
             <div className="col-sm-8">
            <progress className="progress progress-striped progress-info"
            value={props.percentage} max="100">
            {props.percentage}%</progress>
            </div>
            </div>
            </div>
        );

}
const mapStateToProps = (state) => {
  return {
    preview : state.preview,
    perecentage: state.percentage,
    filename: state.filename
  }
}
export default connect(mapStateToProps)(ProgressBar);


