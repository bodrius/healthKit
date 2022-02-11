import React from "react";

import { HealthKit } from "./src/healthKit/HealthKit";
import { BackgroundService } from "./src/Background/BackgroundService";
import { CustomBackgroundTask } from "./src/Background/CustomBackgroundTask";

const App = () => {
  return (
    <>
      <HealthKit />
      <BackgroundService />
      {/* <CustomBackgroundTask /> */}
    </>
  );
};

export default App;
