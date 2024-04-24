import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { colorApp, lang, settingApp } from "public";
import { HeaderName } from "public/component";

export default function ModalSearch(props) {
  const { listData = [], dataField = {}, onUpdateGroup } = props || {};
  let titleHaeder = lang.group;
  return (
    <Modal visible={props?.isVisible} transparent={true} animationType="slide">
      <HeaderName goBack={() => props?.onClose()} title={titleHaeder} />
      <View style={styles.container}>
        <View style={styles.line} />
        <ScrollView>
          {listData?.length != 0 &&
            listData.map((item, index) => {
              let isCheck = item?.id === dataField?.id;
              return (
                <View style={styles.view_bt} key={index}>
                  <TouchableOpacity
                    onPress={() => onUpdateGroup(item)}
                    style={[
                      styles.bt_item,
                      {
                        backgroundColor: isCheck
                          ? colorApp?.green_opacity_03
                          : colorApp.white,
                      },
                    ]}
                  >
                    <Text style={styles.txt_item}>{item?.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    height: settingApp.height,
    backgroundColor: colorApp.white,
  },
  view_bt: {
    backgroundColor: colorApp.white,
    width: settingApp.width,
    minHeight: 60,
    justifyContent: "center",
  },
  bt_item: {
    backgroundColor: colorApp.white,
    width: settingApp.width,
    minHeight: 60,
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  txt_item: {
    fontSize: settingApp.size_18,
    color: colorApp.black,
    fontWeight: "600",
  },
  line: {
    width: settingApp.width,
    height: 8,
    backgroundColor: colorApp.black_opacity_01,
  },
});
