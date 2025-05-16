import { StyleSheet, View, Image } from "react-native";

export default function TemplateView({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image
          source={require("../../assets/images/imgBackgroundBottomFade.png")}
          // style={styles.imgBackgroundBottomFade}
        />
        <Image
          source={require("../../assets/images/navigationAndSmall/btnTemplateViewBackArrow.svg")}
          // source={require("../../assets/images/navigationAndSmall/btnTest.png")}
          style={styles.imgBackArrow}
        />
        <Image
          source={require("../../assets/images/KyberV2Shiny.png")}
          style={styles.imgLogo}
        />
      </View>
      <View style={styles.containerBottom}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
    height: "35%",
    overflow: "hidden",
  },
  imgBackArrow: {
    position: "absolute",
    top: 50,
    left: 50,
    width: 50,
    height: 50,
    zIndex: 10,
    backgroundColor: "green",
    color: "green",
  },
  imgLogo: {
    position: "absolute",
    bottom: 0,
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
