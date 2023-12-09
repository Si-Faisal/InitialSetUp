
import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import LogInOne from "../Components/Login/LogInOne";
import SignUp from "../Components/SignUp/SignUp";
import SignUpOne from "../Components/SignUp/SignUpOne";
import SignUpTwo from "../Components/SignUp/SignUpTwo";
import SignUpRHF from "../Components/SignUp/SignUpRHF";
// import Home from "../Pages/Home/Home"
import PageHome from "../Pages/Home/PageHome";
import LogInRHF from "../Components/Login/LogInRHF";

const routerConfig: RouteObject[] = [
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    children:[
    {path:"/",
    element: <PageHome></PageHome>

    },
    {
      path:"/login",
      element: <LogInOne></LogInOne>
    },
    {
      path:"/signup",
      element: <SignUpRHF></SignUpRHF>
    }
  ]
  }
  
];

const router = createBrowserRouter(routerConfig);

export default router;