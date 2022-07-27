import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import React, {Component} from 'react';
import {dummyProfile} from '../../data';
import {
  colors,
  fonts,
  getData,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {Button, Inputan, Pilihan} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getKotaList, getProvinsiList} from '../../actions/RajaOngkirAction';
import {DefaultImage} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateProfile} from '../../actions/ProfileAction';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      nama: '',
      email: '',
      nohp: '',
      alamat: '',
      provinsi: false,
      kota: false,
      avatar: false,
      dataKota: [],
      dataProvinsi: [],
      profile: dummyProfile,
    };
  }

  componentDidMount() {
    this.getUserData();
    this.props.dispatch(getProvinsiList());
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;
      this.setState({
        uid: data.uid,
        nama: data.nama,
        email: data.email,
        nohp: data.nohp,
        alamat: data.alamat,
        kota: data.kota,
        provinsi: data.provinsi,
      });
      this.props.dispatch(getKotaList(data.provinsi));
    });
  };
  ubahProvinsi = provinsi => {
    this.setState({
      provinsi: provinsi,
    });

    this.props.dispatch(getKotaList(provinsi));
  };

  render() {
    const {
      dataKota,
      dataProvinsi,
      profile,
      uid,
      nama,
      email,
      nohp,
      alamat,
      provinsi,
      kota,
    } = this.state;
    const {getKotaResult, getProvinsiResult} = this.props;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Inputan
            label="Nama"
            value={nama}
            onChangeText={nama => this.setState({nama})}
          />
          <Inputan
            label="Email"
            disabled
            value={email}
            onChangeText={email => this.setState({email})}
          />
          <Inputan
            label="No. Handphone"
            keyboardType="number-pad"
            value={nohp}
            onChangeText={nohp => this.setState({nohp})}
          />
          <Inputan
            label="Alamat"
            value={alamat}
            onChangeText={alamat => this.setState({alamat})}
            textarea
          />

          <Pilihan
            label="Provinsi"
            datas={getProvinsiResult ? getProvinsiResult : []}
            selectedValue={provinsi}
            onValueChange={provinsi => this.ubahProvinsi(provinsi)}
          />
          <Pilihan
            label="Kota/Kab"
            datas={getKotaResult ? getKotaResult : []}
            selectedValue={kota}
            onValueChange={kota => this.setState({kota: kota})}
          />

          <View style={styles.inputFoto}>
            <Text style={styles.label}>Foto Profile :</Text>

            <View style={styles.wrapperUpload}>
              <Image source={profile.avatar} style={styles.foto} />

              <View style={styles.tombolChangePhoto}>
                <Button title="Change Photo" type="text" padding={7} />
              </View>
            </View>
          </View>

          <View style={styles.submit}>
            <Button
              title="Submit"
              type="textIcon"
              icon="submit"
              padding={responsiveHeight(15)}
              fontSize={18}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getProvinsiResult: state.RajaOngkirReducer.getProvinsiResult,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  inputFoto: {
    marginTop: 20,
  },
  label: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveHeight(150),
    borderRadius: 40,
  },
  wrapperUpload: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  tombolChangePhoto: {
    marginLeft: 20,
    flex: 1,
  },
  submit: {
    marginVertical: 30,
  },
});
