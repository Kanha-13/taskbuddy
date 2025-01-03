import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Login from "./screens/Login.tsx"
import Navbar from "./components/Navbar/Navbar.tsx"
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
