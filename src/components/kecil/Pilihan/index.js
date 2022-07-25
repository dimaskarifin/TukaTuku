import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {Picker} from '@react-native-picker/picker';

const Pilihan = ({fontSize, label, datas, width, height}) => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label}</Text>
      <View style={styles.wrapperPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="--Pilih--" value="" />
          {datas.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Pilihan;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(2),
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.reguler,
    color: colors.black,
  }),
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : RFValue(10, heightMobileUI),
    fontFamily: fonts.primary.reguler,
    color: colors.black,
    width: width ? width : responsiveWidth(350),
    height: height ? height : responsiveHeight(40),
    marginTop: responsiveHeight(-16),
    marginBottom: responsiveHeight(16),
    marginRight: 20,
  }),
  wrapperPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    color: colors.black,
  },
});
