import React, { useState, useEffect, useContext } from "react";
import {
  getCart as getCartService,
  addCart as updateQuantityService,
  rmeoveCart as RemoveCartService,
} from "../service/cartService";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import "../style/cart.css";
import { QuntContext } from "../pages/Dashboard";
import bookImmg from "../assets/Bookimg2.png";
import AddressForm from "./AddressForm";
import { addOrder as AddOrderService } from "../service/orderService";
import { useNavigate } from "react-router-dom";
interface Book {
  quantity: string | number | readonly string[] | undefined;
  code: number;
  message: string;
  data: {
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
  };
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { refreshCart } = useContext(QuntContext);
  const [buttonPlace, setButtonPlace] = useState<boolean>(true);
  const navigate = useNavigate();

  const cartGet = async () => {
    try {
      const res = await getCartService();
      const bookcart = res?.data?.data?.book;
      console.log(res?.data?.data?.book);
      setTotalPrice(res?.data?.data?.cartTotal);
      setCart(bookcart);
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
    try {
      if (action === "increment") {
        await updateQuantityService(bookId);
      } else {
        await RemoveCartService(bookId);
      }
      await cartGet();
      refreshCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const checkout = async () => {
    if (cart?.length !== 0) {
      const res = await AddOrderService();
      console.log(res);
      navigate("/order");
    }
  };

  return (
    <>
      <div className="cart-container" style={{ paddingTop: "10px" }}>
        <h4 style={{ color: "grey" }}>
          Home/
          <span style={{ color: "black", fontSize: "15px" }}> (Cart)</span>
        </h4>
        {loading ? (
          <Stack spacing={2}>
            <Stack direction="row" spacing={0}>
              <Button variant="outlined" disabled>
                <CircularProgress size={10} />
              </Button>
            </Stack>
          </Stack>
        ) : cart?.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart?.map((ele) => (
            <div key={ele._id} className="cart-item">
              <img
                src={!ele.bookImage ? bookImmg : ele?.bookImage}
                alt={ele?.bookName}
                className="book-image"
              />
              <div className="cart-details">
                <h3>Book Name: {ele.bookName}</h3>
                <p>Author: {ele.author}</p>

                <div className="cart-price">
                  <span>Rs. {ele.discountPrice}</span>
                  <span className="cart-original-price">Rs. {ele.price}</span>
                </div>

                <div className="cart-price">
                  total item price:{" "}
                  <span>Rs. {ele.discountPrice * ele.quantity}</span>
                </div>

                <div className="cart-quantity">
                  <button
                    onClick={() => handleQuantityChange(ele._id, "decrement")}
                    style={{ borderRadius: "10px" }}
                  >
                    -
                  </button>
                  <input type="text" value={ele.quantity} readOnly />
                  <button
                    onClick={() => handleQuantityChange(ele._id, "increment")}
                    style={{ borderRadius: "10px" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {cart?.length !== 0 ? (
          <>
            <div className="cart-price">
              <h4>
                Total Cart Price : <span>Rs. {totalPrice}</span>
              </h4>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {isOpen2 || isOpen ? null : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "auto", marginTop: "20px" }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  PlaceOrder
                </Button>
              )}
            </div>
          </>
        ) : null}
      </div>

      {/* address details */}

      {cart?.length !== 0 ? (
        <>
          <div onClick={() => setIsOpen(!isOpen)} className="cart-container">
            {isOpen ? "Address Details" : "Address Details"}
          </div>

          {isOpen && <AddressForm setisOpen2={setIsOpen2} />}
          <div
            onClick={() => setIsOpen2(!isOpen2)}
            className="cart-container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {isOpen2 ? "Close Order Details" : "Order Details"}
            {isOpen2 && (
              <>
                {cart.map((ele) => (
                  <div
                    key={ele._id}
                    className="cart-item"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={!ele.bookImage ? bookImmg : ele.bookImage}
                      alt={ele.bookName || "Book Image"}
                      className="book-image"
                      style={{ maxWidth: "50px", marginRight: "10px" }}
                    />
                    <div className="cart-details">
                      <h3>Book Name: {ele.bookName}</h3>
                      <p>Author: {ele.author}</p>

                      <div className="cart-price">
                        <span>Rs. {ele.discountPrice}</span>
                        <span className="cart-original-price">
                          Rs. {ele.price}
                        </span>
                      </div>

                      <div className="cart-price">
                        Total item price:{" "}
                        <span>Rs. {ele.discountPrice * ele.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "auto", marginTop: "20px" }}
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Cart;
