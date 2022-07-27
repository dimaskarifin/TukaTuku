import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {IlustrasiRegister2} from '../../assets/images';
import {Button, Inputan, Jarak, Pilihan} from '../../components';
import {connect} from 'react-redux';
import {getProvinsiList, getKotaList} from '../../actions/RajaOngkirAction';
import {registerUser} from '../../actions/AuthAction';

class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alamat: '',
      kota: false,
      provinsi: false,
    };
  }
  componentDidUpdate(prevProps) {
    const {registerResult} = this.props;

    if (registerResult && prevProps.registerResult !== registerResult) {
      this.props.navigation.replace('MainApp');
    }
  }
  componentDidMount() {
    this.props.dispatch(getProvinsiList());
  }
  ubahProvinsi = provinsi => {
    this.setState({
      provinsi: provinsi,
    });

    this.props.dispatch(getKotaList(provinsi));
  };
  onContinue = () => {
    const {kota, provinsi, alamat} = this.state;

    if (kota && provinsi && alamat) {
      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        nohp: this.props.route.params.nohp,
        alamat: alamat,
        provinsi: provinsi,
        kota: kota,
        status: 'user',
      };

      //ke Auth Action
      this.props.dispatch(registerUser(data, this.props.route.params.password));
    } else {
      Alert.alert('Error', 'Alamat, Kota, dan Provinsi harus diisi');
    }
  };

  render() {
    const {kota, provinsi, alamat} = this.state;
    const {getProvinsiResult, getKotaResult, registerLoading} = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.btnBack}>
          <Button
            icon="arrow-left"
            onPress={() => this.props.navigation.goBack()}
            padding={5}
          />
        </View>

        <View style={styles.ilustrasi}>
          <IlustrasiRegister2 />
          <Jarak height={10} />
          <Text style={styles.title}>Isi Alamat</Text>
          <Text style={styles.title}>Lengkap Anda</Text>

          <View style={styles.wrapperCircle}>
            <View style={styles.circleDisabled}></View>
            <Jarak width={10} />
            <View style={styles.circlePrimary}></View>
          </View>
        </View>
        <View style={styles.card}>
          <Inputan
            label="Alamat Lengkap"
            textarea
            onChangeText={alamat => this.setState({alamat})}
            value={alamat}
          />

          <Pilihan
            label="Provinsi"
            datas={getProvinsiResult ? getProvinsiResult : []}
            width={responsiveWidth(280)}
            height={responsiveHeight(40)}
            selectedValue={provinsi}
            onValueChange={provinsi => this.ubahProvinsi(provinsi)}
          />
          <Pilihan
            label="Kota/Kab"
            datas={getKotaResult ? getKotaResult : []}
            width={responsiveWidth(280)}
            height={responsiveHeight(40)}
            selectedValue={kota}
            onValueChange={kota => this.setState({kota: kota})}
          />
          <Jarak height={30} />
          <Button
            title="Continue"
            type="textIcon"
            icon="continue"
            padding={12}
            fontSize={20}
            onPress={() => this.onContinue()}
            loading={registerLoading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getProvinsiResult: state.RajaOngkirReducer.getProvinsiResult,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,

  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStateToProps, null)(Register2);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 30,
  },
  ilustrasi: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary.regular,
    color: colors.primary,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveHeight(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.grey,
    width: responsiveWidth(11),
    height: responsiveHeight(11),
    borderRadius: 10,
  },
  card: {
    marginHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 30,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
    marginTop: responsiveHeight(25),
  },
});
