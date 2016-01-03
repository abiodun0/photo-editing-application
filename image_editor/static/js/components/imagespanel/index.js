import React from 'react';
import SearchBar from './searchbar';
import ImagesContainer from './imagescontainer';


class SearchableImage extends React.Component{
    constructor(){
        super();

        this.state = {filterText : ''};
    }
    handleUserInput(filterText){
        this.setState({filterText: filterText});
    }

    render(){
        return (
            <div className="upload-div">

                <SearchBar filterText={this.state.filterText}
                onUserInput={this.handleUserInput.bind(this)} 
                />

                <ImagesContainer data={this.props.data} addImage={this.props.addImage}
                filterText={this.state.filterText} changeImage={this.props.changeImage}
                />
            </div>

            );
    }
}
SearchableImage.propTypes = {

    data: React.PropTypes.array.isRequired,

    changeImage: React.PropTypes.func.isRequired,
    addImage: React.PropTypes.func.isRequired
};

export default SearchableImage;