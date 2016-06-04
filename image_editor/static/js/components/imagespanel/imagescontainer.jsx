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

