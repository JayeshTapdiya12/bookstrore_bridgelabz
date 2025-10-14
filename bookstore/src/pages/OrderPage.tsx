import React, { useEffect, useState } from "react";
import { getOrder as getOrderService } from "../service/orderService";
import "../style/orderpage.css";
import Bookimg from "../assets/Bookimg2.png";

import { Typography, Box, CircularProgress, Grid } from "@mui/material";
import { all } from "axios";

interface BookId {
  bookImage: string | null;
}

interface Book {
  quantity: number;
  _id: string;
  bookId: BookId;
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
  const [allOrder, setAllOrder] = useState<Order[] | null>(null);

  const getOrder = async () => {
    const res = await getOrderService();
    if (res?.data?.orders && Array.isArray(res?.data?.orders)) {
      setOrder(res?.data?.orders);
      setAllOrder(res?.data?.orders);
      setLoading(false);
    }
  };

  const sortting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    let sortedBooks: Order[] = [];

    if (Array.isArray(allOrder)) {
      switch (value) {
        case "lowPrice":
          sortedBooks = [...allOrder].sort(
            (a, b) => a.orderTotal - b.orderTotal
          );
          break;
        case "HighPrice":
          sortedBooks = [...allOrder].sort(
            (a, b) => b.orderTotal - a.orderTotal
          );
          break;

        case "normal":
        default:
          sortedBooks = [...allOrder];
          break;
      }
    }
    setOrder(sortedBooks);
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
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              sx={{ width: "100%", margin: 0 }}
            >
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "200px",
                  }}
                >
                  <select
                    name="sort"
                    onChange={sortting}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      appearance: "auto",
                      height: "35px",
                    }}
                  >
                    <option value="normal">Sort by relevance</option>
                    <option value="lowPrice">Price: Low to High</option>
                    <option value="HighPrice">Price: High to Low</option>
                  </select>
                </Box>
              </Grid>
            </Grid>

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
                      <strong>Order date:</strong>{" "}
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

                            <img
                              src={
                                book?.bookId?.bookImage
                                  ? book?.bookId?.bookImage
                                  : Bookimg
                              }
                              style={{ width: "10%", height: "10%" }}
                              alt="Bookimage"
                            />

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
