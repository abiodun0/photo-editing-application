import React from 'react';
import _ from 'lodash';
import UploadPanel from './uploadpanel';
import ImageDiv from './imagediv';

class ImagesContainer extends React.Component{

    componentWillMount() {
       this.setState({activeKey: 'default',
       isUploading: false,
       percentage:1,
       preview:'',
       filename:''});
          
    }
    changeActiveKey(key,image){
        this.setState({activeKey: key});
        this.props.changeImage(image);
    }


    render(){
        let sections = [];
        let data = this.props.data;
        let dropzone = (<UploadPanel  addImage={this.props.addImage.bind(this)} percentage={this.state.percentage || '100'} filename={this.state.filename} preview={this.state.preview} isUploading={this.state.isUploading}/>);
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

export default ImagesContainer;