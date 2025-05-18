import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ScriptingLivePortrait from "./subcomponents/ScriptingLivePortrait";

export default function ScriptingLiveSelectPlayers({ navigation }) {
  const topChildren = (
    <View>
      <Text style={styles.txtTopChildren}>Scripting Live Select Players</Text>
    </View>
  );

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
    >
      <ScriptingLivePortrait />
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  txtTopChildren: {
    color: "white",
    fontSize: 20,
  },
});
