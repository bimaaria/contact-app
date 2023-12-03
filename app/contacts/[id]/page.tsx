"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ContactForm, Loading } from "@/app/components";
import { get } from "@/services";

export default function ContactDetail() {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const id = pathnameArray[pathnameArray.length - 1];

  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const onEdit = () => {
    setIsFormDisabled(false);
  };

  const onDelete = () => {};

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setIsFetchLoading(true);
        return await get(id);
      };

      fetchData().then((res) => {
        setFormData(res.data);
        setIsFetchLoading(false);
      });
    }
  }, [id]);

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
      {isFetchLoading ? (
        <Loading />
      ) : (
        <ContactForm
          data={formData || {}}
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
        />
      )}
    </main>
  );
}
