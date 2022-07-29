import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {
  colors,
  fonts,
  heightMobileUI,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button, CardAlamat, Jarak, Pilihan} from '../../components';
import {couriers} from '../../data';
import {connect} from 'react-redux';
import {getKotaDetail, postOngkir} from '../../actions/RajaOngkirAction';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      ekspedisi: couriers,
      ekspedisiSelected: false,
      ongkir: 0,
      estimasi: '',
      totalHarga: this.props.route.params.totalHarga,
      totalBerat: this.props.route.params.totalBerat,
      kota: '',
      provinsi: '',
      alamat: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    const {getKotaDetailResult, ongkirResult} = this.props;

    if (
      getKotaDetailResult &&
      prevProps.getKotaDetailResult !== getKotaDetailResult
    ) {
      this.setState({
        provinsi: getKotaDetailResult.province,
        kota: getKotaDetailResult.type + ' ' + getKotaDetailResult.city_name,
      });
    }
    if (ongkirResult && prevProps.ongkirResult !== ongkirResult) {
      this.setState({
        ongkir: ongkirResult.cost[0].value,
        estimasi: ongkirResult.cost[0].etd,
      });
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          profile: data,
          alamat: data.alamat,
        });
        this.props.dispatch(getKotaDetail(data.kota));
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  ubahEkspedisi = ekspedisiSelected => {
    if (ekspedisiSelected) {
      this.setState({
        ekspedisiSelected: ekspedisiSelected,
      });
      this.props.dispatch(postOngkir(this.state, ekspedisiSelected));
    }
  };

  render() {
    const {
      ekspedisi,
      totalHarga,
      totalBerat,
      alamat,
      kota,
      provinsi,
      ekspedisiSelected,
      ongkir,
      estimasi,
    } = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>Apakah Alamat ini benar?</Text>
          <CardAlamat
            alamat={alamat}
            provinsi={provinsi}
            kota={kota}
            navigation={navigation}
          />
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(totalHarga)}
            </Text>
          </View>

          <Pilihan
            label="Pilih Ekpedisi"
            datas={ekspedisi}
            selectedValue={ekspedisiSelected}
            onValueChange={ekspedisiSelected =>
              this.ubahEkspedisi(ekspedisiSelected)
            }
          />
          <Jarak height={10} />
          <Text style={styles.textBold}>Biaya Ongkir :</Text>
          <View style={styles.descOngkir}>
            <Text style={styles.text}>Untuk Berat : {totalBerat} Kg</Text>
            <Text style={styles.textBold}>Rp {numberWithCommas(ongkir)}</Text>
          </View>
          <View style={styles.descOngkir}>
            <Text style={styles.text}>Estimasi Waktu :</Text>
            <Text style={styles.textBold}>{estimasi} Hari</Text>
          </View>
        </View>
        <Jarak height={180} />
        <View style={styles.footer}>
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(totalHarga + ongkir)}
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

const mapStateToProps = state => ({
  getKotaDetailLoading: state.RajaOngkirReducer.getKotaDetailLoading,
  getKotaDetailResult: state.RajaOngkirReducer.getKotaDetailResult,
  getKotaDetailError: state.RajaOngkirReducer.getKotaDetailError,

  ongkirResult: state.RajaOngkirReducer.ongkirResult,
});

export default connect(mapStateToProps, null)(Checkout);

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
