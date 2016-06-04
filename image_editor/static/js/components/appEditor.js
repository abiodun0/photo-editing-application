import React from 'react';
import _ from 'lodash';
import {isLoading} from '../reducers/reducers'
import ImageApi from '../api/imageApi';
import ImagesPanel from './imagespanel/index.jsx';
import EditableDiv from './editpanel';
import { connect } from 'react-redux';

const AppEditor  = (props) => {
      let loadingDiv = null;
      if (props.isLoading) {
        loadingDiv = (<img src="https://raw.githubusercontent.com/BenBBear/ionic-cache-src/master/img/loader.gif"
            width="50" height="50"
            style={{transform: 'translate(' - 50 + '%, ' + 50 + '%)',
            position: 'absolute', top: -15 + 'px', left: 50 + '%'}}/>);
      }
      return (
             <div className="row">
             <div className="col-sm-3">
             <ImagesPanel/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    {loadingDiv}
                    <EditableDiv/>
                </div>
            </div>
            </div>
      );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  }
}
export default connect(mapStateToProps)(AppEditor)
// export default class AppEditor extends React.Component {
//     /**
//     * Sets initial value of state variables to there default values
//     */
//     constructor() {
//       super();
//       this.state = {image: '',
//            isUploading: false,
//            percentage: 1,
//            preview: '',
//            filename: '',
//            data: []
//        };
//     }
//     /**
//     * Before the component mounts send an ajax request that gets all the user images
//     */
//     componentWillMount() {
//       ImageApi.getAllImages(object => {
//         console.log(object);
//         this.setState(object);
//       });
//     }
//     /**
//     * handles updating of images title & filter
//     *@param {object} image The image to be updated
//     *param {string} filter the string representation of the filter
//     */
//     updateImage(image, filter = null) {
//       ImageApi.updateImage.call(this, image, filter);
//     }
//     /**
//     * changes the currently active image
//     *@param {object} image The image to be updated
//     */

//     changeImage(image) {
//       this.setState({image: image});
//     }
//     /**
//     * Adds real time update to the image that is edited currently
//     *@param {object} image The image to be updated
//     */
//     editImage(image) {
//       let index = _.findIndex(this.state.data, img => {
//         return img.id === image.id;
//       });
//       this.state.data[index] = image;
//       this.changeImage(image);
//     }
//     /**
//     * Handles image deletion
//     *@param {object} image The image to be updated
//     */
//     deleteImage(image) {
//       ImageApi.deleteImage.call(this, image);
//     }
//     /**
//     * Handles upload of multiple images
//     *@param {array} files The image to be updated
//     */
//     uploadImage(files) {
//       ImageApi.uploadImage.call(this, files);
//     }
//     /**
//     * Adds image to the state.data for live update
//     *@param {object} image The image to be updated
//     */
//     addImage(image) {
//       this.state.data.unshift(image);
//       this.forceUpdate();
//     }
//     /**
//     * render the AppEditor component
//     *@return {string} div component
//     */
//     render() {
//       console.log('did we even get here?');
//       console.log(this.context, 'context');
//       let loadingDiv = null;
//       if (this.state.isLoading) {
//         loadingDiv = (<img src="https://raw.githubusercontent.com/BenBBear/ionic-cache-src/master/img/loader.gif"
//             width="50" height="50"
//             style={{transform: 'translate(' - 50 + '%, ' + 50 + '%)',
//             position: 'absolute', top: -15 + 'px', left: 50 + '%'}}/>);
//       }
//       return (
//              <div className="row">
//              <div className="col-sm-3">
//              <ImagesPanel data={this.state.data}
//              uploadImage={this.uploadImage.bind(this)}
//              filename={this.state.filename}
//              preview={this.state.preview} isUploading={this.state.isUploading}
//              percentage={this.state.percentage}
//              changeImage={this.changeImage.bind(this)}/>
//              </div>
//             <div className="col-sm-9">
//                 <div className="edit-div">
//                     {loadingDiv}

//                     <EditableDiv image={this.state.image}
//                     editImage={this.editImage.bind(this)}
//                     deleteImage={this.deleteImage.bind(this)}
//                     updateImage={this.updateImage.bind(this)}
//                     />
//                 </div>
//             </div>
//             </div>
//             );
//     }
// }

