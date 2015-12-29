import React from 'react';
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
      
    }
    editImage(image){
        // var index = -1;
        // for(var i=0; i<this.state.data.length; i++){
        //     if(this.state.data[i].id == image.id){
        //         index = i;
        //         break;
        //     }
        // }
        // this.state.data[index] = image;
        console.log(this.state.data);
        this.forceUpdate();
    }
    deleteImage(image){
        let index = this.state.data.indexOf(image);
        console.log(index);
        this.state.data.splice(index,1);
        this.setState({image: ''});
        this.forceUpdate();
    }
    render(){

        return(
             <div className="row">
             <div className="col-sm-3">
             <SearchableImage data={this.state.data} changeImage={this.changeImage.bind(this)}/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    <EditableDiv image={this.state.image} editImage={this.editImage.bind(this)} deleteImage={this.deleteImage.bind(this)}/>
                </div>
            </div>
            </div>
            );


    }
}

