import React from 'react';
import _ from 'lodash';
import SearchableImage from './searchableimage';
import EditableDiv from './editableDiv';
import {data} from './data';


export default class AppEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {image:''};
    }
    componentWillMount() {
        this.setState({data:data});
    }

    changeImage(image){
        this.setState({image: image});
        this.editImage(image);
      
    }
    editImage(image){
        let index = _.findIndex(this.state.data, (img) => {
            return img.id == image.id;
        });
        this.state.data[index] = image;
    }

    deleteImage(image){
        _.remove(this.state.data,(m)=>{
            return image.id == m.id;
        });
        this.setState({image: ''});
    }
    render(){

        return(
             <div className="row">
             <div className="col-sm-3">
             <SearchableImage data={this.state.data} changeImage={this.changeImage.bind(this)}/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    <EditableDiv image={this.state.image} editImage={this.changeImage.bind(this)} deleteImage={this.deleteImage.bind(this)}/>
                </div>
            </div>
            </div>
            );


    }
}

