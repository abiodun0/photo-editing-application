import React from 'react';

export default class EditImage extends React.Component{

    constructor(){
        super();

        this.state = {image: {}};
    }

    handleSelectedDiv(image){
        thisSetSate({filter: image});
    }

    render(){
        return(
            <div>
            <ImageDiv image={this.state.image} />
            <FilterDiv changeFilter={this.handleSelectedDiv.bind(this)} />
            </div>
            );
    }
}
class ImageDiv extends React.Component{

    render(){

        return(
            <div>
            <div className="edit-buttons">
            <button className="btn"><span className="mdi mdi-pencil"></span></button>
            <button className="btn"><span className="mdi mdi-delete"></span></button>
            <button className="btn pull-sm-right"><span className="mdi mdi-share-variant"></span></button>
            <button className="btn pull-sm-right"><span className="mdi mdi-download"></span></button></div>
            <div className="edit text-center">
            <img src={this.props.image.src || 'http://placehold.it/500x500'} />
            </div>
            </div>
            );
    }
}

class FilterDiv extends React.Component{

    render(){
        let filterSection = [];
        let filters = ['gray', 'Hd', 'blacknwhite' ,'hue'];
        filters.forEach(function(filter){
            filterSection.push(<FilterItem filter={filter} />);
        });
        return(
            <div id="owl-demo" className="owl-carousel owl-theme">
            {filterSection}
            <a className="btn prev"><span className="mdi mdi-chevron-left"></span></a>
            <a className="btn next"><span className="mdi mdi-chevron-right"></span></a>
            </div>
            );
    }
}
class FilterItem extends React.Component{
    render(){
        return(<div className="item"><h4>{this.props.filter}</h4></div>);
    }
}
