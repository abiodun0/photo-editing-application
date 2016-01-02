import React from 'react';
import ImageDiv from './imagediv';
import FilterDiv from './filterdiv';


class EditableDiv extends React.Component{

    render(){
        return(
            <div>
            <ImageDiv image={this.props.image} editImage={this.props.editImage} 
            deleteImage={this.props.deleteImage}
            updateImage={this.props.updateImage}
            />
            <FilterDiv image={this.props.image} changeFilter={this.props.updateImage}/>
            </div>
            );
    }
}

export default EditableDiv;