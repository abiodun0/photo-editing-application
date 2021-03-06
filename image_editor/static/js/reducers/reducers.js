import * as ActionTypes from '../constants/actionTypes';
import {combineReducers} from 'redux';
import _ from 'lodash';

/**
 * Check for the state of the funciton that is being upload
 * @param  {Boolean} state  [the state of the current funciton]
 * @param  {[type]}  action [the specified action in the action]
 * @return {Boolean}        [the returned state]
 */
function isUploading(state = false, action) {
  switch (action.type) {
    case ActionTypes.IS_UPLOADING:
      return action.data;
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
      return action.data;
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
      return state.concat(action.data);
    case ActionTypes.DELETE_IMAGE:
      return state.filter(image => {
        return Number(image.id) !== Number(action.data.id);
      });
    case ActionTypes.UPDATE_TITLE_IN_IMAGE_ARRAY:
      let index = _.findIndex(state, {id: action.data.id});
      state[index].title = action.data.title;
      return state;
    case ActionTypes.UPLOAD_IMAGE:
      let tempState = _.clone(state);
      tempState.unshift(action.data);
      return tempState;
    default:
      return state;
  }
}
/**
 * state for filter text
 * @param  {String} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function filterText(state = '', action) {
  switch (action.type) {
    case ActionTypes.FILTER_FROM_TITLE:
      return action.data;
    default:
      return state;
  }
}
/**
 * [filename description]
 * @param  {String} state  [description]
 * @param  {[type]} action [description]
 * @return {String}        [the returned string]
 */
function filename(state = '', action) {
  switch (action.type) {
    case ActionTypes.CHANGE_FILE_NAME:
      return action.data;
    default:
      return state;
  }
}
/**
 * [activeImage description]
 * @param  {Object} state  [the intial active image]
 * @param  {object} action [the action that contains the type and the data]
 * @return {object}        [returns the transformed state]
 */
function activeImage(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_ACTIVE_IMAGE:
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
    case ActionTypes.CHANGE_PREVIEW:
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
  isLoading,
  filterText,
  activeImage
});
export default imageApp;
