import React, { memo, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  colorApp,
  settingApp,
  Component,
  lang,
  Icon,
} from "../../../../../../../public";

const { width_32, height } = settingApp;

const WIDTH_IMGE = 80;
const WIDTH_CONTENT = width_32 - 100;

const Item = memo((props) => {
  const [dataItem, setDataItem] = useState(props?.obj?.item);

  useEffect(() => {
    const { obj } = props;
    const { item, index } = obj || {};
    if (item?.id) {
      setDataItem(item);
    }
  }, [props]);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.txt_date}>
          {dataItem?.formatted_created_at || lang?.emptyText}
        </Text>
        <Text style={styles.txt_name}>{dataItem?.name || lang?.emptyText}</Text>
      </View>
      <View style={styles.view_Action}>
        <TouchableOpacity style={styles.bt_edit}>
          {/* <Icon.icon_Edit /> */}
        </TouchableOpacity>

        <TouchableOpacity
          //onPress={() => onDelete(dataItem)}
          style={styles.bt_delete}
        >
          <Text style={styles.txt_delete}>{lang.delete}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

export default Item;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.white,
    width: width_32,
    minHeight: 80,
    marginBottom: settingApp.space_8,
    borderRadius: settingApp.space_8,
    ...settingApp.shadow_Item,
    flexDirection: "row",
    padding: settingApp.space_8,
    justifyContent: "space-between",
  },
  content: {
    width: WIDTH_CONTENT,
    minHeight: 80,
    justifyContent: "flex-start",
  },
  txt_name: {
    fontSize: settingApp.size_18,
    color: colorApp.green_001,
    fontWeight: "bold",
  },
  txt_date: {
    fontSize: settingApp.size_14,
    color: colorApp.colorPlaceText,
  },
  txt_delete: {
    fontSize: settingApp.size_14,
    fontWeight: "500",
    color: colorApp.red,
  },
  txt_edit: {
    fontSize: settingApp.size_14,
    fontWeight: "500",
    color: colorApp.red,
  },
  view_Action: {
    width: 60,
    height: 80,
    justifyContent: "space-between",
  },
  bt_delete: {
    width: 60,
    height: 30,
    backgroundColor: colorApp.red_opacity_03,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  bt_edit: {
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 15,
  },
});
