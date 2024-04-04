import React, { useState } from "react";
import { View, Text } from "react-native";
import { settingApp } from "../../../../public";

const list_Menu = [];

export default function Content(props) {
  const [list, setList] = useState(list_Menu);

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      {list_Menu.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              width: settingApp.width_32,
              height: 40,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {e.icon_blue}
            <Text>{e.title}</Text>
          </View>
        );
      })}
    </View>
  );
}
