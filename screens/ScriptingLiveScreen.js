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

export default function ScriptingLiveScreen({ navigation }) {
  const topChildren = (
    <View>
      <Text style={styles.txtTopChildren}>Scripting Screen Top Children</Text>
    </View>
  );

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
    >
      <ScriptingPortrait />
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  txtTopChildren: {
    color: "white",
    fontSize: 20,
  },
});
