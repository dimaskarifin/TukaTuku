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

export default class ChangePassword extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View>
          <Inputan label="Password Lama" secureTextEntry />
          <Inputan label="Password Baru" secureTextEntry />
          <Inputan label="Konfirmasi Password Baru" secureTextEntry />
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
    justifyContent: 'space-between',
  },
  submit: {
    marginVertical: 30,
  },
});
