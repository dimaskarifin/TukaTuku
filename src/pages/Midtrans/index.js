import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {updatePesanan} from '../../actions/PesananAction';
import {colors} from '../../utils';

export class Midtrans extends Component {
  componentDidMount() {
    if (this.props.route.params.order_id) {
      this.props.dispatch(updatePesanan(this.props.route.params));
    }
  }
  render() {
    const {updatePesananLoading} = this.props;
    return (
      <>
        {updatePesananLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <WebView source={{uri: this.props.route.params.url}} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  updatePesananLoading: state.PesananReducer.updatePesananLoading,
});

export default connect(mapStateToProps, null)(Midtrans);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});
