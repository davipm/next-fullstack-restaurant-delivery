import api from "@/utils/service";
import { Categories, Props } from "@/@types";
import ExploreMenu from "@/components/ExploreMenu";

async function getCategories() {
  try {
    const { data } = await api.get<Categories[]>("/categories");
    return data;
  } catch (error) {
    throw new Error("Got a error");
  }
}

export default async function MenuPage({ children }: Props) {
  const categories = await getCategories();

  return (
    <>
      {children}
      <ExploreMenu categories={categories} />
    </>
  );
}
