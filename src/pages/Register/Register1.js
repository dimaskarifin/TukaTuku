import {Text, StyleSheet, View, Alert} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {IlustrasiRegister1} from '../../assets/images';
import {Button, Inputan, Jarak} from '../../components';

export default class Register1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      email: '',
      nohp: '',
      password: '',
    };
  }
  onContinue = () => {
    const {nama, email, nohp, password} = this.state;
    if (nama && email && nohp && password) {
      this.props.navigation.navigate('Register2', this.state);
    } else {
      Alert.alert(
        'Error',
        'Nama, email, no. handphone, dan password harus diisi',
      );
    }
  };
  render() {
    const {nama, email, nohp, password} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.btnBack}>
          <Button
            icon="arrow-left"
            onPress={() => this.props.navigation.goBack()}
            padding={5}
          />
        </View>

        <View style={styles.ilustrasi}>
          <IlustrasiRegister1 />
          <Jarak height={10} />
          <Text style={styles.title}>Daftar</Text>
          <Text style={styles.title}>Isi Daftar Diri Anda</Text>

          <View style={styles.wrapperCircle}>
            <View style={styles.circlePrimary}></View>
            <Jarak width={10} />
            <View style={styles.circleDisabled}></View>
          </View>
        </View>
        <View style={styles.card}>
          <Inputan
            label="Nama"
            value={nama}
            onChangeText={nama => this.setState({nama})}
          />
          <Inputan
            label="Email"
            value={email}
            onChangeText={email => this.setState({email})}
          />
          <Inputan
            label="No. Handphone"
            keyboardType="number-pad"
            value={nohp}
            onChangeText={nohp => this.setState({nohp})}
          />
          <Inputan
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={password => this.setState({password})}
          />
          <Jarak height={30} />
          <Button
            title="Continue"
            type="textIcon"
            icon="continue"
            padding={12}
            fontSize={20}
            onPress={() => this.onContinue()}
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
    paddingTop: 30,
  },
  ilustrasi: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary.regular,
    color: colors.primary,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveHeight(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.grey,
    width: responsiveWidth(11),
    height: responsiveHeight(11),
    borderRadius: 10,
  },
  card: {
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
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
    marginTop: responsiveHeight(25),
  },
});
