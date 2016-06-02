import React from 'react';
import UploadPanel from './uploadpanel.jsx';
import ImageDiv from './imagediv.jsx';
import {connect} from 'react-redux';


class ImagesContainer extends React.Component {
  render(){
          let dropzone = (<UploadPanel/>);
          let images = this.props.images? this.props.images: []
          let sections = []
          images.forEach((image, i) => {
            sections.push(<ImageDiv key={i}
                 image={image}
               />);
          })
    return (
            <div>
            <div className="upload-img">
              {sections}
            </div>
            {dropzone}
            </div>
       );
  }
}

const mapStateToProps = (state) => {
  const {allImages, filterText} = state
  return {
    images: allImages.filter((image)=> {
      return image.title.toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
  })
  }
}
export default connect(mapStateToProps)(ImagesContainer);

// class ImagesContainer extends React.Component {
//     /**
//     * sets the active state to 0(no object is active while mounting)
//     */
//     componentWillMount() {
//       this.setState({activeKey: 0});
//     }
//     /**
//     * Sends the acitve image object to the parent component.
//     * @param {int} key the active image id.
//     * @param {object} image the active image
//     */
//     changeActiveKey(key, image) {
//       this.setState({activeKey: key});
//       this.props.changeImage(image);
//     }
//     /**
//     * render the ImagesContainer component
//     *@return {string} div component
//     */
//     render() {
//       let sections = [];
//       let data = this.props.data;
//       // Intialize the dropzone upload component
//       let dropzone = (<UploadPanel
//         uploadImage={this.props.uploadImage.bind(this)}
//         percentage={this.props.percentage || 100}
//         filename={this.props.filename}
//         preview={this.props.preview} isUploading={this.props.isUploading}/>);

//       // Custom div to display when there are no uploaded image by the user
//       if (data.length < 1) {
//         return (
//             <div className="upload-img"> <div className="uploaded">
//             <p className="text-center"> You dont have any images yet </p></div>
//             {dropzone}
//             </div>
//                 );
//       }
//       // Loop through the supplied data and filter by the text on the searchbox
//       data.forEach(function(image, i) {
//         if (image.title.toLowerCase()
//             .indexOf(this.props.filterText
//                                 .toLowerCase()) === -1) return;
//         sections.push(
//                 <ImageDiv key={i} getKey={image.id}
//                 image={image} activeKey={this.state.activeKey}
//                 changeKey={this.changeActiveKey.bind(this)} />);
//       }.bind(this));
//       // Handles when the search doesn't match any of the image title
//       if (sections.length < 1) {
//         return (
//             <div className="upload-img">
//             <div className="uploaded">
//             <h5> No Images matched your criteria
//             </h5></div>
//             {dropzone}
//             </div>
//             );
//       }
//       // The images are displayed if the filtered images lenght is greater than 0
//       if (sections.length > 0) {
//         return (
//             <div>
//             <div className="upload-img">{sections}
//             </div>
//             {dropzone}
//             </div>);
//       }
//     }
// }

// ImagesContainer.propTypes = {
//   data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
//   filterText: React.PropTypes.string.isRequired,
//   changeImage: React.PropTypes.func.isRequired,
//   uploadImage: React.PropTypes.func.isRequired
// };

