import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../utils';
import Jarak from '../Jarak';

const ButtonLoading = ({padding, fontSize}) => {
  return (
    <TouchableOpacity style={styles.container(padding)}>
      <ActivityIndicator size="small" color="#FFFFFF" />
      <Jarak width={5} />
      <Text style={styles.title(fontSize)}>Loading . . .</Text>
    </TouchableOpacity>
  );
};

export default ButtonLoading;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.grey,
    padding: padding,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: fontSize => ({
    color: colors.white,
    fontSize: fontSize ? fontSize : 15,
    fontFamily: fonts.primary.bold,
  }),
});
