import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardCatHoodie} from '../../kecil';
import {colors, responsiveHeight} from '../../../utils';
import {connect} from 'react-redux';

const ListCatHoodie = ({
  getListCatHoodieLoading,
  getListCatHoodieResult,
  getListCatHoodieError,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getListCatHoodieResult ? (
        Object.keys(getListCatHoodieResult).map(key => {
          return (
            <CardCatHoodie
              catHoodies={getListCatHoodieResult[key]}
              key={key}
              navigation={navigation}
              id={key}
            />
          );
        })
      ) : getListCatHoodieLoading ? (
        <View style={styles.indikator}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListCatHoodieError ? (
        <Text>{getListCatHoodieError}</Text>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getListCatHoodieLoading: state.CatHoodieReducer.getListCatHoodieLoading,
  getListCatHoodieResult: state.CatHoodieReducer.getListCatHoodieResult,
  getListCatHoodieError: state.CatHoodieReducer.getListCatHoodieError,
});

export default connect(mapStateToProps, null)(ListCatHoodie);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(12),
  },
  indikator: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});
