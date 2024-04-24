import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    Linking,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { HeaderName, Loading, } from "public/component";
import { Icon, ToastShow, colorApp, lang, settingApp } from "public";

import { Iprops } from "./common";
import styles from "./styles";
import ContentForm from "./component/contentForm";
import ButtonOptionEdit from "./component/buttonOptionEdit";
import ButtonUpdate from "./component/buttonUpdate";
import { ApiCall } from "KhoPlus";

export default function ManufactDetail(props: Iprops) {
    const contentRef = useRef<any>()
    const { navigation, route } = props;
    const { params } = route || {};

    const [isLoading, setIsLoading] = useState(false)
    const [dataItem, setDataItem] = useState(params?.item);
    const [isEdit, setEdit] = useState(false);
    const [listGroupManu, setListGroupManu] = useState([])

    useEffect(() => {
        console.log("dataItem", dataItem);
        if (params?.item) {
            setDataItem(params?.item);
        }
        loadListGroup()
    }, []);

    async function loadListGroup() {
        const results = await ApiCall.getManufacturingGroup()
        if (results?.data?.length != 0) {
            setListGroupManu(results?.data)
        }
    }

    function getNewDataUpdate() {
        setIsLoading(true)
        contentRef?.current?.refNe()
    }

    async function setNewData(newVal: any) {
        const { code, name, address, note, account_number, bank_name, manufacturing_group_id, phone, id } = newVal
        let body = {
            code: code,
            name: name,
            phone: phone,
            address: address,
            note: note,
            account_number: account_number,
            bank_name: bank_name,
            manufacturing_group_id: manufacturing_group_id,
        }
        const result = await ApiCall.updateManufacturing(id, body)
        if (result && result.data) {
            setDataItem(result.data)
            ToastShow(result?.message)
        }
        else {
            ToastShow(result?.message)
        }
        setEdit(false)
        setIsLoading(false)
    }

    return (
        <View style={styles.container}>
            {isLoading && <Loading />}
            <HeaderName
                title={lang?.manufacturings}
                goBack={() => navigation?.goBack()}
            />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ContentForm
                        ref={contentRef}
                        dataItem={dataItem}
                        isEdit={isEdit}
                        listGroupManu={listGroupManu}
                        setNewData={setNewData}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            {!isEdit ? <ButtonOptionEdit onEdit={() => setEdit(true)} onDelete={() => setEdit(false)} />
                :
                <ButtonUpdate
                    onCancel={() => setEdit(false)}
                    updateManufact={getNewDataUpdate}
                />
            }
        </View>
    );
}

