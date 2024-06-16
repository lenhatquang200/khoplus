import React, { Component, memo, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon, colorApp, settingApp } from "public";
import { ImageLazyload } from "public/component";

const sizeImg = settingApp.width_32 / 2;
const sizeButtonReact = sizeImg / 3;
const sizeIconReact = 24;

const ItemNews = (props) => {
  const { item, index } = props;
  const [isLikeNew, setIslike] = useState(false);

  const odd_numer = index % 2 !== 0;
  return (
    <View style={[styles.container]}>
      <ImageLazyload
        url={item?.image}
        resizeMode={"stretch"}
        style={styles.view_image}
      />

      <Text numberOfLines={2} style={styles.txt_content}>
        {item?.content || "--"}
      </Text>

      {/* <View style={styles.view_reaction}>
        <TouchableOpacity style={styles.button_React}>
          <Icon.icon_HeartOutline size={sizeIconReact} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_React}>
          <Icon.icon_Comment size={sizeIconReact} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_React}>
          <Icon.icon_Share size={sizeIconReact} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default memo(ItemNews);

const styles = StyleSheet.create({
  container: {
    width: (settingApp.width_32 - 16) / 2,
    minHeight: 120,
    backgroundColor: colorApp.white,
    marginBottom: 8,
    marginLeft: 16,
    borderRadius: 8,
    overflow: "hidden",
    ...settingApp.shadow,
  },
  txt_content: {
    marginTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
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
    height: 160,
  },
});
