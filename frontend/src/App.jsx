import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container, CssBaseline, useTheme } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import { fetchUserData } from "./service/dataService";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      <Container
        sx={{
          p: 4,
          minHeight: "100vh",
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
            <></>
          )}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
