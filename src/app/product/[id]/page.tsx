import api from "@/utils/service";
import { Product } from "@/@types";

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
    <div>
      <p>Single Product</p>
    </div>
  );
}
