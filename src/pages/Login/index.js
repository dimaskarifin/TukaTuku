import {StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {LogoLog} from '../../assets';
import {colors, fonts, responsiveHeight} from '../../utils';
import {Button, Inputan, Jarak} from '../../components';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.pages}>
        <View style={styles.logo}>
          <LogoLog />
        </View>
        <View style={styles.cardLogin}>
          <Inputan label="Email" />
          <Inputan label="Password" secureTextEntry />
          <Jarak height={20} />
          <Button title="Login" type="text" padding={14} fontSize={18} />
        </View>
        <View style={styles.regis}>
          <Text style={styles.textBlue}>Belum punya akun?</Text>
          <Text style={styles.textBlue}>Klik untuk daftar</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    alignItems: 'center',
    marginTop: responsiveHeight(90),
  },
  cardLogin: {
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
  },
  regis: {
    alignItems: 'center',
    marginTop: 10,
  },
  textBlue: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: 16,
  },
});
