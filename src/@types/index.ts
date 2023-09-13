import { ReactNode } from "react";
import { Session, User } from "next-auth";

export interface Props {
  children: ReactNode;
}

export type Categories = {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
};

export interface SessionInterface extends Session {
  user: User & {
    name: string;
    email: string;
    image: string;
    isAdmin: boolean;
  };
}

export type Product = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

export type CartItemType = {
  id: number;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionTypes = {
  addingNewProductToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
};
