import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colorApp, settingApp } from "../../../../public";

import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function HeaderHome(props) {
  const { colleague } = props || {};
  const [tilteHello, setTitle] = useState("");
  const [shortName, setShortName] = useState("");

  useEffect(() => {
    const title_time = sayHi();
    setTitle(title_time);
    if (colleague) {
      getTitle();
    }
    
  }, []);

  function getTitle() {
    const title_time = sayHi();
    let name = colleague?.name?.split(" ");
    setTitle(title_time);
    setShortName(name[name?.length - 1]);
  }

  function sayHi() {
    let d = new Date();
    let n = d.getHours();
    let newTitle = "";
    switch (true) {
      case 0 <= n && n < 12:
        newTitle = "Chào buổi sáng";
        break;
      case 12 <= n && n < 18:
        newTitle = "Chào buổi chiều";
        break;
      default:
        newTitle = "Chào buổi tối";
        break;
    }
    return newTitle;
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_hello}>
      {/* <View style={[styles.bt_option, {
        marginRight:12
      }]}>
        <AntDesign 
          name="user"
          color={colorApp.black}
          size={24}
        />
      </View> */}
        <Text style={styles.txt_hello}>
          <Text>{tilteHello + ", "}</Text>
          <Text>{shortName || "Kho Plus"}</Text>
        </Text>
      </View>

      <View style={styles.view_option}>
        <TouchableOpacity style={styles.bt_option}>
          <Ionicons
            name="notifications-outline"
            color={colorApp.black}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    height: 60,
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
  },
  txt_hello: {
    fontSize: settingApp.size_16,
    color: colorApp.black,
    fontWeight:"600"
  },
  view_option: {
    width: 120,
    height: 60,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    right: -16,
    flexDirection: "row",
  },
  bt_option: {
    width: 40,
    height: 40,
    borderRadius:20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:colorApp.white_snow
  },
  view_hello: {
    height: 60,
    width: settingApp.width_32,
    justifyContent: "flex-start",
    flexDirection:'row',
    alignItems:'center',
  },
});
