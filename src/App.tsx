import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Layout from "./components/layout";
import { routes } from "./Routes";

const AppRoutes: React.FC = () => {
  const element = useRoutes(
    routes.map((route) => ({
      ...route,
      element: <Layout>{route.element}</Layout>,
    }))
  );

  return element;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
