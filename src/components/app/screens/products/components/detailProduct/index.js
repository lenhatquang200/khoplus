import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Icon, colorApp, lang, settingApp } from "public";
import { HeaderName } from "public/component";
import { ApiCall } from "KhoPlus";
import { screenName } from "router/screenName";

import InforProduct from "./component/inforProduct";
import ListInvent from "./component/listInvent";

export default function DetailProduct(props) {
    const dispatch = useDispatch()
    const dataUpdate = useSelector((state) => state?.app?.updateItemProduct);

    const [data, setData] = useState(props?.route?.params?.item);
    const [listInvent, setListInvent] = useState(data?.inventory_number || [])

    useEffect(() => {
        if (data?._id) {
            getDetailData(data?._id);
        }
    }, []);

    useEffect(() => {
        if (dataUpdate?._id && data?._id && (dataUpdate?._id === data?._id)) {
            setData(dataUpdate)
            setListInvent(dataUpdate?.inventory_number)
        }
    }, [dataUpdate])

    async function getDetailData(id) {
        const result = await ApiCall.getDetailData(id);
        if (result?.data?._id) {
            if (result?.data?.inventory_number?.length != 0) {
                setListInvent(result?.data?.inventory_number)
            }
            setData(result?.data);
        }
    }

    function _onUpdate() {
        if (data?._id) {
            props?.navigation?.navigate(screenName.UPLOAD_PRODUCTS, { item: data });
        }
    }

    let _title = data?.name || lang?.product;
    return (
        <View style={styles.main}>
            <HeaderName title={_title} goBack={() => props?.navigation.pop()} />

            <ScrollView>
                <InforProduct data={data} _onUpdate={_onUpdate} />

                {listInvent?.length != 0 ?
                    <ListInvent listInvent={listInvent} units={data?.unit?.name} />
                    :
                    <View style={styles.view_empty}>
                        <Icon.icon_Info size={40} color={colorApp.black_opacity_05} />
                        <Text style={styles.txt_empty}>{lang.emptyProduct}</Text>
                    </View>
                }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    view_empty: {
        width: settingApp.width,
        height: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    txt_empty: {
        color: colorApp.black_opacity_05,
        fontWeight: "600",
        fontSize: 20,
        marginTop: 8
    }
});
