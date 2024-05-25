import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Text, TouchableOpacity, Linking, TextInput } from "react-native";
import styles from "../styles";
import { CONSTANTS_APP, colorApp, lang } from "public";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { debounce } from "lodash";

import { AsyncImage } from "public/component";
import { TYPE_INPUT } from "../common";
import ModalSearch from "./modalSearch";

let typeModal = null;
const ContentForm = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({ updateNewData }));

  const [isEdit, setEdit] = useState(props?.isEdit);
  const [dataItem, setDataItem] = useState(props?.dataItem);
  let onChangeCallback = debounce(_onChangeText, 500);
  const [isVisible, setIsVisible] = useState(false);
  const [listDataModal, setListDataModal] = useState([]);

  useEffect(() => {
    if (props?.dataItem) {
      setDataItem(props?.dataItem);
    }

    setEdit(props?.isEdit);
  }, [props]);

  function updateNewData() {
    if (dataItem?.code) {
      props?.setNewData(dataItem);
    } else {
      props?.setNewData({
        ...dataItem,
        code: new Date().getTime(),
      });
    }
  }

  function _onChangeText(val, type) {
    if (dataItem?._id) {
      if (type === TYPE_INPUT.NAME) {
        setDataItem({
          ...dataItem,
          name: val,
        });
      } else if (type === TYPE_INPUT.PHONE) {
        setDataItem({
          ...dataItem,
          phone: val,
        });
      } else if (type === TYPE_INPUT.ADDRESS) {
        setDataItem({
          ...dataItem,
          address: val,
        });
      } else if (type === TYPE_INPUT.BANK_NAME) {
        setDataItem({
          ...dataItem,
          bank_name: val,
        });
      } else if (type === TYPE_INPUT.BANN_NUMBER) {
        setDataItem({
          ...dataItem,
          account_number: val,
        });
      } else if (type === TYPE_INPUT.NOTE) {
        setDataItem({
          ...dataItem,
          note: val,
        });
      }
    } else {
      let newData = dataItem ? { ...dataItem } : {};
      if (type === TYPE_INPUT.NAME) {
        newData.name = val;
      } else if (type === TYPE_INPUT.PHONE) {
        newData.phone = val;
      } else if (type === TYPE_INPUT.ADDRESS) {
        newData.address = val;
      } else if (type === TYPE_INPUT.BANK_NAME) {
        newData.bank_name = val;
      } else if (type === TYPE_INPUT.BANN_NUMBER) {
        newData.account_number = val;
      } else if (type === TYPE_INPUT.NOTE) {
        newData.node = val;
      }
      setDataItem(newData);
    }
  }

  function _obPressModal(type) {
    if (type == TYPE_INPUT.BANK_NAME) {
      setListDataModal(CONSTANTS_APP.LIST_BANK_NAME);
    } else if (type == TYPE_INPUT.GROUP) {
      setListDataModal(props?.listGroupManu);
    }
    typeModal = type;
    setIsVisible(true);
  }

  function onUpdateGroup(data) {
    if (typeModal == TYPE_INPUT.GROUP) {
      setDataItem({
        ...dataItem,
        manufacturing_group: data,
        manufacturing_group_id: data?._id,
      });
    } else if (typeModal == TYPE_INPUT.BANK_NAME) {
      setDataItem({
        ...dataItem,
        bank_name: data?.name,
      });
    }
    typeModal = null;
    setIsVisible(false);
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(dataItem?.account_number);
  };

  function inputValue(defaultValue, type, styles) {
    if (dataItem?._id) {
      return (
        <TextInput
          editable={isEdit}
          defaultValue={defaultValue}
          placeholder={lang.emptyText}
          onChangeText={(val) => onChangeCallback(val, type)}
          style={[
            styles,
            {
              padding: 5,
              borderBottomColor: colorApp.white,
              marginTop: 8,
              backgroundColor: colorApp.border_color,
              borderRadius: 6,
            },
          ]}
          scrollEnabled={false}
        />
      );
    } else {
      return (
        <TextInput
          editable={isEdit}
          defaultValue={defaultValue}
          placeholder={lang.emptyText}
          onChangeText={(val) => onChangeCallback(val, type)}
          style={[
            styles,
            {
              padding: 5,
              marginTop: 8,
              backgroundColor: colorApp.border_color,
              borderRadius: 6,
            },
          ]}
          scrollEnabled={false}
        />
      );
    }
  }

  return (
    <View>
      {dataItem?.url && (
        <View style={styles.imageManu}>
          <AsyncImage size={100} />
        </View>
      )}
      <Text style={[styles.title_group, { marginTop: 16 }]}>
        <Text>{"Tên nhà cung cấp :"}</Text>
        <Text style={{ color: colorApp.red }}>{" *"}</Text>
      </Text>
      {inputValue(dataItem?.name, TYPE_INPUT.NAME, styles.name_group)}

      <Text style={[styles.title_group, { marginTop: 16 }]}>
        <Text>{"Sdt:"}</Text>
        <Text style={{ color: colorApp.red }}>{" *"}</Text>
      </Text>
      <View style={styles.viewPhone}>
        {inputValue(dataItem?.phone, TYPE_INPUT.PHONE, styles.txt_phone)}

        {dataItem?._id && dataItem?.phone && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${dataItem?.phone}`)}
            style={styles.bt_edit}
          >
            <Text style={styles.txt_call}>{lang.callPhone}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Nhóm */}
      <TouchableOpacity
        onPress={() => _obPressModal(TYPE_INPUT.GROUP)}
        disabled={!isEdit}
        style={styles.styles_line_view}
      >
        <Text style={styles.title_group}>
          <Text>{lang.group + ":"}</Text>
          <Text style={{ color: colorApp.red }}>{" *"}</Text>
        </Text>
        <Text style={styles.name_group}>
          {dataItem?.manufacturing_group?.name || lang?.emptyText}
        </Text>
      </TouchableOpacity>

      {/* địa chỉ */}
      <View style={styles.styles_line_view}>
        <Text style={styles.title_group}>
          <Text>{lang.address + ":"}</Text>
          <Text style={{ color: colorApp.red }}>{" *"}</Text>
        </Text>

        {inputValue(dataItem?.address, TYPE_INPUT.ADDRESS, styles.name_group)}
      </View>

      {/* Thông tin ngân hàng */}
      <View style={styles.styles_line_view}>
        <TouchableOpacity
          onPress={() => _obPressModal(TYPE_INPUT.BANK_NAME)}
          disabled={!isEdit}
          style={styles.styles_line_view}
        >
          <Text style={styles.title_group}>{lang.bankName + ":"}</Text>
          <Text style={styles.name_group}>
            {dataItem?.bank_name || lang?.emptyText}
          </Text>
        </TouchableOpacity>

        {/* {inputValue(dataItem?.bank_name, TYPE_INPUT.BANK_NAME, styles.name_group)} */}

        <Text style={[styles.account_number, { marginTop: 8 }]}>
          {lang.bankNumber + ":"}
        </Text>
        {inputValue(
          dataItem?.account_number,
          TYPE_INPUT.BANN_NUMBER,
          styles.account_number
        )}

        {dataItem?._id && dataItem?.account_number && (
          <TouchableOpacity onPress={copyToClipboard} style={styles.bt_copy}>
            <MaterialCommunityIcons
              name="content-copy"
              size={22}
              color={colorApp.colorPlaceText}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Ghie chú */}
      <View style={styles.styles_line_view}>
        <Text style={styles.title_group}>{lang.node + ":"}</Text>
        {inputValue(dataItem?.note, TYPE_INPUT.NOTE, styles.txt_lable)}
      </View>

      {/* Thời gian tạo */}
      <View style={styles.styles_line_view}>
        <Text style={styles.title_group}>{lang.timeCreate + ":"}</Text>
        <Text style={styles.txt_lable}>
          {dataItem?.formatted_created_at || lang.emptyText}
        </Text>
      </View>

      <ModalSearch
        onClose={() => setIsVisible(false)}
        isVisible={isVisible}
        listData={listDataModal}
        dataField={dataItem?.manufacturing_group}
        onUpdateGroup={onUpdateGroup}
        typeModal={typeModal}
      />
    </View>
  );
});

export default ContentForm;
