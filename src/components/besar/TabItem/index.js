import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  IconHome,
  IconHomeAct,
  IconProfile,
  IconProfileAct,
  IconHoodie,
  IconHoodieAct,
} from '../../../assets';
import {colors, fonts, heightMobileUI} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <IconHomeAct /> : <IconHome />;
    }
    if (label === 'Hoodie') {
      return isFocused ? <IconHoodieAct /> : <IconHoodie />;
    }
    if (label === 'Profile') {
      return isFocused ? <IconProfileAct /> : <IconProfile />;
    }
    return <IconHome />;
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: isFocused => ({
    color: isFocused ? colors.black : colors.black,
    fontSize: RFValue(16, heightMobileUI),
    marginTop: 4,
    fontFamily: isFocused ? fonts.primary.extraBold : fonts.primary.regular,
  }),
});
