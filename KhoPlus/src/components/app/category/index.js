import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, FlatList } from "react-native";
import styles from "./styles";
import { configMenu } from "./components/configMenu";
import { Loading } from "../../../public/component";
import { settingApp } from "../../../public";

function Category(props) {
  const ref_flatlist_content = useRef(null);

  const [listMenu, setListMenu] = useState([]);

  useEffect(() => {
    async function getList() {
      const _list = await configMenu();
      setListMenu(_list);
    }
    getList();
  }, []);

  function renderMenuApp() {
    return (
      <Animated.FlatList
        ref={ref_flatlist_content}
        style={styles.listContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Loading />}
        ListHeaderComponent={
          <View style={{ width: settingApp.width, height: 40 }} />
        }
        data={listMenu}
      ></Animated.FlatList>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderMenuApp()}
    </View>
  );
}
export default Category;
