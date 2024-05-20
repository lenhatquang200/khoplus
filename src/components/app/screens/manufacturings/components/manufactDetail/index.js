import React, { useState, useEffect, useRef } from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderName, Loading, } from "public/component";
import { ToastShow, Utils, lang, } from "public";
import styles from "./styles";
import ContentForm from "./component/contentForm";
import ButtonOptionEdit from "./component/buttonOptionEdit";
import ButtonUpdate from "./component/buttonUpdate";
import { ApiCall } from "KhoPlus";
import actions from "state/actions";


export default function ManufactDetail(props) {
    const dispatch = useDispatch()
    const contentRef = useRef()
    const { navigation, route } = props;
    const { params } = route || {};

    const [isLoading, setIsLoading] = useState(false)
    const [dataItem, setDataItem] = useState(params?.item);
    const [isEdit, setEdit] = useState(false);
    const [listGroupManu, setListGroupManu] = useState([])

    useEffect(() => {
        if (params?.item?.id) {
            setDataItem(params?.item);
        }
        else {
            setEdit(true)
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
        contentRef?.current?.updateNewData()
    }

    function validateData(newVal) {
        if (newVal?.name && newVal?.phone && newVal?.address && newVal?.manufacturing_group_id) {
            if (newVal?.phone) {
                const isPhoneNumber = Utils.isPhoneNumber(newVal?.phone)
                if (!isPhoneNumber) {
                    alertWrongFrom(lang.wrongInfo, lang.wrongNumberPhone)
                    setIsLoading(false)
                }
                else {
                    setNewData(newVal)
                }
            }
        }
        else {
            alertWrongFrom()
            setIsLoading(false)
        }
    }

    function alertWrongFrom(title = lang.missingInfo, message = lang.messInfoRequire) {
        Alert.alert(title, message, [
            {
                text: lang.close,
                onPress: () => null,
                style: "cancel",
            },
        ])
    }

    async function setNewData(newVal) {
        const result = await checkApi(newVal)
        if (result && result.data) {
            dispatch(actions.updateItemManuFact({ ...result?.data, isDelete: false }))
            setDataItem(result.data)
            ToastShow(result?.message)
        }
        else {
            ToastShow(result?.message)
        }
        setEdit(false)
        setIsLoading(false)
    }

    async function onDelete() {
        const result = await ApiCall.deleteManufacturing(dataItem?.id)
        if (result?.success) {
            dispatch(actions.updateItemManuFact({ ...dataItem, isDelete: true }))
            ToastShow(result?.message)
            props?.navigation?.pop()
        }
        else {
            ToastShow(`${lang.delete} ${lang.failed}`)
        }
    }

    async function checkApi(newVal) {
        let result = null
        const { code, name, address, note, account_number, bank_name, manufacturing_group_id, phone, id } = newVal
        let body = {
            code: code + "",
            name: name,
            phone: phone,
            address: address,
            note: note,
            account_number: account_number,
            bank_name: bank_name,
            manufacturing_group_id: manufacturing_group_id,
        }
        if (newVal?.id) {
            result = await ApiCall.updateManufacturing(id, body)
        }
        else {
            result = await ApiCall.cretaeManufacturing(body)
        }
        return result
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
                <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"}
                >
                    <ContentForm
                        ref={contentRef}
                        dataItem={dataItem}
                        isEdit={isEdit}
                        listGroupManu={listGroupManu}
                        setNewData={validateData}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            {!isEdit ? <ButtonOptionEdit onEdit={() => setEdit(true)} onDelete={onDelete} />
                :
                !isLoading && <ButtonUpdate
                    onCancel={() => setEdit(false)}
                    updateManufact={getNewDataUpdate}
                    isData={dataItem?._id}
                />
            }
        </View>
    );
}

