import axios, { type AxiosResponse } from "axios";

const baseUrl =
  "https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book";

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
  let res = await axios.get(baseUrl);
  return res;
};
