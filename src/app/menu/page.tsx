// "use client";

import Link from "next/link";
import Image from "next/image";
// import { useProducts } from "@/hooks";
// import LoadingSpinner from "@/components/Loading";
import { formatToMoney } from "@/utils/helpers";
import api from "@/utils/service";
import { Product } from "@/@types";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    cat: string;
  };
}

async function getProductsByCategory(category: string) {
  try {
    const { data } = await api.get<Product[]>(`/products?cat=${category}`);
    return data;
  } catch (error) {
    throw new Error("Error trying get products");
  }
}

export default async function Category({ params, searchParams }: Props) {
  const products = await getProductsByCategory(searchParams.cat);
  // const { data: products, status } = useProducts(searchParams.cat);
  //
  // if (!searchParams.cat) return null;
  //
  // if (status === "loading") {
  //   return <LoadingSpinner />;
  // }
  //
  // if (status === "error") {
  //   return <span>Error...</span>;
  // }

  return (
    <section className="flex flex-wrap text-gray-500">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-blue-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
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
            <h2 className="group-hover:hidden text-xl">
              {formatToMoney(product.price)}
            </h2>
            <button className="hidden group-hover:block uppercase bg-blue-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </section>
  );
}
