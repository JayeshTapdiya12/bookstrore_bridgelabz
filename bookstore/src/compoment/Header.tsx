import React, { useState, useContext } from "react";
import "../style/header1.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../assets/education.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { QuntContext } from "../pages/Dashboard";

// redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { setSearchQuery } from "../redux/slice/SearchSlice";

// --- Styled Components ---
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  width: "100%",
  maxWidth: "600px",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  height: "40px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  borderRadius: theme.shape.borderRadius,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CustomSearchIcon = styled(SearchIcon)(() => ({
  color: "grey",
}));

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.search.query);
  const { cartNumber } = useContext(QuntContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 2 }}
    >
      <Link to={"/wishlist"} style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
      </Link>
      <Link to={"/allorder"} style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>All Order</MenuItem>
      </Link>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={"/cart"} style={{ textDecoration: "none", color: "black" }}>
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={cartNumber} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>More Options</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#A03037" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                alt="logo"
                height={"27px"}
                style={{ marginTop: "5px", marginRight: "10px" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: { sm: "1rem", md: "1.25rem" },
                }}
              >
                BookStore
              </Typography>
            </Link>

            <Search
              sx={{ marginLeft: { xs: "10px", sm: "20px" }, flexGrow: 1 }}
            >
              <SearchIconWrapper>
                <CustomSearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                style={{ backgroundColor: "white", color: "grey" }}
                value={query}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            </Search>
          </Box>

          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            <NavLink
              to={"/cart"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <IconButton
                size="large"
                color="inherit"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Badge badgeContent={cartNumber} color="error">
                  <ShoppingCartIcon />
                </Badge>
                <span style={{ fontSize: "15px", marginTop: "10px" }}>
                  Cart
                </span>
              </IconButton>
            </NavLink>

            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
              }}
            >
              <AccountCircle />
              <span style={{ fontSize: "15px", marginTop: "10px" }}>
                More Options
              </span>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
