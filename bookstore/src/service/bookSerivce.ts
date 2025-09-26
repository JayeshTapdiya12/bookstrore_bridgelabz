import axios, { type AxiosResponse } from "axios";

const baseUrl = "http://localhost:3001/api/v1/books";
const token = localStorage.getItem("token");
const headers = { headers: { Authorization: "bearer " + token } };

interface bookResp {
  success: boolean;
  message: string;
  result: {
    bookName: string;

    author: string;

    description: string;

    quantity: number;

    price: number;
    min: 1;

    discountPrice: number;
  };
}

export const getBook = async (): Promise<AxiosResponse<bookResp>> => {
  let res = await axios.get(baseUrl, headers);
  console.log(res);
  return res;
};

export const getBookById = async (
  id: string
): Promise<AxiosResponse<bookResp>> => {
  let res = await axios.get(`${baseUrl}/${id}`, headers);
  console.log(res);
  return res;
};
