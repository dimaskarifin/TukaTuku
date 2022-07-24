import {Text, StyleSheet, View, TextInput} from 'react-native';
import React, {Component} from 'react';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconSearch} from '../../../assets';
import {Button, Jarak} from '../../kecil';

export default class HeaderComponent extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <View style={styles.wrapperHeader}>
          {/* Input Pencarian */}
          <View style={styles.searchSection}>
            <IconSearch />
            <TextInput placeholder="Cari Hoodie ..." style={styles.input} />
          </View>
          <Jarak width={10} />
          <Button
            icon="cart"
            totalKeranjang={4}
            padding={12}
            onPress={() => navigation.navigate('Keranjang')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperHeader: {
    marginTop: responsiveHeight(25),
    marginHorizontal: responsiveWidth(30),
    flexDirection: 'row',
    marginBottom: responsiveHeight(15),
  },
  searchSection: {
    flex: 1,
    backgroundColor: colors.grey,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  input: {
    fontSize: 16,
  },
});
