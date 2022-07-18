import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component} from 'react';
import {
  BannerSlider,
  Button,
  HeaderComponent,
  Jarak,
  ListCatHoodie,
  ListHoodies,
} from '../../components';
import {colors, fonts, responsiveHeight} from '../../utils';
import {dummyCatHoodie, dummyHoodies} from '../../data';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catHoodie: dummyCatHoodie,
      Hoodies: dummyHoodies,
    };
  }
  render() {
    const {catHoodie, Hoodies} = this.state;
    return (
      <View style={styles.page}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-550}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderComponent />
            <BannerSlider />
            <View style={styles.pilihCatHoodie}>
              <Text style={styles.label}>Pilih Kategori Hoodie</Text>
              <ListCatHoodie catHoodie={catHoodie} />
            </View>
            <View style={styles.pilihHoodie}>
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Hoodie</Text> yang anda
                inginkan
              </Text>
              <ListHoodies Hoodies={Hoodies} />
              <Button title="Lihat Semua" type="text" padding={7} />
            </View>
            <Jarak height={20} />
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
    marginTop: responsiveHeight(20),
  },
  label: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    color: colors.black,
  },
  boldLabel: {
    fontFamily: fonts.primary.extraBold,
    fontSize: 16,
    color: colors.black,
  },
});
