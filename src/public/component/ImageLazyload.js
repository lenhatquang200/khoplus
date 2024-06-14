import settingApp from "public/settingApp";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";

export default function ImageLazyload({ url, style, resizeMode }) {
  resizeMode = resizeMode || "contain";
  const [isLoadEnd, setLoadEnd] = useState(false);
  const [thumbnailAnimated, setThumbnailAnimated] = useState(
    new Animated.Value(0)
  );
  const [imageAnimated, setImageAnimated] = useState(new Animated.Value(0));

  //let thumbnailAnimated = new Animated.Value(0);
  // let imageAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => setLoadEnd(true));
  };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  function ProgressiveImage(source, style, resizeMode) {
    return (
      <View style={styles.containerProgressiveImage}>
        <Image source={source} style={style} resizeMode={resizeMode} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isLoadEnd && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color={settingApp.colorDisable} />
        </View>
      )}
      <Animated.Image
        source={{
          uri: url,
        }}
        style={[style, { opacity: thumbnailAnimated }]}
        resizeMode={resizeMode}
        onLoad={handleThumbnailLoad}
        onLoadEnd={() => handleThumbnailLoad()}
        blurRadius={1}
      />
      <Animated.Image
        source={{
          uri: url,
        }}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        resizeMode={resizeMode}
        onLoad={onImageLoad}
      />
      {/* {ProgressiveImage(url, style, resizeMode)} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  containerProgressiveImage: {
    backgroundColor: "red",
  },
});
