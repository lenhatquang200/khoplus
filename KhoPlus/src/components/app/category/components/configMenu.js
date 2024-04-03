import React from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colorApp, lang, settingApp } from "../../../../public";

const colorIcon = colorApp.green_primary;
const sizeIcon = settingApp.scale(24);
export async function configMenu() {
  const list_Menu = [
    {
      keyObj: "product",
      title: lang.product,
      groupId: 28,
      data: [
        {
          icon: (
            <FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />
          ),
          keyApp: "product_menu",
          title: lang.list,
          router: "",
        },
        {
          icon: <FontAwesome name="tags" size={sizeIcon} color={colorIcon} />,
          keyApp: "product_type",
          title: lang.type,
          router: "",
        },
        {
          icon: (
            <FontAwesome name="sitemap" size={sizeIcon} color={colorIcon} />
          ),
          keyApp: "product_group",
          title: lang.group,
          router: "",
        },
        {
          icon: <FontAwesome name="money" size={sizeIcon} color={colorIcon} />,
          keyApp: "product_unit",
          title: lang.unit,
          router: "",
        },
      ],
    },

    {
      keyObj: "manufacturings",
      title: lang.manufacturings,
      groupId: 28,
      data: [
        {
          icon: (
            <FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />
          ),
          keyApp: "manufacturings_menu",
          title: lang.list,
          router: "",
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="home-group"
              size={sizeIcon}
              color={colorIcon}
            />
          ),
          keyApp: "manufacturings_group",
          title: lang.manufacturings_group,
          router: "",
        },
      ],
    },

    {
      keyObj: "customer",
      title: lang.customer,
      groupId: 28,
      data: [
        {
          icon: (
            <FontAwesome name="th-list" size={sizeIcon} color={colorIcon} />
          ),
          keyApp: "customer_list",
          title: lang.list,
          router: "",
        },
        {
          icon: <FontAwesome name="users" size={sizeIcon} color={colorIcon} />,
          keyApp: "customer_group",
          title: lang.group,
          router: "",
        },
        {
          icon: (
            <FontAwesome name="pagelines" size={sizeIcon} color={colorIcon} />
          ),
          keyApp: "customer_plant",
          title: lang.plant,
          router: "",
        },
      ],
    },

    {
      keyObj: "Nhập kho",
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
          keyApp: "customer_list",
          title: lang.importFrom_Manufact,
          router: "",
        },
      ],
    },
  ];

  return list_Menu;
}
