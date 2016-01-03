import React from 'react';
import SearchBar from './searchbar';
import ImagesContainer from './imagescontainer';


class ImagesPanel extends React.Component{
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

                <ImagesContainer data={this.props.data} uploadImage={this.props.uploadImage}
                filterText={this.state.filterText} filename={this.props.filename}
                preview={this.props.preview} isUploading={this.props.isUploading} percentage={this.props.percentage}
                changeImage={this.props.changeImage}
                />
            </div>

            );
    }
}
ImagesPanel.propTypes = {

    data: React.PropTypes.array.isRequired,

    changeImage: React.PropTypes.func.isRequired,
    uploadImage: React.PropTypes.func.isRequired
};

export default ImagesPanel;