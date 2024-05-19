import React, { useEffect, useState, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colorApp, settingApp, Component, lang, Icon } from "public";

const { height, width } = settingApp;
const WIDTH_IMGE = 80;
const WIDTH_CONTENT = width - 80 - 80; // 80 là rộng của imgae, 60 là rộng của button

const Item = memo((props) => {
  const { obj, onDelete, onUpdateItem } = props || {};

  const [dataItem, setDataItem] = useState(null);

  useEffect(() => {
    const { obj } = props || {};
    const { item, index } = obj || {};
    if (item?._id) {
      setDataItem(item);
    }
  }, [props?.obj]);

  const { unit = {}, type = {}, group = {} } = dataItem || {};
  return (
    <TouchableOpacity
      onPress={() => onUpdateItem(dataItem)}
      style={styles.container}
    >
      <View style={styles.view_image}>
        <View style={styles.cover_image}>
          <Component.AsyncImage source={{ uri: dataItem?.image_url }} />
        </View>
        <View style={styles.view_unit}>
          <Icon.icon_Unit />
          <Text style={styles.text_unit}>{unit?.name || lang.emptyText}</Text>
        </View>
      </View>

      <View style={styles.view_content}>
        <Text style={styles.txt_code}>{dataItem?.code || lang.emptyText}</Text>
        <Text style={styles.txt_name}>{dataItem?.name || lang.emptyText}</Text>

        <Text style={styles.txt_type}>
          <Text>{type?.name || lang.emptyText}</Text>
          <Text>{" - "}</Text>
          <Text>{group?.name || lang.emptyText}</Text>
        </Text>

        {/* <Text style={styles.txt_type}>
          {dataItem?.formatted_created_at || lang.emptyText}
        </Text> */}
      </View>

      <View style={styles.view_Action}>
        <View />

        <TouchableOpacity
          onPress={() => onDelete(dataItem)}
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
    width: settingApp.width,
    minHeight: 120,
    flexDirection: "row",
    padding: settingApp.space_8,
    borderBottomColor: colorApp.black_opacity_01,
    borderBottomWidth: 8,
  },
  view_image: {
    width: WIDTH_IMGE,
    minHeight: 110,
    overflow: "hidden",
  },
  cover_image: {
    width: 80,
    height: 80,
    overflow: "hidden",
    borderRadius: settingApp.space_8,
  },
  view_unit: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 30,
    width: 60,
  },
  view_content: {
    width: WIDTH_CONTENT,
    minHeight: 110,
    paddingLeft: settingApp.space_6,
  },
  txt_code: {
    fontSize: settingApp.size_14,
    color: colorApp.green_007,
  },
  txt_name: {
    fontSize: settingApp.size_18,
    color: colorApp.colorText,
    fontWeight: "600",
  },
  txt_dvt: {
    fontSize: settingApp.size_12,
    color: colorApp.colorText,
    fontWeight: "600",
    marginTop: 5,
    marginLeft: 5,
  },

  txt_type: {
    fontSize: settingApp.size_14,
    color: colorApp.colorText,
    marginTop: 8,
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
  text_unit: {
    fontSize: settingApp.size_14,
    color: colorApp.green_007,
    textTransform: "uppercase",
    marginLeft: 5,
    fontWeight: "800",
  },
  view_Action: {
    width: 70,
    height: 110,
    justifyContent: "space-between",
  },
});
