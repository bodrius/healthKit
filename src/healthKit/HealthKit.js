import React, { useState, useEffect } from "react";
import AppleHealthKit, {
  getLatestWeight,
  saveWeight,
  getHeartRateSamples,
  saveSteps,
  getStepCount,
} from "react-native-health";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  NativeAppEventEmitter,
  Alert,
} from "react-native";

import { NFC } from "../NFC/NFC";
import { useAsyncStorage } from "../AsyncStoreHook/useAsyncStore";

export const HealthKit = () => {
  const { getStorageItem } = useAsyncStorage();

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error) => {});
  }, []);

  const permissions = {
    permissions: {
      read: [
        "Height",
        "Weight",
        "StepCount",
        "DateOfBirth",
        "BodyMassIndex",
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.DistanceCycling,
      ],
      write: ["Weight", "StepCount", "BodyMassIndex"],
    },
  };

  /* Register native listener that will be triggered when successfuly enabled */
  NativeAppEventEmitter.addListener("healthKit:Cycling:setup:success", () =>
    console.log("Setup Successful")
  );

  /* Register native listener that will be triggered on each update */
  NativeAppEventEmitter.addListener("healthKit:Cycling:new", callback);

  const [steps, setSteps] = useState("");
  const [stepsList, setStepsList] = useState([]);
  const [weight, setWeight] = useState("");
  const [heartBeat, setHeartBeat] = useState("");

  const [writeSteps, setWriteSteps] = useState("");
  const [writeWeight, setWriteWeight] = useState("");

  const callback = () => {
    let options = {
      startDate: new Date(2022, 1, 1).toISOString(),
      endDate: new Date().toISOString(),
    };

    getSamples(options, (err, results) => {
      if (err) {
        Alert.alert("error");
        console.log("err", err);
        return;
      }
      Alert.alert("results-->", results);

      console.log("results---->>>>", results);
    });
  };

  const getStepCounts = () => {
    getStepCount(
      {
        date: new Date().toISOString(),
      },
      (err, results) => {
        // const sumDaysSteps = results.reduce((a, b) => +a + +b.value, 0);
        setSteps(results.value);
      }
    );
  };

  const getWeight = () => {
    getLatestWeight(
      {
        unit: "pound",
      },
      (err, results) => {
        setWeight(results.value);
      }
    );
  };

  const getHeartBeat = () => {
    getHeartRateSamples(
      { startDate: new Date(2022, 0, 0).toISOString() },
      (callbackError, results) => {
        setHeartBeat(results[0]?.value);
      }
    );
  };

  const setStepCounts = () => {
    saveSteps(
      {
        value: writeSteps,
        startDate: new Date(2022, 2, 9, 14, 0, 0).toISOString(),
        endDate: new Date(2022, 2, 9, 15, 20, 0).toISOString(),
      },
      (err, results) => {}
    );
    setWriteSteps("");
  };

  const setUserWriteWeight = () => {
    saveWeight(
      {
        value: writeWeight,
      },
      (err, results) => {}
    );
    setWriteWeight("");
  };

  const getDataAsyncStore = async () => {
    const steps = await getStorageItem("STEPS_QTY");
    setStepsList(steps);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text>{item?.steps}</Text>
      <Text>{new Date(item?.date).toLocaleTimeString("ru-RU")}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 16,
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={{ marginRight: 20 }}>HealthKit Steps -</Text>
            <Text>{steps}</Text>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setWriteSteps}
            value={writeSteps}
            placeholder="Enter HealthKit Steps"
          />
          <Button title="getDailyStepCount" onPress={getStepCounts} />
          <Button title="setStepCounts" onPress={setStepCounts} />
        </View>

        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={{ marginRight: 20 }}>HealthKit Weight -</Text>
            <Text>{weight}</Text>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setWriteWeight}
            value={writeWeight}
            placeholder="Enter HealthKit Weight"
          />
          <Button title="setWeight" onPress={setUserWriteWeight} />
          <Button title="getWeight" onPress={getWeight} />
        </View>

        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={{ marginRight: 20 }}>
              HealthKit latest HeartBeat -
            </Text>
            <Text>{heartBeat}</Text>
          </View>

          <Button title="getHeartBeat" onPress={getHeartBeat} />
        </View>

        {/* <View style={styles.container}>
          <View style={styles.box}>
            <FlatList
              data={stepsList}
              renderItem={renderItem}
              keyExtractor={(item) => item.date}
            />
          </View>

          <Button title="getDataAsyncStore" onPress={getDataAsyncStore} />
        </View> */}

        <NFC />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    height: 180,
    justifyContent: "space-around",
    marginBottom: 30,
    padding: 5,
    backgroundColor: "white",
  },

  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
