import React from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { settingApp, colorApp } from "../../../../public";

export async function configMenu() {
  const list_Menu = [
    {
      keyObj: "product",
      title: "Hàng hóa",
      groupId: 28,
      data: [
        {
          icon: (
            <FontAwesome name="th-list" size={24} color={colorApp.colorText} />
          ),
          keyApp: "1",
          title: "Danh mục",
          router: "",
        },
        {
          icon: (
            <FontAwesome
              name="align-left"
              size={24}
              color={colorApp.colorText}
            />
          ),
          keyApp: "1",
          title: "Loại",
          router: "",
        },
        {
          icon: (
            <FontAwesome name="sitemap" size={24} color={colorApp.colorText} />
          ),
          keyApp: "1",
          title: "Nhóm",
          router: "",
        },
        {
          icon: (
            <FontAwesome name="money" size={24} color={colorApp.colorText} />
          ),
          keyApp: "1",
          title: "Đơn vị tính",
          router: "",
        },
      ],
    },

    {
      keyObj: "manufacturings",
      title: "Nhà cung cấp",
      groupId: 28,
      data: [
        {
          icon: (
            <FontAwesome name="list" size={24} color={colorApp.colorText} />
          ),
          keyApp: "1",
          title: "Danh mục",
          router: "",
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="home-group"
              size={24}
              color={colorApp.colorText}
            />
          ),
          keyApp: "1",
          title: "Nhóm nhà cung cấp",
          router: "",
        },
      ],
    },
  ];

  return list_Menu;
}
