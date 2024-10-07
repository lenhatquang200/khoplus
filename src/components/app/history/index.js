import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStorageKey } from 'KhoPlus/api/khoplusApi';
import { keyStore, settingApp } from 'public';
import { LoadingInContent, SafeEra } from 'public/component';
import React, { useEffect, useState } from 'react';
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
    if(response){
      let dataJson = JSON.parse(response);
      if(dataJson?.auth?.access_token){
        setTokent(dataJson?.auth?.access_token)
      }
    }
    else{}
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ?
        <LoadingInContent />
        :
        <SafeEra>
          <WebView
            source={{
              uri: 'https://khoplus.mienphi.pro/example/money-list', // URL của trang web bạn muốn hiển thị
              headers: {
                Authorization: `Bearer ${token}`, // Truyền token vào header
              },
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={`(function() {
                var header = document.getElementsByTagName('header')[0];
                if (header) {
                  header.style.display = 'none';
                }
              })();`}
          />
        </SafeEra>
      }
    </>

  );
};

export default MyWebView;
