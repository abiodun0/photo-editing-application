import request from 'superagent';
import toastr from 'toastr';
import _ from 'lodash';
import 'superagent-django-csrf';
import store from '../store';
import {updatePercentage, changeUploadStatus, changePreview, changeLoadingStatus} from '../actions';

// Sets the imageUrl from the preset Dom value
const imageUrl = document.querySelector('meta[name="image_url"]')
                          .getAttribute('content');

const ImageApi = {
  /**
  * Gets all the images from the django backend
  *@param {function} cb the callback function supplied by the component
  */
  getAllImages: cb => {
    store.dispatch(changeLoadingStatus(true));
    toastr.info('Loading your images...!', null, {
      timeOut: 0
    });
    request.get(imageUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        store.dispatch(changeLoadingStatus(false));
        toastr.clear();
        if (!err) {
          console.log(res.body.data, 'from the api');
          cb(res.body.data);
        }
      });
  },
  /**
  * Updates image object title and filters
  *@param {object} image the image object to be updated
  *@param {string} filter to be added if present
  */
  updateImage(image, filter, cb) {
    store.dispatch(changeLoadingStatus(true));
    toastr.info('Updating ' + image.title + '...', null, {
      timeOut: 0
    });

    request.put(imageUrl)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(image)
      .end((err, res) => {
        toastr.clear();
        store.dispatch(changeLoadingStatus(false));
        if (err) {
          toastr.error(res.body, 'unable to update ' +
              image.title, {
                closeButton: true
              });
        } else {
          if (filter) {
            toastr.info('Successfully added' +
              filter.toLowerCase() + ' to ' + image.title, '', {
                closeButton: true
              });
          } else {
            toastr.info('Successfully updated ' + image.title, '', {
              closeButton: true
            });
          }
          cb(res.body);
        }
      });
  },
  /**
  * deletes image object  from the database
  *@param {object} imageObj the image object to be updated
  */
  deleteImage(imageObj, cb) {
    toastr.error('Deleting ' + imageObj.title + '...', null, {
      timeOut: 0
    });
    store.dispatch(changeLoadingStatus(true));
    request.del(imageUrl)
      .send(imageObj)
      .end(err => {
        toastr.clear();
        if (!err) {
          store.dispatch(changeLoadingStatus(false));
          toastr.info('successfully removed ' + imageObj.title, '', {
            closeButton: true
          });
          cb();
        }
      });
  },
  /**
  * Uploads image to the django  backend
  *@param {array} files The array of image files to be uploaded
  */
  uploadImage(files, cb) {
    files.forEach(file => {
      console.log(file, 'the single file');
      // this.setState({filename: file.name});
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        store.dispatch(changePreview(e.target.result));
        // this.setState({preview: e.target.result});
       // previewCb(e.target.result);
      };
      request.post(imageUrl)
        .attach('image', file, file.name)
        .set('Accept', 'application/json')
        .on('progress', e => {
          if (e.percentage) store.dispatch(updatePercentage(e.percent));
          store.dispatch(changeUploadStatus(true));
          // this.setState({
          //   percentage: e.percent,
          //   isUploading: true
          // });
        })
        .end((err, res) => {
          store.dispatch(changeUploadStatus(false));
          if (err) {
            return toastr.error(res.body, 'unable to upload ' +
              file.name, {
                closeButton: true
              });
          }

          toastr.success('successfully uploaded ' + file.name, '', {
            closeButton: true
          });
          // this.addImage(res.body);
          cb(res.body);
        });
    });
  }
};
export default ImageApi;
