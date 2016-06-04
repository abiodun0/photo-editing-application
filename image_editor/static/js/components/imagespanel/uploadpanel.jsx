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
    console.log(this.props.isUploading);
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


// class UploadPanel extends React.Component {
//     constructor() {
//       super();
//       this.state = {};
//     }
//     /**
//      * Handles the file upload and send it to parent's upload props function
//      *@param {array} files The array of files passed from the dropzone upload trigger
//     */
//     onDrop(files) {
//       this.props.uploadImage(files);
//     }
//     /**
//      * render the UploadPanel component
//      *@return {string} div component
//      */
//     render() {
//       return (<div ref="progresszone" className="dropzone text-center">
//             <Dropzone ref="dropzone" className="drop"
//             onDrop={this.onDrop.bind(this)} accept="image/*">
//             <div >
//             <h5>Click or drop your images here</h5>
//             <ProgressBar percentage={this.props.percentage || 0 }
//             filename={this.props.filename || '' }
//             preview={this.props.preview || ''}
//             isUploading={this.props.isUploading || false}/>
//             </div>
//             </Dropzone>
//             </div>);
//     }
// }
// // Sets the required propTypes and throw errors when its not present
// UploadPanel.propTypes = {
//   uploadImage: React.PropTypes.func.isRequired,
//   preview: React.PropTypes.string.isRequired,
//   isUploading: React.PropTypes.bool.isRequired,
//   filename: React.PropTypes.string.isRequired,
//   percentage: React.PropTypes.number.isRequired

// };

