import { createContext, useContext, useState } from "react";

const CustomerInfoContext = createContext(null);

const initialCustomerInfo = {
  email: "",
  receiptPreference: "normal"
};

export const CustomerInfoProvider = function  ({ children }) {
  const [customerInfo, setCustomerInfo] = useState(initialCustomerInfo);
  const data = {
    customerInfo,
    setCustomerInfo
  }
  return(
    <CustomerInfoContext.Provider value={data}>
      {children}
    </CustomerInfoContext.Provider>
  );
}

export const useCustomerInfo = function () {
  return useContext(CustomerInfoContext);
}