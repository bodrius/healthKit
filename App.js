import React from "react";

import { HealthKit } from "./src/healthKit/HealthKit";
import { BackgroundService } from "./src/Background/BackgroundService";

const App = () => {
  return (
    <>
      <HealthKit />
      <BackgroundService />
    </>
  );
};

export default App;
