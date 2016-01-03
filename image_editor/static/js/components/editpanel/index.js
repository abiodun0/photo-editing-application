import React from 'react';
import ImageDiv from './imagediv';
import FilterDiv from './filterdiv';


class EditableDiv extends React.Component{

    render(){
        return(
            <div>
            <ImageDiv image={this.props.image} editImage={this.props.editImage} 
            deleteImage={this.props.deleteImage}
            updateImage={this.props.updateImage}/>
            <FilterDiv image={this.props.image} changeFilter={this.props.updateImage}/>
            </div>
            );
    }
}

ImageDiv.propTypes = {

    image: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.string]).isRequired,

    updateImage: React.PropTypes.func.isRequired,
    deleteImage: React.PropTypes.func.isRequired,
    editImage: React.PropTypes.func.isRequired

};

export default EditableDiv;