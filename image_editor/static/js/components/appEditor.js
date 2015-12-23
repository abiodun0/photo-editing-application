import React from 'react';
import SearchableImage from './searchableimage';
import EditableDiv from './editableDiv';

export default class AppEditor extends React.Component{
    constructor(){
        super();

        this.state = {image:''};
    }

    changeImage(image){

        this.setState({image: image});
      
    }
    render(){

        return(
             <div className="row">
             <div className="col-sm-3">
             <SearchableImage data={this.props.data} onChange={this.changeImage.bind(this)}/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    <EditableDiv image={this.state.image} />
                </div>
            </div>
            </div>
            );


    }
}

