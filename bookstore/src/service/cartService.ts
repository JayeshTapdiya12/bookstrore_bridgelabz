import axios, { type AxiosResponse } from "axios";

const baseUrl = "https://booksbooking.onrender.com/api/v1/books/cart";
// const baseUrl = "http://localhost:3001/api/v1/books/cart";

// const token = localStorage.getItem("token");
// const headers = { headers: { Authorization: "bearer " + token } };

interface GetCart {
  code: number;
  message: string;
  data: {
    isPurchased: boolean;
    _id: string;
    cartBY: string;
    book: {
      _id: string;
      description: string;
      discountPrice: number;
      bookName: string;
      author: string;
      quantity: number;
      price: number;
    }[];
    cartTotal: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const getCart = async (): Promise<AxiosResponse<GetCart>> => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: "bearer " + token } };
  const res = await axios.get(`${baseUrl}/getcart`, headers);
  return res;
};

interface AddCart {
  code: number;
  message: string;
  data: GetCart["data"];
}

export const addCart = async (id: string): Promise<AxiosResponse<AddCart>> => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: "bearer " + token } };
  const res = await axios.post(`${baseUrl}/add/${id}`, {}, headers);
  return res;
};

export const rmeoveCart = async (
  id: string
): Promise<AxiosResponse<AddCart>> => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: "bearer " + token } };
  const res = await axios.delete(`${baseUrl}/remove/${id}`, headers);
  return res;
};
