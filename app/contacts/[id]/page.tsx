"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { ContactForm } from "@/app/components";
import Link from "next/link";

const fetcher = async (url: string) => await fetch(url).then((r) => r.json());

export default function ContactDetail() {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const id = pathnameArray[pathnameArray.length - 1];

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const {
    data: record,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/api/contacts/${id}`, fetcher);

  const onEdit = () => {
    setIsFormDisabled(false);
  };

  const onDelete = () => {};

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading ...</p>
      </div>
    );

  return (
    <main className="min-h-screen p-12 flex flex-col">
      <Link
        href={"/contacts"}
        className="border border-black px-2 py-1 rounded-sm w-24 text-center mb-4"
      >
        Back
      </Link>
      <h1 className="font-bold text-xl mb-4">Contact Detail</h1>
      <div className="flex justify-end items-center gap-2 mb-4">
        <button
          type="button"
          className="border border-black px-2 py-1 rounded-sm w-24"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="border border-black px-2 py-1 rounded-sm w-24"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <ContactForm
        data={record.data || {}}
        isFormDisabled={isFormDisabled}
        setIsFormDisabled={setIsFormDisabled}
      />
    </main>
  );
}
