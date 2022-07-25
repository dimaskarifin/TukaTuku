import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component} from 'react';
import {
  Button,
  HeaderComponent,
  Jarak,
  ListCatHoodie,
  ListHoodies,
} from '../../components';
import {colors, fonts, responsiveHeight} from '../../utils';
import {dummyCatHoodie, dummyHoodies} from '../../data';
import {RFValue} from 'react-native-responsive-fontsize';

export default class ListHoodie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catHoodie: dummyCatHoodie,
      Hoodies: dummyHoodies,
    };
  }
  render() {
    const {catHoodie, Hoodies} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-550}>
          <HeaderComponent navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pilihCatHoodie}>
              <ListCatHoodie catHoodie={catHoodie} />
            </View>
            <View style={styles.pilihHoodie}>
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Hoodie</Text> yang anda
                inginkan
              </Text>
              <ListHoodies Hoodies={Hoodies} navigation={navigation} />
              <Jarak height={10} />
              <Button title="Lihat Semua" type="text" padding={7} />
            </View>
            <Jarak height={100} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pilihHoodie: {
    marginHorizontal: responsiveHeight(30),
    marginTop: responsiveHeight(20),
  },
  pilihCatHoodie: {
    marginHorizontal: responsiveHeight(30),
  },
  label: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16),
    color: colors.black,
  },
  boldLabel: {
    fontFamily: fonts.primary.extraBold,
    fontSize: RFValue(16),
  },
});
