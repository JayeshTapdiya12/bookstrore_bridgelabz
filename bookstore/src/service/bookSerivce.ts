import axios, { type AxiosResponse } from "axios";

// const baseUrl = "http://localhost:3001/api/v1/books";
const baseUrl = "https://booksbooking.onrender.com/api/v1/books";

interface bookResp {
  success: boolean;
  message: string;
  note: {
    bookName: string;

    author: string;

    description: string;

    quantity: number;

    price: number;
    min: 1;

    discountPrice: number;
  };
}

export const getBook = async (): Promise<AxiosResponse<bookRespById>> => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: "bearer " + token } };
  let res = await axios.get(baseUrl, headers);
  return res;
};
export interface Note {
  _id: string;
  description: string;
  discountPrice: number;
  bookImage: null | string;
  admin_user_id: string;
  bookName: string;
  author: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface bookRespById {
  code: number;
  note: Note;
  message: string;
}

export const getBookById = async (
  id: string
): Promise<AxiosResponse<bookRespById>> => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: "bearer " + token } };
  let res = await axios.get(`${baseUrl}/${id}`, headers);
  return res;
};
