const Enums = {
    FEATURE_FLAGS: {
      LOCK_ON_CENTER: process.platform !== "linux",
    },
    frameIsDifferentBetweenModes: process.platform !== "darwin",
  };
  
  export default Enums;
  