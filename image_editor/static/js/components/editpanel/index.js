import React from 'react';
import {connect} from 'react-redux';
import ImageDiv from './imagediv';
import FilterDiv from './filterdiv';

const EditableDiv = (props) => {
  return (
            <div className="edit-container">
            <ImageDiv activeImage={props.activeImage}/>
            <FilterDiv activeImage={props.activeImage}/>
            </div>
            );
}

// class EditableDiv extends React.Component {
//    /**
//    * render the imageDiv component
//    *@return {string} div component
//    */
//     render() {
//       return (
//             <div className="edit-container">
//             <ImageDiv image={this.props.image} editImage={this.props.editImage}
//             deleteImage={this.props.deleteImage}
//             updateImage={this.props.updateImage}/>
//             <FilterDiv image={this.props.image}
//             changeFilter={this.props.updateImage}/>
//             </div>
//             );
//     }
// }
// // Sets the required propTypes from the parent and give warnings if ts not present
// ImageDiv.propTypes = {
//   image: React.PropTypes.oneOfType(
//     [React.PropTypes.object, React.PropTypes.string]).isRequired,
//   updateImage: React.PropTypes.func.isRequired,
//   deleteImage: React.PropTypes.func.isRequired,
//   editImage: React.PropTypes.func.isRequired

// };
const mapStateToProps = (state) => {
  return {
    activeImage : state.activeImage
  }
}

export default connect(mapStateToProps)(EditableDiv);
