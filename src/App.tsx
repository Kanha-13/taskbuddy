import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Login from "./screens/Login.tsx"
import Navbar from "./components/Navbar/Navbar.tsx"
import Home from "./screens/Home.tsx";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
