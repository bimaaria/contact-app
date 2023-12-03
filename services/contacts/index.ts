import baseRequest from "../axios";

export const getAll = async () => {
  const res = await baseRequest({
    url: "/contacts",
    method: "GET",
  });

  return res.data;
};

export const get = async (id: string) => {
  const res = await baseRequest({
    url: `/contacts/${id}`,
    method: "GET",
  });

  return res.data;
};

export const getByName = async (searchKey: string) => {
  const res = await baseRequest({
    url: `/contacts?name=${searchKey}`,
    method: "GET",
  });

  return res.data;
};
