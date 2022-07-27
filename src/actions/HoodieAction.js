import FIREBASE from '../configs/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_HOODIE = 'GET_LIST_HOODIE';
export const GET_LIST_HOODIE_BY_CATHOODIE = 'GET_LIST_HOODIE_BY_CATHOODIE';
export const DELETE_PARAMETER_HOODIE = 'DELETE_PARAMETER_HOODIE';
export const SAVE_KEYWORD_HOODIE = 'SAVE_KEYWORD_HOODIE';

export const getListHoodie = (id_catHoodie, keyword) => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_HOODIE);

    if (id_catHoodie) {
      FIREBASE.database()
        .ref('hoodies')
        .orderByChild('cathoodies')
        .equalTo(id_catHoodie)
        .once('value', querySnapshot => {
          //Hasil
          let data = querySnapshot.val();

          dispatchSuccess(dispatch, GET_LIST_HOODIE, data);
        })
        .catch(error => {
          dispatchError(dispatch, GET_LIST_HOODIE, error);
          alert(error);
        });
    } else if (keyword) {
      FIREBASE.database()
        .ref('hoodies')
        .orderByChild('search')
        .equalTo(keyword.toUpperCase())
        .once('value', querySnapshot => {
          //Hasil
          let data = querySnapshot.val();

          dispatchSuccess(dispatch, GET_LIST_HOODIE, data);
        })
        .catch(error => {
          dispatchError(dispatch, GET_LIST_HOODIE, error);
          alert(error);
        });
    } else {
      FIREBASE.database()
        .ref('hoodies')
        .once('value', querySnapshot => {
          //Hasil
          let data = querySnapshot.val();

          dispatchSuccess(dispatch, GET_LIST_HOODIE, data);
        })
        .catch(error => {
          dispatchError(dispatch, GET_LIST_HOODIE, error);
          alert(error);
        });
    }
  };
};
export const limitHoodie = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_HOODIE);

    FIREBASE.database()
      .ref('hoodies')
      .limitToLast(6)
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_HOODIE, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_HOODIE, error);
        alert(error);
      });
  };
};

export const getHoodieByCatHoodie = (id, catHoodie) => ({
  type: GET_LIST_HOODIE_BY_CATHOODIE,
  payload: {
    id_catHoodie: id,
    namaCatHoodie: catHoodie,
  },
});

export const deleteParameterHoodie = () => ({
  type: DELETE_PARAMETER_HOODIE,
});

export const saveKeywordHoodie = search => ({
  type: SAVE_KEYWORD_HOODIE,
  payload: {
    data: search,
  },
});
