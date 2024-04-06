import { Dimensions, Platform } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("screen");

const guidelineBaseWidth = Number("360");
const guidelineBaseHeight = Number("592");

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const horizontalScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isTablet = width > 500 && height > 500;
const statusBarHeight = Constants.statusBarHeight;

const settingApp = {
  isTablet,

  width,
  width_32: width - 32,
  height,
  platform: Platform.OS,
  statusBarHeight,

  colorText: "#404040",
  colorPlaceText: "#655E5E",

  green_primary: "#56C596",
  green_001: "#205072",
  green_002: "#329D9C",
  green_003: "#78E495",
  green_004: "#CFF4D2",

  white: "#FFFFFF",

  scale,
  verticalScale,
  horizontalScale,

  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_14: 14,
  space_16: 16,

  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_18: 18,
  size_20: 20,
  size_24: 24,

  shadow_Top: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowRadius: 1,
        shadowOffset: { height: 1 },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
};

export default settingApp;
