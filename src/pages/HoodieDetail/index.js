import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
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

    const hoodie = this.props.route.params.Hoodie;
    const defaultUkuran =
      hoodie && Array.isArray(hoodie.ukuran) && hoodie.ukuran.length === 1
        ? hoodie.ukuran[0]
        : '';

    this.state = {
      hoodie,
      images: hoodie.gambar,
      jumlah: '1',
      ukuran: defaultUkuran,
      keterangan: '',
      uid: '',
    };
  }

  getAvailableStok = selectedUkuran => {
    const {hoodie} = this.state;

    if (hoodie && typeof hoodie.stok === 'object' && hoodie.stok !== null) {
      const activeUkuran =
        selectedUkuran || (hoodie.ukuran && hoodie.ukuran[0]) || '';
      return Number(hoodie.stok[activeUkuran] || 0);
    }

    return Number(hoodie && hoodie.stok !== undefined ? hoodie.stok : 0);
  };

  handleJumlahChange = nextValue => {
    const {hoodie, ukuran} = this.state;
    const activeUkuran =
      ukuran ||
      (Array.isArray(hoodie.ukuran) && hoodie.ukuran.length > 0
        ? hoodie.ukuran[0]
        : '');
    const maxStok = this.getAvailableStok(activeUkuran);
    const value = Number(nextValue);

    if (Number.isNaN(value)) {
      return;
    }

    if (value > maxStok) {
      Alert.alert(
        'Error',
        'Jumlah pesanan melebihi stok yang tersedia (' + maxStok + ')',
      );
      return;
    }

    this.setState({jumlah: value < 1 ? '1' : String(value)});
  };

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
    const {jumlah, ukuran, hoodie} = this.state;
    const activeUkuran =
      ukuran ||
      (Array.isArray(hoodie.ukuran) && hoodie.ukuran.length > 0
        ? hoodie.ukuran[0]
        : '');
    const nextJumlah = Number(jumlah || 1);

    getData('user').then(res => {
      if (!res) {
        Alert.alert('Error', 'Silahkan login terlebih dahulu');
        this.props.navigation.replace('Login');
        return;
      }

      const availableStok = this.getAvailableStok(activeUkuran);

      if (nextJumlah > Number(availableStok)) {
        Alert.alert(
          'Error',
          'Jumlah pesanan melebihi stok yang tersedia (' + availableStok + ')',
        );
        return;
      }

      if (nextJumlah > 0 && activeUkuran) {
        const payload = {
          ...this.state,
          uid: res.uid,
          jumlah: String(nextJumlah),
          ukuran: activeUkuran,
        };
        this.props.dispatch(masukKeranjang(payload));
      } else {
        Alert.alert('Error', 'Jumlah & Ukuran harus diisi');
      }
    });
  };

  render() {
    const {navigation, getDetailCatHoodieResult, saveKeranjangLoading} =
      this.props;
    const {hoodie, images, jumlah, ukuran, keterangan} = this.state;
    const activeUkuran =
      ukuran ||
      (Array.isArray(hoodie.ukuran) && hoodie.ukuran.length > 0
        ? hoodie.ukuran[0]
        : '');
    const availableStok = this.getAvailableStok(activeUkuran);
    const stokPerUkuran =
      hoodie && typeof hoodie.stok === 'object' && hoodie.stok !== null
        ? Object.keys(hoodie.stok).map(key => `${key}: ${hoodie.stok[key]}`)
        : [
            `${
              hoodie && hoodie.ukuran ? hoodie.ukuran.join(', ') : 'Ukuran'
            }: ${availableStok}`,
          ];
    const isOutOfStock = availableStok <= 0;
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
              <View style={styles.stockRow}>
                <Text style={styles.stok}>Jumlah Stok</Text>
                <View style={styles.stockBadge}>
                  <Text style={styles.stockBadgeText}>
                    {stokPerUkuran.join(' | ')}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapperInputan}>
                <Text style={styles.counterLabel}>Jumlah Pesanan</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() =>
                      this.handleJumlahChange(Number(jumlah || 1) - 1)
                    }>
                    <Text style={styles.counterButtonText}>−</Text>
                  </TouchableOpacity>

                  <View style={styles.counterValueBox}>
                    <Text style={styles.counterValue}>{jumlah || 1}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() =>
                      this.handleJumlahChange(Number(jumlah || 1) + 1)
                    }>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.sizeLabel}>Pilih Ukuran</Text>
                <View style={styles.sizeOptionWrap}>
                  {hoodie.ukuran && hoodie.ukuran.length > 0 ? (
                    hoodie.ukuran.map(item => {
                      const isSelected = activeUkuran === item;
                      return (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.sizeOption,
                            isSelected && styles.sizeOptionSelected,
                          ]}
                          onPress={() => this.setState({ukuran: item})}>
                          <View
                            style={[
                              styles.checkbox,
                              isSelected && styles.checkboxSelected,
                            ]}
                          />
                          <Text
                            style={[
                              styles.sizeOptionText,
                              isSelected && styles.sizeOptionTextSelected,
                            ]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <Text style={styles.emptyText}>Ukuran tidak tersedia</Text>
                  )}
                </View>
              </View>
              <Pilihan
                label="Pilih Layanan"
                fontSize={RFValue(20, heightMobileUI)}
                datas={[
                  'Tanpa Layanan',
                  'Cuci Baju',
                  'Pembersihan Noda',
                  'Cuci & Pembersihan Noda',
                ]}
                selectedValue={keterangan}
                onValueChange={keterangan => this.setState({keterangan})}
              />
              <Jarak height={20} />
              <Button
                title={isOutOfStock ? 'Stok Habis' : 'Masuk Keranjang'}
                type="textIcon"
                icon="cart-white"
                padding={responsiveHeight(18)}
                fontSize={18}
                onPress={() => this.masukKeranjang()}
                loading={saveKeranjangLoading}
                disabled={isOutOfStock}
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
  stockRow: {
    marginBottom: responsiveHeight(3),
  },
  stok: {
    color: colors.black,
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginBottom: responsiveHeight(1),
  },
  stockBadge: {
    backgroundColor: '#EEF4FF',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(6),
    alignSelf: 'flex-start',
  },
  stockBadgeText: {
    color: colors.black,
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.reguler,
  },
  wrapperInputan: {
    marginRight: responsiveWidth(190),
    marginBottom: responsiveHeight(6),
  },
  sizeLabel: {
    fontFamily: fonts.primary.bold,
    color: colors.black,
    fontSize: RFValue(18, heightMobileUI),
    marginBottom: responsiveHeight(2),
  },
  sizeOptionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: responsiveHeight(5),
  },
  sizeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveHeight(8),
    borderRadius: 12,
    backgroundColor: '#F5F7FF',
    borderWidth: 1,
    borderColor: '#DDE6FF',
    marginRight: responsiveWidth(8),
    marginBottom: responsiveHeight(8),
  },
  sizeOptionSelected: {
    backgroundColor: '#EAF2FF',
    borderColor: colors.primary,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#A7B8E8',
    marginRight: responsiveWidth(8),
    backgroundColor: colors.white,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeOptionText: {
    color: colors.black,
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.reguler,
  },
  sizeOptionTextSelected: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
  },
  emptyText: {
    color: '#888',
    fontSize: RFValue(17, heightMobileUI),
    fontFamily: fonts.primary.reguler,
  },
  counterLabel: {
    fontFamily: fonts.primary.bold,
    color: colors.black,
    fontSize: RFValue(18, heightMobileUI),
    marginBottom: responsiveHeight(2),
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(160),
    backgroundColor: '#F6F8FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE6FF',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(8),
    marginBottom: responsiveHeight(6),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  counterButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: colors.white,
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    lineHeight: 24,
  },
  counterValueBox: {
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(4),
  },
  counterValue: {
    fontSize: RFValue(20, heightMobileUI),
    color: colors.black,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
  },
});
