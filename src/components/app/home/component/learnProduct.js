import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { colorApp, settingApp } from "public";
import { ImageLazyload } from "public/component";

const list = [
  {
    img: "https://img.freepik.com/free-photo/fantastic-scene-orange-tree_23-2147609789.jpg?t=st=1718356225~exp=1718359825~hmac=af427b78740e71fa951a620d223a4d37450b3a3a807297584cb3dfee6934d253&w=1480",
    dest: "Các loại bệnh trên cây cam vào mùa mưa",
    count: "97",
  },
  {
    img: "https://img.freepik.com/premium-photo/woman-plant-vegetables_36074-790.jpg?w=1480",
    dest: "Phòng bệnh trên cây ăn trái trong mùa mưa và cách bón phân hiệu quả nhất.",
    count: "679",
  },
  {
    img: "https://img.freepik.com/premium-photo/seasonal-durian-is-being-sold-traders-export-china_25129-576.jpg?w=1480",
    dest: "Phân bón kích rễ cho cây sâu riêng và liều lượng bón hợp lý vào mùa mưa.",
    count: "1242",
  },
  {
    img: "https://img.freepik.com/free-photo/autumn-fruits-hanging-tree-branch-garden_114579-29955.jpg?t=st=1718356369~exp=1718359969~hmac=ddc6a7f9323796b5df026eeb8aaa2b66fe9b3c69ff15c6213fac715fd5bc5210&w=1480",
    dest: "Nên làm gì khi cây bị rụng trái và vàng lá.",
    count: "9872",
  },
];

const widthContent = settingApp.width * 0.6;

const LearnProduct = () => {
  function renderItem(item, index) {
    return (
      <View style={styles.view_item}>
        <Image
          source={{ uri: item.img }}
          style={{
            width: widthContent,
            height: 200,
          }}
          resizeMode={"cover"}
        />
        <Text numberOfLines={3} style={styles.txt_dest}>
          {item?.dest}
        </Text>

        <Text style={styles.txt_count_view}>
          <Text>{item?.count}</Text>
          <Text>{` lượt xem`}</Text>
        </Text>
      </View>
    );
  }

  function readMore() {
    return (
      <TouchableOpacity style={styles.button_readmore}>
        <Text style={styles.txt_readmore}>{"Xem tất cả"}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt_title}>{"Học sản phẩm"}</Text>
      {readMore()}
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={list}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item, index }) => renderItem(item, index)}
        ListHeaderComponent={() => <View style={{ width: 8 }} />}
      />
    </View>
  );
};
export default LearnProduct;
const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    minHeight: 120,
    backgroundColor: colorApp.white_opacity_02,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  view_item: {
    width: settingApp.width * 0.6,
    height: 300,
    backgroundColor: colorApp.white,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
    ...settingApp.shadow_Item,
  },
  txt_title: {
    fontSize: 16,
    color: colorApp.white,
    fontWeight: "800",
    marginLeft: 16,
    marginBottom: 8,
  },
  txt_dest: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    width: widthContent - 16,
    paddingLeft: 8,
  },
  txt_count_view: {
    fontSize: 14,
    color: colorApp.colorPlaceText,
    position: "absolute",
    bottom: 6,
    left: 6,
  },
  button_readmore: {
    width: 120,
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    top: 8,
    right: 16,
  },
  txt_readmore: {
    fontSize: 16,
    color: colorApp.white,
  },
});
