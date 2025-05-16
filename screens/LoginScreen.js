import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateView from "./subcomponents/TemplateView";
import ButtonKv from "./subcomponents/buttons/ButtonKv";
import ButtonKvImage from "./subcomponents/buttons/ButtonKvImage";
// import { useDispatch } from "react-redux";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.containerMiddle}>
          <View style={styles.vwInputGroup}>
            <Text>E-mail</Text>
            <TextInput
              placeholder="Email"
              value={credential.email}
              onChangeText={(text) =>
                setCredential({ ...credential, email: text })
              }
              style={styles.txtInput}
            />
          </View>
        </View>
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },
  containerMiddle: {
    width: "100%",
    alignItems: "center",
    paddingTop: 50,
  },
  vwInputGroup: {
    width: "90%",
  },
  txtInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
    // marginTop: 10,
    // width: "80%",
  },
});
