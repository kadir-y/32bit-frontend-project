import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { KeyboardProvider } from "./hooks/useKeyboard";
import i18n from './i18n'; // Configuration of i18next
import reportWebVitals from './reportWebVitals';


// Roboto font imported from fontsource
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';
import HomePage from './views/Home';
import LoginPage from './views/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Error</p>,
    children: [{
      index: true,
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />
    }]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <KeyboardProvider>
        <RouterProvider router={router} />
      </KeyboardProvider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
