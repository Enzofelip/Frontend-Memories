import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";

// Home
import Home from './routers/Home.jsx';

//AddMemory
import AddMemory from './routers/AddMemory.jsx';

// Memory
import Memory from './routers/Memory.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/add-memory",
        element: <AddMemory/>
      },
      {
        path: "/memories/:id",
        element: <Memory/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
