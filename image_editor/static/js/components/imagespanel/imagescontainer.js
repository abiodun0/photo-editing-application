import React from 'react';
import _ from 'lodash';
import UploadPanel from './uploadpanel';
import ImageDiv from './imagediv';

class ImagesContainer extends React.Component{

    componentWillMount() {
       this.setState({activeKey: 0});
          
    }
    changeActiveKey(key,image){
        this.setState({activeKey: key});
        this.props.changeImage(image);
    }


    render(){
        let sections = [];
        let data = this.props.data;
        let dropzone = (<UploadPanel  uploadImage={this.props.uploadImage.bind(this)} 
            percentage={this.props.percentage || 100} filename={this.props.filename} 
            preview={this.props.preview} isUploading={this.props.isUploading}/>);
        if(data.length<1){
            return(
                <div className="upload-img"> <div className="uploaded"> 
                <h5> You dont have any images yet </h5></div>
                {dropzone}
                </div>
                );
        }
        data.forEach(function(image,i){
            if(image.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) == -1) return;

            sections.push(
                <ImageDiv key={i} getKey={image.id} image={image} activeKey={this.state.activeKey} 
                changeKey={this.changeActiveKey.bind(this)} />);
        }.bind(this));
        if(sections.length < 1){
        return(
         <div className="upload-img"> <div className="uploaded"> <h5> No Images matches your criteria </h5></div>
            {dropzone}
            </div>

            
            )
           }
           else {
            return (
            <div className="upload-img">{sections}
            {dropzone}
            </div>);
        }

        
    }
}

ImagesContainer.propTypes = {

    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    filterText: React.PropTypes.string.isRequired,

    changeImage: React.PropTypes.func.isRequired,
    uploadImage: React.PropTypes.func.isRequired
};

export default ImagesContainer;