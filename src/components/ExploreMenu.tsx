"use client";

import cx from "classnames";
import { useRouter } from "next/navigation";
import { Categories } from "@/@types";

interface Props {
  categories: Categories[];
}

export default function ExploreMenu({ categories }: Props) {
  const router = useRouter();

  function updateSearchParams(type: string, value: string) {
    const { search, pathname } = window.location;
    const searchParams = new URLSearchParams(search);
    searchParams.set(type, value);
    return `${pathname}?${searchParams.toString()}`;
  }

  function handleUpdateParams(slug: string) {
    const newPathName = updateSearchParams("cat", `${slug}`);
    router.push(newPathName, { scroll: false });
  }

  return (
    <section className="p-4 lg:px-20 xl:px-40 h-[calc(80vh-6rem)] md:h-[clac(80vh-9rem)] flex flex-col md:flex-row items-center">
      {categories.map((category) => (
        <div
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1>{category.title}</h1>
            <p>{category.desc}</p>

            <button
              onClick={() => handleUpdateParams(category.slug)}
              className={cx(
                `mt-5 hidden md:block py-2 px-4 rounded-md`,
                category.color === "black"
                  ? "text-white bg-black"
                  : "text-blue-500 bg-white",
              )}
            >
              Explore
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
