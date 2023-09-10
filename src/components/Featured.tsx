import Image from "next/image";
import api from "@/utils/service";
import { Product } from "@/@types";

async function getProducts() {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Featured() {
  const products = await getProducts();

  return (
    <section className="w-screen overflow-x-auto overflow-y-hidden text-red-500">
      <div className="w-max flex">
        {products?.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vm] xl:h-[90vh]"
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
              <span className="text-xl font-bold">{item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md">
                Add to card
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
