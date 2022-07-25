import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

const TextOnly = ({padding, title, onPress, fontSize}) => {
  return (
    <View>
      <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
        <Text style={styles.text(fontSize)}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextOnly;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.primary,
    padding: padding,
    borderRadius: 10,
  }),
  text: fontSize => ({
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize ? fontSize : 14,
    fontFamily: fonts.primary.bold,
  }),
});
