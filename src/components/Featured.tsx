"use client";

import Image from "next/image";
import Link from "next/link";

import { useProducts } from "@/hooks";

export default function Featured() {
  const { data: products, status } = useProducts();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error...</span>;
  }

  return (
    <section className="w-screen overflow-x-auto overflow-y-hidden text-red-500">
      <div className="w-max flex">
        {products.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh] overflow-hidden"
          >
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            )}

            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <Link
                href={`/product/${item.id}`}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Add to card
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
