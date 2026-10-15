import { LogBox } from "react-native";

const originalWarn = console.warn;

console.warn = (...args) => {
    const message = typeof args[0] === "string" ? args[0] : "";
    if (message.includes("SafeAreaView has been deprecated")) return;
    originalWarn(...args);
};

LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);