import React from "react";
import { Button } from "react-native";
import BackgroundFetch from "react-native-background-fetch";

export const CustomBackgroundTask = () => {
  let status = await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    async (taskId) => {
      console.log("[BackgroundFetch] taskId: ", taskId);
      switch (taskId) {
        case "com.transistorsoft.healthkit":
          print("Received custom task");
          break;
        default:
          print("Default fetch task");
      }
      BackgroundFetch.finish(taskId);
    },
    async (taskId) => {
      // <-- Task timeout callback
      BackgroundFetch.finish(taskId);
    }
  );

  console.log("status CUSTOM TASK", status);

  const startCustomTask = () => {
    BackgroundFetch.scheduleTask({
      taskId: "com.transistorsoft.healthkit",
      forceAlarmManager: true,
      delay: 5000,
      minimumFetchInterval: 15,
    });
  };

  return (
    <Button
      style={{ marginHorizontal: 50 }}
      title="START CUSTOM TASK"
      onPress={startCustomTask}
    />
  );
};
