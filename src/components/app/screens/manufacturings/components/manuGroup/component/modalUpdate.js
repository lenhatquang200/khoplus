import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { Icon, ToastShow, colorApp, lang, settingApp } from "public";
import { HeaderName, Loading } from "public/component";
import { debounce } from "lodash";
import { ApiCall } from "KhoPlus";
import actions from "state/actions";

export default function ModalUpdate(props) {
  const dispatch = useDispatch();

  const titleHaeder = lang.manufacturings_group;
  const [valueText, setValueText] = useState(props?.dataUpdate?.name);
  const [isLoading, setIsLoading] = useState(false);

  let _onChangeTextDebounce = debounce(_onChangeText, 300);
  const textInputRef = useRef();

  useEffect(() => {
    if (!props?.dataUpdate?._id) {
      setValueText("");
    } else {
      setValueText(props?.dataUpdate?.name);
    }
  }, []);

  function _onChangeText(val) {
    setValueText(val);
  }

  function _onClear() {
    setValueText("");
    textInputRef?.current?.clear();
  }

  async function _onSave() {
    setIsLoading(true);
    let body = {
      name: valueText,
    };
    const result = await validateApi(props?.dataUpdate?._id || null, body);
    if (result?.data?._id) {
      dispatch(actions.updateGroupManuFact(result?.data));
      ToastShow(result?.message || lang.succees);
      setIsLoading(false);
      props?.onClose();
    } else {
      ToastShow(`${lang.update} ${lang.succees}`);
      setIsLoading(false);
    }
  }

  async function validateApi(_id, body) {
    if (props?.dataUpdate?._id) {
      return await ApiCall.updateManufact_Group(_id, { ...body, _id: _id });
    } else {
      return await ApiCall.createManufact_Group(body);
    }
  }
  return (
    <Modal visible={props?.isVisible} transparent={false} animationType="slide">
      <HeaderName goBack={() => props?.onClose()} title={titleHaeder} />
      {isLoading && <Loading />}
      <View style={styles.view_content_update}>
        <Text style={styles.txt_name}>{"Tên nhóm"}</Text>
        <View style={styles.view_text_input}>
          <TextInput
            ref={textInputRef}
            style={styles.txt_input}
            defaultValue={props?.dataUpdate?.name || ""}
            onChangeText={(val) => _onChangeTextDebounce(val)}
            placeholder="Nhập tên nhóm"
          />

          <TouchableOpacity
            onPress={() => _onClear()}
            style={[
              styles.bt_clear_input,
              {
                opacity: valueText?.length == 0 ? 0.3 : 1,
              },
            ]}
            disabled={valueText?.length == 0}
          >
            <Icon.icon_Clear size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Button update */}
      <View style={styles.view_bt_update}>
        <TouchableOpacity
          onPress={() => _onSave()}
          style={[
            styles.bt_save,
            {
              opacity: valueText?.length == 0 ? 0.3 : 1,
            },
          ]}
          disabled={valueText?.length == 0}
        >
          <Text style={styles.txt_save}>{lang.save}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width,
    height: settingApp.height,
    backgroundColor: colorApp.white,
  },
  view_content_update: {
    width: settingApp.width,
    minHeight: 120,
    padding: 16,
  },
  view_text_input: {
    width: settingApp.width_32,
    height: 42,
    backgroundColor: colorApp.black_opacity_01,
    borderRadius: 8,
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 60,
  },
  txt_input: {
    fontSize: settingApp.size_18,
  },
  bt_clear_input: {
    backgroundColor: "transparent",
    width: 40,
    height: 42,
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_name: {
    fontSize: settingApp.size_20,
    color: colorApp.green_base,
    fontWeight: "600",
    marginBottom: 8,
  },
  bt_save: {
    width: settingApp.width / 2,
    height: 50,
    backgroundColor: colorApp.green_004,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  view_bt_update: {
    width: settingApp.width,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 32,
  },
  txt_save: {
    fontSize: settingApp.size_22,
    fontWeight: "600",
    color: colorApp.white,
  },
});
