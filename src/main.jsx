import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './Routes/Routes.tsx'

import {
  RouterProvider,
} from "react-router-dom"; 
import {Provider} from "react-redux";
import store from "./Redux/Store/store.tsx"
import { listenToAuthChanges } from './Redux/Slice/FirebaseAuthSlice.tsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)
