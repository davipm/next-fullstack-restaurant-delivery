"use client";

import { ChangeEvent, useState } from "react";

import { Input, TextArea } from "@/components/Input";

type InputProps = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Add() {
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    catSlug: "",
    optionsTitle: "",
    additionalPrice: 0,
  });

  function handleInputChange(event: InputProps) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
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
      setForm({ ...form, image: result });
    };
  }

  return (
    <div className=" text-gray-500 justify-center p-4 lg:px-20 xl:px-40">
      <form className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-gray-800 font-bold">
          Add New Product
        </h1>

        <Input
          name="file"
          label="Upload Image"
          type="file"
          accept="image/*"
          preview={form.image}
          onChange={handleImageChange}
        />

        <Input
          name="title"
          label="Title"
          placeholder="Bella Napoli"
          onChange={handleInputChange}
        />

        <TextArea
          name="description"
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
              name="optionsTitle"
              id="optionsTitle"
              placeholder="Option Title"
              className="ring-1 ring-blue-600 p-4 rounded-md placeholder:text-gray-400 outline-none"
              onChange={handleInputChange}
            />

            <input
              type="number"
              name="optionsTitle"
              id="optionsTitle"
              placeholder="Additional Price"
              className="ring-1 ring-blue-600 p-4 rounded-md placeholder:text-gray-400 outline-none"
              onChange={handleInputChange}
            />
          </div>
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
