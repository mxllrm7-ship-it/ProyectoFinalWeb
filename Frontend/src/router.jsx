import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventPay from "./pages/Pay";
import MyEvents from "./pages/MyEvents";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/eventos", Component: Events },
  { path: "/eventos/:id", Component: EventPay },
  { path: "/mis-eventos", Component: MyEvents },
  { path: "/profile", Component: Profile }
]);