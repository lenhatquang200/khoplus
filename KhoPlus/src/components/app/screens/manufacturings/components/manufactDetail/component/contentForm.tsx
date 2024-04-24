import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, Linking, TextInput } from 'react-native'
import styles from '../styles';
import { colorApp, lang } from 'public';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { debounce } from "lodash";

import { AsyncImage } from 'public/component';
import { TYPE_INPUT } from '../common';
import ModalSearch from './modalSearch';

interface Iprops {
    dataItem: any,
    isEdit: boolean,
    listGroupManu: Array<[]>,
    setNewData: Function;
}

const ContentForm = React.forwardRef((props: Iprops, ref: any) => {
    const [isEdit, setEdit] = useState(props?.isEdit)
    const [dataItem, setDataItem] = useState(props?.dataItem)
    let onChangeCallback = debounce(_onChangeText, 500);
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (props?.dataItem) {
            setDataItem(props?.dataItem)
        }

        setEdit(props?.isEdit)
    }, [props])

    React.useImperativeHandle(ref, () => ({ refNe }));
    function refNe() {
        props?.setNewData(dataItem)
    }


    function _onChangeText(val: string, type: number) {
        if (type === TYPE_INPUT.NAME) {
            setDataItem({
                ...dataItem, name: val
            })
        }
        else if (type === TYPE_INPUT.PHONE) {
            setDataItem({
                ...dataItem, phone: val
            })
        }
        else if (type === TYPE_INPUT.ADDRESS) {
            setDataItem({
                ...dataItem, address: val
            })
        }
        else if (type === TYPE_INPUT.BANK_NAME) {
            setDataItem({
                ...dataItem, bank_name: val
            })
        }
        else if (type === TYPE_INPUT.BANN_NUMBER) {
            setDataItem({
                ...dataItem, account_number: val
            })
        }
        else if (type === TYPE_INPUT.NOTE) {
            setDataItem({
                ...dataItem, note: val
            })
        }
    }

    function onUpdateGroup(data: any) {
        if (dataItem?.id !== data?.id) {
            setDataItem({
                ...dataItem,
                manufacturing_group: data,
                manufacturing_group_id: data?.id
            })
        }

        setIsVisible(false)
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(dataItem?.account_number);
    };

    function inputValue(defaultValue: string, placeholder: string, type: number, styles?: Object) {
        return (
            <TextInput
                editable={isEdit}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChangeText={(val) => onChangeCallback(val, type)}
                style={styles}
            />
        )
    }

    return (
        <View>
            {dataItem?.url && (
                <View style={styles.imageManu}>
                    <AsyncImage size={100} />
                </View>
            )}

            {inputValue(dataItem?.name, lang.manufacturings, TYPE_INPUT.NAME, styles.name_group)}

            <View style={styles.viewPhone}>
                {inputValue(dataItem?.phone, lang.emptyText, TYPE_INPUT.PHONE, styles.txt_phone)}

                <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${dataItem?.phone}`)}
                    style={styles.bt_edit}
                >
                    <Text style={styles.txt_call}>{lang.callPhone}</Text>
                </TouchableOpacity>
            </View>

            {/* Nhóm */}
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                disabled={!isEdit}
                style={styles.styles_line_view}>
                <Text style={styles.title_group}>{lang.group + ":"}</Text>
                <Text style={styles.name_group}>{dataItem?.manufacturing_group?.name || lang.emptyText}</Text>
            </TouchableOpacity>

            {/* địa chỉ */}
            <View style={styles.styles_line_view}>
                <Text style={styles.title_group}>{lang.address + ":"}</Text>
                {inputValue(dataItem?.address, lang.address, TYPE_INPUT.ADDRESS, styles.name_group)}

            </View>

            {/* Thông tin ngân hàng */}
            <View style={styles.styles_line_view}>
                <Text style={styles.title_group}>{lang.bankName + ":"}</Text>
                {inputValue(dataItem?.bank_name, lang.emptyText, TYPE_INPUT.BANK_NAME, styles.name_group)}

                <Text style={[styles.account_number, { marginTop: 8 }]}>{lang.bankNumber + ":"}</Text>
                {inputValue(dataItem?.account_number, lang.emptyText, TYPE_INPUT.BANN_NUMBER, styles.account_number)}

                <TouchableOpacity
                    onPress={copyToClipboard}
                    style={styles.bt_copy}
                >
                    <MaterialCommunityIcons name="content-copy" size={22} color={colorApp.colorPlaceText} />
                </TouchableOpacity>
            </View>

            {/* Ghie chú */}
            <View style={styles.styles_line_view}>
                <Text style={styles.title_group}>{lang.node + ":"}</Text>
                {inputValue(dataItem?.note, lang.emptyText, TYPE_INPUT.NOTE, styles.txt_lable)}
            </View>

            {/* Thời gian tạo */}
            <View style={styles.styles_line_view}>
                <Text style={styles.title_group}>{lang.timeCreate + ":"}</Text>
                <Text style={styles.txt_lable}>{dataItem?.formatted_created_at || lang.emptyText}</Text>
            </View>

            <ModalSearch
                onClose={() => setIsVisible(false)}
                isVisible={isVisible}
                listData={props?.listGroupManu}
                dataField={dataItem?.manufacturing_group}
                onUpdateGroup={onUpdateGroup}
            />
        </View>
    )
})

export default ContentForm;