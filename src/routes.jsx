import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Create, Update ,Test } from "@/pages/dashboard";
import { SignIn, SignUp, Logout } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Course",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "User",
        path: "/create",
        element: <Create />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "update",
      //   path: "/update/:id",
      //   element: <Update />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "Test",
      //   path: "/test/:id",
      //   element: <Test />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      }
    ],
  },
  {
    title: "logout pages",
    layout: "auth",
    pages: [
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Log Out",
        path: "/log-out",
        element: <Logout />,
      },
    ],
  },
];

export default routes;
