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
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getListCatHoodie} from '../../actions/CatHoodie';
import {getListHoodie} from '../../actions/HoodieAction';

class ListHoodie extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {id_catHoodie, keyword} = this.props;
      this.props.dispatch(getListCatHoodie());
      this.props.dispatch(getListHoodie(id_catHoodie, keyword));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidUpdate(prevProps) {
    const {id_catHoodie, keyword} = this.props;

    if (id_catHoodie && prevProps.id_catHoodie !== id_catHoodie) {
      this.props.dispatch(getListHoodie(id_catHoodie));
    }
    if (keyword && prevProps.keyword !== keyword) {
      this.props.dispatch(getListHoodie(keyword));
    }
  }

  render() {
    const {navigation, namaCatHoodie, keyword} = this.props;
    return (
      <View style={styles.page}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-550}>
          <HeaderComponent navigation={navigation} page="ListHoodie" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pilihCatHoodie}>
              <ListCatHoodie navigation={navigation} />
            </View>
            <View style={styles.pilihHoodie}>
              {keyword ? (
                <Text style={styles.label}>
                  Cari : <Text style={styles.boldLabel}>{keyword}</Text>
                </Text>
              ) : (
                <Text style={styles.label}>
                  Pilih{' '}
                  <Text style={styles.boldLabel}>
                    {namaCatHoodie ? namaCatHoodie : 'Hoodie'}
                  </Text>{' '}
                  yang anda inginkan
                </Text>
              )}

              <ListHoodies navigation={navigation} />
              <Jarak height={10} />
            </View>
            <Jarak height={100} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  id_catHoodie: state.HoodieReducer.id_catHoodie,
  namaCatHoodie: state.HoodieReducer.namaCatHoodie,

  keyword: state.HoodieReducer.keyword,
});

export default connect(mapStateToProps, null)(ListHoodie);

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
