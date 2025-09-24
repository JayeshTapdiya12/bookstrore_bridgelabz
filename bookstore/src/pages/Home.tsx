import React, { useEffect, useState } from "react";
import { getBook as getBookService } from "../service/bookSerivce";
import { Outlet } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
// import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

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

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBook = async () => {
    try {
      const res = await getBookService();
      console.log(res?.data?.result);

      if (Array.isArray(res?.data?.result)) {
        setBooks(res.data.result);
        setLoading(false);
      } else if (res?.data?.result) {
        setBooks([res?.data?.result]);
        setLoading(false);
      } else {
        console.error("No books found in the response.");
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const Price = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "10px",
  });

  const OldPrice = styled(Typography)({
    textDecoration: "line-through",
    color: "grey",
    fontSize: "14px",
  });

  const RatingButton = styled(Box)({
    backgroundColor: "#4caf50",
    color: "#ffffff",
    fontSize: "12px",
    padding: "0 6px",
    borderRadius: "4px",
    display: "inline-block",
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <Stack spacing={2}>
              <Stack direction="row" spacing={0}>
                <Button variant="outlined" disabled>
                  <CircularProgress size={24} /> {/* Show loader */}
                </Button>
              </Stack>
            </Stack>
          ) : (
            books.map((ele) => (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={ele._id}>
                <Link
                  to={`book/${ele._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card sx={{ maxWidth: 200, margin: "0 auto", boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={ele.bookImage}
                      alt={ele.bookName}
                    />

                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {ele.bookName}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {ele.author}
                      </Typography>

                      <Box display="flex" alignItems="center" my={1}>
                        <RatingButton>4.5 ★</RatingButton>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          ml={1}
                        >
                          ({ele.quantity})
                        </Typography>
                      </Box>

                      <Price>
                        <Typography variant="h6" color="textPrimary">
                          Rs. {ele.discountPrice}
                        </Typography>
                        <OldPrice variant="body2">Rs. {ele.price}</OldPrice>
                      </Price>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Outlet />
    </>
  );
};

export default Home;
