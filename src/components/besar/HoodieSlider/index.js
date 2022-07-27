import {Text, StyleSheet, View, Modal} from 'react-native';
import React, {Component} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {SliderBox} from 'react-native-image-slider-box';
import {responsiveHeight, responsiveWidth} from '../../../utils';

export default class HoodieSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openImage: false,
      previewImage: false,
    };
  }
  clickPreview = index => {
    this.setState({
      openImage: true,
      previewImage: [
        {
          url: this.props.images[index],
          props: {
            source: this.props.images[index],
          },
        },
      ],
    });
  };
  render() {
    const {images} = this.props;
    const {openImage, previewImage} = this.state;
    return (
      <View>
        <SliderBox
          images={images}
          circleLoop
          sliderBoxHeight={responsiveHeight(330)}
          ImageComponentStyle={styles.hoodie}
          dotStyle={styles.dotStyle}
          onCurrentImagePressed={index => this.clickPreview(index)}
        />
        <Modal
          visible={openImage}
          transparent={true}
          onRequestClose={() => this.setState({openImage: false})}>
          <ImageViewer
            imageUrls={previewImage}
            onClick={() => this.setState({openImage: false})}
            enableSwipeDown
            onSwipeDown={() => this.setState({openImage: false})}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hoodie: {
    marginTop: responsiveHeight(20),
    width: responsiveWidth(280),
  },
});
