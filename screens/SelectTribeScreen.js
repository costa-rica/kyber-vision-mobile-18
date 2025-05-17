import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import TemplateViewWithTopChildren from "./subcomponents/TemplateViewWithTopChildren";
import ButtonKv from "./subcomponents/buttons/ButtonKv";
import ButtonKvImage from "./subcomponents/buttons/ButtonKvImage";
import Tribe from "../assets/images/navigationAndSmall/Tribe.svg";
import { useState } from "react";

export default function SelectTribeScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <Text style={styles.txtTopChildren}> Welcome Nick</Text>
    </View>
  );

  return (
    <TemplateViewWithTopChildren
      navigation={navigation}
      topChildren={topChildren}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Tribe />
          <Text> TAble goes in here with all the tribes</Text>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.vwInputGroup}>
            <ButtonKv
              onPress={() => console.log("Create Tribe")}
              style={styles.btnTribe}
            >
              Create Tribe
            </ButtonKv>
          </View>
        </View>
      </View>
    </TemplateViewWithTopChildren>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },
  vwTopChildren: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  // txtTopChildren: {
  //   color: "white",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  containerTop: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwInputGroup: {
    width: "90%",
    alignItems: "center",
    paddingTop: 30,
  },
  btnTribe: {
    width: Dimensions.get("window").width * 0.6,
    height: 50,
    justifyContent: "center",
    fontSize: 24,
    color: "#AB8EAB",
    backgroundColor: "#C0A9C0",
    // borderColor
  },
});
