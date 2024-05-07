import React from "react";
import {
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { colorApp, lang, settingApp } from "../../../../public";
import { screenName } from "../../../../router/screenName";
import { CATEGORY_CONSTANT } from "./constans";
const colorIcon = colorApp.green_primary;
const sizeIcon = settingApp.scale(24);
export async function configMenu() {
    const list_Menu = [
        {
            keyObj: CATEGORY_CONSTANT.OBJ_PRODUCT,
            title: lang.product,
            groupId: 28,
            data: [
                {
                    icon: (<FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />),
                    keyApp: CATEGORY_CONSTANT.KEY_PRODUCT_LIST,
                    title: lang.list,
                    router: screenName.PRODUCTS_LIST,
                },
                {
                    icon: <FontAwesome name="tags" size={sizeIcon} color={colorIcon} />,
                    keyApp: CATEGORY_CONSTANT.KEY_PRODUCT_TYPE,
                    title: lang.type,
                    router: screenName.PRODUCTS_TYPE,
                },
                {
                    icon: (
                        <FontAwesome name="sitemap" size={sizeIcon} color={colorIcon} />
                    ),
                    keyApp: CATEGORY_CONSTANT.KEY_PRODUCT_GROUP,
                    title: lang.group,
                    router: screenName.PRODUCTS_GROUP,
                },
                {
                    icon: <FontAwesome name="money" size={sizeIcon} color={colorIcon} />,
                    keyApp: CATEGORY_CONSTANT.KEY_PRODUCT_UNIT,
                    title: lang.unit,
                    router: screenName.PRODUCTS_UNIT,
                },
            ],
        },

        {
            keyObj: CATEGORY_CONSTANT.OBJ_MANU,
            title: lang.manufacturings,
            groupId: 28,
            data: [
                {
                    icon: (<FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />),
                    keyApp: CATEGORY_CONSTANT.KEY_MANU_LIST,
                    title: lang.list,
                    router: screenName.MANU_LIST,
                },
                {
                    icon: (<MaterialCommunityIcons name="home-group" size={sizeIcon} color={colorIcon} />),
                    keyApp: CATEGORY_CONSTANT.KEY_MANU_GROUP,
                    title: lang.manufacturings_group,
                    router: screenName.MANU_GROUP,
                },
            ],
        },

        {
            keyObj: CATEGORY_CONSTANT.OBJ_CUSTOMER,
            title: lang.customer,
            groupId: 28,
            data: [
                {
                    icon: (
                        <FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />
                    ),
                    keyApp: CATEGORY_CONSTANT.KEY_CUSTOMER_LIST,
                    title: lang.list,
                    router: screenName.CUSTOMER_LIST,
                },
                {
                    icon: <FontAwesome name="users" size={sizeIcon} color={colorIcon} />,
                    keyApp: CATEGORY_CONSTANT.KEY_CUSTOMER_GROUP,
                    title: lang.group,
                    router: screenName.CUSTOMER_GROUP,
                },
                {
                    icon: (
                        <FontAwesome name="pagelines" size={sizeIcon} color={colorIcon} />
                    ),
                    keyApp: CATEGORY_CONSTANT.KEY_CUSTOMER_PLANT,
                    title: lang.plant,
                    router: screenName.CUSTOMER_PLANT,
                },
            ],
        },

        {
            keyObj: CATEGORY_CONSTANT.OBJ_IMPORT_STORE,
            title: lang.importStore,
            groupId: 28,
            data: [
                {
                    icon: (
                        <MaterialIcons
                            name="add-home-work"
                            size={sizeIcon}
                            color={colorIcon}
                        />
                    ),
                    keyApp: CATEGORY_CONSTANT.KEY_IMPORT_STORE_FOMR_MANU,
                    title: lang.importFrom_Manufact,
                    router: "",
                },
            ],
        },
        // tessssss

        {
            keyObj: CATEGORY_CONSTANT.OBJ_EXPORT_STORE,
            title: lang.exportStore,
            groupId: 28,
            data: [
                {
                    icon: (
                        <MaterialCommunityIcons
                            name="account-cash-outline"
                            size={sizeIcon}
                            color={colorIcon}
                        />
                    ),
                    keyApp: CATEGORY_CONSTANT.KEY_EXPORT_FOR_CUSTOMER,
                    title: lang.exportForCustomer,
                    router: "",
                },
            ],
        },
    ];

    return list_Menu;
}
