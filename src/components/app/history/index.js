import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStorageKey } from 'KhoPlus/api/khoplusApi';
import { keyStore, settingApp } from 'public';
import { LoadingInContent, SafeEra } from 'public/component';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

const MyWebView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setTokent] = useState(null)

  useEffect(() => {
    getTokent()
  }, [])

  async function getTokent() {
    const response = await AsyncStorage.getItem(AuthStorageKey)
    if (response) {
      let dataJson = JSON.parse(response);
      if (dataJson?.auth?.access_token) {
        setTokent(dataJson?.auth?.access_token)
      }
    }
    else { }
    setIsLoading(false)
  }

  const injectedJS = `
  (function() {
    const token = localStorage.getItem('token');
    window.ReactNativeWebView.postMessage(token || 'No token found');
  })();
  true; 
`;


  const handleMessage = (event) => {
    const token = event.nativeEvent.data;
    if (token === 'No token found') {
      Alert.alert('Token not found in localStorage');
    } else {
      Alert.alert('Token found', `Token: ${token}`);
    }
  };


  return (
    <>
      {isLoading ?
        <LoadingInContent />
        :
        <SafeEra>
          <WebView
            source={{
              uri: `https://khoplus.mienphi.pro/example/money-list?/${token}`, // URL của trang web bạn muốn hiển thị
              headers: {
                Authorization: `Bearer ${token}`, // Truyền token vào header
              },
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={injectedJS}
          //onMessage={handleMessage}
          // injectedJavaScript={`(function() {
          //     var header = document.getElementsByTagName('header')[0];
          //     if (header) {
          //       header.style.display = 'none';
          //     }
          //   })();`}
          />
        </SafeEra>
      }
    </>

  );
};

export default MyWebView;
