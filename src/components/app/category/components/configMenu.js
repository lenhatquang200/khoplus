import React from "react";
import { useSelector } from "react-redux";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colorApp, lang, settingApp } from "../../../../public";
import { screenName } from "../../../../router/screenName";
import { CATEGORY_CONSTANT } from "./constans";

const colorIcon = colorApp.blue_primary;
const sizeIcon = settingApp.scale(24);

export async function configMenu(colleague) {
  let listConfig = [];
  const user_role = colleague?.role;
  const list_Menu = [
    {
      keyObj: CATEGORY_CONSTANT.OBJ_PRODUCT,
      title: lang.product,
      data: [
        {
          icon: (
            <FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />
          ),
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
      data: [
        {
          icon: (
            <FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_MANU_LIST,
          title: lang.list,
          router: screenName.MANU_LIST,
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="home-group"
              size={sizeIcon}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_MANU_GROUP,
          title: lang.manufacturings_group,
          router: screenName.MANU_GROUP,
        },
      ],
    },

    {
      keyObj: CATEGORY_CONSTANT.OBJ_CUSTOMER,
      title: lang.customer,
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

    {
      keyObj: CATEGORY_CONSTANT.OBJ_EXPORT_IMPORT,
      title: lang.exportStore,
      data: [
        {
          icon: (
            <MaterialCommunityIcons
              name="home-minus"
              size={30}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_EXPORT,
          title: "Xuất",
          router: "",
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="home-plus"
              size={30}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_IMPORT,
          title: lang.importStore,
          router: "",
        },
      ],
    },

    {
      keyObj: CATEGORY_CONSTANT.OBJ_COLLECT_SPEND,
      title: lang.collect_spend,
      data: [
        {
          icon: (
            <MaterialCommunityIcons
              name="cash-plus"
              size={30}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_COLLECT,
          title: lang.collect,
          router: "",
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="cash-minus"
              size={30}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_SPEND,
          title: lang.spend,
          router: "",
        },
        {
          icon: <FontAwesome name="tags" size={sizeIcon} color={colorIcon} />,
          keyApp: CATEGORY_CONSTANT.KEY_SPEND,
          title: lang.type,
          router: "",
        },
      ],
    },

    {
      keyObj: CATEGORY_CONSTANT.OBJ_STORE,
      title: lang.store,
      data: [
        {
          icon: (
            <MaterialCommunityIcons
              name="warehouse"
              size={sizeIcon}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_STORE_ITEM,
          title: lang.list,
          router: "",
        },
      ],
    },

    {
      keyObj: CATEGORY_CONSTANT.OBJ_STAFF,
      title: lang.staff,
      data: [
        {
          icon: (
            <MaterialCommunityIcons
              name="account-group"
              size={sizeIcon}
              color={colorIcon}
            />
          ),
          keyApp: CATEGORY_CONSTANT.KEY_STAFF_ITEM,
          title: lang.list,
          router: "",
        },
      ],
    },
  ];
  if (user_role?.links?.length != 0) {
    list_Menu.forEach((item) => {
      if (item?.keyObj !== CATEGORY_CONSTANT.DASHBOARD) {
        const menuByKey = user_role?.links?.filter(
          (n) => n.key === item?.keyObj
        );
        if (menuByKey?.length != 0) {
          let dataByKey = menuByKey[0];
          let newObj = {
            ...item,
            data: menuSub,
            key_onClick: "123",
          };
          let menuSub = item?.data?.filter((n) =>
            dataByKey?.sub?.filter((m) => m.key == n?.keyApp)
          );
          if (menuSub?.length != 0) {
            newObj.data = menuSub;
          }
          listConfig.push(newObj);
        }
      }
    });
  }
  return listConfig;
}
