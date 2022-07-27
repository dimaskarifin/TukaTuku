import {Text, StyleSheet, View, TextInput} from 'react-native';
import React, {Component} from 'react';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconSearch} from '../../../assets';
import {Button, Jarak} from '../../kecil';
import {saveKeywordHoodie} from '../../../actions/HoodieAction';
import {connect} from 'react-redux';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  selesaiCari = () => {
    const {page, navigation, dispatch} = this.props;
    const {search} = this.state;

    //Jalankan action save keyword
    dispatch(saveKeywordHoodie(search));

    //Jika halaman home maka kita navigate ke ListHoodie
    if (page !== 'ListHoodie') {
      navigation.navigate('ListHoodie');
    }

    //kembalikan state search ke string kosong
    this.setState({
      search: '',
    });
  };

  render() {
    const {search} = this.state;
    const {navigation} = this.props;
    return (
      <View>
        <View style={styles.wrapperHeader}>
          {/* Input Pencarian */}
          <View style={styles.searchSection}>
            <IconSearch />
            <TextInput
              placeholder="Cari Hoodie ..."
              style={styles.input}
              value={search}
              onChangeText={search => this.setState({search})}
              onSubmitEditing={() => this.selesaiCari()}
            />
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

export default connect()(HeaderComponent);

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
