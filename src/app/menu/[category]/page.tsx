import Link from "next/link";
import Image from "next/image";

import api from "@/utils/service";
import { Product } from "@/@types";

async function getByCategories(category: string) {
  try {
    const { data } = await api.get<Product[]>(`/products?cat=${category}`);
    return data;
  } catch (error) {
    throw new Error("Error getting single Product");
  }
}

interface Props {
  params: {
    category: string;
  };
}

export default async function Category({ params }: Props) {
  const products = await getByCategories(params.category);

  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
        >
          {product.img && (
            <div className="relative h-[80%]">
              <Image
                src={product.img}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          )}

          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{product.title}</h1>
            <h2 className="group-hover:hidden text-xl">{product.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
