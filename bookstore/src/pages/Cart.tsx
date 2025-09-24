import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCart as getCartService } from "../service/cartService";
import Header from "../compoment/Header";

import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import "../style/cart.css";

const Cart: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  interface Book {
    product_id: {
      _id: string;
      bookName: string;
      author: string;
      description: string;
      quantity: number;
      price: number;
      discountPrice: number;
      bookImage: string;
    };
  }

  const cartGet = async () => {
    const res = await getCartService();
    const bookcart = res?.data?.result;
    console.log(bookcart);
    if (Array.isArray(bookcart)) {
      setCart(bookcart);
      setLoading(false);
    } else {
      setCart(null); // or handle error
    }
  };
  console.log(cart);
  useEffect(() => {
    cartGet();
  }, []);

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleRemove = (bookId: string) => {
    setCart(
      (prevCart) => prevCart?.filter((book) => book._id !== bookId) || null
    );
  };

  return (
    <>
      {/* <Header /> */}
      <div className="cart-container">
        {loading ? (
          <Stack spacing={2}>
            <Stack direction="row" spacing={0}>
              <Button variant="outlined" disabled>
                <CircularProgress size={24} /> {/* Show loader */}
              </Button>
            </Stack>
          </Stack>
        ) : (
          cart.map((ele) => {
            return (
              <div key={ele.product_id._id} className="cart-item">
                {/* <h2>Quantity ({ele.product_id.quantity})</h2> */}
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
                    <button onClick={() => handleQuantityChange("decrement")}>
                      -
                    </button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={() => handleQuantityChange("increment")}>
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
            );
          })
        )}
      </div>
    </>
  );
};

export default Cart;
