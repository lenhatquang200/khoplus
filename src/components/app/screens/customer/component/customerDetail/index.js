import { colorApp } from "public";
import { Loading } from "public/component";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CustomerDetail(props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Text>{"asdasdasd"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorApp.white,
  },
});
