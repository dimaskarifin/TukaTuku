import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';
import {connect} from 'react-redux';
import {getHoodieByCatHoodie} from '../../../actions/HoodieAction';

const CardCatHoodie = ({catHoodies, navigation, id, dispatch}) => {
  const toHoodieByCatHoodie = (id, catHoodie) => {
    // ke hoodie action
    dispatch(getHoodieByCatHoodie(id, catHoodie));
    // navigate ke list hoodie
    navigation.navigate('ListHoodie');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toHoodieByCatHoodie(id, catHoodies.catHoodie)}>
      <Image source={{uri: catHoodies.image}} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default connect()(CardCatHoodie);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: responsiveWidth(80),
    height: responsiveHeight(80),
  },
});
