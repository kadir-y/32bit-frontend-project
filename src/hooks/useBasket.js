import { createContext, useContext, useReducer } from "react";


const BasketItemsContext = createContext(null);
const BasketItemsDispatchContext = createContext(null);
const BasketSummaryContext = createContext(null);
const BasketSummaryDispatchContext = createContext(null);

const initialSummaryObj = {
  subtotalPrice: 0,
  totalPrice: 0
}

export function BasketProvider({ children }) {
  const [basketItems, basketItemsDispatch] = useReducer(basketItemsReducer, []);
  const [basketSummary, basketSummaryDispatch] = useReducer(basketSummaryReducer, initialSummaryObj);

  return (
    <BasketSummaryContext.Provider value={basketSummary}>
      <BasketSummaryDispatchContext.Provider value={basketSummaryDispatch}>
        <BasketItemsContext.Provider value={basketItems}>
          <BasketItemsDispatchContext.Provider value={basketItemsDispatch}>
            {children}
          </BasketItemsDispatchContext.Provider>
        </BasketItemsContext.Provider>
      </BasketSummaryDispatchContext.Provider>
    </BasketSummaryContext.Provider>
  );
}

export function useBasketItemsDispatch() {
  return useContext(BasketItemsDispatchContext);
}

export function useBasketItems() {
  return useContext(BasketItemsContext);
}

export function useBasketSummaryDispatch() {
  return useContext(BasketSummaryDispatchContext);
}

export function useBasketSummary() {
  return useContext(BasketSummaryContext);
}

function basketItemsReducer(basketItems, action) {
  switch (action.type) {
    case "added": {
      return [ 
        ...basketItems, 
        {...action.product}
      ];
    }
    case "changed": {
      return basketItems.map(p => {
        if (p.id === action.product.id) {
          return action.product;
        } else {
          return p;
        }
      });
    }
    case "deleted": {
      return basketItems.filter(p => p.id !== action.product.id);
    }
    case "cleared": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function basketSummaryReducer(basketSummary, action) {
  switch (action.type) {
    case "setted": {
      return { ...basketSummary, ...action.set };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}