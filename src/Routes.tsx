import LandingPage from "./pages/home";
import FlowersPage from "./pages/flowers";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/flowers",
    element: <FlowersPage />,
  },
];
