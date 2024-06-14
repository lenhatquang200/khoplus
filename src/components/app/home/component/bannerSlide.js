import { colorApp, settingApp } from "public";
import { ImageLazyload } from "public/component";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const list = [
  {
    img: "https://img.freepik.com/free-vector/hand-drawn-agriculture-company-sale-banner_23-2149696779.jpg?w=2000&t=st=1718352886~exp=1718353486~hmac=f10eb538c99690fa9d37cc2d7158a19d25910cb06b6de34b424441d150a75227",
  },
  {
    img: "https://img.freepik.com/free-vector/flat-design-farming-lifestyle-webinar_23-2150222157.jpg?w=2000&t=st=1718353520~exp=1718354120~hmac=0088120683f02ba2b37b6a1a37aab8d96e701ec608889a0a58eceb36f6db07d1",
  },
  {
    img: "https://img.freepik.com/free-vector/social-media-cover-template-agriculture-farming-organic-food_23-2150196784.jpg?w=2000&t=st=1718353539~exp=1718354139~hmac=7cae380ebe4be77200a05670524ed59d8aa0cdc8e8baf6b1257d64eccaad53a2",
  },
  {
    img: "https://img.freepik.com/free-vector/gradient-farmer-s-day-horizontal-banner-template_23-2149833578.jpg?w=2000&t=st=1718353561~exp=1718354161~hmac=1dcc4dc3b54584f803acc1f56c900fecfb1b77c5cae49c1a84e1a498dd800570",
  },
];

const BannerSlide = () => {
  const width = settingApp.width;
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={list}
        scrollAnimationDuration={2000}
        //onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: settingApp.width,
              height: 200,
            }}
          >
            <ImageLazyload
              url={item.img}
              style={{
                width: settingApp.width_32,
                height: 190,
                borderRadius: 8,
              }}
              resizeMode={"cover"}
            />
          </View>
        )}
      />
    </View>
  );
};
export default React.memo(BannerSlide);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.transparent,
    width: settingApp.width,
    height: 200,
    marginBottom: 16,
    marginTop: 8,
  },
});
