import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ScriptingPortrait from "./subcomponents/ScriptingLivePortrait";
import { Gesture } from "react-native-gesture-handler";
import { useState } from "react";

export default function ScriptingLive({ navigation }) {
  const [tapIsActive, setTapIsActive] = useState(true);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [circleSize, setCircleSize] = useState({ width: 50, height: 50 });
  const topChildren = (
    <View>
      <Text style={styles.txtTopChildren}>Live Scripting </Text>
    </View>
  );

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;
      calculateCenterCircle(x, y);
    }
  });

  const stylesCircle = {
    top: circlePosition.y,
    left: circlePosition.x,
    width: circleSize.width,
    height: circleSize.height,
    borderRadius: 25,
    backgroundColor: "orange",
    position: "absolute",
  };

  const combinedGestures = Gesture.Simultaneous(gestureTapBegin);

  const calculateCenterCircle = (x, y) => {
    const centerX = x - circleSize.width / 2;
    const centerY = y - circleSize.height / 2;
    setCirclePosition({ x: centerX, y: centerY });
  };

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
    >
      <ScriptingPortrait combinedGestures={combinedGestures} />
      <View style={stylesCircle} />
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  txtTopChildren: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
