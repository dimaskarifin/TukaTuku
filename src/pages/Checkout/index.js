import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {
  colors,
  fonts,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button, CardAlamat, Jarak, Pilihan} from '../../components';
import {dummyProfile, dummyPesanan} from '../../data';

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: dummyProfile,
      pesanan: dummyPesanan[0],
      ekspedisi: [],
    };
  }
  render() {
    const {profile, pesanan, ekspedisi} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>Apakah Alamat ini benar?</Text>
          <CardAlamat profile={profile} />
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(pesanan.totalHarga)}
            </Text>
          </View>

          <Pilihan label="Pilih Ekpedisi" datas={ekspedisi} />
          <Jarak height={10} />
          <Text style={styles.textBold}>Biaya Ongkir :</Text>
          <View style={styles.descOngkir}>
            <Text style={styles.text}>Untuk Berat : {pesanan.berat} Kg</Text>
            <Text style={styles.textBold}>Rp {numberWithCommas(15000)}</Text>
          </View>
          <View style={styles.descOngkir}>
            <Text style={styles.text}>Estimasi Waktu :</Text>
            <Text style={styles.textBold}>2-3 Hari</Text>
          </View>
        </View>
        <Jarak height={180} />
        <View style={styles.footer}>
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(pesanan.totalHarga + 15000)}
            </Text>
          </View>

          <Button
            title="Bayar"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="cart-white"
            onPress={() => this.props.navigation.navigate('Checkout')}
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
    paddingTop: responsiveHeight(35),
  },
  isi: {
    paddingHorizontal: responsiveWidth(35),
  },
  textBold: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(20),
  },
  descOngkir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
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
});
