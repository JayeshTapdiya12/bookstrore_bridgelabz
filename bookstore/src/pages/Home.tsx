import React, { useEffect, useState } from "react";
import { getBook as getBookService } from "../service/bookSerivce";
import { Outlet, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Bookimg from "../assets/Bookimg2.png";
import Fotter from "../compoment/Fotter";

interface Book {
  _id: string;
  bookName: string;
  author: string;
  description: string;
  quantity: number;
  price: number;
  discountPrice: number;
  bookImage?: string | null;
  admin_user_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(books.length / itemsPerPage);

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

  const getBook = async () => {
    try {
      setLoading(true);
      const res = await getBookService();
      const bookList = Array.isArray(res?.data?.note)
        ? res.data.note
        : [res.data.note];

      setBooks(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : books.length === 0 ? (
          <Typography variant="h6" align="center" mt={4}>
            No books available.
          </Typography>
        ) : (
          <>
            <h2>
              Books
              <span style={{ color: "grey", fontSize: "15px" }}>
                {" "}
                ( {books.length} items)
              </span>
            </h2>
            <Grid container spacing={3}>
              {paginatedBooks.map((book) => (
                <Grid item key={book._id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Link
                    to={`book/${book._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card sx={{ height: "100%", boxShadow: 3 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        src={book.bookImage ? book.bookImage : Bookimg}
                        alt={book.bookName}
                        style={{}}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {book.bookName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {book.author}
                        </Typography>
                        <Box display="flex" alignItems="center" my={1}>
                          <RatingButton>4.5 ★</RatingButton>
                          <Typography variant="body2" ml={1}>
                            ({book.quantity})
                          </Typography>
                        </Box>
                        <Price>
                          <Typography variant="h6">
                            Rs. {book.discountPrice}
                          </Typography>
                          <OldPrice variant="body2">Rs. {book.price}</OldPrice>
                        </Price>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, value) => setCurrentPage(value)}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            )}
          </>
        )}
      </Container>
      <Fotter />
      <Outlet />
    </>
  );
};

export default Home;
