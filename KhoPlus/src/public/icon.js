import { AntDesign, Feather } from "@expo/vector-icons";
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
  return <Feather name="filter" size={16} color={colorApp.green_001} />;
};

export const icon_Edit = (props) => {
  return <Feather name="edit" size={18} color={colorApp.colorText} />;
};
