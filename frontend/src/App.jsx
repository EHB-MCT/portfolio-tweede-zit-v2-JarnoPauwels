import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import HeaderVertical from "./components/HeaderVertical";
import Register from "./components/Register";
import Login from "./components/Login";
import Questions from "./components/Questions";
import { fetchUserData } from "./service/dataService";
import lightLogo from "./assets/EhB-logo-transparant.png";
import darkLogo from "./assets/EhB logo rood en wit.png";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setLoggedIn(true);
        await fetchUser(userId);
      } else {
        setLoggedIn(false);
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLoginSuccess = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLoggedIn(true);
      await fetchUser(userId);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const userData = await fetchUserData(userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          sx={{
            width: "11vw",
            minWidth: "11vw",
            position: "relative",
          }}
        >
          <HeaderVertical
            lightModeImageUrl={lightLogo}
            darkModeImageUrl={darkLogo}
            title="Forum"
            isAdmin={userRole === "admin"}
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // width: "89vw",
            p: 4,
          }}
        >
          <Routes>
            {!loggedIn ? (
              <>
                <Route path="/register" element={<Register />} />
                <Route
                  path="/login"
                  element={<Login onLoginSuccess={handleLoginSuccess} />}
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Questions />} />
              </>
            )}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
