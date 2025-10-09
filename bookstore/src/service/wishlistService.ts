import axios, { type AxiosResponse } from "axios";

// const baseUrl = "http://localhost:3001/api/v1/books/wishlist";
const baseUrl = "https://booksbooking.onrender.com/api/v1/books/wishlist";

const token = localStorage.getItem("token");
const headers = { headers: { Authorization: "bearer " + token } };

export interface GetWishList {
  message: string;
  wishlist: {
    _id: string;
    wishBy: string;
    book: [
      {
        _id: string;
        bookId: string;
        bookname: string;
        authorname: string;
        image: string;
      }
    ];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const getWishList = async (): Promise<AxiosResponse<GetWishList>> => {
  let res = await axios.get(`${baseUrl}/get`, headers);
  return res;
};

interface AddWishlist {
  message: string;
  wish: {
    message: string;
    wishlist: {
      _id: string;
      wishBy: string;
      book: [
        {
          _id: string;
          bookId: string;
          bookname: string;
          authorname: string;
          image: string;
        }
      ];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

export const addWishlist = async (
  id: string
): Promise<AxiosResponse<AddWishlist>> => {
  let res = await axios.post(`${baseUrl}/add/${id}`, {}, headers);
  return res;
};

interface RemoveWishlist {
  code: number;
  message: string;
  wishlist: null | {
    _id: string;
    wishBy: string;
    book: [
      {
        _id: string;
        bookId: string;
        bookname: string;
        authorname: string;
        image: string;
      }
    ];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const removeWishlist = async (
  id: string
): Promise<AxiosResponse<RemoveWishlist>> => {
  let res = await axios.post(`${baseUrl}/remove/${id}`, {}, headers);
  return res;
};
