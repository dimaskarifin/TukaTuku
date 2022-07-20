import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {colors, fonts, responsiveHeight} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';

const Inputan = ({
  textarea,
  width,
  height,
  fontSize,
  placeholder,
  label,
  datas,
}) => {
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(fontSize)}>{label}</Text>
        <TextInput
          style={styles.inputTextArea(fontSize)}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    );
  }
  return;
};

export default Inputan;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(2),
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : RFValue(10, heightMobileUI),
    fontFamily: fonts.primary.reguler,
    color: colors.black,
  }),
  inputTextArea: fontSize => ({
    fontSize: fontSize ? fontSize : RFValue(10, heightMobileUI),
    fontFamily: fonts.primary.reguler,
    color: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    marginTop: responsiveHeight(4),
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  }),
});
