import { Routes, Route } from "react-router-dom";
import CallScreen from "./CallScreen";
import HomeScreen from "./HomeScreen";
import TestVideoScreen from "./TestVideoScreen";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/call/:username/:room" element={<CallScreen />} />
      <Route path="/testVideo" element={<TestVideoScreen />} />
    </Routes>
  );
}

export default RouteList;
