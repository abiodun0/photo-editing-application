import React from 'react';

export default class EditableDiv extends React.Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div>
            <ImageDiv image={this.props.image} />
            <FilterDiv />
            </div>
            );
    }
}
class ImageDiv extends React.Component{


    render(){

        return(
            <div>
            <div className="card text-xs-center">
                <blockquote className="card-blockquote card-text">
                  <h6 className="text-uppercase">{this.props.image.title || 'No image selected'}</h6>
                </blockquote>
            </div>
            <div className="edit-buttons">
            <button className="btn"><span className="mdi mdi-pencil"></span></button>
            <button className="btn"><span className="mdi mdi-delete"></span></button>

            <button className="btn pull-sm-right"><span className="mdi mdi-share-variant"></span></button>
            <button className="btn pull-sm-right"><span className="mdi mdi-download"></span></button></div>
            <div className="edit text-center">
            <img src={this.props.image.image || 'http://placehold.it/600x600'} />
            </div>
            </div>
            );
    }
}
class FilterDiv extends React.Component{

    render(){
        let filterSection = [];
        let filters = ['gray', 'Hd', 'serpia' ,'hue'];
        filters.forEach(function(filter,i){
            filterSection.push(<FilterItem key={i} filter={filter} />);
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
