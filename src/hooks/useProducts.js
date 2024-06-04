import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext(null);
const ProductsDispatchContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(productsReducer, []);

  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext);
}

export function useProducts() {
  return useContext(ProductsContext);
}

function productsReducer(products, action) {
  switch (action.type) {
    case "changed": {
      return action.products;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
