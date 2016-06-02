import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import _ from 'lodash';
import FilterImage from './filterimage';

class FilterDiv extends React.Component {
   /**
   * Handles the change in filtering the image sends to the parent prop function
   * @param {string} filter the filter text
   */
    activateFilter(filter) {
      if (filter !== this.props.image.current_filter) {
        let image = _.clone(this.props.image);
        image.filtered = true;
        image.currentFilter = filter;
        this.props.changeFilter(image, filter);
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
        active: this.props.image.currentFilter === filter
      });
      return (<FilterImage filter={filter}
                image={`/media/${this.props.image.thumbnail}`}
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
      if (this.props.image) {
        return (
            <Slider {...settings}>
            {filters.map(this._createFilterDiv.bind(this))}
            </Slider>
            );
      }
      if (!this.props.image) {
        return (<div />);
      }
    }
}

// // Sets the required propTypes from the parent and give warnings if ts not present
// FilterDiv.propTypes = {
//   image: React.PropTypes.oneOfType(
//     [React.PropTypes.object, React.PropTypes.string]).isRequired,
//   changeFilter: React.PropTypes.func.isRequired
// };

export default FilterDiv;
