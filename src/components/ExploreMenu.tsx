"use client";

import cx from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Categories } from "@/@types";

interface Props {
  categories: Categories[];
}

export default function ExploreMenu({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function handleUpdateParams(slug: string) {
    const newPathname = `${pathname}?${createQueryString("cat", `${slug}`)}`;
    router.push(newPathname);
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
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>

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
