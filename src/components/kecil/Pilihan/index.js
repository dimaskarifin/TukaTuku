import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {Picker} from '@react-native-picker/picker';

const Pilihan = ({
  fontSize,
  label,
  datas,
  width,
  height,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapperPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={onValueChange}>
          <Picker.Item label="--Pilih--" value="" />
          {datas.map((item, index) => {
            if (label == 'Provinsi') {
              return (
                <Picker.Item
                  label={item.province}
                  value={item.province_id}
                  key={item.province_id}
                />
              );
            } else if (label == 'Kota/Kab') {
              return (
                <Picker.Item
                  label={item.type + ' ' + item.city_name}
                  value={item.city_id}
                  key={item.city_id}
                />
              );
            } else if (label == 'Pilih Ekpedisi') {
              return (
                <Picker.Item label={item.label} value={item} key={item.id} />
              );
            } else {
              return <Picker.Item label={item} value={item} key={index} />;
            }
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Pilihan;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(6),
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
