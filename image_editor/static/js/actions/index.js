import * as ActionTypes from '../constants/actionTypes';
import imageApi from '../api/imageApi';

/**
 * @param  {array} images images recieved from the api
 * @return {object}  all the images from the dispatched action
 */
export function recieveImages(images) {
  return {
    type: ActionTypes.GET_ALL_IMAGES,
    data: images
  };
}

export function changeAcktiveImage(image) {
  return {
    type: ActionTypes.CHANGE_ACTIVE_IMAGE,
    data: image
  }
}
/**
 * @return {function} Returns a dispatch funciton
 */
export function getAllImages() {
  return dispatch => {
    imageApi.getAllImages(images => {
      dispatch(recieveImages(images));
    });
  };
}

export function filterFromTitles(value) {
  return {
    type: ActionTypes.FILTER_FROM_TITLE,
    data: value
  };
}

export function changeImageName(value) {
  return {
    type: ActionTypes.CHANGE_IMAGE_TITLE,
    data: value
  };
}

export function updateTitleFromImageArray(image) {
  return {
    type: ActionTypes.UPDATE_TITLE_IN_IMAGE_ARRAY,
    data: image
  };
}
export function deleteImagefromApi(image) {
  return dispatch => {
    dispatch(changeAcktiveImage({}));
    dispatch(deleteImage(image));
  };
}

/**
 * @param  {object} image passed in from the result of the api call
 * @return {object} returns the object to be used with the dispatch method
 */
export function updateImage(image) {
  return {
    type: ActionTypes.UPDATE_IMAGE,
    data: image
  };
}
/**
 * @param  {object} image object to be passed in from the components
 * @param  {string} filter string identier to be used when processing the request from the backend
 * @return {function} returns the dispatch function to be used for the backend
 */
export function updateOrfilterImage(image, filter = null) {
  return dispatch => {
    imageApi.updateImage(image, filter, () => {
      dispatch(updateImage(image));
    });
  };
}

/**
 * @param  {object} image instance that is being deleted
 * @return {object} the returned dispatched action
 */
export function deleteImage(image) {
  console.log(ActionTypes.DELETE_IMAGE);
  return {
    type: ActionTypes.DELETE_IMAGE,
    data: image
  };
}

