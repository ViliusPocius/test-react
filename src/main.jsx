import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success",
    element: <><h1>Payment successful!</h1>
    <button onClick={() => window.location.href = "/"}>Go back to shop</button>
    </>,
  },
  {
    path: "/cancel",
    element: <><h1>Payment cancelled.</h1>
    <button onClick={() => window.location.href = "/"}>Go back to shop</button>
    </>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
