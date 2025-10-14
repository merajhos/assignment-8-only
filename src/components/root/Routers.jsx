import React from 'react';
import { createBrowserRouter } from "react-router";
import App from '../../App';
import Root from './Root';
import ErrorPages from '../errorPages/errorPages';
import Apps from '../../app/Apps';
import Installation from '../../installation/Installation';
import AppDetails from '../../appDetails/AppDetails';

export const router = createBrowserRouter([
  
  {
      path: "/",
      element:<Root/>,
      errorElement:<ErrorPages></ErrorPages>,
      children :[
        {
            index:true,
            loader:() => fetch('/Data1.json'),
            element:<App></App>

        },
        {
            path:"/app",
            loader:() => fetch('/Data.json'),
            element:<Apps></Apps>
        },
      {
         path:"/installation",
         element:<Installation></Installation>
      },
      {
         path:"/appDetails/:id",
         loader:() => fetch('/Data.json'),
         element:<AppDetails ></AppDetails>
      },
      {
        path: "*",
        element: <ErrorPages />,
      }

       
     
     
      ]
    },
]);
