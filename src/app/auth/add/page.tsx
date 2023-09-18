"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

import { Product } from "@/@types";
import { Input, TextArea } from "@/components/Input";
import { formatToMoney } from "@/utils/helpers";
import api from "@/utils/service";

type InputProps = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type Option = { title: string; additionalPrice: string }[];
type NewProduct = {
  options: Option;
  title: string;
  desc: string;
  img: string;
  price: string;
  catSlug: string;
};

const uploadImage = async (imagePath: string) => {
  try {
    const { data } = await api.post(`/upload`, { path: imagePath });
    return data;
  } catch (error) {
    throw error;
  }
};

export default function Add() {
  const router = useRouter();

  const [options, setOptions] = useState<Option>([]);
  const [option, setOption] = useState({ title: "", additionalPrice: "0" });
  const [form, setForm] = useState({
    title: "",
    desc: "",
    img: "",
    price: "",
    catSlug: "",
  });

  const mutation = useMutation({
    mutationFn: async (newProduct: NewProduct) => {
      const imageUrl = await uploadImage(form.img);

      if (imageUrl.url) {
        const { data } = await api.post<Product>("/products", {
          ...newProduct,
          img: imageUrl.url,
        });

        return data;
      }
    },
    onSuccess: (data) => {
      toast("Crated product with success");
      router.push(`/product/${data?.id}`);
    },
    onError: () => {
      toast.error("Error creating Product");
    },
  });

  function handleInputChange(event: InputProps) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleOptions(event: InputProps) {
    const { name, value } = event.target;
    setOption({ ...option, [name]: value });
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      setForm({ ...form, img: result });
    };
  }

  function addingNewOption() {
    setOptions((prevState) => [...prevState, option]);
    setOption({ title: "", additionalPrice: "" });
  }

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    mutation.mutate({ ...form, options });
  }

  return (
    <div className=" text-gray-500 justify-center p-4 lg:px-20 xl:px-40">
      <form className="flex flex-wrap gap-6" onSubmit={onSubmit}>
        <h1 className="text-4xl mb-2 text-gray-800 font-bold">
          Add New Product
        </h1>

        <Input
          name="file"
          label="Upload Image"
          type="file"
          accept="image/*"
          preview={form.img}
          onChange={handleImageChange}
        />

        <Input
          name="title"
          label="Title"
          placeholder="Bella Napoli"
          onChange={handleInputChange}
        />

        <TextArea
          name="desc"
          label="Description"
          placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
          onChange={handleInputChange}
        />

        <Input
          name="price"
          label="Price"
          type="number"
          placeholder="29"
          onChange={handleInputChange}
        />

        <Input
          name="catSlug"
          label="Category"
          placeholder="pizzas"
          onChange={handleInputChange}
        />

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex gap-4">
            <input
              type="text"
              name="title"
              id="optionsTitle"
              placeholder="Option Title"
              className="ring-1 ring-blue-600 p-4 rounded-md placeholder:text-gray-400 outline-none"
              value={option.title}
              onChange={handleOptions}
            />

            <input
              type="number"
              name="additionalPrice"
              id="optionsTitle"
              placeholder="Additional Price"
              className="ring-1 ring-blue-600 p-4 rounded-md placeholder:text-gray-400 outline-none"
              value={option.additionalPrice}
              onChange={handleOptions}
            />

            <button
              type="button"
              className="py-3 px-5 font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 hover:bg-blue-600 focus:ring-primary-800"
              onClick={addingNewOption}
            >
              Add Option
            </button>
          </div>
          {options.map((option) => (
            <span key={option.title} className="block text-sm">
              <i>Option: </i> {option.title} -
              {formatToMoney(option.additionalPrice)}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-5 mr-2 mb-2 w-[250px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
          {mutation.isLoading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 ml-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
