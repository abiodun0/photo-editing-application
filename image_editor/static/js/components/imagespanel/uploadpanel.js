import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import toastr from 'toastr';
import ProgressBar from './progressbar';

class UploadPanel extends React.Component{
    constructor(){
        super()
        this.state = {}
    }

    onDrop(files) {
        let url = document.querySelector("meta[name='image_url']").getAttribute('content');
        
        
        files.forEach((file)=> {
            this.setState({filename: file.name})
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.setState({preview: e.target.result});
            }
            request.post(url)
            .attach("image", file, file.name)
            .set('Accept', 'application/json')
            .on('progress',(e)=>{
                console.log(e.percent, file.name, e);
                this.setState({percentage: e.percent,isUploading: true});

            })
            .end((err, res) => {
                this.setState({isUploading: false});
                if(err){
                    console.log(res)
                    return toastr.error(res.body,'unable to upload ' + file.name,{closeButton:true});
                }
                
                toastr.success("successfully uploaded " + file.name,'',{closeButton: true});
                this.props.addImage(res.body);

            })
        });
        
    }
    render(){
        return(<div ref="progresszone" className="dropzone text-center">
            <Dropzone ref="dropzone" className="drop" onDrop={this.onDrop.bind(this)} accept="image/*">
            <div >
                    <h5>Click or drop your images here</h5>
                    <ProgressBar percentage={this.state.percentage || 0 } filename={this.state.filename || '' } preview={this.state.preview || ''} isUploading={this.state.isUploading || false}/>
                
                </div>
            </Dropzone>
            </div>);
    }
}
UploadPanel.propTypes = {
  addImage: React.PropTypes.func.isRequired

};
export default UploadPanel;


