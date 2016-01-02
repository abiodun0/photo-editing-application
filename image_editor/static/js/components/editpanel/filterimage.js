import React from 'react';

class FilterImage extends React.Component{


    render(){

        return(<div className={this.props.className} onClick={this.props.onClick}>
                <img src={this.props.image} width="100" height="100"/>
                <p className="lead">{this.props.filter}</p>
                </div>)

    }
    
}

export default FilterImage;