import React from 'react';
import Slider from 'react-slick';

export default class EditableDiv extends React.Component{

    constructor(props){
        super()
        console.log(props)
        this.state = props
        console.log("is image set", this.state.image);
       
    }
    applyFilter(image){
        this.setState({image: image});
    }
    componentWillUnmount() {
        console.log("unmount");  
    }
    componentWillReceiveProps(nextProps) {
        console.log("next", nextProps);
        this.setState({image: nextProps.image})
    }
    render(){
        return(
            <div>
            <ImageDiv image={this.state.image} />
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
                  <h6 className="text-uppercase">{this.props.image.title || 'No image selected'} </h6>
                  <h6 className="text-uppercase">{this.props.image.filter || 'No Filter Applied'} </h6>
                </blockquote>
            </div>
            <div className="edit-buttons">
            <button className="btn"><span className="mdi mdi-pencil"></span></button>
            <button className="btn"><span className="mdi mdi-delete"></span></button>

            <button className="btn pull-sm-right"><span className="mdi mdi-share-variant"></span></button>
            <button className="btn pull-sm-right"><span className="mdi mdi-download"></span></button></div>
            <div className="edit text-center">
            <img src={this.props.image.picture || ''} />
            </div>
            </div>
            );
    }
}
class FilterDiv extends React.Component{

    render(){
        let filterSection = [];
        let filters = ['gray', 'Hd', 'serpia','black','orange','sunny'];
        // filters.forEach(function(filter,i){
        //     filterSection.push(<FilterItem key={i} filter={filter} />);
        // });


    var createFilterDiv = function(filter,i){
            return (
                <div key={i}>
                <img src="http://placehold.it/100x100" />
                <p className="lead">{filter}</p>
                </div>
                );
        }

         var settings = {
            className:'slider',
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows:true
        };
        return(
            
             <Slider {...settings}>
             {filters.map(createFilterDiv)}
            </Slider>
            );
    }
}
class FilterItem extends React.Component{
    render(){
        return(<div><h3>{this.props.filter}</h3></div>);
    }
}
