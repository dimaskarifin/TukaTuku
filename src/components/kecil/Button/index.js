import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconCart} from '../../../assets';
import {colors} from '../../../utils';
import Jarak from '../Jarak';

const Button = ({icon, totalKeranjang}) => {
  const Icon = () => {
    if (icon === 'cart') {
      return <IconCart />;
    }
    return <IconCart />;
  };
  return (
    <TouchableOpacity style={styles.container}>
      <Icon />
      {totalKeranjang && (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{totalKeranjang}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    padding: 10,
    borderRadius: 5,
  },
  notif: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 9, //half radius will make it cirlce,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  textNotif: {
    fontSize: 10,
    color: 'white',
  },
});
