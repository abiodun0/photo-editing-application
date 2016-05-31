import * as ActionTypes from '../constants/actionTypes';

let intialState = {image: '',
           isUploading: false,
           percentage: 1,
           preview: '',
           filename: '',
           data: []
         };
/**
 * @param  {object} initial state of the applicaiton
 * @param  {object} action the dispatch action
 * @return {object} returns the state of the app
 */
export function imageApp(state = intialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_IMAGES:
      return {
        data: action.images,
        ...state
      };
    case ActionTypes.CHANGE_IMAGE:
      return {
        image: action.image,
        ...state
      };
    case ActionTypes.DELETE_IMAGE:
      return state.filter(image => image.id !== action.image.id);
    default:
      break;
  }
}
