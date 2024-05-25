import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colorApp, settingApp } from "../../../../public";

const tablet = settingApp?.isTablet;
const ICON_CIRCLE = tablet ? settingApp.scale(20) : settingApp.scale(32);
const COVER_ICON_MENU_SIZE = tablet
  ? settingApp.scale(32)
  : settingApp.scale(42);
export default function ItemList(props) {
  const { item, actions } = props || {};
  const [listIcon, setListIcon] = useState([]);

  useEffect(() => {
    if (item?.keyObj && item?.data) {
      setListIcon(item?.data);
    }
  }, []);
  let h = item && item.height ? item.height : 120;
  return (
    <View
      style={[
        styles.container,
        {
          height: h,
          backgroundColor:
            item.keyObj != "end-list" ? settingApp.white : "transparent",
        },
      ]}
    >
      <View style={[styles.view_menu]}>
        <Text style={styles.text_title_menu}>{item?.title}</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        key={(item, index) => `${index}`}
        data={listIcon}
        extraData={listIcon}
        renderItem={(obj) => <IconView obj={obj} actions={actions} />}
      />
    </View>
  );
}

const IconView = memo(iconView);
function iconView(props) {
  const { actions, obj } = props;
  const { item, index } = obj || {};
  return (
    <TouchableOpacity
      onPress={() => actions(item)}
      style={[
        styles.view_icon,
        {
          borderColor: colorApp.colorText,
        },
      ]}
    >
      <View style={styles.icon_menu}>{item.icon}</View>
      <Text style={styles.text_title_icon}>{item.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    borderRadius: 8,
    marginLeft: 15,
    marginTop: 16,
    paddingVertical: tablet ? settingApp.verticalScale(10) : 0,
  },
  view_menu: {
    width: settingApp.width_32,
    height: 32,
    paddingLeft: 15,
    justifyContent: "flex-end",
    bottom: 6,
  },
  text_title_menu: {
    fontWeight: "500",
    fontSize: settingApp.size_12,
    color: settingApp.colorText,
    textTransform: "uppercase",
  },
  icon_menu: {
    width: COVER_ICON_MENU_SIZE,
    height: COVER_ICON_MENU_SIZE,
    justifyContent: "center",
    alignItems: "center",
    // ...settingApp.shadow,
    backgroundColor: "#E8EAED",
    borderRadius: COVER_ICON_MENU_SIZE / 2,
  },
  text_title_icon: {
    fontSize: settingApp.txt_12,
    color: settingApp.colorTextPrimary,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 8,
  },
  view_icon: {
    width: settingApp.width_32 / 3,
    height: settingApp.width_32 / 3 - 20,
    alignItems: "center",
    paddingTop: 10,
  },
});
