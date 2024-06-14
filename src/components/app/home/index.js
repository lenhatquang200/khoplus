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

const listNews = [
  { id: 1, data: "1234567890sdfghjklxcvbnm," },
  { id: 2, data: "1234567890sdfghjklxcvbnm," },
  { id: 3, data: "1234567890sdfghjklxcvbnm," },
  { id: 4, data: "1234567890sdfghjklxcvbnm," },
  { id: 5, data: "1234567890sdfghjklxcvbnm," },
  { id: 6, data: "1234567890sdfghjklxcvbnm," },
];

function HomeScreen(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);
  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    createListNews();
  }, []);

  function createListNews() {
    let listTest = [];
    for (let index = 0; index < 100; index++) {
      let txtContent = generateRandomText(3, 5);
      let newObj = {
        id: index + 1,
        content: txtContent,
        image: `https://picsum.photos/200/300${index}`,
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
        renderItem={({ item, index }) => <ItemNews item={item} />}
        ListHeaderComponent={() => viewTopList()}
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
