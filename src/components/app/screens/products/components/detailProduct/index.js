import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { colorApp, lang } from 'public';
import { HeaderName } from 'public/component';
import { ApiCall } from 'KhoPlus';

export default function DetailProduct(props) {
    const [data, setData] = useState(props?.route?.params?.item)

    useEffect(() => {
        if (data?._id) {
            getDetailData(data?._id)
        }
    }, [])

    async function getDetailData(id) {
        const result = await ApiCall.getDetailData(id)
        if (result?.data?._id) {
            setData(result?.data)
        }
    }

    let _title = data?.name || lang?.product
    return (
        <View style={styles.main}>
            <HeaderName title={_title} goBack={() => props?.navigation.pop()} />

        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
    }
})