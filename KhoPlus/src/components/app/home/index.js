import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, BackHandler, Alert } from "react-native";

function HomeScreen(props) {
  const colleague = useSelector((state) => state?.app?.colleague);

  useEffect(() => {
    console.log("colleague", colleague);
  }, [colleague]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HomeScreen</Text>
    </View>
  );
}
export default HomeScreen;
