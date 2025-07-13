import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home Components</h1>,
    errorElement:<h1 className='font-bold text-2xl text-center'>Page Not found!</h1>,
    children: [
      {
        path: '/',
        element: <h1>Books</h1>
      },
      {
        path: '/addBooks',
        element: <h1>Add Books</h1>
      },
      {
        path: '/booksSummery',
        element: <h1>Books Summery</h1>
      },
    ],
  },
]);




createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
