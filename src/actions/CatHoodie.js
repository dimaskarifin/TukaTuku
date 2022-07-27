import FIREBASE from '../configs/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_CATHOODIE = 'GET_LIST_CATHOODIE';
export const GET_DETAIL_CATHOODIE = 'GET_DETAIL_CATHOODIE';

export const getListCatHoodie = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_CATHOODIE);

    FIREBASE.database()
      .ref('cathoodies')
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_CATHOODIE, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_CATHOODIE, error);
        alert(error);
      });
  };
};

export const getDetailCatHoodie = id => {
  return dispatch => {
    dispatchLoading(dispatch, getDetailCatHoodie);

    FIREBASE.database()
      .ref('cathoodie/' + id)
      .once('value', querySnapshot => {
        //Hasil
        console.log('Data : ', querySnapshot.val());
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_CATHOODIE, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_DETAIL_CATHOODIE, error);
        alert(error);
      });
  };
};
