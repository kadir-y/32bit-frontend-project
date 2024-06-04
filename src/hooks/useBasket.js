import { createContext, useContext, useReducer } from "react";

const BasketContext = createContext(null);
const BasketDispatchContext = createContext(null);

export function BasketProvider({ children }) {
  const [basket, dispatch] = useReducer(productReducer, []);

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

function productReducer(basket, action) {
  switch (action.type) {
    case "added": {
      return [...basket, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case "changed": {
      return basket.map(t => {
        if (t.id === basket.item.id) {
          return basket.item;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return basket.filter(t => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
