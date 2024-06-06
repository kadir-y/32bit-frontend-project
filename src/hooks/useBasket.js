import { createContext, useContext, useReducer } from "react";

const BasketContext = createContext(null);
const BasketDispatchContext = createContext(null);

export function BasketProvider({ children }) {
  const [basket, dispatch] = useReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={basket}>
      <BasketDispatchContext.Provider value={dispatch}>
        {children}
      </BasketDispatchContext.Provider>
    </BasketContext.Provider>
  );
}

export function useBasketDispatch() {
  return useContext(BasketDispatchContext);
}

export function useBasket() {
  return useContext(BasketContext);
}

function basketReducer(basket, action) {
  switch (action.type) {
    case "added": {
      return [ ...basket, action.product ];
    }
    case "changed": {
      return basket.map(p => {
        if (p.id === action.product.id) {
          return action.product;
        } else {
          return p;
        }
      });
    }
    case "deleted": {
      return basket.filter(p => p.id !== action.product.id);
    }
    case "cleared": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
