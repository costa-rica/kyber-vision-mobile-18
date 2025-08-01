import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Import library
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, reducerSetScreenDimensions } from "../reducers/user";
import { useSelector } from "react-redux";
import TemplateView from "./subcomponents/TemplateView";

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const [screenDimensions, setScreenDimensions] = useState({
    portraitHeight: Dimensions.get("window").height,
    portraitWidth: Dimensions.get("window").width,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickRegister = async () => {
    if (password !== passwordRepeat) {
      setMessage("Passwords do not match");
      return;
    }

    console.log(
      "Register ---> API URL:",
      `${process.env.EXPO_PUBLIC_API_URL}/users/register`
    );
    console.log("- handleClickRegister  👀");

    const bodyObj = { email, password, username };
    console.log(`email: ${email}, ${password}`);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/users/register`,
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

    if (response.status === 201) {
      console.log(`response ok`);
      resJson.email = email;
      dispatch(
        loginUser({
          email: resJson.email,
          token: resJson.token,
        })
      );
      setMessage("Successfully registered");
      console.log("after dispatch");
      navigation.navigate("Home");
    } else if (resJson?.error) {
      setMessage(resJson.error);
    } else {
      setMessage(`There was a server error: ${response.status}`);
    }
  };

  const handlePasswordMatching = (text) => {
    setPassword(text);
    if (text !== passwordRepeat) {
      // setMessage("Passwords do not match");
      setPasswordsMatch(false);
    } else {
      setMessage(""); // Clear message when passwords match
      setPasswordsMatch(true);
    }
  };
  const handlePasswordRepeatMatching = (text) => {
    setPasswordRepeat(text);
    if (password !== text) {
      // setMessage("Passwords do not match");
      setPasswordsMatch(false);
    } else {
      setMessage(""); // Clear message when passwords match
      setPasswordsMatch(true);
    }
  };
  return (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true} // Ensures it works on Android
          extraScrollHeight={Platform.OS === "android" ? 80 : 0} // Pushes up slightly when keyboard opens
          enableAutomaticScroll={true} // Ensures inputs are visible when keyboard is open
          keyboardShouldPersistTaps="handled" // Allows tapping outside to dismiss keyboard
        > */}
      <View style={styles.container}>
        {/* -------- TOP ----- */}
        <View style={styles.containerTop}>
          {/* <View style={styles.vwLogo}>
            <Image
              style={styles.image}
              source={require("../assets/images/KyberV2Shiny.png")}
              alt="logo"
              resizeMode="contain"
            />
          </View> */}
        </View>
        <View style={styles.containerMiddle}>
          <View style={styles.vwInputWhiteLabel}>
            <TextInput
              placeholder={"Username"}
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.inputEmail}
            />
          </View>
          <View style={styles.vwInputWhiteLabel}>
            <TextInput
              placeholder={"Email"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.inputEmail}
            />
          </View>
          <View>
            <View style={styles.vwInputWhiteLabel}>
              <TextInput
                placeholder={"Password*"}
                value={password}
                // onChangeText={(text) => setPassword(text)}
                onChangeText={(text) => handlePasswordMatching(text)}
                style={styles.inputEmail}
                secureTextEntry={!showPassword}
              />
            </View>
            {/* <View style={styles.vwSwitchHidePassword}>
                  <Text>Show Password</Text>
                  <Switch
                    value={showPassword}
                    onValueChange={(value) => setShowPassword(value)}
                  />
                </View> */}
          </View>
          <View style={styles.vwInputWhiteLabel}>
            <TextInput
              placeholder={"Repeat password*"}
              value={passwordRepeat}
              onChangeText={(text) => handlePasswordRepeatMatching(text)}
              // onChangeText={(text) => setPasswordRepeat(text)}
              style={[
                styles.inputEmail,
                { borderColor: passwordsMatch ? "#806181" : "red" },
              ]}
              secureTextEntry={!showPassword}
            />
          </View>
        </View>
        {/* container Middle */}
        <View style={styles.containerBottom}>
          {/* <View style={styles.vwButtons}> */}
          <TouchableOpacity
            style={[styles.touchOpButton, { backgroundColor: "#970F9A" }]}
            onPress={() => {
              console.log("pressed validate");
              handleClickRegister();
            }}
          >
            <Text style={styles.txtButton}>Validate</Text>
          </TouchableOpacity>
          <Text style={styles.txtMessage}> {message}</Text>
          {/* </View> */}
        </View>
      </View>
      {/* </KeyboardAwareScrollView>
      </TouchableWithoutFeedback> */}
    </TemplateView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F2EBF2",
    // width: "100%",
  },

  // ----- Top Container -----
  containerTop: {
    flex: 1,
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },

  vwLogo: {
    height: 50,
    width: "100%",
    // backgroundColor: "green",
    display: "flex",
    alignItems: "center",
  },
  // ---- MIDDLE  ------
  containerMiddle: {
    // flex: 1,
    // height: 500,
    // minHeight: 500,
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: "space-around",
    gap: 20,
    // justifyContent: "space-around",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },

  vwInputWhiteLabel: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  inputEmail: {
    borderColor: "#806181",
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    padding: 3,
    paddingLeft: 6,
    fontSize: 20,
  },
  vwSwitchHidePassword: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
    gap: 20,
    alignItems: "center",
  },

  // -------- BOTTOM -------------

  containerBottom: {
    // flex: 1,
    // height: 200,
    // backgroundColor: "gray",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // alignItems: "center",
    // width: "100%",
    // flexDirection: "column",
    // flexDirection:"column"
    // justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // padding: 50,
    paddingBottom: 10,
  },

  touchOpButton: {
    // backgroundColor: "#A3A3A3",
    // marginTop: 10,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    padding: 15,
    // display: "flex",
    // alignItems: "center",
    // padding: 25,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
    // flexWrap: "wrap",
    textAlign: "center",
  },
  txtMessage: {
    color: "#970F9A",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
    // flexWrap: "wrap",
    textAlign: "center",
    // backgroundColor: "green",
  },
});
