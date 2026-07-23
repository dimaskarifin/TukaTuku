import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const UPDATE_PESANAN = 'UPDATE_PESANAN';

export const updatePesanan = params => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PESANAN);

    //GET UID USER
    const uid = params.order_id.split('-')[2];

    //GET KERANJANG BY UID USER
    FIREBASE.database()
      .ref('keranjangs/' + uid)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          //ambil data keranjang
          const data = querySnapshot.val();

          //duplikasi & modifikasi data keranjang
          const dataBaru = {...data};
          dataBaru.ongkir = params.ongkir;
          dataBaru.estimasi = params.estimasi;
          dataBaru.url = params.url;
          dataBaru.order_id = params.order_id;
          dataBaru.status = 'pending';

          //delete data keranjang
          FIREBASE.database()
            .ref('keranjangs/' + uid)
            .remove()
            .then(() => {
              //add new data history
              FIREBASE.database()
                .ref('histories')
                .child(params.order_id)
                .set(dataBaru)
                .then(response => {
                  // Decrease stock for each product in the order
                  const pesanans = data.pesanans;
                  if (pesanans) {
                    Object.keys(pesanans).forEach(key => {
                      const pesanan = pesanans[key];
                      const productId = pesanan.product.id;
                      const jumlahPesan = parseInt(pesanan.jumlahPesan || 0);
                      const ukuran = pesanan.ukuran;

                      if (productId) {
                        FIREBASE.database()
                          .ref('hoodies/' + productId)
                          .once('value', snapshot => {
                            if (snapshot.val()) {
                              const productData = snapshot.val();
                              if (typeof productData.stok === 'object') {
                                const currentSizeStok = parseInt(productData.stok[ukuran] || 0);
                                const newSizeStok = Math.max(0, currentSizeStok - jumlahPesan);
                                FIREBASE.database()
                                  .ref('hoodies/' + productId + '/stok')
                                  .update({ [ukuran]: newSizeStok });
                              } else {
                                const currentStok = parseInt(productData.stok || 0);
                                const newStok = Math.max(0, currentStok - jumlahPesan);
                                FIREBASE.database()
                                  .ref('hoodies/' + productId)
                                  .update({ stok: newStok });
                              }
                            }
                          });
                      }
                    });
                  }

                  dispatchSuccess(
                    dispatch,
                    UPDATE_PESANAN,
                    response ? response : [],
                  );
                })
                .catch(error => {
                  dispatchError(dispatch, UPDATE_PESANAN, error);
                  alert(error);
                });
            })
            .catch(error => {
              dispatchError(dispatch, UPDATE_PESANAN, error);
              alert(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_PESANAN, error);
        alert(error);
      });
  };
};
