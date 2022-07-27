import {Text, StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../../utils/colors';
import {dummyProfile, dummyMenu} from '../../data';
import {fonts, responsiveHeight, getData, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {ListMenu} from '../../components/besar';
import {DefaultImage} from '../../assets';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      menus: dummyMenu,
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          profile: data,
        });
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };
  render() {
    const {profile, menus} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Image
            source={profile.avatar ? {uri: profile.avatar} : DefaultImage}
            style={styles.foto}
          />
          <View style={styles.profile}>
            <Text style={styles.nama}>{profile.nama}</Text>
            <Text style={styles.desc}>No.HP : {profile.nohp}</Text>
            <Text style={styles.desc}>{profile.alamat}</Text>
          </View>
          <ListMenu menus={menus} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(650),
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  foto: {
    width: responsiveWidth(150),
    height: responsiveHeight(150),
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: -responsiveWidth(75),
  },
  profile: {
    marginTop: responsiveHeight(10),
    alignItems: 'center',
    color: colors.black,
  },
  nama: {
    fontFamily: fonts.primary.extraBold,
    color: colors.black,
    fontSize: RFValue(24, heightMobileUI),
  },
  desc: {
    fontFamily: fonts.primary.regular,
    color: colors.black,
    fontSize: RFValue(18, heightMobileUI),
  },
});
