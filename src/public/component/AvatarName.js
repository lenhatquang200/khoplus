import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import settingApp from "../settingApp";

export default function AvatarCustom({ size, name = "", picture = "" }) {
  let avatar = (name) => {
    let fontSize = size - 24;
    fontSize = fontSize;
    if (name && name.length > 0) {
      const arr_color = ["#536DFE", "#5AC8FA", "#FFCC00", "#22C993", "#666AD1"];
      let listName = name.trim().split(" ");
      let shortName = "";
      listName.map((e) => {
        shortName = shortName + e[0];
      });
      shortName = shortName.substr(-2);
      let bgColor = "";
      const charCodeShortName = shortName.charCodeAt(0);
      switch (true) {
        case charCodeShortName >= 65 &&
          charCodeShortName < 70 &&
          arr_color[0] !== undefined:
          bgColor = arr_color[0];
          break;
        case charCodeShortName >= 70 &&
          charCodeShortName < 75 &&
          arr_color[1] !== undefined:
          bgColor = arr_color[1];
          break;
        case charCodeShortName >= 75 &&
          charCodeShortName < 80 &&
          arr_color[2] !== undefined:
          bgColor = arr_color[2];
          break;
        case charCodeShortName >= 80 &&
          charCodeShortName < 85 &&
          arr_color[3] !== undefined:
          bgColor = arr_color[3];
          break;
        case charCodeShortName >= 85 &&
          charCodeShortName <= 90 &&
          arr_color[4] !== undefined:
          bgColor = arr_color[4];
          break;
        default:
          bgColor = arr_color[0] !== undefined ? arr_color[0] : bgColor;
          break;
      }
      return (avatar = (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: bgColor,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize, fontWeight: "500" }}>
            {shortName}
          </Text>
        </View>
      ));
    } else {
      return <View />;
    }
  };

  let avatarPicture = (picture) => {
    if (picture && picture.length > 0) {
      return (avatar = (
        <Image
          source={{ uri: picture }}
          style={{ flex: 1 }}
          resizeMode="center"
        />
      ));
    } else {
      return <View />;
    }
  };

  let v = size;
  const responsive = (v) => {
    if (settingApp.isTablet) {
      return v ? v + settingApp.scale(5) : settingApp.scale(75);
    } else {
      return v ? v + 5 : 75;
    }
  };
  const avatar_ = avatar(name);
  const avatarPicture_ = avatarPicture(picture);
  // v =  v ? (v + 5) : 75;
  v = responsive(v);
  return (
    <View style={{}}>
      <View
        style={{
          width: v,
          height: v,
          borderRadius: v / 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderWidth: 2,
          borderColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            width: v,
            height: v,
            borderRadius: v / 2,
            overflow: "hidden",
          }}
        >
          <View
            style={[
              { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
            ]}
          >
            {avatar_}
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {avatarPicture_}
          </View>
        </View>
      </View>
    </View>
  );
}
