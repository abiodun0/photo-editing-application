import React from 'react';
import _ from 'lodash';
import toastr from 'toastr';
import ImageApi from './api/imageApi';
import SearchableImage from './imagespanel';
import EditableDiv from './editpanel';


export default class AppEditor extends React.Component{
    constructor(){
        super();
        this.state = {image:'',
           isUploading: false,
           percentage:1,
           preview:'',
           filename:''};
    }
    componentWillMount() {
        ImageApi.getAllImages((object)=>{
                this.setState(object)
            });
        }
    updateImage(image, filter=null){
        ImageApi.updateImage(image, filter, this, (object)=>{
                this.setState(object)
            });
        }
    changeImage(image){
        this.setState({image: image});

      
    }
    editImage(image){
        let index = _.findIndex(this.state.data, (img) => {
            return img.id == image.id;
        });
        this.state.data[index] = image;
        this.changeImage(image);
    }

    deleteImage(image){
        ImageApi.deleteImage(image,this,(object)=>{
                this.setState(object)
            });

    }
    uploadImage(files){
        ImageApi.uploadImage(files, this, (object)=>{
            this.setState(object);
        });

    }

    addImage(image){
        this.state.data.unshift(image);
        this.forceUpdate();
    }
    render(){
        let loadingDiv;
        if(this.state.isLoading) {
            loadingDiv = (<img src="https://raw.githubusercontent.com/BenBBear/ionic-cache-src/master/img/loader.gif" width="70" height="70" style={{marginLeft:'auto',marginRight: 'auto',display:'block',position:'absolute',top:-15+'px',left: 45+'%', right: 45 + '%'}}/>);
        }
        return(
             <div className="row">
             <div className="col-sm-3">
             <SearchableImage data={this.state.data} uploadImage={this.uploadImage.bind(this)}
             filename={this.state.filename}
             preview={this.state.preview} isUploading={this.state.isUploading} percentage={this.state.percentage}

             changeImage={this.changeImage.bind(this)}/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    {loadingDiv}

                    <EditableDiv image={this.state.image} editImage={this.editImage.bind(this)} deleteImage={this.deleteImage.bind(this)}
                    updateImage={this.updateImage.bind(this)}
                    />
                </div>
            </div>
            </div>
            );


    }
}

