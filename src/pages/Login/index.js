import {Alert, StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {LogoLog} from '../../assets';
import {colors, fonts, responsiveHeight} from '../../utils';
import {Button, Inputan, Jarak} from '../../components';
import {loginUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  login = () => {
    const {email, password} = this.state;

    if (email && password) {
      //action
      this.props.dispatch(loginUser(email, password));
    } else {
      Alert.alert('Error', 'Email & Password harus diisi');
    }
  };
  componentDidUpdate(prevProps) {
    const {loginResult} = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('MainApp');
    }
  }
  render() {
    const {email, password} = this.state;
    const {loginLoading} = this.props;

    return (
      <View style={styles.pages}>
        <View style={styles.logo}>
          <LogoLog />
        </View>
        <View style={styles.cardLogin}>
          <Inputan
            label="Email"
            value={email}
            onChangeText={email => this.setState({email})}
          />
          <Inputan
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={password => this.setState({password})}
          />
          <Jarak height={20} />
          <Button
            title="Login"
            type="text"
            padding={14}
            fontSize={18}
            loading={loginLoading}
            onPress={() => this.login()}
          />
        </View>
        <View style={styles.regis}>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register1')}>
            Belum punya akun?
          </Text>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register1')}>
            Klik untuk daftar
          </Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});
export default connect(mapStateToProps, null)(Login);
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
