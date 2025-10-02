import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Address {
  type: string;
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
}

interface AddressFormProps {
  setisOpen2: (open: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ setisOpen2 }) => {
  const loadAddresses = () => {
    const savedAddresses = localStorage.getItem("addresses");
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  };

  const [addresses, setAddresses] = useState<Address[]>(loadAddresses);
  const [selected, setSelected] = useState<number | null>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [newAddressType, setNewAddressType] = useState<string>("");

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setSelected(index);
  };

  const handleAddAddress = () => {
    if (!newAddressType) {
      alert("Please select whether it's a 'Work' or 'Home' address");
      return;
    }

    const newAddress: Address = {
      type: newAddressType,
      fullName: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
    };

    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setOpenIndex(updatedAddresses.length - 1);
    setSelected(updatedAddresses.length - 1);
    setNewAddressType("");
  };

  const handleChange = (index: number, field: keyof Address, value: string) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleContinue = (index: number | null) => {
    if (index === null) {
      alert("Please select an address before continuing.");
      return;
    }

    localStorage.removeItem("saved_addresses_for_order");

    const selectedAddress = addresses[index];
    localStorage.setItem(
      "saved_addresses_for_order",
      JSON.stringify(selectedAddress)
    );
    setisOpen2(true);
    alert("Addresses saved for order!");
  };

  return (
    <Box
      sx={{ width: "600px", margin: "20px auto" }}
      className="cart-container"
      style={{ width: "80%" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <h3>Customer Details</h3>
        <Button variant="outlined" onClick={handleAddAddress}>
          Add New Address
        </Button>
      </Box>

      {!newAddressType && (
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>New Address Type</InputLabel>
            <Select
              value={newAddressType}
              onChange={(e) => setNewAddressType(e.target.value)}
              label="Address Type"
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {addresses.map((addr, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            mb: 2,
            p: 2,
            backgroundColor: selected === index ? "#f9f9f9" : "#fff",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => toggleOpen(index)}
          >
            <Radio checked={selected === index} />
            <strong>
              {index + 1}. {addr.type}
            </strong>
          </Box>

          {openIndex === index && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                value={addr.fullName}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) =>
                  handleChange(index, "fullName", e.target.value)
                }
              />
              <TextField
                label="Mobile Number"
                value={addr.mobile}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => handleChange(index, "mobile", e.target.value)}
              />
              <TextField
                label="Address"
                value={addr.address}
                multiline
                rows={3}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => handleChange(index, "address", e.target.value)}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="City/Town"
                  value={addr.city}
                  fullWidth
                  onChange={(e) => handleChange(index, "city", e.target.value)}
                />
                <TextField
                  label="State"
                  value={addr.state}
                  fullWidth
                  onChange={(e) => handleChange(index, "state", e.target.value)}
                />
              </Box>
            </Box>
          )}
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleContinue(selected)}
      >
        CONTINUE
      </Button>
    </Box>
  );
};

export default AddressForm;
