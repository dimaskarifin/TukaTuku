import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../../utils/colors';
import {
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button, CardCatHoodie, Inputan, Pilihan} from '../../components';
import {PageScrollView} from 'pagescrollview';

export default class HoodieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoodie: this.props.route.params.Hoodie,
      images: this.props.route.params.Hoodie.gambar,
    };
  }
  render() {
    const {navigation} = this.props;
    const {hoodie, images} = this.state;
    return (
      <PageScrollView>
        <View style={styles.button}>
          <Button
            icon="arrow-left"
            padding={8}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.catHoodie}>
            <CardCatHoodie catHoodies={hoodie.cathoodie} />
          </View>
          <View style={styles.desc}>
            <Text style={styles.nama}>{hoodie.name}</Text>
            <Text style={styles.harga}>
              Rp {numberWithCommas(hoodie.harga)}
            </Text>
            <View style={styles.garis} />
            <View style={styles.WrapperJenisBerat}>
              <Text style={styles.labelJenisBerat}>Jenis: {hoodie.jenis}</Text>
              <Text style={styles.labelJenisBerat}>Berat: {hoodie.berat}</Text>
            </View>
            <Text style={styles.ket}>Deskripsi Produk :</Text>
            <View style={styles.kethoodie}>
              <Text numberOfLines={100} style={styles.kethoodie}>
                {hoodie.deskripsi} aowkdoawkdoakwdoawodkaowdkoawdawdoawkdo
              </Text>
            </View>
            <Text style={styles.stok}>Jumlah Stok : {hoodie.stok}</Text>
            <View style={styles.wrapperInputan}>
              <Pilihan
                label="Pilih Ukuran"
                width={responsiveWidth(120)}
                height={responsiveHeight(35)}
                fontSize={RFValue(20, heightMobileUI)}
              />
            </View>
            <Inputan
              label="Keterangan"
              textarea
              fontSize={RFValue(20, heightMobileUI)}
            />
          </View>
        </View>
      </PageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(490),
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(26, heightMobileUI),
    color: colors.black,
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: RFValue(24, heightMobileUI),
    color: colors.black,
    fontFamily: fonts.primary.regular,
  },
  catHoodie: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -40,
  },
  garis: {
    borderWidth: 0.5,
    marginVertical: 6,
  },
  WrapperJenisBerat: {
    flexDirection: 'row',
  },
  labelJenisBerat: {
    fontFamily: fonts.primary.regular,
    marginRight: 40,
    color: colors.black,
    fontSize: RFValue(20, heightMobileUI),
  },
  ket: {
    fontFamily: fonts.primary.bold,
    color: colors.black,
    marginTop: responsiveHeight(4),
    fontSize: RFValue(20, heightMobileUI),
  },
  kethoodie: {
    fontSize: RFValue(20, heightMobileUI),
    marginTop: responsiveHeight(2),
    color: colors.black,
    fontFamily: fonts.primary.reguler,
    marginBottom: responsiveHeight(5),
  },
  stok: {
    color: colors.black,
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginBottom: responsiveHeight(6),
  },
  wrapperInputan: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});