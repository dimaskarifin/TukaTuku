import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardHoodie} from '../../kecil';

const ListHoodies = ({Hoodies, navigation}) => {
  return (
    <View style={styles.container}>
      {Hoodies.map(Hoodie => {
        return (
          <CardHoodie key={Hoodie.id} Hoodie={Hoodie} navigation={navigation} />
        );
      })}
    </View>
  );
};

export default ListHoodies;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
