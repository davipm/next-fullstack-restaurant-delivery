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
}[];

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
