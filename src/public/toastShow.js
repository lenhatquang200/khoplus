import React, { Component } from "react";
import Toast from "react-native-root-toast";

export default function ToastShow(message) {
  message || "Success";
  Toast.show(message, {
    position: Toast.positions.BOTTOM,
    duration: Toast.durations.LONG,
  });
}
