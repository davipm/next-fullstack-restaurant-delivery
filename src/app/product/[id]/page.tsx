import Image from "next/image";

import { Product } from "@/@types";
import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import api from "@/utils/service";

async function getSingeProduct(id: string) {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error("Error getting single Product");
  }
}

interface Params {
  params: {
    id: string;
  };
}

export default async function SingleProductPage({ params }: Params) {
  const product = await getSingeProduct(params.id);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-gray-800 md:flex-row md:gap-8 md:items-center relative">
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase">
          <span>{product.title}</span>
          <DeleteButton id={product.id} />
        </h1>
        <p>{product.desc}</p>
        <Price product={product} />
      </div>
    </div>
  );
}
