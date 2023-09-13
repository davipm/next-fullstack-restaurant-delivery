import { useQuery } from "@tanstack/react-query";

import { Product } from "@/@types";
import api from "@/utils/service";

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await api.get<Product[]>(
          category ? `/products?cat=${category}` : "/products",
        );
        return data;
      } catch (error) {
        throw new Error("Error trying get products");
      }
    },
  });
}
