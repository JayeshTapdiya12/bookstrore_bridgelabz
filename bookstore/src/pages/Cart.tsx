import React, { useState, useEffect } from "react";
import {
  getCart as getCartService,
  updateQuant as updateQuantityService,
} from "../service/cartService";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import "../style/cart.css";

interface Book {
  _id: string; // cart item id
  quantityToBuy: number;
  product_id: {
    _id: string; // book id
    bookName: string;
    author: string;
    description: string;
    quantity: number;
    price: number;
    discountPrice: number;
    bookImage: string;
  };
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cartGet = async () => {
    try {
      const res = await getCartService();
      const bookcart = res?.data?.result;
      if (Array.isArray(bookcart)) {
        setCart(bookcart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartGet();
  }, []);

  const handleQuantityChange = async (
    bookId: string,
    action: "increment" | "decrement"
  ) => {
    setCart((prevCart) =>
      prevCart.map((book) => {
        if (book.product_id._id === bookId) {
          const newQuantity =
            action === "increment"
              ? book.quantityToBuy + 1
              : Math.max(1, book.quantityToBuy - 1);

          updateQuantityService(bookId, newQuantity);

          return { ...book, quantityToBuy: newQuantity };
        }
        return book;
      })
    );
  };

  // Handle remove
  const handleRemove = (bookId: string) => {
    setCart((prevCart) =>
      prevCart.filter((book) => book.product_id._id !== bookId)
    );
  };

  return (
    <div className="cart-container">
      {loading ? (
        <Stack spacing={2}>
          <Stack direction="row" spacing={0}>
            <Button variant="outlined" disabled>
              <CircularProgress size={24} />
            </Button>
          </Stack>
        </Stack>
      ) : cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((ele) => (
          <div key={ele._id} className="cart-item">
            <img
              src={ele.product_id.bookImage}
              alt={ele.product_id.bookName}
              className="book-image"
            />
            <div className="cart-details">
              <h3>Book Name: {ele.product_id.bookName}</h3>
              <p>Author: {ele.product_id.author}</p>

              <div className="cart-price">
                <span>Rs. {ele.product_id.discountPrice}</span>
                <span className="cart-original-price">
                  Rs. {ele.product_id.price}
                </span>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(ele.product_id._id, "decrement")
                  }
                >
                  -
                </button>
                <input type="text" value={ele.quantityToBuy} readOnly />
                <button
                  onClick={() =>
                    handleQuantityChange(ele.product_id._id, "increment")
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(ele.product_id._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
