import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput
} from "react-native";
import { colorApp, lang, settingApp } from "public";
import { HeaderName } from "public/component";

export default function ModalUpdate(props) {
    const titleHaeder = props?.dataItem?.name || lang.manufacturings_group

    return (
        <Modal visible={props?.isVisible} transparent={false} animationType="slide">
            <HeaderName goBack={() => props?.onClose()} title={titleHaeder} />
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        height: settingApp.height,
        backgroundColor: colorApp.white,
    },

});
