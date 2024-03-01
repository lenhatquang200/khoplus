import { NavigationContainer } from '@react-navigation/native'
import React, { useRef } from 'react'
import { View, BackHandler, StatusBar } from 'react-native'
import AppStack from './router'

export default function AppComponent(){
    const navigationContainer = useRef(null)
    
    return(
        <View style={{ flex: 1}}>
            <StatusBar />

            <NavigationContainer ref={navigationContainer}>

                <AppStack/>
            </NavigationContainer>
        </View>
    )
}