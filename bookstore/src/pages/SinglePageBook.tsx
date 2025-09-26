import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../service/bookSerivce";
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
} from "@mui/material";
import { styled } from "@mui/system";
import {
  addCart as addCartService,
  getCart as getCartService,
} from "../service/cartService";
import {
  addWishlist as addWishService,
  getWishList as getWishService,
} from "../service/wishlistService";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
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
  const [wish, setWish] = useState<string | null>(null);
  const { refreshCart } = useContext(QuntContext);

  const getBook = async () => {
    try {
      if (!id) return;
      const res = await getBookById(id);
      setBookId(res?.data?.note);
      console.log("Book API response:", res);

      const cartRes = await getCartService();
      console.log("Cart API response:", cartRes);

      const cartBooks = cartRes?.data?.data?.book || [];
      console.log("Cart Books:", cartBooks);
      console.log("Current Book Id:", id);

      const found = cartBooks.find((b: any) => b?._id === id);

      console.log("Found in cart:", found);

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
      const res = await addCartService(id);
      console.log("Add Cart response:", res);

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
      console.log("innnnnnnnnnnnnnnnwishhshshshsh");
      if (!id) return;
      const res = await addWishService(id);
      console.log(res);
      // const wishres = await getWishService();
      // const wishBook = wishres?.data?.wishlist?.book || [];

      // const found = wishBook.find(
      //   (b: any) => b?.bookId?.toString() === id?.toString()
      // );
      // if (found) {
      //   setWish(found);
      // } else {
      //   setWish(null);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
    setWish(null);
  }, [id]);

  return (
    <>
      {loading ? (
        <Stack spacing={2}>
          <Stack direction="row" spacing={0}>
            <Button variant="outlined" disabled>
              <CircularProgress size={24} />
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Container maxWidth="lg" sx={{ paddingLeft: "10rem" }}>
          <h2 style={{ color: "grey" }}>
            Home/
            <span style={{ color: "black", fontSize: "15px" }}> ( Book)</span>
          </h2>
          <Grid container spacing={5}>
            {/* left side fornf button adn img */}
            <Grid item xs={12} md={4}>
              {bookId && (
                <Card sx={{ boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="500"
                    width={"500"}
                    image={bookId.bookImage ? bookId.bookImage : BookImage}
                    alt={bookId.bookName}
                  />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        {existb?._id === bookId._id ? (
                          <AddToBagButton variant="contained">
                            Already in Bag
                          </AddToBagButton>
                        ) : (
                          <AddToBagButton variant="contained" onClick={adding}>
                            ADD TO BAG
                          </AddToBagButton>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        {wish?._id === bookId?._id ? (
                          <AddToBagButton variant="contained">
                            Already in wishlist
                          </AddToBagButton>
                        ) : (
                          <WishlistButton variant="contained" onClick={addwish}>
                            WISHLIST
                          </WishlistButton>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* right sde: DETAILS */}
            <Grid item xs={12} md={8} width={500}>
              {bookId && (
                <>
                  <Typography variant="h4" gutterBottom>
                    {bookId.bookName}
                  </Typography>

                  <Typography variant="h6" color="textSecondary">
                    by {bookId.author}
                  </Typography>

                  <Box display="flex" alignItems="center" my={1}>
                    <Button
                      sx={{
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                        fontSize: "20px",
                        padding: "0 6px",
                        borderRadius: "4px",
                      }}
                    >
                      4.5 ★
                    </Button>
                    <Typography variant="h6" color="textSecondary" ml={1}>
                      ({bookId.quantity})
                    </Typography>
                  </Box>

                  <PriceBox>
                    <Typography variant="h4" color="black">
                      Rs. {bookId.discountPrice}
                    </Typography>
                    <OldPrice style={{ fontSize: "20px" }}>
                      Rs. {bookId.price}
                    </OldPrice>
                  </PriceBox>
                  <hr />
                  <BookDetail variant="h6">
                    <strong> Book Detail</strong>
                    <br />
                    {bookId.description}
                  </BookDetail>

                  <CustomerFeedback style={{ backgroundColor: "#F5F5F5" }}>
                    <Typography variant="h6">Customer Feedback</Typography>
                    <Typography variant="h6" color="textSecondary">
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
                        width: "95%",
                        marginTop: "10px",
                        padding: "8px",
                        fontSize: "20px",
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
