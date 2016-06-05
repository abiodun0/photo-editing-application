import * as ActionTypes from '../constants/actionTypes';
import imageApi from '../api/imageApi';

/**
 * @param  {array} images images recieved from the api
 * @return {object}  all the images from the dispatched action
 */
function recieveImages(images) {
  return {
    type: ActionTypes.GET_ALL_IMAGES,
    data: images
  };
}
/**
 * change the currently Active Image
 * @param  {Object} image [the edited Image object]
 * @return {Object}       [description]
 */
export function changeActiveImage(image) {
  return {
    type: ActionTypes.CHANGE_ACTIVE_IMAGE,
    data: image
  };
}

/**
 * Change the file name in the preview
 * @param  {String} name [the string available in the upload progress review]
 * @return {Object}      [description]
 */
export function changeFileName(name) {
  return {
    type: ActionTypes.CHANGE_FILE_NAME,
    data: name
  };
}


/**
 * Dispatch that takes care of the updating the upload progress percentage
 * @param  {Int} value [The current percentage]
 * @return {Object}       [description]
 */
export function updatePercentage(value) {
  return {
    type: ActionTypes.CHANGE_PERCENTAGE,
    data: value
  };
}

/**
 * Fired on success of one uploaded images
 * @param  {Object} image [description]
 * @return {Object}       [description]
 */
function uploadImage(image) {
  return {
    type: ActionTypes.UPLOAD_IMAGE,
    data: image
  };
}

/**
 * @param  {object} image instance that is being deleted
 * @return {object} the returned dispatched action
 */
function deleteImage(image) {
  return {
    type: ActionTypes.DELETE_IMAGE,
    data: image
  };
}

/**
 * Filter image from the search box
 * @param  {String} value [The string the images are filtered by]
 * @return {Object}       [description]
 */
export function filterFromTitles(value) {
  return {
    type: ActionTypes.FILTER_FROM_TITLE,
    data: value
  };
}
/**
 * checks if an upload is in progress
 * @param  {Boolean} value [check if there is an upload or not]
 * @return {[type]}       [description]
 */
export function changeUploadStatus(value) {
  return {
    type: ActionTypes.IS_UPLOADING,
    data: value
  };
}

/**
 * Checks if there is an asynchronous process going on
 * @param  {Boolean} value [description]
 * @return {Object}       [description]
 */
export function changeLoadingStatus(value) {
  return {
    type: ActionTypes.IS_LOADING,
    data: value
  };
}

/**
 * Checks for the raw byte64 of the image file while uploading
 * @param  {Byt64} filePreview [description]
 * @return {Object}             [description]
 */
export function changePreview(filePreview) {
  return {
    type: ActionTypes.CHANGE_PREVIEW,
    data: filePreview
  };
}

/**
 * Dispatches actions that update one image in all the image container
 * @param  {Object} image [description]
 * @return {Object}       [description]
 */
export function updateTitleFromImageArray(image) {
  return {
    type: ActionTypes.UPDATE_TITLE_IN_IMAGE_ARRAY,
    data: image
  };
}

/**
 * Dipatches delete action asynchronously from the api
 * @param  {Object} image [description]
 * @return {[type]}       [description]
 */
export function deleteImagefromApi(image) {
  return dispatch => {
    imageApi.deleteImage(dispatch, image, () => {
      dispatch(changeActiveImage({}));
      dispatch(deleteImage(image));
    });
  };
}

/**
 * Update or filter image asnychrounosuly
 * @param  {Object} image  [description]
 * @param  {String} filter [description]
 * @param  {Boolean} async  [description]
 * @return {Object}        [description]
 */
export function updateImageAsync(image, filter = null) {
  return dispatch => {
    imageApi.updateImage(dispatch, image, filter, filteredImage => {
      dispatch(changeActiveImage(filteredImage));
      return dispatch(updateTitleFromImageArray(filteredImage));
    });
  };
}

/**
 * Update image title synchronously
 * @param  {object} image [description]
 * @return {function}       [description]
 */
export function updateImage(image) {
  return dispatch => {
    dispatch(changeActiveImage(image));
    return dispatch(updateTitleFromImageArray(image));
  };
}

/**
 * Functions that retuls all the images asynchronously from the server and sends a dispatch method to
 * recieve images
 * @return {function} Returns a dispatch funciton
 */
export function getAllImages() {
  return dispatch => {
    imageApi.getAllImages(dispatch, images => {
      dispatch(recieveImages(images));
    });
  };
}

/**
 * Function that upload multiple images
 * @param  {Blogs} files [the files coming from the drop zone component]
 * @return {function}       [description]
 */
export function uploadImages(files) {
  return dispatch => {
    imageApi.uploadImage(dispatch, files, image => {
      dispatch(uploadImage(image));
    });
  };
}
