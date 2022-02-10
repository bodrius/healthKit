import React, { useEffect } from "react";
import AppleHealthKit from "react-native-health";
import BackgroundFetch from "react-native-background-fetch";
import { FlatList, Text, View } from "react-native";

import { useAsyncStorage } from "../AsyncStoreHook/useAsyncStore";

export const BackgroundService = () => {
  const { setStorage, getStorageItem } = useAsyncStorage();

  useEffect(() => {
    initBackgroundTask();
  }, []);

  const initBackgroundTask = async () => {
    const onEvent = async (taskId) => {
      //YOUR LOGIC HERE
      await getStepCounts();

      BackgroundFetch.finish(taskId);
    };

    const onTimeout = async (taskId) => {
      BackgroundFetch.finish(taskId);
    };

    let status = await BackgroundFetch.configure(
      { minimumFetchInterval: 15 },
      onEvent,
      onTimeout
    );

    console.log("[BackgroundFetch] configure status: ", status);
  };

  const getStepCounts = async () => {
    AppleHealthKit.getStepCount(
      {
        date: new Date().toISOString(),
      },
      (err, results) => {
        setStorageSteps(results.value);
      }
    );
  };

  const setStorageSteps = async (steps) => {
    const stepsList = await getStorageItem("STEPS_QTY");
    console.log("stepsList===", stepsList);

    if (stepsList) {
      stepsList.push({ steps, date: Date.now() });
      await setStorage("STEPS_QTY", stepsList);
    } else {
      await setStorage("STEPS_QTY", [{ steps, date: Date.now() }]);
    }
  };

  return <></>;
};
