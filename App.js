import React from "react";

import { HealthKit } from "./src/healthKit/HealthKit";
import { BackgroundService } from "./src/Background/BackgroundService";
import { CustomBackgroundTask } from "./src/Background/CustomBackgroundTask";
import { Biometric } from "./src/Biometric/Biometric";

const App = () => {
  return (
    <>
      <HealthKit />
      {/* <BackgroundService /> */}
      <Biometric />
    </>
  );
};

export default App;
