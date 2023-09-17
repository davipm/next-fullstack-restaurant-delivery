import React, { InputHTMLAttributes } from "react";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  preview?: string | null;
}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export function Input({ name, label, type, preview, ...rest }: InputProps) {
  if (type === "file") {
    return (
      <div className="w-full flex flex-col gap-2">
        {preview && (
          <Image src={preview} alt="image" width={300} height={300} />
        )}

        <label
          htmlFor={name}
          className="text-sm cursor-pointer flex gap-4 items-center"
        >
          <Image src="/upload.png" alt="upload" width={30} height={20} />
          <span>Upload Image</span>
        </label>

        <input type="file" id={name} className="hidden" {...rest} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        {...rest}
        type={type || "text"}
        name={name}
        id={name}
        className="ring-1 ring-blue-600 p-4 rounded-md placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}

export function TextArea({ name, label, ...rest }: TextAreaProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <textarea
        {...rest}
        rows={3}
        name={name}
        id={name}
        className="ring-1 ring-blue-600 p-4 rounded-md placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}
