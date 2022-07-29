import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {CardKeranjang} from '../../kecil';
import {colors, fonts} from '../../../utils';

const ListKeranjang = ({
  getListKeranjangLoading,
  getListKeranjangResult,
  getListKeranjangError,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {getListKeranjangResult ? (
          Object.keys(getListKeranjangResult.pesanans).map(key => {
            return (
              <CardKeranjang
                keranjang={getListKeranjangResult.pesanans[key]}
                keranjangUtama={getListKeranjangResult}
                key={key}
                id={key}
              />
            );
          })
        ) : getListKeranjangLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : getListKeranjangError ? (
          <Text>{getListKeranjangError}</Text>
        ) : (
          <Text style={styles.textKosong}>Keranjang Kosong</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ListKeranjang;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  textKosong: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.black,
    fontSize: 14,
  },
});
