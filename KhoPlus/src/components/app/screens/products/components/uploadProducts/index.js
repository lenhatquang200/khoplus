import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { ToastShow, colorApp, lang, settingApp } from "public";
import { HeaderName, Loading } from "public/component";
import { ApiCall } from "KhoPlus";
import ModalSearch from "./component/modalSearch";
import Constanst from "./component/constans";
import actions from "state/actions";

const SPACE_TOP = 32;
let typeModal = null;
let listData = [];
let dataField = null;
export default function UploadProducts(props) {
  const { route = {} } = props;
  const dispatch = useDispatch();

  const [dataItem, setDataItem] = useState(route?.params?.item);
  const [isLoading, setIsloading] = useState(true);

  const [listUnit, setListUnit] = useState([]);
  const [listType, setListType] = useState([]);
  const [listGroup, setListGroup] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [activeBt, setActive] = useState(false);

  useEffect(() => {
    if (dataItem?.id) {
      setActive(true);
    } else {
      setActive(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    validateCreate();
  }, [dataItem]);

  function goBack() {
    props?.navigation.pop();
  }

  async function fetchData() {
    const unit = await getListUnit();
    const type = await getListType();
    const group = await getListGroup();
    if (unit && type && group) {
      setIsloading(false);
    }
  }

  async function getListUnit() {
    const result = await ApiCall.getUnitProduct(null, 10);
    if (result?.data?.length != 0) {
      setListUnit(result?.data);
    }
    return true;
  }

  async function getListType() {
    const result = await ApiCall.getTypeProduct(null, 10);
    if (result?.data?.length != 0) {
      setListType(result?.data);
    }
    return true;
  }

  async function getListGroup() {
    const result = await ApiCall.getGroupProduct(null, 10);
    if (result?.data?.length != 0) {
      setListGroup(result?.data);
    }
    return true;
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

  function validateCreate() {
    if (
      dataItem?.name.trim().length > 0 &&
      dataItem?.unit?.id &&
      dataItem?.type?.id &&
      dataItem?.group?.id
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  function _onPress(type) {
    if (type == Constanst.UNIT) {
      dataField = dataItem?.unit;
      listData = listUnit;
      typeModal = Constanst.UNIT;
      setIsVisible(true);
    } else if (type == Constanst.TYPE) {
      dataField = dataItem?.type;
      listData = listType;
      typeModal = Constanst.TYPE;
      setIsVisible(true);
    } else if (type == Constanst.GROUP) {
      dataField = dataItem?.group;
      listData = listGroup;
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
    if (dataItem?.id) {
      onUpdateData();
    } else {
      onCreate();
    }
  }

  async function onUpdateData() {
    setIsloading(true);
    let dataUpdate = {
      name: dataItem?.name,
      type_id: dataItem?.type?.id,
      group_id: dataItem?.group?.id,
      code: dataItem?.code,
      unit_id: dataItem?.unit?.id,
    };
    const result = await ApiCall.updateOneProductsGroup(
      dataItem?.id,
      dataUpdate
    );
    if (result?.data) {
      dispatch(actions.updateItemProduct(result?.data));
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
    let dataUpdate = {
      name: dataItem?.name,
      type_id: dataItem?.type?.id,
      group_id: dataItem?.group?.id,
      code: dataItem?.code,
      unit_id: dataItem?.unit?.id,
      code: new Date().getTime(),
    };
    const result = await ApiCall.createProducts(dataUpdate);
    if (result?.data?.id) {
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

  let title = dataItem?.id ? "Cập nhật hàng hóa" : "Tạo hàng hóa";
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <HeaderName goBack={goBack} title={title} />

      <ScrollView
        scrollEnabled
        style={{
          width: settingApp.width,
          padding: 16,
        }}
      >
        {/* nName */}
        <View style={styles.view_field}>
          <Text style={styles.txt_title}>{"Tên"}</Text>
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
        <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
          <Text style={styles.txt_title}>{lang.unit}</Text>
          <TouchableOpacity
            onPress={() => _onPress(Constanst.UNIT)}
            style={styles.view_input}
          >
            <Text style={styles.textField}>
              {dataItem?.unit?.name || lang?.emptyText}
            </Text>
          </TouchableOpacity>
        </View>

        {/* loại */}
        <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
          <Text style={styles.txt_title}>{lang.type}</Text>
          <TouchableOpacity
            onPress={() => _onPress(Constanst.TYPE)}
            style={styles.view_input}
          >
            <Text style={styles.textField}>
              {dataItem?.type?.name || lang.emptyText}
            </Text>
          </TouchableOpacity>
        </View>

        {/* loại */}
        <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
          <Text style={styles.txt_title}>{lang.group}</Text>
          <TouchableOpacity
            onPress={() => _onPress(Constanst.GROUP)}
            style={styles.view_input}
          >
            <Text style={styles.textField}>
              {dataItem?.group?.name || lang.emptyText}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
        listData={listData}
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
    backgroundColor: colorApp.green_002,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_update: {
    fontSize: 20,
    color: colorApp.white,
    fontWeight: "bold",
  },
});
