import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component} from 'react';
import {
  BannerSlider,
  Button,
  HeaderComponent,
  Jarak,
  ListCatHoodie,
  ListHoodies,
} from '../../components';
import {colors, fonts, responsiveHeight, getData} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getListCatHoodie} from '../../actions/CatHoodie';
import {limitHoodie} from '../../actions/HoodieAction';
import {getListHistory} from '../../actions/HistoryAction';

class Home extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getListCatHoodie());
      this.props.dispatch(limitHoodie());
      getData('user').then(res => {
        if (res) {
          this.props.dispatch(getListHistory(res.uid));
        }
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    const {navigation, getListHistoryResult} = this.props;

    let resiList = [];
    if (getListHistoryResult) {
      Object.keys(getListHistoryResult).forEach(key => {
        const order = getListHistoryResult[key];
        if (order.noResi) {
          resiList.push({
            orderId: order.order_id,
            noResi: order.noResi,
            estimasi: order.estimasi,
          });
        }
      });
    }

    return (
      <View style={styles.page}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-550}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderComponent navigation={navigation} page="Home" />
            <BannerSlider />

            {resiList.length > 0 && (
              <View style={styles.resiContainer}>
                <Text style={styles.resiTitle}>Nomor Resi Pengiriman Anda:</Text>
                {resiList.map((item, idx) => (
                  <View key={idx} style={styles.resiItem}>
                    <Text style={styles.resiText}>
                      Order ID: <Text style={styles.resiVal}>{item.orderId}</Text>
                    </Text>
                    <Text style={styles.resiText}>
                      No. Resi: <Text style={styles.resiVal}>{item.noResi}</Text> (Est: {item.estimasi} Hari)
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.pilihCatHoodie}>
              <Text style={styles.label}>Pilih Kategori Hoodie</Text>
              <ListCatHoodie navigation={navigation} />
            </View>
            <View style={styles.pilihHoodie}>
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Hoodie</Text> yang anda
                inginkan
              </Text>
              <ListHoodies navigation={navigation} />
              <Jarak height={10} />
              <Button
                title="Lihat Semua"
                type="text"
                padding={7}
                onPress={() => this.props.navigation.navigate('ListHoodie')}
              />
            </View>
            <Jarak height={20} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getListHistoryResult: state.HistoryReducer.getListHistoryResult,
});

export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pilihHoodie: {
    marginHorizontal: responsiveHeight(30),
    marginTop: responsiveHeight(20),
  },
  pilihCatHoodie: {
    marginHorizontal: responsiveHeight(30),
    marginTop: responsiveHeight(20),
  },
  label: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16),
    color: colors.black,
  },
  boldLabel: {
    fontFamily: fonts.primary.extraBold,
    fontSize: RFValue(16),
    color: colors.black,
  },
  resiContainer: {
    marginHorizontal: responsiveHeight(30),
    marginTop: responsiveHeight(20),
    padding: 15,
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D2E0FF',
  },
  resiTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(14),
    color: colors.primary,
    marginBottom: 8,
  },
  resiItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E8FF',
  },
  resiText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(12),
    color: colors.black,
  },
  resiVal: {
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
});
