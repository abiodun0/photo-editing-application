import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import {connect} from 'react-redux';
import _ from 'lodash';
import FilterImage from './filterimage';
import {updateImage} from '../../actions'

class FilterDiv extends React.Component {
   /**
   * Handles the change in filtering the image sends to the parent prop function
   * @param {string} filter the filter text
   */
    activateFilter(filter) {
      if (filter !== this.props.activeImage.current_filter) {
        let image = _.clone(this.props.activeImage);
        image.filtered = true;
        image.currentFilter = filter;
        this.props.updateImage(image, filter, true)
      }
    }
   /**
   * initializes facebook API
   * @param {string} filter the filter text
   * @param {int} i the index of the array set as the key
   *@return {string} the FilterImage Component
   */
    _createFilterDiv(filter, i) {
      var activeFilter = classNames({
        active: this.props.activeImage.currentFilter === filter
      });
      return (<FilterImage filter={filter}
                image={`/media/${this.props.activeImage.thumbnail}`}
                className={`${activeFilter} ${filter}`} key={i}
                onClick={this.activateFilter.bind(this, filter)} />);
    }
    /**
    * render the FilterDiv component
    *@return {string} div component
    */
    render() {
      let filters = document.querySelector('meta[name="filters"]')
                            .getAttribute('content').split(',');
      var settings = {
        className: 'slider',
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true
      };
      if (this.props.activeImage.title) {
        return (
            <Slider {...settings}>
            {filters.map(this._createFilterDiv.bind(this))}
            </Slider>
            );
      }
      return (<div />);
    }
}



export default connect(null, {updateImage})(FilterDiv);
