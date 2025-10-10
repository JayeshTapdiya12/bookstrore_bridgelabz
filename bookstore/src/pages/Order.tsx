import React, { useEffect, useState } from "react";
import "../style/order.css";
import Image from "../assets/order.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(email: string, phone: number, address: string) {
  return { email, phone, address };
}
const rows = [
  createData(
    "admin@bookstore.in",
    7869148854,
    " 42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034"
  ),
];
const Order: React.FC = () => {
  const [orderId, setOrderId] = useState<number | string | null>(null);
  const getorderid = async () => {
    setOrderId(localStorage.getItem("orderId"));
  };
  useEffect(() => {
    getorderid();
  }, []);

  return (
    <>
      <div className="order-container">
        <div className="imageorder">
          <img src={Image} alt="" />
        </div>
        <div className="textorder">
          <h2>Hurray!!! Your order is confirmed</h2>
          <p>
            The order id is <strong>{orderId}</strong>. Save the order id for
            further communication.
          </p>
        </div>
        <div className="tableorder">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email Us</TableCell>
                  <TableCell align="right">Contact Us</TableCell>
                  <TableCell align="left">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Order;
