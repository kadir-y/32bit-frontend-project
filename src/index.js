import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { KeyboardProvider } from "./hooks/useKeyboard";
import { ColorModeProvider } from "./hooks/useColorMode";
import { AuthProvider } from "./hooks/useAuth";
import { ProductsProvider } from "./hooks/useProducts";
import { BasketProvider } from "./hooks/useBasket";
import { CampaignProvider } from "./hooks/useCampaign";
import { CustomerInfoProvider } from "./hooks/useCustomerInfo";
import i18n from "./i18n"; // Configuration of i18next
import reportWebVitals from "./reportWebVitals";

// Roboto font imported from fontsource
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App";
import HomePage from "./views/Home";
import LoginPage from "./views/Login";
import SettingsPage from "./views/Settings";
import ProductsPage from "./views/Products";
import SalesPage from "./views/Sales";
import ConfirmBasketPage from "./views/ConfirmBasket";
import PaymentPage from "./views/Payment";
import ReceiptPage from "./views/Receipt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Error</p>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/view-prices",
        element: <ProductsPage />,
      },
      {
        path: "/sales",
        element: <SalesPage />,
      },
      {
        path: "/confirm-basket",
        element: <ConfirmBasketPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />
      }
    ]
  },
  {
    path: "/payment/receipt",
    element: <ReceiptPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
 
  const { worker } = await import("./mocks/browser");
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({ onUnhandledRequest: "bypass"});
};

const root = ReactDOM.createRoot(document.getElementById("root"));
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <CustomerInfoProvider>
            <ColorModeProvider>
              <KeyboardProvider>
                <ProductsProvider>
                  <BasketProvider>
                    <CampaignProvider>
                      <RouterProvider router={router} />
                    </CampaignProvider>
                  </BasketProvider>
                </ProductsProvider>
              </KeyboardProvider>
            </ColorModeProvider>
          </CustomerInfoProvider>
        </I18nextProvider>
      </AuthProvider>
    </React.StrictMode>
  );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
