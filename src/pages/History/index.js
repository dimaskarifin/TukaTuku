import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListHistory} from '../../components';
import {dummyPesanans} from '../../data';
import {colors} from '../../utils';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanans: dummyPesanans,
    };
  }

  render() {
    const {pesanans} = this.state;
    return (
      <View style={styles.pages}>
        <ListHistory pesanans={pesanans} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
