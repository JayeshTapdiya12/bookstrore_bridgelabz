import React, { useEffect, useState } from "react";
import { getOrder as getOrderService } from "../service/orderService";
import "../style/orderpage.css";

import { Typography, Box, CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(true);

  const getOrder = async () => {
    const res = await getOrderService();
    if (res?.data?.orders && Array.isArray(res?.data?.orders)) {
      setOrder(res?.data?.orders);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : order?.length === 0 ? (
        <Typography variant="h6" align="center" mt={4}>
          No order till yet.
        </Typography>
      ) : (
        <>
          <div className="order-container ">
            <h4 style={{ color: "grey" }}>
              Home/
              <span style={{ color: "black", fontSize: "15px" }}> (Order)</span>
            </h4>
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
              <h2>Orders</h2>
              <div>
                {order?.map((orderItem, index) => (
                  <div
                    key={orderItem._id}
                    style={{
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <h3>
                      {index + 1}. Order ID: {orderItem.orderId}
                    </h3>
                    <p>
                      <strong>Order By:</strong> {orderItem.orderBy}
                    </p>

                    <p>
                      <strong>Order Total: </strong>Rs. {orderItem.orderTotal}
                    </p>
                    <p>
                      <strong>Order datet:</strong>{" "}
                      {new Date(orderItem.createdAt).toLocaleString()}
                    </p>

                    <div>
                      <h3>Books in this Order:</h3>
                      {orderItem.books.map((book, index2) => (
                        <div key={index2}>
                          <div key={book._id} style={{ marginBottom: "10px" }}>
                            <h4>
                              {index2 + 1}. BookName: {book.bookName}
                            </h4>
                            <p>
                              <strong>Author:</strong> {book.author}
                            </p>
                            <p>
                              <strong>Price:</strong>{" "}
                              <span style={{ textDecoration: "line-through" }}>
                                {" "}
                                Rs.{book.price}
                              </span>
                              <strong style={{ marginLeft: "10px" }}>
                                Rs.
                                {book.discountPrice}
                              </strong>
                            </p>

                            <p>
                              <strong>Quantity:</strong> {book.quantity}
                            </p>
                            <p>
                              <strong>Total Price for this book:</strong> Rs.
                              {book.totalPrice}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;
