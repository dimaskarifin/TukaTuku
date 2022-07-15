# TukaTuku

##Changes Need For use this App

install npm i deprecated-react-native-prop-types@2.2.0
and then in react-native-snap-carousel
change file Carousel.JS, Pagination.JS, PaginationDot.JS, ParallaxImage.JS
change the import of
{ViewPropTypes} from 'react-native';
use this
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
