import { StyleSheet, View, Image } from "react-native";

export default function TemplateView({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image
          source={require("../../assets/images/imgBackgroundBottomFade.png")}
          style={styles.imgBackgroundBottomFade}
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
