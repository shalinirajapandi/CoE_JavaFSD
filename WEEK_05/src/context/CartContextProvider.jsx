import { createContext, useReducer } from "react";
import { products } from "../data/productList";
import { CartReducer } from "../enums/appEnum";


const initialState = {
  productItems: products,
  cartItems: [],
  category: "",
  search: "",
  productState: {},
};

export const CartContext = createContext({
  state: initialState,
  dispatch: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case CartReducer.AddCartItem: {
      if (action.payload.count === 0) {
        action.payload.count = 1;
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              item.count += 1;
            }
            return item;
          }),
        };
      }
    }

    case CartReducer.RemoveCartItem: {
      if (action.payload.count === 1) {
        action.payload.count -= 1;
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              item.count -= 1;
            }
            return item;
          }),
        };
      }
    }

    case CartReducer.SetCategory: {
      if (action.selectedCategory === "") {
        return {
          ...state,
          productItems: products,
          category: action.selectedCategory,
        };
      } else {
        return {
          ...state,
          productItems: products.filter(
            (item) => item.category === action.selectedCategory
          ),
          category: action.selectedCategory,
        };
      }
    }

    case CartReducer.SearchProduct: {
      if (action.searchValue === "" && state.category === "") {
        return {
          ...state,
          productItems: products,
          search: action.searchValue,
        };
      } else if (action.searchValue === "" && state.category !== "") {
        return {
          ...state,
          productItems: products.filter(
            (item) => item.category === state.category
          ),
          search: action.searchValue,
        };
      } else {
        return {
          ...state,
          productItems: state.productItems.filter((item) =>
            item.name.toLowerCase().includes(action.searchValue)
          ),
          search: action.searchValue,
        };
      }
    }

    case CartReducer.AddProductItem: {
      return {
        ...state,
        productItems: [...state.productItems, action.payload],
      };
    }

    case CartReducer.ProductState: {
      if (action.payload.count === 0) {
        return { ...state, productState: { ...state.productState, [action.payload.id]: false } };
      } else {
        return { ...state, productState: { ...state.productState, [action.payload.id]: true } };
      }
    }

    default: {
      return state;
    }
  }
}

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
