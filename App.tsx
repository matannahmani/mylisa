import React from "react";
import { NativeBaseProvider, extendTheme, StatusBar } from "native-base";
import Router from "./components/Router";
import { KKCSExtendedTheme } from "./lib/theme";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export default function App() {
  return (
    <NativeBaseProvider theme={KKCSExtendedTheme} config={config}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Router />
    </NativeBaseProvider>
  );
}
