import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import { getCart as getCartService } from "../service/cartService";
import { Outlet } from "react-router-dom";
import Header from "../compoment/Header";

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
export const QuntContext = createContext({
  cartNumber: 0,
  refreshCart: () => {},
});

const Dashboard: React.FC = () => {
  const [cartNumber, setCartNumber] = useState<number | string | any>(0);

  const cartGet = async () => {
    const res = await getCartService();
    console.log(res);
    const bookcart = res?.data?.data?.book;
    console.log("heelo");
    console.log(bookcart);
    let number = 0;
    if (bookcart?.length !== 0) {
      number = bookcart?.reduce((total, book) => total + book.quantity, 0);
    }

    setCartNumber(number);
  };
  console.log(cartNumber);
  useEffect(() => {
    cartGet();
  }, []);
  return (
    <>
      <QuntContext.Provider value={{ cartNumber, refreshCart: cartGet }}>
        <Header />
        <Outlet />
      </QuntContext.Provider>
    </>
  );
};
export default Dashboard;
