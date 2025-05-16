import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateView from "./subcomponents/TemplateView";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; // near top of file
import ButtonKvImage from "./subcomponents/buttons/ButtonKvImage";
import ButtonKv from "./subcomponents/buttons/ButtonKv";

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickLogin = async () => {
    console.log(
      "Login ---> API URL:",
      `${process.env.EXPO_PUBLIC_API_URL}/users/login`
    );

    const bodyObj = {
      email: credentials.email,
      password: credentials.password,
    };
    // console.log(`email: ${email}, ${password}`);
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      }
    );

    console.log("Received response:", response.status);

    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok) {
      console.log(`response ok`);
      resJson.email = email;
      // dispatch(loginUser(resJson));
      //           dispatch(
      dispatch(
        loginUser({
          email: resJson.email,
          token: resJson.token,
          // myArray: [1, 2, 3, 4],
        })
      );
      console.log("after dispatch");
      // router.push("/admin-db");
      navigation.navigate("Home");
    } else {
      const errorMessage =
        resJson?.error || `There was a server error: ${response.status}`;
      alert(errorMessage);
    }
  };

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.containerMiddle}>
          <View style={styles.vwInputGroup}>
            <Text>E-mail</Text>
            <View style={styles.vwInputWrapper}>
              <FontAwesome
                name="envelope"
                size={20}
                color="gray"
                style={styles.faIcon}
              />
              <TextInput
                placeholder="your.email@volleyball.com"
                placeholderTextColor="gray"
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, email: text })
                }
                style={styles.txtInputWithIcon}
              />
            </View>
          </View>
          <View style={styles.vwInputGroup}>
            <Text>Password</Text>
            <View style={styles.vwInputWrapper}>
              <ButtonKvImage
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.vwIconButton}
              >
                <FontAwesome
                  name={showPassword ? "unlock" : "lock"}
                  size={20}
                  color="gray"
                  style={styles.faIcon}
                />
              </ButtonKvImage>
              <TextInput
                placeholder="••••••••••"
                placeholderTextColor="gray"
                secureTextEntry={!showPassword}
                value={credentials.password}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, password: text })
                }
                style={styles.txtInputWithIcon}
              />
            </View>
          </View>

          <View style={styles.vwInputGroup}>
            <ButtonKv
              onPress={() => navigation.navigate("ResetPasswordRequest")}
              style={styles.vwForgotPasswordBtn}
            >
              Forgot password ?
            </ButtonKv>
          </View>
          <View style={styles.vwInputGroup}>
            <ButtonKv
              onPress={() => handleClickLogin()}
              // style={styles.vwForgotPasswordBtn}
            >
              Login
            </ButtonKv>
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
  vwInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  faIcon: {
    marginRight: 8,
  },
  txtInputWithIcon: {
    flex: 1,
    paddingVertical: 10,
    color: "black",
  },
  txtInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
  },
  vwIconButton: {
    padding: 5,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  vwForgotPasswordBtn: {
    backgroundColor: "transparent",
    width: "auto",
    height: "auto",
    padding: 0,
    borderRadius: 0,
    fontSize: 14,
    color: "purple",
  },
});
