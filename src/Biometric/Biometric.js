import React, { useEffect } from "react";
import { Alert, Button, Pressable, Text } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

import { useAsyncStorage } from "../AsyncStoreHook/useAsyncStore";

export const Biometric = () => {
  const { setStorage, getStorageItem, removeStorageItem } = useAsyncStorage();

  const openBiometric = () => {
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;

      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log("TouchID is supported");
        let epochTimeSeconds = Math.round(
          new Date().getTime() / 1000
        ).toString();
        let payload = epochTimeSeconds + "some message";

        ReactNativeBiometrics.createSignature({
          promptMessage: "Sign in",
          payload: payload,
        }).then((resultObject) => {
          const { success, signature } = resultObject;

          if (success) {
            ReactNativeBiometrics.simplePrompt({
              promptMessage: "Please Complete",
            })
              .then((resultObject) => {
                const { success } = resultObject;

                if (success) {
                  setSignatureToAsyncStore(signature);
                } else {
                  console.log("user cancelled biometric prompt");
                }
              })
              .catch(() => {
                console.log("biometrics failed");
              });
          }
        });
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log("FaceID is supported");
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        console.log("Biometrics is supported");
      } else {
        console.log("Biometrics not supported");
      }
    });
  };

  const setSignatureToAsyncStore = async (signature) => {
    await setStorage("signature", signature);
    Alert.alert("Completely sign In");
  };

  const getSignature = async () => {
    const data = await getStorageItem("signature");
    data ? Alert.alert("data", data) : Alert.alert("EMPTY DATA");
  };

  const deleteData = async () => {
    await removeStorageItem("signature");
    Alert.alert("REMOVE DATA");
  };

  return (
    <>
      <Pressable
        style={{
          backgroundColor: "greenyellow",
          width: "100%",
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={openBiometric}
      >
        <Text style={{ fontSize: 20 }}>Open Biometric</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "green",
          width: "100%",
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={getSignature}
      >
        <Text style={{ fontSize: 20 }}>Shown Biometric data</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "red",
          width: "100%",
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={deleteData}
      >
        <Text style={{ fontSize: 20 }}>Remove Biometric data</Text>
      </Pressable>
    </>
  );
};
