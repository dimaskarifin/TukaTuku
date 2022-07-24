import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {IconTrash} from '../../../assets';
import Jarak from '../Jarak';

const CardKeranjang = ({keranjang}) => {
  return (
    <View style={styles.container}>
      <Image source={keranjang.product.gambar[0]} style={styles.picture} />
      <View style={styles.desc}>
        <Text style={styles.nama}>{keranjang.product.name}</Text>
        <Text style={styles.text}>
          Rp {numberWithCommas(keranjang.product.harga)}
        </Text>
        <Jarak height={responsiveHeight(14)} />
        <Text style={styles.textBold}>
          Pesan : <Text style={styles.text}>{keranjang.jumlahPesan}</Text>
        </Text>
        <Text style={styles.textBold}>
          Ukuran : <Text style={styles.text}>{keranjang.ukuran}</Text>
        </Text>
        <Text style={styles.textBold}>
          Total Harga :{' '}
          <Text style={styles.text}>
            Rp {numberWithCommas(keranjang.totalHarga)}
          </Text>
        </Text>
        <Text style={styles.textBold}>Keterangan : </Text>
        <Text style={styles.text}>{keranjang.keterangan}</Text>
      </View>
      <View style={styles.trash}>
        <IconTrash />
      </View>
    </View>
  );
};

export default CardKeranjang;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: responsiveHeight(25),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(20),
    paddingHorizontal: responsiveHeight(15),
    borderRadius: 10,
    alignItems: 'center',
  },
  picture: {
    width: responsiveWidth(90),
    height: responsiveHeight(100),
    resizeMode: 'contain',
  },
  trash: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nama: {
    fontFamily: fonts.primary.extraBold,
    fontSize: 14,
    textTransform: 'capitalize',
    color: colors.black,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    color: colors.black,
  },
  textBold: {
    fontFamily: fonts.primary.extraBold,
    fontSize: 12,
    color: colors.black,
  },
  desc: {
    marginLeft: responsiveWidth(5),
  },
});
