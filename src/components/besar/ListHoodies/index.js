import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardHoodie} from '../../kecil';
import {connect} from 'react-redux';
import {colors} from '../../../utils';

const ListHoodies = ({
  getListHoodieLoading,
  getListHoodieResult,
  getListHoodieError,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getListHoodieResult ? (
        Object.keys(getListHoodieResult).map(key => {
          const item = getListHoodieResult[key];
          if (item.stok !== undefined && item.stok <= 0) {
            return null;
          }
          const hoodieWithId = { ...item, id: key };
          return (
            <CardHoodie
              Hoodie={hoodieWithId}
              key={key}
              navigation={navigation}
            />
          );
        })
      ) : getListHoodieLoading ? (
        <View style={styles.indikator}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListHoodieError ? (
        <Text>{getListHoodieError}</Text>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  getListHoodieLoading: state.HoodieReducer.getListHoodieLoading,
  getListHoodieResult: state.HoodieReducer.getListHoodieResult,
  getListHoodieError: state.HoodieReducer.getListHoodieError,
});

export default connect(mapStateToProps, null)(ListHoodies);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  indikator: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});
