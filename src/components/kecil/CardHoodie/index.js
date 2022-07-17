import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const CardHoodie = ({Hoodie}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Image source={Hoodie.gambar[0]} style={styles.gambar} />
        <View>
          <Text style={styles.text}>{Hoodie.name}</Text>
          <Text style={styles.textHarga}>
            Rp {numberWithCommas(Hoodie.harga)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardHoodie;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    padding: 15,
    backgroundColor: colors.white,
    width: responsiveWidth(160),
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gambar: {
    width: responsiveWidth(135),
    height: responsiveHeight(160),
    alignSelf: 'center',
    borderRadius: 5,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: responsiveHeight(5),
    flexDirection: 'column',
    color: colors.black,
  },
  textHarga: {
    fontFamily: fonts.primary.extraBold,
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: responsiveHeight(5),
    color: colors.black,
  },
});
