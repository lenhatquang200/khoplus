import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import colorApp from "./colorApp";

export const arrow_Left = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return <AntDesign name="left" size={size} color={color} />;
};

export const arrow_Right = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return <AntDesign name="right" size={size} color={color} />;
};

export const arrow_Up = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return <AntDesign name="up" size={size} color={color} />;
};

export const arrow_Down = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return <AntDesign name="down" size={size} color={color} />;
};

export const icon_Unit = (props) => {
  return <Feather name="filter" size={16} color={colorApp.green_007} />;
};

export const icon_Edit = (props) => {
  return <Feather name="edit" size={18} color={colorApp.colorText} />;
};

export const icon_Close = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return <AntDesign name="close" size={size} color={colorApp.colorText} />;
};

export const icon_Clear = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return (
    <AntDesign
      name="closecircle"
      size={size}
      color={colorApp.black_opacity_05}
    />
  );
};

export const icon_Store = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return (
    <MaterialCommunityIcons name="store-outline" size={size} color={color} />
  );
};

export const icon_Info = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return (
    <Ionicons
      name="alert-circle-outline"
      size={size}
      color={colorApp.black_opacity_05}
    />
  );
};
