import {Text, StyleSheet, View, Image, ScrollView, Alert} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../../utils/colors';
import {
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
  getData,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  Button,
  CardCatHoodie,
  HoodieSlider,
  Inputan,
  Jarak,
  Pilihan,
} from '../../components';
import {connect} from 'react-redux';
import {getDetailCatHoodie} from '../../actions/CatHoodie';
import {masukKeranjang} from '../../actions/KeranjangAction';

class HoodieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoodie: this.props.route.params.Hoodie,
      images: this.props.route.params.Hoodie.gambar,
      jumlah: '',
      ukuran: '',
      keterangan: '',
      uid: '',
    };
  }

  componentDidMount() {
    const {hoodie} = this.state;
    this.props.dispatch(getDetailCatHoodie(hoodie.cathoodies));
  }

  componentDidUpdate(prevProps) {
    const {saveKeranjangResult} = this.props;

    if (
      saveKeranjangResult &&
      prevProps.saveKeranjangResult !== saveKeranjangResult
    ) {
      this.props.navigation.navigate('Keranjang');
    }
  }

  masukKeranjang = () => {
    const {jumlah, ukuran, keterangan} = this.state;
    getData('user').then(res => {
      if (res) {
        //simpan uid dari localStorage ke state
        this.setState({
          uid: res.uid,
        });
        //validasi form
        if (jumlah && ukuran) {
          //hubungkan ke action (KeranjangAction)
          this.props.dispatch(masukKeranjang(this.state));
        } else {
          Alert.alert('Error', 'Jumlah & Ukuran harus diisi');
        }
      } else {
        Alert.alert('Error', 'Silahkan login terlebih dahulu');
        this.props.navigation.replace('Login');
      }
    });
  };

  render() {
    const {navigation, getDetailCatHoodieResult, saveKeranjangLoading} =
      this.props;
    const {hoodie, images, jumlah, ukuran, keterangan} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Button
            icon="arrow-left"
            padding={8}
            onPress={() => navigation.goBack()}
          />
        </View>
        <HoodieSlider images={images} />
        <View style={styles.container}>
          <View style={styles.catHoodie}>
            <CardCatHoodie
              catHoodies={getDetailCatHoodieResult}
              navigation={navigation}
              id={hoodie.cathoodies}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.desc}>
              <Text style={styles.nama}>{hoodie.nama}</Text>
              <Text style={styles.harga}>
                Rp {numberWithCommas(hoodie.harga)}
              </Text>
              <View style={styles.garis} />
              <View style={styles.WrapperJenisBerat}>
                <Text style={styles.labelJenisBerat}>
                  Jenis: {hoodie.jenis}
                </Text>
                <Text style={styles.labelJenisBerat}>
                  Berat: {hoodie.berat}
                </Text>
              </View>
              <Text style={styles.ket}>Deskripsi Produk :</Text>
              <View style={styles.kethoodie}>
                <Text numberOfLines={100} style={styles.kethoodie}>
                  {hoodie.deskripsi}
                </Text>
              </View>
              <Text style={styles.stok}>Jumlah Stok : {hoodie.stok}</Text>
              <View style={styles.wrapperInputan}>
                <Inputan
                  label="Jumlah"
                  width={responsiveWidth(120)}
                  height={responsiveHeight(43)}
                  fontSize={RFValue(20, heightMobileUI)}
                  keyboardType="number-pad"
                  value={jumlah}
                  onChangeText={jumlah => this.setState({jumlah})}
                />
                <Pilihan
                  label="Pilih Ukuran"
                  width={responsiveWidth(160)}
                  height={responsiveHeight(40)}
                  fontSize={RFValue(20, heightMobileUI)}
                  datas={hoodie.ukuran}
                  selectedValue={ukuran}
                  onValueChange={ukuran => this.setState({ukuran})}
                />
              </View>
              <Inputan
                label="Keterangan"
                textarea
                fontSize={RFValue(22, heightMobileUI)}
                value={keterangan}
                onChangeText={keterangan => this.setState({keterangan})}
              />
              <Jarak height={20} />
              <Button
                title="Masuk Keranjang"
                type="textIcon"
                icon="cart-white"
                padding={responsiveHeight(18)}
                fontSize={18}
                onPress={() => this.masukKeranjang()}
                loading={saveKeranjangLoading}
              />
            </View>
            <Jarak height={30} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getDetailCatHoodieResult: state.CatHoodieReducer.getDetailCatHoodieResult,

  saveKeranjangLoading: state.KeranjangReducer.saveKeranjangLoading,
  saveKeranjangResult: state.KeranjangReducer.saveKeranjangResult,
  saveKeranjangError: state.KeranjangReducer.saveKeranjangError,
});

export default connect(mapStateToProps, null)(HoodieDetail);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(550),
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
    marginBottom: responsiveHeight(4),
  },
  wrapperInputan: {
    marginRight: responsiveWidth(190),
    marginBottom: responsiveHeight(6),
  },
});
