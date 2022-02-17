import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

// Pre-step, call this before any NFC operations
NfcManager.start();

export const NFC = () => {
  async function readNdef() {
    try {
      let tech = Platform.OS === "ios" ? NfcTech.Ndef : NfcTech.NfcA;
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(tech);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.log("tag", tag);
      Alert.alert("TAG", tag?.id);
      // Alert.alert("TAG", tag.ndefMessage[0].tnf.toString());
    } catch (error) {
      console.log("error", error);
      Alert.alert("error");
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text style={{ fontWeight: "600", fontSize: 20 }}>
          OPEN NFC SCANNER
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: "100%",
    backgroundColor: "orange",
    marginBottom: 40,
    borderRadius: 10,
  },
});
