import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteList from "./screens/RouteList";

function App() {
  return (
    <Router>
      <RouteList />
    </Router>
  );
}

export default App;
