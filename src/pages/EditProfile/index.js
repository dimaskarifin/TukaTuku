import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import React, {Component} from 'react';
import {dummyProfile} from '../../data';
import {
  colors,
  fonts,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {Button, Inputan, Pilihan} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataKota: [],
      dataProvinsi: [],
      profile: dummyProfile,
    };
  }
  render() {
    const {dataKota, dataProvinsi, profile} = this.state;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Inputan label="Nama" value={profile.nama} />
          <Inputan label="Email" value={profile.email} />
          <Inputan label="No. Handphone" value={profile.nomerHp} />
          <Inputan label="Alamat" value={profile.alamat} textarea />

          <Pilihan label="Provinsi" datas={dataProvinsi} />
          <Pilihan label="Kota/Kab" datas={dataKota} />

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
