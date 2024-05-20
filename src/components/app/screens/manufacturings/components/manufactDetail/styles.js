
import { StyleSheet, Platform } from "react-native"
import { settingApp, colorApp } from "public";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorApp.white,
    },
    scrollView: {
        paddingLeft: settingApp.space_16,
        paddingRight: settingApp.space_16,
    },
    imageManu: {
        width: 120,
        height: 120,
    },
    txt_name: {
        fontSize: settingApp.size_20,
        fontWeight: "600",
        color: colorApp.colorText,
    },
    viewPhone: {
        width: settingApp.width_32,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    txt_phone: {
        fontSize: settingApp.size_16,
        width: settingApp.width_32 - 80
    },
    bt_edit: {
        width: 60,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: colorApp.green_opacity_01,
    },
    txt_call: {
        fontSize: settingApp.size_14,
        fontWeight: "500",
        color: colorApp.green_005,
    },
    title_group: {
        fontSize: settingApp.size_16,
        color: colorApp.colorPlaceText,
    },
    name_group: {
        fontSize: settingApp.size_18,
        color: colorApp.colorText,
        fontWeight: "600"
    },
    styles_line_view: {
        width: settingApp.width_32,
        minHeight: 40,
        marginTop: 16
    },
    account_number: {
        fontSize: settingApp.size_16,
        color: colorApp.colorText,
    },
    bt_copy: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    txt_lable: {
        fontSize: 18,
        color: colorApp.colorText
    },
    view_bottom_button: {
        width: settingApp.width,
        height: 60,
        bottom: Platform.OS === "ios" ? 25 : 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16
    },
    bt_update: {
        width: (settingApp.width_32 / 2) - 10,
        height: 44,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    txt_button: {
        fontSize: 20,
        fontWeight: "600",
    }
});

export default styles;
