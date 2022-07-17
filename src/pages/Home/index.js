import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {BannerSlider, HeaderComponent, ListCatHoodie} from '../../components';
import {colors, fonts, responsiveHeight} from '../../utils';
import {dummyCatHoodie} from '../../data';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catHoodie: dummyCatHoodie,
    };
  }
  render() {
    const {catHoodie} = this.state;
    return (
      <View style={styles.page}>
        <HeaderComponent />
        <BannerSlider />
        <View style={styles.pilihCatHoodie}>
          <Text style={styles.label}>Pilih Kategori Hoodie</Text>
          <ListCatHoodie catHoodie={catHoodie} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pilihCatHoodie: {
    marginHorizontal: responsiveHeight(30),
    marginTop: responsiveHeight(20),
  },
  label: {
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
});
