import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';

const CardHoodie = ({catHoodies}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={catHoodies.gambar} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default CardHoodie;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: responsiveWidth(80),
    height: responsiveHeight(80),
  },
});
