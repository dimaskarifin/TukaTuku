import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconBack, IconCart} from '../../../assets';
import {colors} from '../../../utils';
import TextOnly from './TextOnly';

const Button = props => {
  const Icon = () => {
    if (icon === 'cart') {
      return <IconCart />;
    } else if (icon === 'arrow-left') {
      return <IconBack />;
    }
    return <IconCart />;
  };
  const {icon, totalKeranjang, padding, type, onPress} = props;
  if (type === 'text') {
    return <TextOnly {...props} />;
  }
  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
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
  container: padding => ({
    backgroundColor: colors.grey,
    padding: padding,
    borderRadius: 5,
  }),
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
