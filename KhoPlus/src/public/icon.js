import { AntDesign } from "@expo/vector-icons";
import colorApp from "./colorApp";

export const arrowleft = (props) => {
  let { size, color } = props;
  size = size || 24;
  color = color || colorApp.colorText;
  return <AntDesign name="left" size={size} color={color} />;
};
