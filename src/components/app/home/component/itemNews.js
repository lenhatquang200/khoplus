import React, { Component, memo, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon, colorApp, settingApp } from "public";
import { ImageLazyload } from "public/component";

const sizeImg = settingApp.width_32;
const sizeButtonReact = sizeImg / 3;
const sizeIconReact = 24;

const ItemNews = (props) => {
  const { item } = props;
  const [isLikeNew, setIslike] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.view_image}>
        <ImageLazyload
          url={item?.image}
          resizeMode={"stretch"}
          style={styles.view_image}
        />
      </View>

      <Text numberOfLines={2} style={styles.txt_content}>
        {item?.content || "--"}
      </Text>

      <View style={styles.view_reaction}>
        <TouchableOpacity style={styles.button_React}>
          <Icon.icon_HeartOutline size={sizeIconReact} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_React}>
          <Icon.icon_Comment size={sizeIconReact} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_React}>
          <Icon.icon_Share size={sizeIconReact} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ItemNews);

const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    minHeight: 120,
    backgroundColor: colorApp.white,
    marginBottom: 8,
    marginLeft: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  txt_content: {
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  view_image: {
    width: settingApp.width_32,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  view_reaction: {
    width: sizeImg,
    height: 44,
    flexDirection: "row",
    marginTop: 16,
  },
  button_React: {
    width: sizeButtonReact,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  view_image: {
    width: sizeImg,
    height: sizeImg / 2,
  },
});
