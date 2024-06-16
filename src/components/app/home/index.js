import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { Component, colorApp, imageApp, settingApp } from "../../../public";
import HeaderHome from "./component/headerHome";
import MenuTop from "./component/menuTop";
import ItemNews from "./component/itemNews";
import BannerSlide from "./component/bannerSlide";
import LearnProduct from "./component/learnProduct";

const listNewsTest = [
  {
    id: 1,
    url: "https://img.freepik.com/free-vector/gradient-rural-landscape-background_52683-126758.jpg?t=st=1718515486~exp=1718519086~hmac=0c0c955db8061fce789413a0a6b6df362a9f6274203640ef83b7d0c7d0094a92&w=1800",
  },
  {
    id: 2,
    url: "https://img.freepik.com/premium-photo/beautiful-tea-garden-rows-scene-isolated-with-blue-sky-cloud-design-concept-tea-product-background-copy-space-aerial-view_315337-2937.jpg?w=826",
  },
  {
    id: 3,
    url: "https://img.freepik.com/free-photo/countryside-worker-planting-out-field_23-2148761816.jpg?t=st=1718515547~exp=1718519147~hmac=642a2db26cf3818119de3c6e96774a0509cab563d1ce8e9fc10b90df3626cf44&w=1800",
  },
  {
    id: 4,
    url: "https://img.freepik.com/free-photo/hand-holding-flowering-seedling-garden_23-2147844317.jpg?t=st=1718515588~exp=1718519188~hmac=02df2beb248bf8c35a9479d6cde02e998337346dae4825703d0c15a2ceeb0b90&w=900",
  },
  {
    id: 5,
    url: "https://img.freepik.com/premium-photo/gardener-fertilizing-plants-with-npk-fertilizer_123211-4304.jpg?w=1800",
  },
  {
    id: 6,
    url: "https://img.freepik.com/free-psd/instagram-stories-template-with-save-planet_23-2148413537.jpg?t=st=1718515620~exp=1718519220~hmac=b7ad3fab0bf9152f8127693e179f537d79e84079b830cf6ea87b2756ce6459c1&w=1800",
  },
];

function HomeScreen(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);
  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    createListNews();
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function createListNews() {
    let listTest = [];
    for (let index = 0; index < 100; index++) {
      let txtContent = generateRandomText(3, 5);
      let numberRamdom = getRandomInt(6);
      let newObj = {
        id: index + 1,
        content: txtContent,
        image: listNewsTest[numberRamdom]?.url,
      };
      listTest.push(newObj);
    }
    setListNews(listTest);
  }

  function generateRandomText(numParagraphs, numSentencesPerParagraph) {
    const words = [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
      "sed",
      "do",
      "eiusmod",
      "tempor",
      "incididunt",
      "ut",
      "labore",
      "et",
      "dolore",
      "magna",
      "aliqua",
    ];
    const paragraphs = [];

    for (let p = 0; p < numParagraphs; p++) {
      const sentences = [];

      for (let i = 0; i < numSentencesPerParagraph; i++) {
        const numWords = Math.floor(Math.random() * 10) + 5;
        const sentenceWords = [];

        for (let j = 0; j < numWords; j++) {
          const randomIndex = Math.floor(Math.random() * words.length);
          sentenceWords.push(words[randomIndex]);
        }

        const sentence = sentenceWords.join(" ") + ".";
        sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
      }

      paragraphs.push(sentences.join(" "));
    }

    return paragraphs.join("\n\n");
  }

  function viewTopList() {
    return (
      <View>
        <MenuTop />
        <BannerSlide />
        <LearnProduct />
      </View>
    );
  }

  ItemSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={styles.statusBar} />}
      <Component.LinearBackGround />
      <HeaderHome colleague={colleague} />

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={listNews}
        keyExtractor={(item, index) => `${item?.id}`}
        renderItem={({ item, index }) => <ItemNews item={item} index={index} />}
        ListHeaderComponent={() => viewTopList()}
        numColumns={2}
        horizontal={false}
      />
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    width: settingApp.width,
    height: settingApp.statusBarHeight,
  },
});
