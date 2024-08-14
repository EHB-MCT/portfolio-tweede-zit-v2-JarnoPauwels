import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useThemeToggle } from "../utils/ThemeContext";

const HeaderContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  // width: "11vw",
  minWidth: "11vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderRight: "1px solid #ccc",
}));

const Logo = styled("img")({
  cursor: "pointer",
  //   marginBottom: "16px",
  width: "140px",
});

const Title = styled(Typography)({
  fontSize: "42px",
  fontWeight: "bold",
  marginBottom: "8px",
});

const LogoutButton = styled(Button)({
  marginTop: "auto",
  width: "100%",
  marginBottom: "16px",
});

const AdminButton = styled(Button)({
  width: "100%",
  marginBottom: "16px",
  fontSize: "13px",
});

const Header = ({ lightModeImageUrl, darkModeImageUrl, title, isAdmin }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <HeaderContainer>
      {isAdmin && (
        <AdminButton
          variant="contained"
          color="primary"
          onClick={handleAdminClick}
        >
          Admin Dashboard
        </AdminButton>
      )}

      <Logo
        src={
          theme.palette.mode === "dark" ? darkModeImageUrl : lightModeImageUrl
        }
        alt="logo"
        onClick={handleLogoClick}
      />
      <Title variant="h6">{title}</Title>

      <LogoutButton variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
