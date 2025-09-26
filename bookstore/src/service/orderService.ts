import axios, { type AxiosResponse } from "axios";

const baseUrl = "http://localhost:3001/api/v1/order";

const token = localStorage.getItem("token");
const headers = { headers: { Authorization: "bearer " + token } };

interface AddOrder {
  message: string;
  order: {
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    orderBy: string;
    books: [
      {
        quantity: number;
        _id: string;
        bookId: string;
        bookName: string;
        author: string;
        price: number;
        discountPrice: number;
        totalPrice: number;
      }
    ];
    orderTotal: number;
    orderId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const addOrder = async (): Promise<AxiosResponse<AddOrder>> => {
  const res = await axios.post(`${baseUrl}/addorder`, {}, headers);
  console.log(res);
  localStorage.setItem("orderId", res?.data?.order?.orderId);
  return res;
};
