import Link from "next/link";
import api from "@/utils/service";
import { Categories } from "@/@types";

async function getCategories() {
  try {
    const { data } = await api.get<Categories>("/categories");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function MenuPage() {
  const categories = await getCategories();

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[clac(100vh-9rem)] flex flex-col md:flex-row items-center">
      {categories?.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1>{category.title}</h1>
            <p>{category.desc}</p>
            <button
              className={`mt-5 hidden md:block ${
                category.color === "bg-black" ? "text-white" : "text-red-500"
              } ${category.color} py-2 px-4 rounded-md`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
