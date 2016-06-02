import * as ActionTypes from '../constants/actionTypes';
import {combineReducers} from 'redux';

/**
 * Check for the state of the funciton that is being upload
 * @param  {Boolean} state  [the state of the current funciton]
 * @param  {[type]}  action [the specified action in the action]
 * @return {Boolean}        [the returned state]
 */
function isUploading(state = false, action) {
  switch (action.type) {
    case ActionTypes.IS_UPLOADING:
      return action.type;
    default:
      return state;
  }
}

/**
 * [Checks when the images are being loaded]
 * @param  {Boolean} state  [description]
 * @param  {[type]}  action [description]
 * @return {Boolean}        [description]
 */
function isLoading(state = false, action) {
  switch (action.type) {
    case ActionTypes.IS_LOADING:
      return action.type;
    default:
      return state;
  }
}
/**
 * Reducers that takes care of all the images used
 * @param  {Array}  state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function allImages(state = [], action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_IMAGES:
      console.log(action.data);
      return action.data;
    case ActionTypes.FILTER_FROM_TITLE:
      let filteredImages = state.filter(image => {
        return image.title.toLowerCase()
            .indexOf(action.data.toLowerCase()) !== -1;
      });
      return filteredImages;
    default:
      return state;
  }
}

/**
 * [filename description]
 * @param  {String} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function filename(state = '', action) {
  switch (action.type) {
    case ActionTypes.CHANGE_NAME:
      return action.data;
    default:
      return state;
  }
}

/**
 * percentage of upload of the given image file
 * @param  {Number} state  [the state of the image file]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function percentage(state = 1, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_PERCENTAGE:
      return action.data;
    default:
      return state;
  }
}

/**
 * Get the preview of the image that is being uploaded
 * @param  {String} state  [The byte64 string that is getting uploaded to the database]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function preview(state = '', action) {
  switch (action.type) {
    case ActionTypes.GET_PREVIEW:
      return action.data;
    default:
      return state;
  }
}

const imageApp = combineReducers({
  filename,
  allImages,
  percentage,
  isUploading,
  preview,
  isLoading
});
export default imageApp;
