import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {Slider, Slider2} from '../../../assets';
import {responsiveHeight, responsiveWidth} from '../../../utils';

export default class BannerSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [Slider, Slider2],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          autoplay
          circleLoop
          sliderBoxHeight={responsiveHeight(168)}
          ImageComponentStyle={styles.slider}
          dotStyle={styles.dotStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(20),
  },
  slider: {
    borderRadius: 10,
    width: responsiveWidth(354),
  },
  dotStyle: {
    width: responsiveWidth(15),
    height: responsiveHeight(5),
    borderRadius: 5,
  },
});
