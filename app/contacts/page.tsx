"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContactForm, ContactTable, Loading } from "../components";
import { getAll, getByName } from "@/services";

export default function Contacts() {
  const [isCreating, setIsCreating] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [tableData, setTableData] = useState([]);

  const onCreate = () => {
    setIsCreating(true);
  };

  const onChangeSearchKey = (e: any) => {
    setSearchKey(e.target.value);
  };

  const onSearch = async () => {
    setIsSearchLoading(true);
    const res = searchKey ? await getByName(searchKey) : await getAll();
    setTableData(res?.data);
    setIsSearchLoading(false);
  };

  const onBack = () => {
    setIsCreating(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetchLoading(true);
      return await getAll();
    };

    fetchData().then((res) => {
      setTableData(res.data);
      setIsFetchLoading(false);
    });
  }, []);

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
          <div className="flex justify-between items-center mb-4 md:justify-start md: gap-2">
            <input
              type="text"
              className="border border-black px-2 py-1"
              onChange={onChangeSearchKey}
            />
            <button
              type="button"
              className="border border-black px-2 py-1 rounded-sm"
              onClick={onSearch}
              disabled={isSearchLoading}
            >
              {isSearchLoading ? <Loading /> : "Search"}
            </button>
          </div>

          {isFetchLoading ? <Loading /> : <ContactTable contacts={tableData} />}
        </>
      )}
    </main>
  );
}
