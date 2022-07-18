import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardCatHoodie} from '../../kecil';
import {responsiveHeight} from '../../../utils';

const ListCatHoodie = ({catHoodie}) => {
  return (
    <View style={styles.container}>
      {catHoodie.map(catHoodies => {
        return <CardCatHoodie catHoodies={catHoodies} key={catHoodies.id} />;
      })}
    </View>
  );
};

export default ListCatHoodie;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(12),
  },
});