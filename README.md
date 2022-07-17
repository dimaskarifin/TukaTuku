# TukaTuku

#Changes Need For use this App

install npm i deprecated-react-native-prop-types@2.2.0
and then in react-native-snap-carousel
change file Carousel.JS, Pagination.JS, PaginationDot.JS, ParallaxImage.JS
change the import of
{ViewPropTypes} from 'react-native';
use this
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

#Bottom Navigation Goes Up when the keyboard shows
change file AndroidManifest.xml,
change line android:windowSoftInputMode="adjustResize" to android:windowSoftInputMode="adjustPan".
if solution this doesnt work out use this
<AvoidingKeyboardView style={styles.container}> then add
flex: 1,
justifyContent: "flex-start",
or this
behavior= {(Platform.OS === 'ios')? "padding" : null} style={{flex: 1}}>
or this
style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled
