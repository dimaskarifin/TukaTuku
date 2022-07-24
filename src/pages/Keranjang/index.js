import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {dummyPesanan} from '../../data';
import {ListKeranjang} from '../../components/besar';
import {
  colors,
  fonts,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {Button} from '../../components/kecil';
import {RFValue} from 'react-native-responsive-fontsize';

export default class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanan: dummyPesanan[0],
    };
  }
  render() {
    const {pesanan} = this.state;
    return (
      <View style={styles.page}>
        <ListKeranjang keranjangs={pesanan.pesanans} />
        <View style={styles.footer}>
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(pesanan.totalHarga)}
            </Text>
          </View>

          <Button
            title="Check Out"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="cart-white"
          />
        </View>
      </View>
    );
  }
}

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
  },
});
