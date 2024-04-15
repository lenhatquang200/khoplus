import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { colorApp, lang, settingApp } from "../../../../public";
import { HeaderName, Loading } from "../../../../public/component";
import { ApiCall } from "../../../../KhoPlus";
import ModalSearch from "./component/modalSearch";
import Constanst from "./component/constans";
import actions from "../../../../state/actions";

const SPACE_TOP = 32;
let typeModal = null;
let listData = [];
let dataField = null;
export default function UploadProducts(props) {
  const { route = {} } = props;
  const dispatch = useDispatch();

  const [dataItem, setDataItem] = useState(route?.params?.item);
  const [isLoading, setIsloading] = useState(true);
  const [valueSearch, setValueSearch] = useState("");

  const [listUnit, setListUnit] = useState([]);
  const [listType, setListType] = useState([]);
  const [listGroup, setListGroup] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    newData = dataItem;
    fetchData();
  }, []);

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
      setTimeout(() => {
        goBack();
      }, 300);
    }
    setIsloading(false);
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <HeaderName goBack={goBack} title="Cập nhật hàng hóa" />

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
            <Text style={styles.textField}>{dataItem?.unit?.name}</Text>
          </TouchableOpacity>
        </View>

        {/* loại */}
        <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
          <Text style={styles.txt_title}>{lang.type}</Text>
          <TouchableOpacity
            onPress={() => _onPress(Constanst.TYPE)}
            style={styles.view_input}
          >
            <Text style={styles.textField}>{dataItem?.type?.name}</Text>
          </TouchableOpacity>
        </View>

        {/* loại */}
        <View style={[styles.view_field, { marginTop: SPACE_TOP }]}>
          <Text style={styles.txt_title}>{lang.group}</Text>
          <TouchableOpacity
            onPress={() => _onPress(Constanst.GROUP)}
            style={styles.view_input}
          >
            <Text style={styles.textField}>{dataItem?.group?.name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* button update */}
      {!isLoading && (
        <View style={styles.view_bt_update}>
          <TouchableOpacity
            onPress={() => onUpdateData()}
            style={styles.bt_update}
          >
            <Text style={styles.txt_update}>{lang.update}</Text>
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
    bottom: 16,
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
