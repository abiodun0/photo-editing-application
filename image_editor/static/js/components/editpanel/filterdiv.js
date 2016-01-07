import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import _ from 'lodash';
import FilterImage from './filterimage';

class FilterDiv extends React.Component{

    activateFilter(filter){
        if(filter != this.props.image.current_filter){
            let image = _.clone(this.props.image)
            image['filtered'] = true;
            image['current_filter'] = filter
            this.props.changeFilter(image, filter);
        }
    }
    
    _createFilterDiv(filter,i){
        var activeFilter = classNames({
                'active': this.props.image.current_filter == filter
            });
            return (<FilterImage filter={filter} image={`/media/${this.props.image.thumbnail}`} 
                className={`${activeFilter} ${filter}`} key={i} 
                onClick={this.activateFilter.bind(this,filter)} />);
        }

    render(){
        let filters = document.querySelector("meta[name='filters']").getAttribute('content').split(",");
        var settings = {
            className:'slider',
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows:true
        };
        if (this.props.image){
        return(
            
             <Slider {...settings}>
             {filters.map(this._createFilterDiv.bind(this))}
            </Slider>
            );
    }
    else{
        return(<div />)
    }

    }
}

FilterDiv.propTypes = {

    image: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.string]).isRequired,


    changeFilter: React.PropTypes.func.isRequired
};

export default FilterDiv;