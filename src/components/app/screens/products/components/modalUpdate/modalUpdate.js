import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { ButtonUpdate, HeaderName, Loading } from "public/component";
import { lang, settingApp, colorApp, Icon, ToastShow } from "public";
import { debounce } from "lodash";
import CONSTANT from "../../CONST";
import { ApiCall } from "KhoPlus";
import actions from "state/actions";

export default function ModalUpdate(props) {
  const dispatch = useDispatch();

  const titleHeader = CONSTANT.GROUP_PRODUCT
    ? lang.group
    : CONSTANT.TYPE_PRODUCT
    ? lang.type
    : lang.unit;
  const titleInput = lang.name + " " + titleHeader;
  const textInputRef = useRef();
  const _onChangeTextDebounce = debounce(_onChangeText, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [valueText, setValueText] = useState("");

  useEffect(() => {
    if (props?.dataUpdate?._id) {
      setValueText(props?.dataUpdate?.name);
    } else {
      setValueText("");
    }
    setIsLoading(false);
  }, [props?.dataUpdate]);

  function _onChangeText(val) {
    setValueText(val);
  }

  function _onClear() {
    setValueText("");
    textInputRef?.current?.clear();
  }

  function _onSave() {
    setIsLoading(true);
    if (CONSTANT.GROUP_PRODUCT) {
      props?._onUpdateGroup({ ...props?.dataUpdate, name: valueText });
    }
  }

  async function _onUpdateGroup() {}

  return (
    <Modal visible={props?.isVisible} transparent={false} animationType="slide">
      <HeaderName goBack={() => props?.onClose()} title={titleHeader} />
      {isLoading && <Loading />}
      <View style={styles.view_content_update}>
        <Text style={styles.txt_name}>{titleInput}</Text>
        <View style={styles.view_text_input}>
          <TextInput
            ref={textInputRef}
            style={styles.txt_input}
            defaultValue={props?.dataUpdate?.name || ""}
            onChangeText={(val) => _onChangeTextDebounce(val)}
            placeholder={"Nhập " + titleInput}
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
      <ButtonUpdate
        isDisable={valueText?.length == 0}
        onPress={() => _onSave()}
      />
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
    color: colorApp.green_001,
    fontWeight: "600",
    marginBottom: 8,
  },
  bt_save: {
    width: settingApp.width / 2,
    height: 50,
    backgroundColor: colorApp.green_001,
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
