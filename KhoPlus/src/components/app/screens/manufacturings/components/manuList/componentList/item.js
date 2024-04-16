import React, { memo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { colorApp, lang, settingApp } from "../../../../../../../public";

const { width } = settingApp;
const WIDTH_CONTENT = width - 100;
const Item = memo((props) => {
  const { obj } = props || {};
  const { item } = obj || {};

  const [dataItem, setDataItem] = useState(item);

  useEffect(() => {
    if (item) {
      setDataItem(item);
    }
  }, [item]);

  return (
    <View style={styles.container}>
      <View style={styles.view_item}>
        <View style={styles.view_content}>
          <Text style={styles.txt_name}>
            {dataItem?.name || lang.emptyText}
          </Text>

          <Text style={styles.txt_code}>
            {dataItem?.code || lang.emptyText}
          </Text>

          <Text style={styles.txt_groupName}>
            {dataItem?.manufacturing_group?.name || lang.emptyText}
          </Text>

          <View style={styles.view_phone}>
            <Text style={styles.txt_phone}>{dataItem?.phone}</Text>
          </View>
        </View>

        <View style={styles.view_Action}>
          <TouchableOpacity
            onPress={() => Linking.canOpenURL(`tel:${dataItem?.phone}`)}
            style={styles.bt_edit}
          >
            <Text style={styles.txt_call}>{lang.callPhone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() => onDelete(dataItem)}
            style={styles.bt_delete}
          >
            <Text style={styles.txt_delete}>{lang.delete}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />
    </View>
  );
});

export default Item;
const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    minHeight: 100,
  },
  view_item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  view_content: {
    width: WIDTH_CONTENT,
    height: 80,
    paddingTop: 8,
  },
  line: {
    width: width,
    height: 8,
    backgroundColor: colorApp.black_opacity_01,
  },
  view_Action: {
    width: 60,
    height: 100,
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingTop: 8,
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
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: colorApp.green_opacity_01,
  },
  txt_delete: {
    fontSize: settingApp.size_14,
    fontWeight: "500",
    color: colorApp.red,
  },
  txt_call: {
    fontSize: settingApp.size_14,
    fontWeight: "500",
    color: colorApp.green_002,
  },
  txt_code: {
    fontSize: settingApp.size_14,
    color: colorApp.colorPlaceText,
  },
  txt_name: {
    fontSize: settingApp.size_22,
    color: colorApp.colorText,
    fontWeight: "600",
    marginBottom: 16,
  },
  txt_groupName: {
    fontSize: settingApp.size_14,
    color: colorApp.green_001,
  },
  view_phone: {
    position: "absolute",
    right: 0,
    top: 15,
  },
  txt_phone: {
    fontSize: settingApp.size_14,
    color: colorApp.colorPlaceText,
  },
});
