import React from "react";
import AppleHealthKit, {
  getSleepSamples,
  getStepCount,
} from "react-native-health";
import { Text, View, Button } from "react-native";

export const HealthKit = () => {
  const permissions = {
    permissions: {
      read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
      write: ["Weight", "StepCount", "BodyMassIndex"],
    },
  };

  AppleHealthKit.initHealthKit(permissions, (error) => {});

  const getStepCounts = () => {
    let options = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
    };

    getStepCount(options, (err, results) => {
      if (err) {
        console.log("err", err);
        return;
      }
      console.log(results);
    });
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>HealthKit</Text>
      <Button title="getStepCounts" onPress={getStepCounts} />
    </View>
  );
};
