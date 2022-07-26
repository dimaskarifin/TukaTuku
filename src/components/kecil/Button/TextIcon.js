import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  CartWhite,
  IconBack,
  IconCart,
  IconContinue,
  IconSubmit,
} from '../../../assets';
import {colors, fonts, heightMobileUI} from '../../../utils';
import Jarak from '../Jarak';
import {RFValue} from 'react-native-responsive-fontsize';

const TextIcon = ({icon, padding, type, onPress, title, fontSize}) => {
  const Icon = () => {
    if (icon === 'cart') {
      return <IconCart />;
    } else if (icon === 'arrow-left') {
      return <IconBack />;
    } else if (icon === 'cart-white') {
      return <CartWhite />;
    } else if (icon === 'submit') {
      return <IconSubmit />;
    } else if (icon === 'continue') {
      return <IconContinue />;
    }
    return <IconCart />;
  };
  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
      <Icon />
      <Jarak width={10} />
      <Text style={styles.text(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.primary,
    padding: padding,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: fontSize => ({
    fontFamily: fonts.primary.bold,
    color: colors.white,
    fontSize: fontSize ? fontSize : RFValue(20, heightMobileUI),
  }),
});
