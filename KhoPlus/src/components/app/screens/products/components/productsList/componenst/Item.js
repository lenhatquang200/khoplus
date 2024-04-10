import React, { useEffect, useState, useRef, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import {
  colorApp,
  settingApp,
  Component,
  lang,
} from "../../../../../../../public";

const { height, width_32 } = settingApp;
const WIDTH_IMGE = 80;
const WIDTH_CONTENT = width_32 - 80 - 60; // 80 là rộng của imgae, 60 là rộng của button

const Item = memo((props) => {
  const { obj, onDelete } = props || {};
  const { item, index } = obj || {};

  const [dataItem, setDataItem] = useState(null);

  useEffect(() => {
    if (item?.id) {
      setDataItem(item);
    }
  }, []);

  const { unit = {}, type = {}, group = {} } = dataItem || {};
  return (
    <View style={styles.container}>
      <View style={styles.view_image}>
        <View style={styles.cover_image}>
          <Component.AsyncImage source={{ uri: dataItem?.image_url }} />
        </View>
        <Text style={styles.txt_dvt}>
          {"Đvt: "}
          <Text style={{ fontSize: settingApp.size_14, color: colorApp.red }}>
            {unit?.name || lang.emptyText}
          </Text>
        </Text>
      </View>

      <View style={styles.view_content}>
        <Text style={styles.txt_code}>{dataItem?.code || lang.emptyText}</Text>
        <Text style={styles.txt_name}>{dataItem?.name || lang.emptyText}</Text>

        <Text style={styles.txt_type}>
          <Text>{type?.name || lang.emptyText}</Text>
          <Text>{" - "}</Text>
          <Text>{group?.name || lang.emptyText}</Text>
        </Text>

        <Text style={styles.txt_type}>
          {dataItem?.formatted_created_at || lang.emptyText}
        </Text>
      </View>
    </View>
  );
});
export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.white,
    width: settingApp.width_32,
    minHeight: 120,
    marginBottom: settingApp.space_8,
    borderRadius: settingApp.space_8,
    ...settingApp.shadow_Item,
    flexDirection: "row",
    padding: settingApp.space_8,
  },
  view_image: {
    width: 80,
    height: 110,
    overflow: "hidden",
  },
  cover_image: {
    width: 80,
    height: 80,
    overflow: "hidden",
    borderRadius: settingApp.space_8,
  },
  view_content: {
    width: WIDTH_CONTENT,
    minHeight: 110,
    paddingLeft: settingApp.space_6,
  },
  txt_code: {
    fontSize: settingApp.size_14,
    color: colorApp.green_001,
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
});
