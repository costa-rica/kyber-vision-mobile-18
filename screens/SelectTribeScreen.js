import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import TemplateView from "./subcomponents/TemplateView";
import ButtonKv from "./subcomponents/buttons/ButtonKv";
import ButtonKvImage from "./subcomponents/buttons/ButtonKvImage";
// import { useDispatch } from "react-redux";
import { useState } from "react";

export default function SelectTribeScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <TemplateView>
      <View style={styles.container}>
        <Text>Select Tribe</Text>
      </View>
    </TemplateView>
  );
}
