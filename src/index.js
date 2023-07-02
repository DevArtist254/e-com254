import React from 'react';
import ReactDOM from 'react-dom/client';
//init broswer router
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';

import './App.css';
import ErrorPage from './error-page';
import Contact, { loader as contactLoader } from './routes/contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [{
      path: "contacts/:contactId",
      element: <Contact />,
      loader: contactLoader
    }]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
