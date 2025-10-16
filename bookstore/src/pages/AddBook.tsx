import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

import { Button, TextField, Box, Radio, CircularProgress } from "@mui/material";

interface BookData {
  bookName: string;
  description: string;
  author: string;
  bookImage: string;
  quantity: number;
  price: number;
  discountPrice: number;
}

const AddBook: React.FC = () => {
  const [bookName, setBookName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [disprice, setDiscprice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const [file, setFile] = useState<File | null>(null);

  const [imageurl, setImageurl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "BookStore_BridgleLabz");
    try {
      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfliqeb3y/image/upload",
        formData
      );
      const uploadedUrl = cloudRes.data.secure_url;
      setImageurl(uploadedUrl);
      setLoading(false);
      console.log("Cloudinary URL:", uploadedUrl);
      alert("Image uploaded ");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Upload failed");
    }
  };

  const addbookfunction = async () => {
    const bookData = {
      bookName,
      description: desc,
      author,
      bookImage: imageurl,
      quantity,
      price,
      discountPrice: disprice,
    };
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: "bearer " + token } };
    try {
      const res = await axios.post(
        "https://booksbooking.onrender.com/api/v1/books/addbook",
        bookData,
        headers
      );
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{ width: "600px", margin: "20px auto" }}
        style={{ width: "80%" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <h2>Add Book</h2>
          {/* <Button variant="outlined">ADD A NEW BOOK</Button> */}
        </Box>
        {/* <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar> */}

        <Box
          // key={index}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            mb: 2,
            p: 2,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Book Name"
              value={bookName}
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setBookName(e.target.value)}
            />

            <TextField
              label="Description of the book"
              value={desc}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              onChange={(e) => setDesc(e.target.value)}
            />
            <TextField
              label="Author Name"
              value={author}
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <input
              type="file"
              name=""
              id=""
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button onClick={handleUpload}> Upload Image </Button>
          </Box>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          ) : imageurl ? (
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <img src={imageurl} alt="Book Image" width={100} height={100} />
            </Box>
          ) : null}

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="Quantity"
              value={quantity}
              fullWidth
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <TextField
              label="Price"
              value={price}
              fullWidth
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <TextField
              label="Discounted Price"
              value={disprice}
              fullWidth
              type="number"
              onChange={(e) => setDiscprice(Number(e.target.value))}
            />
          </Box>
        </Box>
        {/* </Box> */}

        <Button
          variant="contained"
          color="primary"
          onClick={addbookfunction}
          sx={{ marginLeft: "auto", marginTop: "20px" }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          Add The Book
        </Button>
      </Box>
    </>
  );
};

export default AddBook;
