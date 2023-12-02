"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import Table from "../components/table";
import { ContactForm } from "../components";
import { getAll, getByName } from "@/services";

export default function Contacts() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [tableData, setTableData] = useState([]);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/contacts`,
    getAll,
    {
      onSuccess: (res) => {
        setTableData(res?.data);
      },
    }
  );

  const onCreate = () => {
    setIsCreating(true);
  };

  const onChangeSearchKey = (e: any) => {
    setSearchKey(e.target.value);
  };

  const onSearch = async () => {
    const res = searchKey
      ? await getByName(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/contacts`,
          searchKey
        )
      : await getAll(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/contacts`);
    setTableData(res?.data);
  };

  const onBack = () => {
    setIsCreating(false);
  };

  if (error)
    return (
      <div className="flex justify-center items center min-h-screen">
        <p>Error</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items center min-h-screen">
        <p>Loading ...</p>
      </div>
    );

  return (
    <main className="min-h-screen p-12 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        {isCreating && (
          <button
            type="button"
            className="border border-black rounded-sm px-2 py-1 w-24 text-center"
            onClick={onBack}
          >
            Back
          </button>
        )}
        <Link
          className="border border-black rounded-sm px-2 py-1 w-24 text-center"
          href={"/"}
        >
          Logout
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Contacts</h1>
        {!isCreating && (
          <button
            type="button"
            className="border border-black px-2 py-1 rounded-sm w-24"
            onClick={onCreate}
          >
            Create
          </button>
        )}
      </div>
      {isCreating ? (
        <ContactForm isCreating={isCreating} setIsCreating={setIsCreating} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              className="border border-black px-2 py-1"
              onChange={onChangeSearchKey}
            />
            <button
              type="button"
              className="border border-black px-2 py-1 rounded-sm"
              onClick={onSearch}
            >
              Search
            </button>
          </div>

          <Table contacts={tableData} />
        </>
      )}
    </main>
  );
}
