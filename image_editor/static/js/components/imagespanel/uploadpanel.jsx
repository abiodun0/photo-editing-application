import React from 'react';
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone';
import ProgressBar from './progressbar.jsx';
import {uploadImages} from '../../actions'


class UploadPanel extends React.Component {
    onDrop(files) {
      // this.props.uploadImage(files);
    }
  render() {
    let progressBar = this.props.isUploading ? <ProgressBar/>: null;
    return (<div ref="progresszone" className="dropzone text-center">
            <Dropzone ref="dropzone" className="drop"
               onDrop={this.props.uploadImages} accept="image/*">
            <div >
            <h5>Click or drop your images here</h5>
              {progressBar}
            </div>
            </Dropzone>
            </div>);
  }
}
const mapStateToProps = (state) => {
  return {
    isUploading: state.isUploading
  }
}

export default connect(mapStateToProps, {uploadImages})(UploadPanel);


