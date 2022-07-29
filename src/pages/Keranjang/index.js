import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {dummyPesanans} from '../../data';
import {ListKeranjang} from '../../components/besar';
import {
  colors,
  fonts,
  getData,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {Button} from '../../components/kecil';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getListKeranjang} from '../../actions/KeranjangAction';

class Keranjang extends Component {
  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        //jika user sudah login
        this.props.dispatch(getListKeranjang(res.uid));
      } else {
        //User Belum melakukan login
        this.props.navigation.replace('Login');
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {deleteKeranjangResult} = this.props;
    if (
      deleteKeranjangResult &&
      prevProps.deleteKeranjangResult !== deleteKeranjangResult
    ) {
      getData('user').then(res => {
        if (res) {
          //jika user sudah login
          this.props.dispatch(getListKeranjang(res.uid));
        } else {
          //User Belum melakukan login
          this.props.navigation.replace('Login');
        }
      });
    }
  }

  render() {
    const {getListKeranjangResult} = this.props;
    return (
      <View style={styles.page}>
        <ListKeranjang {...this.props} />
        <View style={styles.footer}>
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp{' '}
              {getListKeranjangResult
                ? numberWithCommas(getListKeranjangResult.totalHarga)
                : 0}
            </Text>
          </View>

          {/* Button */}
          {getListKeranjangResult ? (
            <Button
              title="Check Out"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="cart-white"
              onPress={() =>
                this.props.navigation.navigate('Checkout', {
                  totalHarga: getListKeranjangResult.totalHarga,
                  totalBerat: getListKeranjangResult.totalBerat,
                })
              }
            />
          ) : (
            <Button
              title="Check Out"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="cart-white"
              disabled={true}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getListKeranjangLoading: state.KeranjangReducer.getListKeranjangLoading,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
  getListKeranjangError: state.KeranjangReducer.getListKeranjangError,

  deleteKeranjangLoading: state.KeranjangReducer.deleteKeranjangLoading,
  deleteKeranjangResult: state.KeranjangReducer.deleteKeranjangResult,
  deleteKeranjangError: state.KeranjangReducer.deleteKeranjangError,
});

export default connect(mapStateToProps, null)(Keranjang);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    paddingHorizontal: responsiveWidth(30),
    paddingBottom: responsiveHeight(30),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(20),
  },
  textBold: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
});
