import React, { useState } from "react";
import AppleHealthKit, {
  getLatestWeight,
  saveWeight,
  getHeartRateSamples,
  saveSteps,
  getDailyStepCountSamples,
} from "react-native-health";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";

export const HealthKit = () => {
  const permissions = {
    permissions: {
      read: [
        "Height",
        "Weight",
        "StepCount",
        "DateOfBirth",
        "BodyMassIndex",
        AppleHealthKit.Constants.Permissions.HeartRate,
      ],
      write: ["Weight", "StepCount", "BodyMassIndex"],
    },
  };

  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [heartBeat, setHeartBeat] = useState("");

  const [writeSteps, setWriteSteps] = useState("");
  const [writeWeight, setWriteWeight] = useState("");

  AppleHealthKit.initHealthKit(permissions, (error) => {});

  const getStepCounts = () => {
    getDailyStepCountSamples(
      {
        startDate: new Date(2022, 2, 9).toISOString(),
        endDate: new Date(2022, 2, 10).toISOString(),
      },
      (err, results) => {
        const sumDaysSteps = results.reduce((a, b) => +a + +b.value, 0);

        setSteps(sumDaysSteps);
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
      { startDate: new Date(2021, 0, 0).toISOString() },
      (callbackError, results) => {
        setHeartBeat(results[0].value);
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
      (err, results) => {
        console.log("results", results);
      }
    );
    setWriteWeight("");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 16,
      }}
    >
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
          <Text style={{ marginRight: 20 }}>HealthKit latest HeartBeat -</Text>
          <Text>{heartBeat}</Text>
        </View>

        <Button title="getHeartBeat" onPress={getHeartBeat} />
      </View>
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
