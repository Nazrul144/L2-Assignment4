import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './components/root/Root';
import Books from './components/pages/Books';
import AddBooks from './components/pages/AddBooks';
import BooksSummary from './components/pages/BooksSummary';
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<h1 className='font-bold text-2xl text-center'>Page Not found!</h1>,
    children: [
      {
        path: '/',
        element: <Books/>
      },
      {
        path: '/addBooks',
        element: <AddBooks/>
      },
      {
        path: '/booksSummery',
        element: <BooksSummary/>
      },
    ],
  },
]);




createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
       <ToastContainer />
  </StrictMode>,
)
