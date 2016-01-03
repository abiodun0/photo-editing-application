import React from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';
import ProgressBar from './progressbar';
import ImageApi from './../api/imageApi';

class UploadPanel extends React.Component{
    constructor(){
        super()
        this.state = {}
    }

    onDrop(files) {
        this.props.uploadImage(files);
        
    }
    render(){
        return(<div ref="progresszone" className="dropzone text-center">
            <Dropzone ref="dropzone" className="drop" onDrop={this.onDrop.bind(this)} >
            <div >
                    <h5>Click or drop your images here</h5>
                    <ProgressBar percentage={this.props.percentage || 0 } filename={this.props.filename || '' } preview={this.props.preview || ''} isUploading={this.props.isUploading || false}/>
                
                </div>
            </Dropzone>
            </div>);
    }
}
UploadPanel.propTypes = {
  uploadImage: React.PropTypes.func.isRequired,

  preview: React.PropTypes.string.isRequired,
  isUploading: React.PropTypes.bool.isRequired,
  filename: React.PropTypes.string.isRequired,
  percentage: React.PropTypes.number.isRequired,

};
export default UploadPanel;


