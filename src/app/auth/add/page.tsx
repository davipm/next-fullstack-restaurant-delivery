"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Input, TextArea } from "@/components/Input";
import api from "@/utils/service";
import { toast } from "react-toastify";
import { Product } from "@/@types";
import { formatToMoney } from "@/utils/helpers";

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
          className="py-3 px-5 font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 hover:bg-blue-600 focus:ring-primary-800"
        >
          Create
        </button>
      </form>
    </div>
  );
}
