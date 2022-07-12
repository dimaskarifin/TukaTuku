import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {Logo} from '../../assets';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Home');
    }, 3000);
  }
  render() {
    return (
      <View styles={styles.pages}>
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
