import {Text, StyleSheet, View, ScrollView, Image, Alert} from 'react-native';
import React, {Component} from 'react';
import {dummyProfile} from '../../data';
import {
  colors,
  fonts,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import {Button, Inputan, Pilihan} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/ProfileAction';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    };
  }

  onSubmit = () => {
    const {password, newPassword, newPasswordConfirmation} = this.state;

    if (newPassword !== newPasswordConfirmation) {
      Alert.alert(
        'Error',
        'Password Baru dan Konfirmasi Password Baru Harus Sama',
      );
    } else if (password && newPassword && newPasswordConfirmation) {
      //ambil data email dari local storage
      getData('user').then(res => {
        const parameter = {
          email: res.email,
          password: password,
          newPassword: newPassword,
        };

        this.props.dispatch(changePassword(parameter));
      });
    } else {
      Alert.alert(
        'Error',
        'Password Lama, Password Baru dan Konfirmasi Password Baru Harus Diisi',
      );
    }
  };

  componentDidUpdate(prevProps) {
    const {changePasswordResult} = this.props;

    if (
      changePasswordResult &&
      prevProps.changePasswordResult !== changePasswordResult
    ) {
      Alert.alert('Sukses', 'Change Password Success');
      this.props.navigation.replace('MainApp');
    }
  }

  render() {
    const {password, newPassword, newPasswordConfirmation} = this.state;

    const {changePasswordLoading} = this.props;

    return (
      <View style={styles.page}>
        <View>
          <Inputan
            label="Password Lama"
            secureTextEntry
            value={password}
            onChangeText={password => this.setState({password})}
          />
          <Inputan
            label="Password Baru"
            secureTextEntry
            value={newPassword}
            onChangeText={newPassword => this.setState({newPassword})}
          />
          <Inputan
            label="Konfirmasi Password Baru"
            secureTextEntry
            value={newPasswordConfirmation}
            onChangeText={newPasswordConfirmation =>
              this.setState({newPasswordConfirmation})
            }
          />
        </View>

        <View style={styles.submit}>
          <Button
            title="Submit"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(15)}
            fontSize={18}
            onPress={() => this.onSubmit()}
            loading={changePasswordLoading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  changePasswordLoading: state.ProfileReducer.changePasswordLoading,
  changePasswordResult: state.ProfileReducer.changePasswordResult,
  changePasswordError: state.ProfileReducer.changePasswordError,
});

export default connect(mapStateToProps, null)(ChangePassword);

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
