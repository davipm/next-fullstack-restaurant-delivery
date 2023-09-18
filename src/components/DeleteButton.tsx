"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import LoadingSpinner from "@/components/Loading";
import api from "@/utils/service";

interface Props {
  id: number;
}

export default function DeleteButton({ id }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, status } = useSession();

  const handleMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/products/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });

      router.push("/menu");
      toast("The product has been deleted!");
    },
    onError: () => {
      toast.error("Error deleting Product");
    },
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated" || !data?.user.isAdmin) {
    return null;
  }

  return (
    <button
      onClick={() => handleMutation.mutate(id)}
      className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full ml-6 transition ease-in-out"
    >
      <Image src="/delete.png" alt="Delete" width={20} height={20} />
    </button>
  );
}
