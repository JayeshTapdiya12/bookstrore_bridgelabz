import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../service/bookSerivce";
import { getWishList as getWishListService } from "../service/wishlistService";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Stack,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  addCart as addCartService,
  getCart as getCartService,
  addCart as updateQuantityService,
  rmeoveCart as RemoveCartService,
} from "../service/cartService";
import { addWishlist as addWishService } from "../service/wishlistService";
import { QuntContext } from "../pages/Dashboard";
import "../style/single.css";
import BookImage from "../assets/Bookimg2.png";

interface Book {
  _id: string;
  bookName: string;
  author: string;
  description: string;
  quantity: number;
  price: number;
  discountPrice: number;
  bookImage: string;
}

const AddToBagButton = styled(Button)({
  backgroundColor: "#b71c1c",
  color: "#fff",
  width: "100%",
  "&:hover": {
    backgroundColor: "#8e0000",
  },
});

const WishlistButton = styled(Button)({
  backgroundColor: "#757575",
  color: "#fff",
  width: "100%",
  "&:hover": {
    backgroundColor: "#494949",
  },
});

const PriceBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "10px",
  flexWrap: "wrap",
});

const OldPrice = styled(Typography)({
  textDecoration: "line-through",
  color: "grey",
  fontSize: "14px",
});

const BookDetail = styled(Typography)({
  marginTop: "16px",
  marginBottom: "16px",
  lineHeight: 1.5,
});

const CustomerFeedback = styled(Box)({
  marginTop: "24px",
});

const SubmitButton = styled(Button)({
  marginTop: "16px",
  backgroundColor: "#1976d2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#004ba0",
  },
});

const SinglePageBook: React.FC = () => {
  const { id } = useParams();
  const [bookId, setBookId] = useState<Book | null>(null);
  const [existb, setExistb] = useState<Book | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const { refreshCart } = useContext(QuntContext);
  const [counter, setCounter] = useState<number>(0);

  const getBook = async () => {
    try {
      if (!id) return;
      const res = await getBookById(id);
      setBookId(res?.data?.note);

      const cartRes = await getCartService();
      const cartBooks = cartRes?.data?.data?.book || [];
      const found = cartBooks.find((b: any) => b?._id === id);
      if (found) setExistb(found);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const adding = async () => {
    try {
      if (!id) return;
      setCounter(counter + 1);
      await addCartService(id);

      const cartRes = await getCartService();
      refreshCart();
      const cartBooks = cartRes?.data?.data?.book || [];
      const found = cartBooks.find(
        (b: any) => b?._id?.toString() === id?.toString()
      );

      if (found) setExistb(found);
    } catch (error) {
      console.log(error);
    }
  };

  const addwish = async () => {
    try {
      if (!id) return;
      await addWishService(id);
      getBook();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);

  const handleQuantityChange = async (
    bookId: string,
    action: "increment" | "decrement"
  ) => {
    try {
      if (action === "increment") {
        setCounter(counter + 1);
        await updateQuantityService(bookId);
      } else {
        setCounter(counter - 1);

        await RemoveCartService(bookId);
      }
      refreshCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Stack alignItems="center" mt={4}>
          <CircularProgress size={32} />
        </Stack>
      ) : (
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
          <Typography variant="subtitle1" color="grey" mb={2}>
            Home /{" "}
            <span style={{ color: "black", fontSize: "15px" }}>( Book )</span>
          </Typography>

          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={4}>
              {bookId && (
                <Card sx={{ boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: { xs: 350, sm: 400, md: 500 },
                      objectFit: "contain",
                    }}
                    image={bookId.bookImage ? bookId.bookImage : BookImage}
                    alt={bookId.bookName}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        {existb?._id === bookId._id && counter > 0 ? (
                          <div className="cart-quantity">
                            <button
                              onClick={() =>
                                handleQuantityChange(bookId._id, "decrement")
                              }
                            >
                              -
                            </button>
                            <input type="text" value={counter} readOnly />
                            <button
                              onClick={() =>
                                handleQuantityChange(bookId._id, "increment")
                              }
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <AddToBagButton variant="contained" onClick={adding}>
                            ADD TO BAG
                          </AddToBagButton>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        {/* {existwish?._id === bookId?._id ? (
                          <AddToBagButton variant="contained">
                            Already in wishlist
                          </AddToBagButton>
                        ) : ( */}
                        <AddToBagButton variant="contained" onClick={addwish}>
                          WISHLIST
                        </AddToBagButton>
                        {/* )} */}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={8}>
              {bookId && (
                <>
                  <Typography variant="h5" gutterBottom>
                    {bookId.bookName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    by {bookId.author}
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    my={2}
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        fontSize: "16px",
                        px: 1.5,
                        borderRadius: "4px",
                      }}
                    >
                      4.5 ★
                    </Button>
                    <Typography variant="body1" color="textSecondary">
                      ({bookId.quantity})
                    </Typography>
                  </Box>

                  <PriceBox>
                    <Typography variant="h5" color="black">
                      Rs. {bookId.discountPrice}
                    </Typography>
                    <OldPrice sx={{ fontSize: { xs: "16px", sm: "20px" } }}>
                      Rs. {bookId.price}
                    </OldPrice>
                  </PriceBox>

                  <hr />
                  <BookDetail variant="body1">
                    <strong>Book Detail</strong>
                    <br />
                    {bookId.description}
                  </BookDetail>

                  <CustomerFeedback
                    sx={{ p: 2, borderRadius: 2, backgroundColor: "#F5F5F5" }}
                  >
                    <Typography variant="h6">Customer Feedback</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Overall rating
                    </Typography>

                    <Rating
                      name="customer-feedback"
                      defaultValue={0}
                      precision={0.5}
                    />

                    <Box
                      component="textarea"
                      placeholder="Write your review"
                      rows={4}
                      sx={{
                        width: "100%",
                        mt: 2,
                        p: 1.5,
                        fontSize: "16px",
                        borderRadius: 1,
                        border: "1px solid #ccc",
                      }}
                    />

                    <SubmitButton variant="contained">Submit</SubmitButton>
                  </CustomerFeedback>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default SinglePageBook;
