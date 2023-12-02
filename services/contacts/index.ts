import axios from "axios";

export const getAll = async (url: string) =>
  await axios.get(url).then((res) => res.data);

export const getByName = async (url: string, searchKey: string) =>
  await axios.get(`${url}?name=${searchKey}`).then((res) => res.data);
