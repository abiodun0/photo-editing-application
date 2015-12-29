import React from 'react';
import SearchableImage from './searchableimage';
import EditableDiv from './editableDiv';
import {data} from './data';
import _ from 'lodash';

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
        console.log(this.state,"states here");
      
    }
    editImage(image){
        // let index = -1;
        // for(let i=0; i<this.state.data.length; i++){
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
        _.remove(this.state.data,(m)=>{
            return image.id == m.id;
        });
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

