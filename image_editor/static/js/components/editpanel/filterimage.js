import React from 'react';

const FilterImage = (props) => {
  return (
      <div className={props.className} onClick={props.onClick}>
                  <img src={props.image} width="100" height="100"/>
                  <p className="lead">{props.filter}</p>
                  </div>
              );
}

// class FilterImage extends React.Component {
//   /**
//   * render the FilterImage component
//   *@return {string} div component
//   */
//   render() {
//     return (<div className={this.props.className} onClick={this.props.onClick}>
//                 <img src={this.props.image} width="100" height="100"/>
//                 <p className="lead">{this.props.filter}</p>
//                 </div>);
//   }
// }
// // Sets the required propTypes from the parent and give warnings if ts not present
// FilterImage.propTypes = {
//   image: React.PropTypes.string.isRequired,
//   filter: React.PropTypes.string.isRequired,
//   className: React.PropTypes.string.isRequired,
//   onClick: React.PropTypes.func.isRequired
// };

export default FilterImage;
