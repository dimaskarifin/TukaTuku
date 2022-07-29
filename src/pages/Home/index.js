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
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getListCatHoodie} from '../../actions/CatHoodie';
import {limitHoodie} from '../../actions/HoodieAction';

class Home extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getListCatHoodie());
      this.props.dispatch(limitHoodie());
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-550}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderComponent navigation={navigation} page="Home" />
            <BannerSlider />
            <View style={styles.pilihCatHoodie}>
              <Text style={styles.label}>Pilih Kategori Hoodie</Text>
              <ListCatHoodie navigation={navigation} />
            </View>
            <View style={styles.pilihHoodie}>
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Hoodie</Text> yang anda
                inginkan
              </Text>
              <ListHoodies navigation={navigation} />
              <Jarak height={10} />
              <Button
                title="Lihat Semua"
                type="text"
                padding={7}
                onPress={() => this.props.navigation.navigate('ListHoodie')}
              />
            </View>
            <Jarak height={20} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect()(Home);

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
    fontSize: RFValue(16),
    color: colors.black,
  },
  boldLabel: {
    fontFamily: fonts.primary.extraBold,
    fontSize: RFValue(16),
    color: colors.black,
  },
});
