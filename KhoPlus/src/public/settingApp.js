import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('screen');

const guidelineBaseWidth = Number('360');
const guidelineBaseHeight = Number('592');

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const horizontalScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const isTablet = width > 500 && height > 500;

const settingApp = {
    width,
    height,
    platform: Platform.OS,

   
    colorText:"#404040",
    colorPlaceText:"#655E5E",

    green_primary:"#56C596",
    green_001:"#205072",
    green_002:"#329D9C",
    green_003:"#78E495",
    green_004:"#CFF4D2",

    white:"#FFFFFF",

    scale,
    verticalScale,
    horizontalScale,

}

export default settingApp;