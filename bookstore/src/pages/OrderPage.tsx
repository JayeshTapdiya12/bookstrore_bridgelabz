import React, { useEffect, useState } from "react";
import { getOrder as getOrderService } from "../service/orderService";

interface Book {
  quantity: number;
  _id: string;
  bookId: string;
  bookName: string;
  author: string;
  price: number;
  discountPrice: number;
  totalPrice: number;
}

interface Order {
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  orderBy: string;
  books: Book[];
  orderTotal: number;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderPage: React.FC = () => {
  const [order, setOrder] = useState<Order[] | null>(null);

  const getOrder = async () => {
    const res = await getOrderService();
    console.log(res?.data?.orders);
    if (res?.data?.orders && Array.isArray(res?.data?.orders)) {
      setOrder(res?.data?.orders);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      Hi all order hello
      {order?.map((ele, index) => {
        return <h1 key={index}> {ele?.orderId}</h1>;
      })}
    </>
  );
};

export default OrderPage;
