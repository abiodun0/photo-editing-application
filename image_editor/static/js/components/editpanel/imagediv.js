/* eslint no-alert: 0*/
import React from 'react';
import TopButtons from './topbuttons.jsx';
import FaceBookApi from '../../api/facebookApi';


const ImageDiv = (props) => {
        let picture = props.activeImage.filtered ?
                    props.activeImage.filter_path : props.activeImage.picture;
      return (
            <div>
              <TopButtons activeImage={props.activeImage}/>
                <div className="edit text-center">
                  <img src={props.activeImage.picture?
                  `/media/${picture}` : '/static/img/no_image_selected.gif'} />
                </div>
            </div>
        );
    }

export default ImageDiv;



// class ImageDiv extends React.Component {
//     /**
//     * Always set editMode to false when component is just mounting to hide the input form
//     */
//     componentWillMount() {
//       this.setState({editMode: false});
//       FaceBookApi.init();
//     }
//     /**
//     * Checks if the the recieved props picture is the same and set
//     * edit mode accordingly
//     *@param {object} nextProps the next set of properties that the component
//     * Will recieve.
//     */
//     componentWillUpdate(nextProps) {
//       if (this.props.image.picture !== nextProps.image.picture) {
//         if (this.state.editMode) this.props.updateImage(this.props.image);
//         this.setState({editMode: false});
//       }
//     }
//     /**
//     * Togges the edit title form
//     *@param {object} e the event object
//     */
//     toggleEdit(e) {
//       e.preventDefault();
//       if (this.state.editMode) this.props.updateImage(this.props.image);
//       this.setState({editMode: !this.state.editMode});
//     }
//     /**
//     * sends the title to the python backend
//     *@param {object} e the event object
//     */
//     changeTitle(e) {
//       e.preventDefault();
//       let imageCopy = _.clone(this.props.image);
//       imageCopy.title = e.target.value;
//       this.props.editImage(imageCopy);
//     }
//     /**
//     * deletes a particular image
//     *@param {object} e the event object
//     */
//     deleteImage(e) {
//       e.preventDefault();
//       if (!confirm('are you sure you want to delete this image')) return;
//       this.props.deleteImage(this.props.image);
//     }
//     /**
//     * Resets filter for an image
//     */
//     resetImage() {
//       if (!confirm('are you sure you want to reset the image')) return;
//       let imageCopy = _.clone(this.props.image);
//       imageCopy.filtered = false;
//       this.props.updateImage(imageCopy);
//     }
//     /**
//     * Handles share on facebook
//     */
//     shareImage() {
//       FaceBookApi.share(this.props.image, this.refs.filteredimage.src);
//     }
//    /**
//    * render the imageDiv component
//    *@return {string} div component
//    */
//     render() {
//       let buttonClass = classNames({
//         btn: true,
//         disabled: !_.isObject(this.props.image)
//       });
//       let picture = this.props.image.filtered ?
//                     this.props.image.filter_path : this.props.image.picture;
//       return (
//             <div>

//             <div className="edit-buttons">
//             <button className={buttonClass}
//             onClick={_.isObject(this.props.image) ?
//                 this.toggleEdit.bind(this) : ''}>
//                 <span className="mdi mdi-pencil"></span></button>
//             <button className={buttonClass}
//             onClick={_.isObject(this.props.image) ?
//                 this.deleteImage.bind(this) : ''}>
//                 <span className="mdi mdi-delete"></span></button>
//             <button className={buttonClass}
//             onClick={_.isObject(this.props.image) ?
//                 this.resetImage.bind(this) : ''}>
//                 <span className="mdi mdi-backup-restore">
//                 </span></button>

//             <div className="card text-xs-center">
//                 <blockquote className="card-blockquote card-text">
//                     <form
//                     className={`${this.state.editMode ? '' : 'hide'}
//                     form-inline`}
//                     action="#" onSubmit={this.toggleEdit.bind(this)}>
//                       <div className="form-group">
//                         <div className="input-group">
//                           <input type="text" ref="title"
//                           className="form-control"
//                           value={this.props.image.title}
//                           onChange={this.changeTitle.bind(this)}/>
//                           </div>
//                         </div>
//                       <button type="submit"
//                       className="btn btn-default">
//                       Save</button>
//                     </form>
//                   <h6 className={`${this.state.editMode ? 'hide' : ''}
//                    text-uppercase`}>
//                   {_.isObject(this.props.image) ?
//                     (this.props.image.title || 'No Name') : 'No Image Selected'}
//                     </h6>
//                   <h6 className="text-uppercase">
//                   {_.isObject(this.props.image) ?
//                     (this.props.image.currentFilter ||
//                      'No Filter Applied') : ''}
//                     </h6>
//                 </blockquote>

//             </div>
//             <button className={`${buttonClass} pull-sm-right`}
//             onClick={_.isObject(this.props.image) ?
//                 this.shareImage.bind(this) : ''}>
//                 <span className="mdi mdi-share-variant">
//                 </span></button>
//             <button className={`${buttonClass} pull-sm-right`}>
//             <a href={this.props.image.picture ?
//                 `/media/${picture}` : '#'}
//                 download={this.props.image.title}>
//             <span className="mdi mdi-download">
//             </span></a>
//             </button></div>
//             <div className="edit text-center">
//             <img ref="filteredimage" src={this.props.image.picture ?
//                 `/media/${picture}` : '/static/img/no_image_selected.gif'} />
//             </div>
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

