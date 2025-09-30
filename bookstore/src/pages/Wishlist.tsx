import React, { useEffect, useState } from "react";
import { getWishList as getWishListService } from "../service/wishlistService";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import bookImmg from "../assets/Bookimg2.png";
import { styled } from "@mui/system";
import { removeWishlist as removeWislListService } from "../service/wishlistService";

interface Book {
  _id: string;
  bookId: string;
  bookname: string;
  authorname: string;
  image: string;
}
const AddToBagButton = styled(Button)({
  backgroundColor: "#b71c1c",
  color: "#fff",
  width: "100%",
  "&:hover": {
    backgroundColor: "#8e0000",
  },
});

const Wishlist: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [wish, setWish] = useState<Book[]>([]);

  const getWish = async () => {
    let res = await getWishListService();
    setLoading(false);
    console.log(res?.data?.wishlist?.book);
    setWish(res?.data?.wishlist?.book);
  };
  useEffect(() => {
    getWish();
  }, []);

  const removeWishList = async (id: string) => {
    await removeWislListService(id);
    getWish();
    // console.log(res?.data);
  };

  return (
    <>
      <div className="cart-container" style={{ paddingTop: "15px" }}>
        <h4 style={{ color: "grey" }}>
          Home/
          <span style={{ color: "black", fontSize: "15px" }}> (Wishlist)</span>
        </h4>
        {loading ? (
          <Stack spacing={2}>
            <Stack direction="row" spacing={0}>
              <Button variant="outlined" disabled>
                <CircularProgress size={10} />
              </Button>
            </Stack>
          </Stack>
        ) : wish?.length === 0 ? (
          <h1>Your cart is empty</h1>
        ) : (
          wish?.map((ele) => (
            <div
              key={ele._id}
              className="cart-item"
              style={{ marginTop: "25px" }}
            >
              <img src={bookImmg} alt={ele.bookname} className="book-image" />
              <div className="cart-details">
                <h3>Book Name: {ele.bookname}</h3>
                <p>Author: {ele.authorname}</p>
              </div>
              <Grid item xs={6}>
                <AddToBagButton
                  variant="contained"
                  onClick={() => {
                    removeWishList(ele.bookId);
                  }}
                >
                  {" "}
                  Remove WISHLIST
                </AddToBagButton>
              </Grid>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Wishlist;
