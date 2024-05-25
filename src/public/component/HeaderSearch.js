import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import settingApp from "../settingApp";
import colorApp from "../colorApp";
import * as Icon from "../icon";
import { debounce } from "lodash";
import lang from "../locate";

const { width } = settingApp;

export default function HeaderSearch({
  goBack,
  title = "",
  placeholder,
  onSearch,
}) {
  placeholder || lang.defaultSearch;
  const [text, setText] = useState("");

  let searchBox = debounce(onChangText, 500);

  function onChangText(value) {
    setText(value);
    onSearch && onSearch(value);
  }

  const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {};

  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <Text style={styles.txt_title}>{title}</Text>

      <View style={styles.view_main}>
        <TouchableOpacity onPress={goBack} style={styles.bt_goback}>
          <Icon.arrow_Left size={24} color={colorApp.colorText} />
        </TouchableOpacity>

        <View style={styles.box_search}>
          <TextInput
            defaultValue={text}
            onChangeText={searchBox}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: settingApp,
    backgroundColor: colorApp.white,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  statusBar: {
    width,
    height: settingApp.statusBarHeight + 20,
  },
  view_main: {
    width,
    height: 100 - settingApp.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
  },
  bt_goback: {
    width: 40,
    height: 42,
    justifyContent: "center",
  },
  txt_title: {
    fontSize: settingApp.size_24,
    fontWeight: "bold",
    color: settingApp.colorText,
    marginBottom: settingApp.space_6,
  },
  box_search: {
    width: width - 75,
    height: 32,
    backgroundColor: colorApp.black_opacity_01,
    justifyContent: "center",
    paddingLeft: settingApp.space_8,
    borderRadius: 12,
  },
});
