import LandingPage from "./pages/home";
import FlowersPage from "./pages/flowers";
import WomenDaysPage from "./pages/womendays";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/flowers",
    element: <FlowersPage />,
  },
  {
    path: "/womendays",
    element: <WomenDaysPage />,
  },
];
