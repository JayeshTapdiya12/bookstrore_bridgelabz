import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../compoment/Header";
import { getBook as getBookService } from "../service/bookSerivce";
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

// import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import { QuntContext } from "../pages/Dashboard";

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

  const { cartNumber, refreshCart } = useContext(QuntContext);

  const getBook = async () => {
    try {
      const res = await getBookService();
      const resp = res?.data?.result;

      const data = Array.isArray(resp)
        ? resp.find((c: any) => c._id === id)
        : null;

      if (data) {
        setBookId(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const adding = async () => {
    try {
      if (!id) return;
      const res = await addCartService(id);
      console.log(res);
      // Ideally fetch cart again
      const cartRes = await getCartService();
      refreshCart();
      const cartBooks = cartRes?.data?.result || [];
      const found = cartBooks.find((b: any) => b.product_id?._id === id);
      if (found) setExistb(found.product_id);
    } catch (error) {
      console.log(error);
    }
  };

  // has to add the wishlist functionlity
  // const addwishlist = async () => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getBook();
  }, [id]);

  return (
    <>
      {/* <Header /> */}
      {loading ? (
        <Stack spacing={2}>
          <Stack direction="row" spacing={0}>
            <Button variant="outlined" disabled>
              <CircularProgress size={24} /> {/* Show loader */}
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
          <Grid container spacing={2}>
            {/* LEFT SIDE: IMAGE + BUTTONS */}
            <Grid item xs={12} md={4}>
              {bookId && (
                <Card sx={{ boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={bookId.bookImage}
                    alt={bookId.bookName}
                  />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        {existb?._id === bookId._id ? (
                          <Typography variant="body2">
                            Already in Bag
                          </Typography>
                        ) : (
                          <AddToBagButton variant="contained" onClick={adding}>
                            ADD TO BAG
                          </AddToBagButton>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        {/* add a wishlist button  onClick={addwishlist}*/}
                        <WishlistButton variant="contained">
                          WISHLIST
                        </WishlistButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* RIGHT SIDE: DETAILS */}
            <Grid item xs={12} md={8}>
              {bookId && (
                <>
                  <Typography variant="h5" gutterBottom>
                    {bookId.bookName}
                  </Typography>

                  <Typography variant="body1" color="textSecondary">
                    by {bookId.author}
                  </Typography>

                  <Box display="flex" alignItems="center" my={1}>
                    <Button
                      sx={{
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                        fontSize: "12px",
                        padding: "0 6px",
                        borderRadius: "4px",
                      }}
                    >
                      4.5 ★
                    </Button>
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      ({bookId.quantity})
                    </Typography>
                  </Box>

                  <PriceBox>
                    <Typography variant="h5" color="primary">
                      Rs. {bookId.discountPrice}
                    </Typography>
                    <OldPrice>Rs. {bookId.price}</OldPrice>
                  </PriceBox>

                  <BookDetail variant="body2">
                    <strong>Book Detail</strong>
                    <br />
                    {bookId.description}
                  </BookDetail>

                  {/* Customer Feedback Section */}
                  <CustomerFeedback>
                    <Typography variant="h6">Customer Feedback</Typography>
                    <Typography variant="body2" color="textSecondary">
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
                      sx={{ width: "100%", marginTop: "10px", padding: "8px" }}
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
