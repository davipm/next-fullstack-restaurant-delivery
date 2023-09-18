import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { ActionTypes, CartType } from "@/@types";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  devtools(
    persist<CartType & ActionTypes>(
      (set, get) => ({
        products: INITIAL_STATE.products,
        totalItems: INITIAL_STATE.totalItems,
        totalPrice: INITIAL_STATE.totalPrice,

        addingNewProductToCart(item) {
          const products = get().products;
          const productInState = products.find(
            (product) => product.id === item.id,
          );

          if (productInState) {
            const updatedProducts = products.map((product) =>
              product.id === productInState.id
                ? {
                    ...item,
                    quantity: item.quantity + product.quantity,
                    price: item.price + product.price,
                  }
                : item,
            );

            set((state) => ({
              products: updatedProducts,
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price,
            }));
          } else {
            set((state) => ({
              products: [...state.products, item],
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price,
            }));
          }
        },

        removeFromCart(item) {
          const products = get().products;
          const filteredProducts = products.filter(
            (product) => product.id !== item.id,
          );

          set((state) => ({
            products: filteredProducts,
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
          }));
        },
      }),
      { name: "cart", skipHydration: true },
    ),
  ),
);
