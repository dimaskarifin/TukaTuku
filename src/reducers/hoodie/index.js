import {
  GET_LIST_HOODIE,
  GET_LIST_HOODIE_BY_CATHOODIE,
  DELETE_PARAMETER_HOODIE,
  SAVE_KEYWORD_HOODIE,
} from '../../actions/HoodieAction';

const initialState = {
  getListHoodieLoading: false,
  getListHoodieResult: false,
  getListHoodieError: false,

  id_catHoodie: false,
  namaCatHoodie: false,
  keyword: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_HOODIE:
      return {
        ...state,
        getListHoodieLoading: action.payload.loading,
        getListHoodieResult: action.payload.data,
        getListHoodieError: action.payload.errorMessage,
      };

    case GET_LIST_HOODIE_BY_CATHOODIE:
      return {
        ...state,
        id_catHoodie: action.payload.id_catHoodie,
        namaCatHoodie: action.payload.namaCatHoodie,
      };
    case DELETE_PARAMETER_HOODIE:
      return {
        id_catHoodie: false,
        namaCatHoodie: false,
        keyword: false,
      };
    case SAVE_KEYWORD_HOODIE:
      return {
        ...state,
        keyword: action.payload.data,
      };
    default:
      return state;
  }
}
