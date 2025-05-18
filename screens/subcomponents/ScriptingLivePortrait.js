import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateView from "./TemplateView";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; // near top of file
import ButtonKvImage from "./buttons/ButtonKvImage";
import ButtonKv from "./buttons/ButtonKv";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/user";

export default function ScriptingLivePortrait() {
  return (
    <View>
      <Text>ScriptingLivePortrait</Text>
    </View>
  );
}
