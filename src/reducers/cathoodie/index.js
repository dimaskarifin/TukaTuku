import {
  GET_LIST_CATHOODIE,
  GET_DETAIL_CATHOODIE,
} from '../../actions/CatHoodie';

const initialState = {
  getListCatHoodieLoading: false,
  getListCatHoodieResult: false,
  getListCatHoodieError: false,

  getDetailCatHoodieLoading: false,
  getDetailCatHoodieResult: false,
  getDetailCatHoodieError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_CATHOODIE:
      return {
        ...state,
        getListCatHoodieLoading: action.payload.loading,
        getListCatHoodieResult: action.payload.data,
        getListCatHoodieError: action.payload.errorMessage,
      };

    case GET_DETAIL_CATHOODIE:
      return {
        ...state,
        getDetailCatHoodieLoading: action.payload.loading,
        getDetailCatHoodieResult: action.payload.data,
        getDetailCatHoodieError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
