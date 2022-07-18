import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

const TextOnly = ({padding, title, onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextOnly;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.primary,
    padding: padding,
    borderRadius: 20,
  }),
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
});
