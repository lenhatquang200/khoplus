import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';

function HomeScreen(props){
    
    useEffect(() =>{
        const { route } = props
        if(route?.name == "HomeScreen"){
            const backAction = () => {
                Alert.alert( 'Thông báo', 'Bạn có chắc chắn muốn thoát khỏi ứng dụng ?', [
                  {
                    text: 'Hủy',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {text: 'Thoát', onPress: () => BackHandler.exitApp()},
                ]);
                return true;
              };
          
            const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
            );
            return () => backHandler.remove();
        }
    },[])

    return (
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Text>HomeScreen</Text>

        </View>
    )

}
export default HomeScreen;