import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

const CardAlamat = ({alamat, provinsi, kota, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alamat : </Text>
      <Text style={styles.alamat}>{alamat}</Text>
      <Text style={styles.alamat}>{kota}</Text>
      <Text style={styles.alamat}>Provinsi : {provinsi}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.ubatAlamat}>Ubah Alamat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAlamat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 10,
    padding: 15,
    marginTop: responsiveHeight(10),
  },
  title: {
    fontFamily: fonts.primary.bold,
    color: colors.black,
    fontSize: 15,
  },
  alamat: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color: colors.black,
  },
  ubatAlamat: {
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    fontSize: 14,
    textAlign: 'right',
  },
});
