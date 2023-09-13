"use client";

import { useEffect, useState } from "react";

import { Product } from "@/@types";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}

export default function Price({ product }: Props) {
  const { addingNewProductToCart } = useCartStore();

  const [item, setItem] = useState({
    total: product.price,
    quantity: 1,
    selected: 0,
  });

  const handleCart = () => {
    const cart = {
      id: product.id,
      title: product.title,
      img: product.img,
      price: item.total,
      ...(product.options?.length && {
        optionTitle: product.options[item.selected].title,
      }),
      quantity: item.quantity,
    };

    addingNewProductToCart(cart);
    toast.success("The product added to the cart!");
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setItem({
        ...item,
        quantity:
          product.price + product.options[item.selected].additionalPrice,
      });
    }
  }, [item, product.options, product.price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${item.total}</h2>

      <div className="flex gap-4">
        {product.options?.length &&
          product.options.map((option, index) => (
            <button
              key={option.title}
              onClick={() => setItem({ ...item, selected: index })}
              className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
              style={{
                background:
                  item.selected === index ? "rgb(248 113 113)" : "white",
                color: item.selected === index ? "white" : "red",
              }}
            >
              {option.title}
            </button>
          ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() =>
                setItem((prevState) => ({
                  ...prevState,
                  quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
                }))
              }
            >
              {"<"}
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                setItem((prevState) => ({
                  ...prevState,
                  quantity: prevState.quantity < 9 ? prevState.quantity + 1 : 9,
                }))
              }
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          onClick={handleCart}
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
