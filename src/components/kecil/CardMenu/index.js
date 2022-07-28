import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconArrow} from '../../../assets';
import {
  clearStorage,
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import FIREBASE from '../../../config/FIREBASE';

const CardMenu = ({menu, navigation}) => {
  const onSubmit = () => {
    if (menu.halaman === 'Login') {
      FIREBASE.auth()
        .signOut()
        .then(function () {
          // Sign-out successful.

          clearStorage();
          navigation.replace('Login');
        })
        .catch(function (error) {
          // An error happened.
          alert(error);
        });
    } else {
      navigation.navigate(menu.halaman);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSubmit()}>
      <View style={styles.menu}>
        {menu.gambar}
        <Text style={styles.text}>{menu.nama}</Text>
      </View>
      <IconArrow />
    </TouchableOpacity>
  );
};

export default CardMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: responsiveHeight(25),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: responsiveWidth(35),
    padding: responsiveHeight(15),
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16),
    color: colors.black,
    marginLeft: responsiveWidth(20),
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
