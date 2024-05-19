import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { ToastShow, Utils, colorApp, lang, settingApp } from "public";
import { HeaderName, Loading } from "public/component";
import { ApiCall } from "KhoPlus";
import ModalSearch from "./component/modalSearch";
import Constanst from "./component/constans";
import actions from "state/actions";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SPACE_TOP = 32;
let typeModal = null;
let dataField = null;
export default function UploadProducts(props) {
  const { route = {} } = props;
  const dispatch = useDispatch();

  const [dataItem, setDataItem] = useState(route?.params?.item);
  const [isLoading, setIsloading] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [activeBt, setActive] = useState(false);

  useEffect(() => {
    console.log("dataItem", dataItem);
    if (dataItem?._id) {
      setActive(true);
    } else {
      setActive(false);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    validateCreate();
  }, [dataItem]);

  function goBack() {
    props?.navigation.pop();
  }

  function onChangeText(value) {
    if (value.trim().length > 0) {
      setDataItem({ ...dataItem, name: value });
    } else {
      if (!dataItem?.id) {
        setDataItem({ ...dataItem, name: value });
      }
    }
  }

  function onChangePCS(value) {
    setDataItem({ ...dataItem, pcs: value });
  }

  function onChangePriceCost(value) {
    setDataItem({ ...dataItem, price_cost: value });
  }

  function validateCreate() {
    if (
      dataItem?.name?.trim().length > 0 &&
      dataItem?.unit?._id &&
      dataItem?.type?._id &&
      dataItem?.group?._id &&
      dataItem?.pcs &&
      dataItem?.price_cost
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  function _onPress(type) {
    if (type == Constanst.UNIT) {
      dataField = dataItem?.unit;
      typeModal = Constanst.UNIT;
      setIsVisible(true);
    } else if (type == Constanst.TYPE) {
      dataField = dataItem?.type;
      typeModal = Constanst.TYPE;
      setIsVisible(true);
    } else if (type == Constanst.GROUP) {
      dataField = dataItem?.group;
      typeModal = Constanst.GROUP;
      setIsVisible(true);
    }
  }

  function onUpdateField(itemUpdate, type) {
    if (type == Constanst.UNIT) {
      setDataItem({ ...dataItem, unit: itemUpdate });
    } else if (type == Constanst.TYPE) {
      setDataItem({ ...dataItem, type: itemUpdate });
    } else if (type == Constanst.GROUP) {
      setDataItem({ ...dataItem, group: itemUpdate });
    }
    setIsVisible(false);
    typeModal = null;
    listData = [];
    dataField = null;
  }

  function checkCreateUpdate() {
    if (dataItem?._id) {
      onUpdateData();
    } else {
      onCreate();
    }
  }

  async function onUpdateData() {
    const { group, unit, type } = dataItem;
    setIsloading(true);
    let dataUpdate = {
      name: dataItem?.name,
      code: dataItem?.code,
      group: {
        _id: group?._id,
        name: group?.name,
      },
      type: {
        _id: type?._id,
        name: type?.name,
      },
      unit: {
        _id: unit?._id,
        name: unit?.name,
      },
    };
    const result = await ApiCall.updateOneProductsGroup(
      dataItem?._id,
      dataUpdate
    );
    if (result?.data) {
      dispatch(actions.updateItemProduct({ ...dataItem, ...result?.data }));
      let toast = `${lang.update} ${lang.succees}`;
      ToastShow(toast);
      setTimeout(() => {
        goBack();
      }, 300);
    } else {
      let toast = `${lang.update} ${lang.failed}`;
      ToastShow(toast);
    }
    setIsloading(false);
  }

  async function onCreate() {
    setIsloading(true);
    const { group, unit, type } = dataItem;
    let dataUpdate = {
      name: dataItem?.name,
      code: new Date().getTime(),
      group: {
        _id: group?._id,
        name: group?.name,
      },
      type: {
        _id: type?._id,
        name: type?.name,
      },
      unit: {
        _id: unit?._id,
        name: unit?.name,
      },
      pcs: dataItem?.pcs,
      price_cost: dataItem?.price_cost,
    };
    const result = await ApiCall.createProducts(dataUpdate);
    console.log("result", result);
    if (result?.data?._id) {
      let toast = `${lang.create} ${lang.succees}`;
      dispatch(actions?.updateItemProduct(result?.data));
      ToastShow(toast);
      setTimeout(() => {
        goBack();
      }, 300);
    } else {
      let toast = `${lang.create} ${lang.failed}`;
      ToastShow(toast);
    }
    setIsloading(false);
  }

  function renderLine_Input(type, title, placeholder) {
    return (
      <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
        <Text>
          <Text style={styles.txt_title}>{title}</Text>
          <Text style={styles.is_require}>{" *"}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => _onPress(type)}
          style={styles.view_input}
        >
          <Text style={styles.textField}>{placeholder || lang?.emptyText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let title = dataItem?._id ? "Cập nhật hàng hóa" : "Tạo hàng hóa";
  let _pcs = dataItem?.pcs ? dataItem?.pcs + "" : "";
  let _price_cost = dataItem?.price_cost ? dataItem?.price_cost + "" : "";
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <HeaderName goBack={goBack} title={title} />

      <KeyboardAwareScrollView>
        <ScrollView
          keyboardDismissMode="on-drag"
          scrollEnabled
          style={{
            width: settingApp.width,
            padding: 16,
          }}
        >
          {/* nName */}
          <View style={styles.view_field}>
            <Text>
              <Text style={styles.txt_title}>{"Tên"}</Text>
              <Text style={styles.is_require}>{" *"}</Text>
            </Text>
            <View style={styles.view_input}>
              <TextInput
                value={dataItem?.name || ""}
                style={styles.textField}
                placeholder="Tên hàng hóa..."
                onChangeText={(value) => onChangeText(value)}
              />
            </View>
          </View>

          {/* đơn vị tính */}
          {renderLine_Input(Constanst.TYPE, lang.type, dataItem?.type?.name)}

          {/* loại */}
          {renderLine_Input(Constanst.UNIT, lang.unit, dataItem?.unit?.name)}

          {/* nhóm */}
          {renderLine_Input(Constanst.GROUP, lang.group, dataItem?.group?.name)}

          {/* đơn vị tính */}
          {/* nName */}
          <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
            <Text>
              <Text style={styles.txt_title}>{lang.specifications}</Text>
              <Text style={styles.is_require}>{" *"}</Text>
            </Text>

            <View style={styles.view_input}>
              <TextInput
                value={_pcs}
                style={styles.textField}
                placeholder="Quy cách hàng hóa..."
                onChangeText={(value) => onChangePCS(value)}
                keyboardType="numeric"
                inputMode="numeric"
              />
            </View>
          </View>

          {/* đơn vị tính */}
          {/* nName */}
          <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
            <Text>
              <Text style={styles.txt_title}>{lang.priceCost}</Text>
              <Text style={styles.is_require}>{" *"}</Text>
            </Text>

            <View style={styles.view_input}>
              <TextInput
                value={_price_cost}
                style={styles.textField}
                placeholder="Giá vốn hàng hóa..."
                onChangeText={(value) => onChangePriceCost(value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      {/* button update */}
      {!isLoading && (
        <View style={styles.view_bt_update}>
          <TouchableOpacity
            disabled={!activeBt}
            onPress={() => checkCreateUpdate()}
            style={[
              styles.bt_update,
              {
                opacity: activeBt ? 1 : 0.5,
              },
            ]}
          >
            <Text style={styles.txt_update}>
              {dataItem?.id ? lang.update : lang.save}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalSearch
        isVisible={isVisible}
        type={typeModal}
        onClose={() => setIsVisible(false)}
        onUpdateField={onUpdateField}
        dataField={dataField}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    height: settingApp.height,
    backgroundColor: colorApp.white,
  },
  view_field: {
    width: settingApp.width_32,
    minHeight: 60,
    justifyContent: "center",
  },
  txt_title: {
    fontSize: 18,
    color: colorApp.colorText,
    marginBottom: 8,
  },
  view_input: {
    width: settingApp.width_32,
    height: 40,
    justifyContent: "center",
    backgroundColor: colorApp.green_opacity_01,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textField: {
    fontSize: settingApp.size_18,
    color: colorApp.black,
  },
  view_bt_update: {
    width: settingApp.width,
    height: 60,
    backgroundColor: "transparent",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    bottom: Platform.OS == "android" ? 102 : 32,
  },
  bt_update: {
    width: settingApp.width * 0.6,
    height: 44,
    backgroundColor: colorApp.blue_primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_update: {
    fontSize: 20,
    color: colorApp.white,
    fontWeight: "bold",
  },
  is_require: {
    color: colorApp.red,
    fontSize: 16,
  },
});
