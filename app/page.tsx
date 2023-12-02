"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      router.push("/contacts");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border border-black rounded-sm w-full"
            type="text"
            {...register("email")}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            className="border border-black rounded-sm w-full"
            type="password"
            {...register("password")}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="w-full text-right mt-2">
          <button
            type="submit"
            className="border border-black rounded-sm w-24 px-2 py-1"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
