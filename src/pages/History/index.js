import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListHistory} from '../../components';
import {colors, getData} from '../../utils';
import {connect} from 'react-redux';
import {getListHistory} from '../../actions/HistoryAction';

class History extends Component {
  componentDidMount() {
    getData('user').then(res => {
      const data = res;

      if (!data) {
        this.props.navigation.replace('Login');
      } else {
        this.props.dispatch(getListHistory(data.uid));
      }
    });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <ListHistory navigation={navigation} />
      </View>
    );
  }
}

export default connect()(History);

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
