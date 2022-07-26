import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {IlustrasiRegister2} from '../../assets/images';
import {Button, Inputan, Jarak, Pilihan} from '../../components';

export default class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataKota: [],
      dataProvinsi: [],
    };
  }
  render() {
    const {dataKota, dataProvinsi} = this.state;
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
          <Inputan label="Alamat" textarea />

          <Pilihan
            label="Provinsi"
            datas={dataProvinsi}
            width={responsiveWidth(280)}
            height={responsiveHeight(40)}
          />
          <Pilihan
            label="Kota/Kab"
            datas={dataKota}
            width={responsiveWidth(280)}
            height={responsiveHeight(40)}
          />
          <Jarak height={30} />
          <Button
            title="Continue"
            type="textIcon"
            icon="continue"
            padding={12}
            fontSize={20}
            onPress={() => this.props.navigation.navigate('MainApp')}
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
