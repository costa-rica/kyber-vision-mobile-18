import { StyleSheet, Text, View } from "react-native";
import ButtonKvStd from "../buttons/ButtonKvStd";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ModalSelectSession({
  isVisibleModalSelectSession,
  setIsVisibleModalSelectSession,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          This is the Select Session modal
        </Text>
        <ButtonKvStd onPress={() => setIsVisibleModalSelectSession(false)}>
          Cancel
        </ButtonKvStd>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});
